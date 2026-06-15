import { NextResponse } from 'next/server'
import db from '@/app/lib/db'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'geheim_sleutel_verander_dit'

export async function GET(request) {
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

    const [rijen] = await db.query(`
      SELECT id, voornaam, achternaam, email, telefoon, rol, created_at
      FROM user
      ORDER BY created_at DESC
    `)

    return NextResponse.json(rijen)

  } catch (error) {
    console.error('Admin gebruikers fout:', error)
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
    const { voornaam, achternaam, email, telefoon, rol, wachtwoord } = body

    const hash = await bcrypt.hash(wachtwoord, 10)

    const [result] = await db.query(
      `INSERT INTO user (voornaam, achternaam, email, wachtwoord_hash, telefoon, rol)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [voornaam, achternaam, email, hash, telefoon, rol]
    )

    return NextResponse.json({ bericht: 'Gebruiker aangemaakt!', id: result.insertId })

  } catch (error) {
    console.error('Gebruiker aanmaken fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
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
    const { id } = body

    await db.query('DELETE FROM user WHERE id = ?', [id])

    return NextResponse.json({ bericht: 'Gebruiker verwijderd!' })

  } catch (error) {
    console.error('Gebruiker verwijderen fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}