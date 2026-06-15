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
        e.id,
        e.type,
        e.status,
        e.datum,
        e.week_nummer,
        u.voornaam as student_voornaam,
        u.achternaam as student_achternaam
      FROM evaluatie e
      JOIN stage s ON e.stage_id = s.id
      JOIN stagementor sm ON s.stagementor_id = sm.id
      JOIN student st ON s.student_id = st.id
      JOIN user u ON st.user_id = u.id
      WHERE sm.user_id = ?
      ORDER BY e.datum DESC
    `, [payload.id])

    return NextResponse.json(rijen)

  } catch (error) {
    console.error('Stagementor evaluaties fout:', error)
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
    const { evaluatie_id, scores, feedback } = body

    // Status updaten
    await db.query(
      `UPDATE evaluatie SET status = 'voltooid' WHERE id = ?`,
      [evaluatie_id]
    )

    // Scores per competentie opslaan
    for (const score of scores) {
      await db.query(
        `UPDATE evaluatie_score 
         SET score_mentor = ?, feedback_mentor = ?
         WHERE evaluatie_id = ? AND competentie_id = ?`,
        [score.score, score.feedback, evaluatie_id, score.competentie_id]
      )
    }

    return NextResponse.json({ bericht: 'Evaluatie scores opgeslagen!' })

  } catch (error) {
    console.error('Evaluatie scores opslaan fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}