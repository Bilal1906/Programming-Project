import { NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { verifyToken, checkRol } from '@/app/lib/auth'

export async function GET(request) {
  try {
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })
    // pas de checkRol : tout utilisateur connecté peut lire les compétences

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
    const auth = verifyToken(request)
    if (auth.fout) return NextResponse.json({ fout: auth.fout }, { status: auth.status })

    const rolFout = checkRol(auth.payload, ['admin'])
    if (rolFout) return NextResponse.json({ fout: rolFout.fout }, { status: rolFout.status })

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