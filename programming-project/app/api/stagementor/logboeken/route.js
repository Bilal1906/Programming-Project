import { NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { verifyToken, checkRol } from '@/app/lib/auth'

export async function GET(request) {
  try {
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })

    const rolFout = checkRol(auth.payload, ['stagementor'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

    const payload = auth.payload

    const [rijen] = await db.query(`
      SELECT 
        lw.id,
        lw.week_nummer,
        lw.datum_van,
        lw.datum_tot,
        lw.totaal_uren,
        lw.status,
        lw.ingediend_op,
        u.voornaam as student_voornaam,
        u.achternaam as student_achternaam
      FROM logboek_week lw
      JOIN stage s ON lw.stage_id = s.id
      JOIN stagementor sm ON s.stagementor_id = sm.id
      JOIN student st ON s.student_id = st.id
      JOIN user u ON st.user_id = u.id
      WHERE sm.user_id = ?
      ORDER BY lw.ingediend_op DESC
    `, [payload.id])

    return NextResponse.json(rijen)

  } catch (error) {
    console.error('Stagementor logboeken fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })

    const rolFout = checkRol(auth.payload, ['stagementor'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

    const body = await request.json()
    const { id, status } = body

    await db.query(
      `UPDATE logboek_week 
       SET status = ?, goedgekeurd_op = NOW()
       WHERE id = ?`,
      [status, id]
    )

    return NextResponse.json({ bericht: 'Logboek status bijgewerkt!' })

  } catch (error) {
    console.error('Logboek updaten fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}