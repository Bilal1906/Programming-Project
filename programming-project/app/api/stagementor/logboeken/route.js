import { NextResponse } from 'next/server'
import db from '@/app/lib/db'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'geheim_sleutel_verander_dit'

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ fout: 'Geen token' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const payload = jwt.verify(token, JWT_SECRET)

    if (payload.rol !== 'stagementor') {
      return NextResponse.json({ fout: 'Geen toegang' }, { status: 403 })
    }

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
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ fout: 'Geen token' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const payload = jwt.verify(token, JWT_SECRET)

    if (payload.rol !== 'stagementor') {
      return NextResponse.json({ fout: 'Geen toegang' }, { status: 403 })
    }

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