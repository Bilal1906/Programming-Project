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
    jwt.verify(token, JWT_SECRET)

    const [rijen] = await db.query(`
      SELECT id, naam, omschrijving, gewicht
      FROM competentie
      ORDER BY id ASC
    `)

    return NextResponse.json(rijen)

  } catch (error) {
    console.error('Competenties fout:', error)
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

    if (payload.rol !== 'admin') {
      return NextResponse.json({ fout: 'Geen toegang' }, { status: 403 })
    }

    const body = await request.json()
    const { naam, omschrijving, gewicht } = body

    const [result] = await db.query(
      'INSERT INTO competentie (naam, omschrijving, gewicht) VALUES (?, ?, ?)',
      [naam, omschrijving, gewicht]
    )

    return NextResponse.json({ bericht: 'Competentie aangemaakt!', id: result.insertId })

  } catch (error) {
    console.error('Competentie aanmaken fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}