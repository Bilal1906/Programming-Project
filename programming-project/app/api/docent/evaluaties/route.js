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
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ fout: 'Geen token' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const payload = jwt.verify(token, JWT_SECRET)

    if (payload.rol !== 'docent') {
      return NextResponse.json({ fout: 'Geen toegang' }, { status: 403 })
    }

    const body = await request.json()
    const { stage_id, type, datum, week_nummer, feedback, scores } = body

    // Evaluatie aanmaken
    const [evaluatieResult] = await db.query(
      `INSERT INTO evaluatie 
        (stage_id, beoordelaar_id, type, status, algemene_feedback_docent, datum, week_nummer)
       VALUES (?, ?, ?, 'ingevuld', ?, ?, ?)`,
      [stage_id, payload.id, type, feedback, datum, week_nummer]
    )
    const evaluatie_id = evaluatieResult.insertId

    // Scores per competentie opslaan
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