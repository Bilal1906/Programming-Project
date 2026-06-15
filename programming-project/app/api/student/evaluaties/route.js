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

    if (payload.rol !== 'student') {
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
        e.algemene_zelfreflectie_student,
        u.voornaam as beoordelaar_voornaam,
        u.achternaam as beoordelaar_achternaam
      FROM evaluatie e
      JOIN stage s ON e.stage_id = s.id
      JOIN student st ON s.student_id = st.id
      JOIN user u ON e.beoordelaar_id = u.id
      WHERE st.user_id = ?
      ORDER BY e.datum DESC
    `, [payload.id])

    return NextResponse.json(rijen)

  } catch (error) {
    console.error('Student evaluaties fout:', error)
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

    if (payload.rol !== 'student') {
      return NextResponse.json({ fout: 'Geen toegang' }, { status: 403 })
    }

    const body = await request.json()
    const { evaluatie_id, zelfreflectie, scores } = body

    // Algemene zelfreflectie opslaan
    await db.query(
      'UPDATE evaluatie SET algemene_zelfreflectie_student = ? WHERE id = ?',
      [zelfreflectie, evaluatie_id]
    )

    // Scores per competentie opslaan
    for (const score of scores) {
      await db.query(
        `UPDATE evaluatie_score 
         SET zelfreflectie_student = ?
         WHERE evaluatie_id = ? AND competentie_id = ?`,
        [score.zelfreflectie, evaluatie_id, score.competentie_id]
      )
    }

    return NextResponse.json({ bericht: 'Zelfreflectie opgeslagen!' })

  } catch (error) {
    console.error('Evaluatie opslaan fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}