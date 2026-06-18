import { NextResponse } from 'next/server'
import db from '@/app/lib/db'
import bcrypt from 'bcryptjs'
import { verifyToken, checkRol } from '@/app/lib/auth'

export async function GET(request) {
  try {
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })

    const rolFout = checkRol(auth.payload, ['admin'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

    const [rijen] = await db.query(`
      SELECT u.id, u.voornaam, u.achternaam, u.email, u.telefoon, u.rol, u.created_at
      FROM user u
      WHERE u.rol != 'stagementor'
        OR (
          u.rol = 'stagementor' AND EXISTS (
            SELECT 1 FROM stagementor sm
            JOIN stage s ON s.stagementor_id = sm.id
            WHERE sm.user_id = u.id AND s.status = 'actief'
          )
        )
      ORDER BY u.created_at DESC
    `)

    return NextResponse.json(rijen)

  } catch (error) {
    console.error('Admin gebruikers fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })

    const rolFout = checkRol(auth.payload, ['admin'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

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
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })

    const rolFout = checkRol(auth.payload, ['admin'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

    const body = await request.json()
    const { id } = body

    await db.query('DELETE FROM user WHERE id = ?', [id])

    return NextResponse.json({ bericht: 'Gebruiker verwijderd!' })

  } catch (error) {
    console.error('Gebruiker verwijderen fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}