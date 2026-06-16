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
        s.id,
        s.status,
        s.startdatum,
        s.einddatum,
        s.aantal_weken,
        s.uren_per_week,
        s.opdracht_omschrijving,
        s.feedback_commissie,
        b.naam as bedrijf_naam,
        b.adres as bedrijf_adres,
        b.sector,
        b.website,
        b.telefoon as bedrijf_telefoon,
        mu.voornaam as mentor_voornaam,
        mu.achternaam as mentor_achternaam,
        mu.email as mentor_email,
        sm.functie as mentor_functie,
        du.voornaam as docent_voornaam,
        du.achternaam as docent_achternaam,
        du.email as docent_email
      FROM stage s
      JOIN student st ON s.student_id = st.id
      JOIN stagementor sm ON s.stagementor_id = sm.id
      JOIN user mu ON sm.user_id = mu.id
      JOIN bedrijf b ON sm.bedrijf_id = b.id
      JOIN docent d ON s.docent_id = d.id
      JOIN user du ON d.user_id = du.id
      WHERE st.user_id = ?
      ORDER BY s.id DESC
    `, [payload.id])

    return NextResponse.json(rijen)

  } catch (error) {
    console.error('Student stage fout:', error)
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
    const {
      bedrijf_naam, bedrijf_adres, bedrijf_sector, bedrijf_website, bedrijf_telefoon,
      mentor_naam, mentor_functie, mentor_email, mentor_telefoon,
      opdracht_omschrijving, startdatum, einddatum
    } = body

    // Student ID ophalen
    const [studentRijen] = await db.query(
      'SELECT id FROM student WHERE user_id = ?',
      [payload.id]
    )
    const student_id = studentRijen[0].id

    // Docent ophalen (eerste beschikbare)
    const [docentRijen] = await db.query('SELECT id FROM docent LIMIT 1')
    const docent_id = docentRijen[0].id

    // Bedrijf aanmaken
    const [bedrijfResult] = await db.query(
      'INSERT INTO bedrijf (naam, adres, sector, website, telefoon) VALUES (?, ?, ?, ?, ?)',
      [bedrijf_naam, bedrijf_adres, bedrijf_sector, bedrijf_website, bedrijf_telefoon]
    )
    const bedrijf_id = bedrijfResult.insertId

    // Stagementor user aanmaken
    const [mentorUserResult] = await db.query(
      'INSERT INTO user (voornaam, achternaam, email, telefoon, rol) VALUES (?, ?, ?, ?, ?)',
      [mentor_naam.split(' ')[0], mentor_naam.split(' ')[1] || '', mentor_email, mentor_telefoon, 'stagementor']
    )
    const mentor_user_id = mentorUserResult.insertId

    // Stagementor aanmaken
    const [mentorResult] = await db.query(
      'INSERT INTO stagementor (user_id, bedrijf_id, functie) VALUES (?, ?, ?)',
      [mentor_user_id, bedrijf_id, mentor_functie]
    )
    const stagementor_id = mentorResult.insertId

    // Stage aanmaken
    await db.query(
      `INSERT INTO stage 
        (student_id, docent_id, stagementor_id, opdracht_omschrijving, startdatum, einddatum, status, ingediend_op) 
       VALUES (?, ?, ?, ?, ?, ?, 'ingediend', NOW())`,
      [student_id, docent_id, stagementor_id, opdracht_omschrijving, startdatum, einddatum]
    )

    return NextResponse.json({ bericht: 'Stage ingediend!' })

  } catch (error) {
    console.error('Stage indienen fout:', error)
    return NextResponse.json({ fout: error.message }, { status: 500 })
  }
}