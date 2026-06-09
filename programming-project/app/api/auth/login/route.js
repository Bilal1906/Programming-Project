import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'geheim_sleutel_verander_dit'

// Tijdelijke testgebruikers (later vervangen door echte database)
const testGebruikers = [
  {
    id: 1,
    email: 'bilal.jaaboub@ehb.be',
    wachtwoord_hash: bcrypt.hashSync('wachtwoord123', 10),
    rol: 'student',
    voornaam: 'Bilal',
    achternaam: 'Jaaboub'
  },
  {
    id: 2,
    email: 'joachim.quartier@ehb.be',
    wachtwoord_hash: bcrypt.hashSync('wachtwoord123', 10),
    rol: 'docent',
    voornaam: 'Joachim',
    achternaam: 'Quartier'
  },
  {
    id: 3,
    email: 'steve.weemaels@ehb.be',
    wachtwoord_hash: bcrypt.hashSync('wachtwoord123', 10),
    rol: 'stagementor',
    voornaam: 'Steve',
    achternaam: 'Weemaels'
  },
  {
    id: 4,
    email: 'admin@ehb.be',
    wachtwoord_hash: bcrypt.hashSync('wachtwoord123', 10),
    rol: 'admin',
    voornaam: 'Admin',
    achternaam: 'Competent'
  }
]

export async function POST(request) {
  const { email, wachtwoord } = await request.json()

  // Gebruiker zoeken
  const gebruiker = testGebruikers.find(g => g.email === email)

  if (!gebruiker) {
    return Response.json(
      { fout: 'Ongeldig e-mailadres of wachtwoord' },
      { status: 401 }
    )
  }

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
}