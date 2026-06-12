'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DocentTopbar from '../component/topbar'

export default function DocentProfiel() {
  const router = useRouter()
  const [huidigWachtwoord, setHuidigWachtwoord] = useState('')
  const [nieuwWachtwoord, setNieuwWachtwoord] = useState('')
  const [bevestigWachtwoord, setBevestigWachtwoord] = useState('')

  const handleWachtwoordOpslaan = (e) => {
    e.preventDefault()
    if (nieuwWachtwoord !== bevestigWachtwoord) {
      alert('Wachtwoorden komen niet overeen!')
      return
    }
    console.log('Wachtwoord opslaan')
  }

  const handleUitloggen = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('rol')
    router.push('/authentificator/login')
  }

  const inputStyle = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"

  return (
    <div className="flex-1 flex flex-col">
      <DocentTopbar
        titel="Mijn Profiel"
        subtitel="2025-2026 · Erasmushogeschool Brussel"
      />
      <div className="flex-1 bg-gray-100 p-6">
        <div className="max-w-2xl space-y-4">

          {/* Avatar + naam */}
          <div className="bg-white rounded-xl p-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              JQ
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">Joachim Quartier</div>
              <div className="text-sm text-gray-400">Docent</div>
              <div className="text-xs text-gray-400 mt-1">🏫 Erasmushogeschool Brussel</div>
            </div>
          </div>

          {/* Persoonlijke gegevens */}
          <div className="bg-white rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Persoonlijke gegevens</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Voornaam', waarde: 'Joachim' },
                { label: 'Achternaam', waarde: 'Quartier' },
                { label: 'E-mailadres', waarde: 'joachim.quartier@docent.ehb.be' },
                { label: 'Telefoon', waarde: '+32 475 23 45 67' },
                { label: 'School', waarde: 'Erasmushogeschool Brussel' },
                { label: 'Functie', waarde: 'Docent' },
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