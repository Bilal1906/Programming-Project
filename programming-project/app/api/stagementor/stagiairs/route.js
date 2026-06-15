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
        s.id as stage_id,
        s.startdatum,
        s.einddatum,
        s.aantal_weken,
        s.status,
        u.voornaam,
        u.achternaam,
        u.email,
        u.telefoon,
        st.opleiding,
        b.naam as bedrijf,
        du.voornaam as docent_voornaam,
        du.achternaam as docent_achternaam
      FROM stage s
      JOIN student st ON s.student_id = st.id
      JOIN user u ON st.user_id = u.id
      JOIN stagementor sm ON s.stagementor_id = sm.id
      JOIN bedrijf b ON sm.bedrijf_id = b.id
      JOIN docent d ON s.docent_id = d.id
      JOIN user du ON d.user_id = du.id
      WHERE sm.user_id = ?
    `, [payload.id])

    return NextResponse.json(rijen)

  } catch (error) {
    console.error('Stagementor stagiairs fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}