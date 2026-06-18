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
        su.voornaam as student_voornaam, su.achternaam as student_achternaam,
        su.email as student_email,
        b.naam as bedrijf_naam,
        mu.voornaam as mentor_voornaam, mu.achternaam as mentor_achternaam,
        st.opleiding, st.academiejaar,
        s.startdatum, s.einddatum, s.opdracht_omschrijving,
        COALESCE(o.signed_student, 0) as signed_student,
        COALESCE(o.signed_stagementor, 0) as signed_stagementor,
        o.signed_at,
        CASE WHEN o.signed_student = 1 AND o.signed_stagementor = 1 THEN 'ondertekend' ELSE 'in_afwachting' END as document_status
      FROM stage s
      JOIN student st ON s.student_id = st.id
      JOIN user su ON st.user_id = su.id
      JOIN stagementor sm ON s.stagementor_id = sm.id
      JOIN user mu ON sm.user_id = mu.id
      JOIN bedrijf b ON sm.bedrijf_id = b.id
      LEFT JOIN overeenkomst o ON o.stage_id = s.id
      WHERE s.id = ?
    `, [id])

    if (rijen.length === 0) {
      return NextResponse.json({ fout: 'Document niet gevonden' }, { status: 404 })
    }
    return NextResponse.json(rijen[0])
  } catch (error) {
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}