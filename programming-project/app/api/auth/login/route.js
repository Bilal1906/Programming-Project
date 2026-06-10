import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import db from '@/app/lib/db'

const JWT_SECRET = process.env.JWT_SECRET || 'geheim_sleutel_verander_dit'

export async function POST(request) {
  try {
    const { email, wachtwoord } = await request.json()

    // Gebruiker zoeken in database
    const [rijen] = await db.query(
      'SELECT * FROM user WHERE email = ?',
      [email]
    )

    if (rijen.length === 0) {
      return Response.json(
        { fout: 'Ongeldig e-mailadres of wachtwoord' },
        { status: 401 }
      )
    }

    const gebruiker = rijen[0]

    // Wachtwoord controleren
    const wachtwoordKlopt = await bcrypt.compare(wachtwoord, gebruiker.wachtwoord_hash)

    if (!wachtwoordKlopt) {
      return Response.json(
        { fout: 'Ongeldig e-mailadres of wachtwoord' },
        { status: 401 }
      )
    }

    // JWT token aanmaken
    const token = jwt.sign(
      {
        id: gebruiker.id,
        email: gebruiker.email,
        rol: gebruiker.rol,
        voornaam: gebruiker.voornaam,
        achternaam: gebruiker.achternaam
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    return Response.json({ token, rol: gebruiker.rol })

  } catch (error) {
    console.error('Login fout:', error)
    return Response.json(
      { fout: 'Server fout: ' + error.message },
      { status: 500 }
    )
  }
}