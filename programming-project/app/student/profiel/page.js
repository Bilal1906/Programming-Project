'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Topbar from '../component/topbar'

export default function Profiel() {
  const router = useRouter()
  const [gebruiker, setGebruiker] = useState(null)
  const [loading, setLoading] = useState(true)
  const [huidigWachtwoord, setHuidigWachtwoord] = useState('')
  const [nieuwWachtwoord, setNieuwWachtwoord] = useState('')
  const [bevestigWachtwoord, setBevestigWachtwoord] = useState('')
  const [bericht, setBericht] = useState('')
  const [fout, setFout] = useState('')

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || localStorage.getItem('token')

    if (!token) {
      router.push('/authentificator/login')
      return
    }

    fetch('/api/user/profiel', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setGebruiker(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleWachtwoordOpslaan = async (e) => {
    e.preventDefault()
    setFout('')
    setBericht('')

    if (nieuwWachtwoord !== bevestigWachtwoord) {
      setFout('Wachtwoorden komen niet overeen!')
      return
    }

    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || localStorage.getItem('token')

    const response = await fetch('/api/user/profiel', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ huidigWachtwoord, nieuwWachtwoord })
    })

    const data = await response.json()

    if (!response.ok) {
      setFout(data.fout)
    } else {
      setBericht('Wachtwoord succesvol gewijzigd!')
      setHuidigWachtwoord('')
      setNieuwWachtwoord('')
      setBevestigWachtwoord('')
    }
  }

  const handleUitloggen = () => {
    document.cookie = 'token=; path=/; max-age=0'
    document.cookie = 'rol=; path=/; max-age=0'
    router.push('/authentificator/login')
  }

  const inputStyle = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-sm text-gray-400">Laden...</div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Profiel"
        subtitel="2025-2026 · EhB Toegepaste Informatica"
      />
      <div className="flex-1 bg-gray-100 p-6">
        <div className="max-w-2xl space-y-4">

          {/* Avatar + naam */}
          <div className="bg-white rounded-xl p-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {gebruiker?.voornaam?.[0]}{gebruiker?.achternaam?.[0]}
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">{gebruiker?.voornaam} {gebruiker?.achternaam}</div>
              <div className="text-sm text-gray-400">Student / Stagiair</div>
              <div className="text-xs text-gray-400 mt-1">🏫 Erasmus Hogeschool Brussel</div>
            </div>
          </div>

          {/* Persoonlijke gegevens */}
          <div className="bg-white rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Persoonlijke gegevens</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Voornaam', waarde: gebruiker?.voornaam },
                { label: 'Achternaam', waarde: gebruiker?.achternaam },
                { label: 'E-mailadres', waarde: gebruiker?.email },
                { label: 'Telefoon', waarde: gebruiker?.telefoon },
                { label: 'Functie', waarde: 'Student / Stagiar' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                  <div className="text-sm font-medium text-gray-900">{item.waarde}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Wachtwoord wijzigen */}
          <div className="bg-white rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Wachtwoord wijzigen</h2>
            <form onSubmit={handleWachtwoordOpslaan} className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Huidig wachtwoord</label>
                <input type="password" placeholder="Uw huidig wachtwoord" value={huidigWachtwoord} onChange={(e) => setHuidigWachtwoord(e.target.value)} className={inputStyle} />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Nieuw wachtwoord</label>
                <input type="password" placeholder="Kies een nieuw wachtwoord" value={nieuwWachtwoord} onChange={(e) => setNieuwWachtwoord(e.target.value)} className={inputStyle} />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Bevestig nieuw wachtwoord</label>
                <input type="password" placeholder="Herhaal uw nieuw wachtwoord" value={bevestigWachtwoord} onChange={(e) => setBevestigWachtwoord(e.target.value)} className={inputStyle} />
              </div>

              {fout && <div className="text-red-500 text-xs">{fout}</div>}
              {bericht && <div className="text-green-500 text-xs">{bericht}</div>}

              <button type="submit" className="px-5 py-2 bg-[#1e3a5f] text-white text-sm rounded-lg hover:bg-[#162d4a] cursor-pointer font-medium">
                Wachtwoord opslaan
              </button>
            </form>
          </div>

          {/* Uitloggen */}
          <button
            onClick={handleUitloggen}
            className="px-4 py-2 bg-white border border-gray-200 text-red-500 text-sm rounded-lg hover:bg-red-50 cursor-pointer font-medium flex items-center gap-2"
          >
            ⏻ Uitloggen
          </button>

        </div>
      </div>
    </div>
  )
}