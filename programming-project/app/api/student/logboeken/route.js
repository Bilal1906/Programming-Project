import { NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { verifyToken, checkRol } from '@/app/lib/auth'

export async function GET(request) {
  try {
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })

    const rolFout = checkRol(auth.payload, ['student'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

    const payload = auth.payload

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
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })

    const rolFout = checkRol(auth.payload, ['student'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

    const body = await request.json()
    const { stage_id, week_nummer, datum_van, datum_tot, dagen } = body

    const [weekResult] = await db.query(
      `INSERT INTO logboek_week (stage_id, week_nummer, datum_van, datum_tot, status)
       VALUES (?, ?, ?, ?, 'onvolledig')`,
      [stage_id, week_nummer, datum_van, datum_tot]
    )
    const logboek_week_id = weekResult.insertId

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