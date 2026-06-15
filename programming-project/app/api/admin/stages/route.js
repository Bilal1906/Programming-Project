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

    if (payload.rol !== 'admin' && payload.rol !== 'commissie') {
      return NextResponse.json({ fout: 'Geen toegang' }, { status: 403 })
    }

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
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ fout: 'Geen token' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const payload = jwt.verify(token, JWT_SECRET)

    if (payload.rol !== 'admin' && payload.rol !== 'commissie') {
      return NextResponse.json({ fout: 'Geen toegang' }, { status: 403 })
    }

    const body = await request.json()
    const { id, status, feedback_commissie } = body

    await db.query(
      `UPDATE stage 
       SET status = ?, feedback_commissie = ?, goedgekeurd_op = NOW()
       WHERE id = ?`,
      [status, feedback_commissie, id]
    )

    return NextResponse.json({ bericht: 'Stage status bijgewerkt!' })

  } catch (error) {
    console.error('Stage updaten fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}