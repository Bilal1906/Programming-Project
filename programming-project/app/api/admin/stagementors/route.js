import { NextResponse } from 'next/server'
import db from '@/app/lib/db'
import bcrypt from 'bcryptjs'
import { verifyToken, checkRol } from '@/app/lib/auth'

export async function POST(request) {
  try {
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })
    const rolFout = checkRol(auth.payload, ['admin'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

    const body = await request.json()
    const { voornaam, achternaam, email, telefoon, wachtwoord, functie, bedrijf_naam, adres, sector, website } = body

    // 1. bedrijf aanmaken
    const [bedrijfResult] = await db.query(
      'INSERT INTO bedrijf (naam, adres, sector, website) VALUES (?, ?, ?, ?)',
      [bedrijf_naam, adres, sector, website]
    )
    const bedrijf_id = bedrijfResult.insertId

    // 2. user aanmaken
    const hash = wachtwoord ? await bcrypt.hash(wachtwoord, 10) : null
    const [userResult] = await db.query(
      `INSERT INTO user (voornaam, achternaam, email, wachtwoord_hash, telefoon, rol)
       VALUES (?, ?, ?, ?, ?, 'stagementor')`,
      [voornaam, achternaam, email, hash, telefoon]
    )
    const user_id = userResult.insertId

    // 3. stagementor aanmaken (link user + bedrijf)
    await db.query(
      'INSERT INTO stagementor (user_id, bedrijf_id, functie) VALUES (?, ?, ?)',
      [user_id, bedrijf_id, functie]
    )

    return NextResponse.json({ bericht: 'Stagementor aangemaakt!', id: user_id })
  } catch (error) {
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}