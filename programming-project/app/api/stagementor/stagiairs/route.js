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
        du.achternaam as docent_achternaam,
        d_doc.status as document_status
      FROM stage s
      JOIN student st ON s.student_id = st.id
      JOIN user u ON st.user_id = u.id
      JOIN stagementor sm ON s.stagementor_id = sm.id
      JOIN bedrijf b ON sm.bedrijf_id = b.id
      JOIN docent d ON s.docent_id = d.id
      JOIN user du ON d.user_id = du.id
      LEFT JOIN document d_doc ON d_doc.stage_id = s.id AND d_doc.type = 'stageovereenkomst'
      WHERE sm.user_id = ?
    `, [payload.id])

    return NextResponse.json(rijen)

  } catch (error) {
    console.error('Stagementor stagiairs fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}