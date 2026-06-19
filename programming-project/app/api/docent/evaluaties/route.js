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
        e.id, e.type, e.status, e.datum, e.week_nummer,
        e.algemene_feedback_docent,
        u.voornaam as student_voornaam, u.achternaam as student_achternaam,
        b.naam as bedrijf_naam
      FROM evaluatie e
      JOIN stage s ON e.stage_id = s.id
      JOIN student st ON s.student_id = st.id
      JOIN user u ON st.user_id = u.id
      JOIN docent d ON s.docent_id = d.id
      JOIN stagementor sm ON s.stagementor_id = sm.id
      JOIN bedrijf b ON sm.bedrijf_id = b.id
      WHERE d.user_id = ?
      ORDER BY e.datum DESC
    `, [payload.id])

    return NextResponse.json(rijen)
  } catch (error) {
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
    const { stage_id, type, datum, week_nummer, feedback } = body

    const [evaluatieResult] = await db.query(
      `INSERT INTO evaluatie 
        (stage_id, beoordelaar_id, type, status, algemene_feedback_docent, datum, week_nummer)
       VALUES (?, ?, ?, 'open', ?, ?, ?)`,
      [stage_id, payload.id, type, feedback || null, datum, week_nummer || null]
    )
    const evaluatie_id = evaluatieResult.insertId

    // lege evaluatie_score rijen voor elke competentie
    const [competenties] = await db.query('SELECT id FROM competentie ORDER BY id ASC')
    for (const c of competenties) {
      await db.query(
        'INSERT INTO evaluatie_score (evaluatie_id, competentie_id) VALUES (?, ?)',
        [evaluatie_id, c.id]
      )
    }

    return NextResponse.json({ bericht: 'Evaluatie aangemaakt!', id: evaluatie_id })
  } catch (error) {
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })
    const rolFout = checkRol(auth.payload, ['docent'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

    const payload = auth.payload
    const body = await request.json()
    const { evaluatie_id, algemene_feedback, scores } = body

    // algemene feedback updaten
    await db.query(
      'UPDATE evaluatie SET algemene_feedback_docent=?, status=? WHERE id=?',
      [algemene_feedback || null, 'ingevuld', evaluatie_id]
    )

    // scores per competentie updaten
    for (const score of scores) {
      await db.query(
        'UPDATE evaluatie_score SET score_docent=? WHERE evaluatie_id=? AND competentie_id=?',
        [score.score_docent ?? null, evaluatie_id, score.competentie_id]
      )
    }

    return NextResponse.json({ bericht: 'Evaluatie opgeslagen!' })
  } catch (error) {
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}