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

    if (payload.rol !== 'docent') {
      return NextResponse.json({ fout: 'Geen toegang' }, { status: 403 })
    }

    const [rijen] = await db.query(`
      SELECT 
        u.voornaam,
        u.achternaam,
        u.email,
        u.telefoon,
        b.naam as bedrijf,
        mu.voornaam as mentor_voornaam,
        mu.achternaam as mentor_achternaam,
        s.status
      FROM stage s
      JOIN student st ON s.student_id = st.id
      JOIN user u ON st.user_id = u.id
      JOIN bedrijf b ON s.stagementor_id = (
        SELECT sm.id FROM stagementor sm WHERE sm.bedrijf_id = b.id LIMIT 1
      )
      JOIN stagementor sm ON s.stagementor_id = sm.id
      JOIN user mu ON sm.user_id = mu.id
      JOIN docent d ON s.docent_id = d.id
      WHERE d.user_id = ?
    `, [payload.id])

    return NextResponse.json(rijen)

  } catch (error) {
    console.error('Docent studenten fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}