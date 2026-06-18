import { NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { verifyToken, checkRol } from '@/app/lib/auth'
import { stuurMail } from '@/app/lib/mailer'

export async function PUT(request, { params }) {
  try {
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })
    const rolFout = checkRol(auth.payload, ['student'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

    const { id } = await params
    const body = await request.json()
    const { actie, commentaar_student } = body
    // actie: 'accepteren' | 'weigeren' | 'aanpassen'

    // stage ophalen
    const [stageRijen] = await db.query(`
      SELECT s.*, sm.id as sm_id, sm.user_id as mentor_user_id,
             mu.email as mentor_email, mu.voornaam as mentor_voornaam
      FROM stage s
      JOIN stagementor sm ON s.stagementor_id = sm.id
      JOIN user mu ON sm.user_id = mu.id
      WHERE s.id = ?
    `, [id])

    if (stageRijen.length === 0) {
      return NextResponse.json({ fout: 'Stage niet gevonden' }, { status: 404 })
    }
    const stage = stageRijen[0]

    if (actie === 'accepteren') {
      // stage actief zetten
      await db.query(
        'UPDATE stage SET status = ?, commentaar_student = ? WHERE id = ?',
        ['actief', commentaar_student || null, id]
      )

      // alle andere stages van deze student verwijderen (+ hun stagementors/bedrijven)
      const [andereStages] = await db.query(
        'SELECT id, stagementor_id FROM stage WHERE student_id = ? AND id != ?',
        [stage.student_id, id]
      )

      for (const andere of andereStages) {
        // bedrijf_id ophalen
        const [smRijen] = await db.query(
          'SELECT bedrijf_id, user_id FROM stagementor WHERE id = ?',
          [andere.stagementor_id]
        )
        if (smRijen.length > 0) {
          const { bedrijf_id, user_id } = smRijen[0]
          await db.query('DELETE FROM stage WHERE id = ?', [andere.id])
          await db.query('DELETE FROM stagementor WHERE id = ?', [andere.stagementor_id])
          await db.query('DELETE FROM user WHERE id = ?', [user_id])
          await db.query('DELETE FROM bedrijf WHERE id = ?', [bedrijf_id])
        }
      }

      // mail + code naar stagementor sturen
      try {
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        const vervalt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        await db.query(
          'UPDATE user SET reset_code = ?, reset_code_expiry = ? WHERE id = ?',
          [code, vervalt, stage.mentor_user_id]
        )
        const link = `${process.env.APP_URL || 'http://localhost:3000'}/authentificator/first-time?email=${encodeURIComponent(stage.mentor_email)}`
        await stuurMail({
          naar: stage.mentor_email,
          onderwerp: 'Welkom bij Competent — Activeer je account',
          html: `
            <p>Beste ${stage.mentor_voornaam},</p>
            <p>Een student heeft je stage geaccepteerd. Activeer je account met deze code:</p>
            <p style="font-size:24px;font-weight:bold;letter-spacing:3px;">${code}</p>
            <p><a href="${link}">${link}</a></p>
            <p>Deze code is 7 dagen geldig.</p>
          `
        })
      } catch (mailError) {
        console.error('Mail mislukt:', mailError)
      }

      return NextResponse.json({ bericht: 'Stage geaccepteerd!' })

    } else if (actie === 'weigeren') {
      // stage afgekeurd zetten
      await db.query(
        'UPDATE stage SET status = ?, commentaar_student = ? WHERE id = ?',
        ['afgekeurd', commentaar_student || null, id]
      )
      return NextResponse.json({ bericht: 'Stage geweigerd.' })

    } else if (actie === 'aanpassen') {
      // stage terug ingediend met commentaar
      await db.query(
        'UPDATE stage SET status = ?, commentaar_student = ? WHERE id = ?',
        ['ingediend', commentaar_student || null, id]
      )
      return NextResponse.json({ bericht: 'Aanpassingen ingediend!' })

    } else {
      return NextResponse.json({ fout: 'Ongeldige actie' }, { status: 400 })
    }

  } catch (error) {
    console.error('Stage actie fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}