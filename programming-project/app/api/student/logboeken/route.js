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

    // Stage ID ophalen
    const [stageRijen] = await db.query(`
      SELECT s.id FROM stage s
      JOIN student st ON s.student_id = st.id
      WHERE st.user_id = ? AND s.status = 'actief'
      LIMIT 1
    `, [payload.id])

    if (stageRijen.length === 0) {
      return NextResponse.json([])
    }

    const stage_id = stageRijen[0].id

    // Logboeken ophalen
    const [rijen] = await db.query(`
      SELECT 
        lw.id,
        lw.week_nummer,
        lw.datum_van,
        lw.datum_tot,
        lw.totaal_uren,
        lw.status,
        lw.ingediend_op
      FROM logboek_week lw
      WHERE lw.stage_id = ?
      ORDER BY lw.week_nummer ASC
    `, [stage_id])

    return NextResponse.json(rijen)

  } catch (error) {
    console.error('Student logboeken fout:', error)
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
    const { stage_id, week_nummer, datum_van, datum_tot, dagen } = body

    // Logboek week aanmaken
    const [weekResult] = await db.query(
      `INSERT INTO logboek_week (stage_id, week_nummer, datum_van, datum_tot, status)
       VALUES (?, ?, ?, ?, 'onvolledig')`,
      [stage_id, week_nummer, datum_van, datum_tot]
    )
    const logboek_week_id = weekResult.insertId

    // Dagen aanmaken
    for (const dag of dagen) {
      await db.query(
        `INSERT INTO logboek_dag (logboek_week_id, datum, uren, uitgevoerde_taken, reflectie, leerpunten, status)
         VALUES (?, ?, ?, ?, ?, ?, 'concept')`,
        [logboek_week_id, dag.datum, dag.uren, dag.taken, dag.reflectie, dag.leerpunten]
      )
    }

    return NextResponse.json({ bericht: 'Logboek aangemaakt!' })

  } catch (error) {
    console.error('Logboek aanmaken fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}