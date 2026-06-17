import { NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { verifyToken, checkRol } from '@/app/lib/auth'

export async function GET(request, { params }) {
  try {
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })

    const rolFout = checkRol(auth.payload, ['stagementor'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

    const { id } = await params

    const [rijen] = await db.query(`
      SELECT 
        s.id as stage_id,
        s.startdatum,
        s.einddatum,
        u.voornaam as student_voornaam,
        u.achternaam as student_achternaam,
        b.naam as bedrijf_naam,
        mu.voornaam as mentor_voornaam,
        mu.achternaam as mentor_achternaam,
        d.status as document_status,
        d.ondertekend_op
      FROM stage s
      JOIN student st ON s.student_id = st.id
      JOIN user u ON st.user_id = u.id
      JOIN stagementor sm ON s.stagementor_id = sm.id
      JOIN bedrijf b ON sm.bedrijf_id = b.id
      JOIN user mu ON sm.user_id = mu.id
      LEFT JOIN document d ON d.stage_id = s.id AND d.type = 'stageovereenkomst'
      WHERE s.id = ?
    `, [id])

    if (rijen.length === 0) {
      return NextResponse.json({ fout: 'Document niet gevonden' }, { status: 404 })
    }

    return NextResponse.json(rijen[0])

  } catch (error) {
    console.error('Document detail fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}