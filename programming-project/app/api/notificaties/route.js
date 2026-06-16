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

    const [rijen] = await db.query(`
      SELECT id, type, bericht, gelezen, created_at
      FROM notificatie
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 20
    `, [payload.id])

    return NextResponse.json(rijen)

  } catch (error) {
    console.error('Notificaties fout:', error)
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

    const body = await request.json()
    const { id } = body

    await db.query(
      'UPDATE notificatie SET gelezen = TRUE WHERE id = ? AND user_id = ?',
      [id, payload.id]
    )

    return NextResponse.json({ bericht: 'Notificatie gelezen!' })

  } catch (error) {
    console.error('Notificatie updaten fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}