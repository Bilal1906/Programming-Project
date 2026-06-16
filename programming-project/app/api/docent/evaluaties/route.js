import { NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { verifyToken, checkRol } from '@/app/lib/auth'

export async function GET(request) {
  try {
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })

    const rolFout = checkRol(auth.payload, ['docent'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

    const payload = auth.payload

    const [rijen] = await db.query(`
      SELECT 
        e.id,
        e.type,
        e.status,
        e.datum,
        e.week_nummer,
        e.algemene_feedback_docent,
        u.voornaam as student_voornaam,
        u.achternaam as student_achternaam
      FROM evaluatie e
      JOIN stage s ON e.stage_id = s.id
      JOIN student st ON s.student_id = st.id
      JOIN user u ON st.user_id = u.id
      JOIN docent d ON s.docent_id = d.id
      WHERE d.user_id = ?
      ORDER BY e.datum DESC
    `, [payload.id])

    return NextResponse.json(rijen)

  } catch (error) {
    console.error('Docent evaluaties fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })

    const rolFout = checkRol(auth.payload, ['docent'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

    const payload = auth.payload

    const body = await request.json()
    const { stage_id, type, datum, week_nummer, feedback, scores } = body

    const [evaluatieResult] = await db.query(
      `INSERT INTO evaluatie 
        (stage_id, beoordelaar_id, type, status, algemene_feedback_docent, datum, week_nummer)
       VALUES (?, ?, ?, 'ingevuld', ?, ?, ?)`,
      [stage_id, payload.id, type, feedback, datum, week_nummer]
    )
    const evaluatie_id = evaluatieResult.insertId

    for (const score of scores) {
      await db.query(
        `INSERT INTO evaluatie_score (evaluatie_id, competentie_id, score_mentor)
         VALUES (?, ?, ?)`,
        [evaluatie_id, score.competentie_id, score.score]
      )
    }

    return NextResponse.json({ bericht: 'Evaluatie opgeslagen!' })

  } catch (error) {
    console.error('Evaluatie aanmaken fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}