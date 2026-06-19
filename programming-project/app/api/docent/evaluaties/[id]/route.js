import { NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { verifyToken, checkRol } from '@/app/lib/auth'

export async function GET(request, { params }) {
  try {
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })
    const rolFout = checkRol(auth.payload, ['docent'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

    const { id } = await params

    const [evalRijen] = await db.query(`
      SELECT e.id, e.type, e.status, e.datum, e.week_nummer,
             e.algemene_feedback_docent,
             u.voornaam as student_voornaam, u.achternaam as student_achternaam,
             b.naam as bedrijf_naam
      FROM evaluatie e
      JOIN stage s ON e.stage_id = s.id
      JOIN student st ON s.student_id = st.id
      JOIN user u ON st.user_id = u.id
      JOIN stagementor sm ON s.stagementor_id = sm.id
      JOIN bedrijf b ON sm.bedrijf_id = b.id
      WHERE e.id = ?
    `, [id])

    if (evalRijen.length === 0) return NextResponse.json({ fout: 'Evaluatie niet gevonden' }, { status: 404 })

    const [scoreRijen] = await db.query(`
      SELECT es.competentie_id, es.score_docent, es.score_mentor,
             c.naam as competentie_naam, c.gewicht
      FROM evaluatie_score es
      JOIN competentie c ON es.competentie_id = c.id
      WHERE es.evaluatie_id = ?
      ORDER BY c.id ASC
    `, [id])

    return NextResponse.json({ evaluatie: evalRijen[0], scores: scoreRijen })
  } catch (error) {
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}