import { NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { verifyToken, checkRol } from '@/app/lib/auth'
import { stuurMail } from '@/app/lib/mailer'
import { genereerCode } from '@/app/lib/mailer'
import { stagementorUitnodigingTemplate, stageStatusTemplate } from '@/app/lib/emailTemplates'

export async function GET(request) {
  try {
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })

    const rolFout = checkRol(auth.payload, ['admin'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

    const [rijen] = await db.query(`
      SELECT 
        s.id,
        s.status,
        s.startdatum,
        s.einddatum,
        s.feedback_commissie,
        s.ingediend_op,
        s.goedgekeurd_op,
        u.voornaam as student_voornaam,
        u.achternaam as student_achternaam,
        u.email as student_email,
        b.naam as bedrijf_naam,
        mu.voornaam as mentor_voornaam,
        mu.achternaam as mentor_achternaam,
        mu.email as mentor_email,
        sm.id as stagementor_id,
        du.voornaam as docent_voornaam,
        du.achternaam as docent_achternaam
      FROM stage s
      JOIN student st ON s.student_id = st.id
      JOIN user u ON st.user_id = u.id
      JOIN stagementor sm ON s.stagementor_id = sm.id
      JOIN user mu ON sm.user_id = mu.id
      JOIN bedrijf b ON sm.bedrijf_id = b.id
      JOIN docent d ON s.docent_id = d.id
      JOIN user du ON d.user_id = du.id
      ORDER BY s.ingediend_op DESC
    `)

    return NextResponse.json(rijen)

  } catch (error) {
    console.error('Admin stages fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })

    const rolFout = checkRol(auth.payload, ['admin', 'commissie'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

    const body = await request.json()
    const { id, status, feedback_commissie } = body

    await db.query(
      `UPDATE stage 
       SET status = ?, feedback_commissie = ?, goedgekeurd_op = NOW()
       WHERE id = ?`,
      [status, feedback_commissie, id]
    )

    // Stage info ophalen voor de emails
    const [stageRijen] = await db.query(`
      SELECT 
        u.voornaam as student_voornaam,
        u.email as student_email,
        b.naam as bedrijf_naam,
        mu.id as mentor_user_id,
        mu.voornaam as mentor_voornaam,
        mu.email as mentor_email
      FROM stage s
      JOIN student st ON s.student_id = st.id
      JOIN user u ON st.user_id = u.id
      JOIN stagementor sm ON s.stagementor_id = sm.id
      JOIN user mu ON sm.user_id = mu.id
      JOIN bedrijf b ON sm.bedrijf_id = b.id
      WHERE s.id = ?
    `, [id])

    if (stageRijen.length > 0) {
      const stage = stageRijen[0]

      // Email naar student (altijd)
      await stuurMail({
        naar: stage.student_email,
        onderwerp: `Update over je stageaanvraag bij ${stage.bedrijf_naam}`,
        html: stageStatusTemplate({
          naam: stage.student_voornaam,
          bedrijf: stage.bedrijf_naam,
          status,
          feedback: feedback_commissie,
        })
      })

      // Bij goedkeuring: email naar stagementor met activatiecode
      if (status === 'goedgekeurd') {
        const code = genereerCode()
        const verloopt = new Date(Date.now() + 24 * 60 * 60 * 1000)

        await db.query(
          'UPDATE user SET reset_code = ?, reset_code_expiry = ? WHERE id = ?',
          [code, verloopt, stage.mentor_user_id]
        )

        await stuurMail({
          naar: stage.mentor_email,
          onderwerp: 'Welkom bij Competent — Activeer je account',
          html: stagementorUitnodigingTemplate({
            naam: stage.mentor_voornaam,
            code,
            link: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/authentificator/first-time`
          })
        })
      }
    }

    return NextResponse.json({ bericht: 'Stage status bijgewerkt!' })

  } catch (error) {
    console.error('Stage updaten fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}