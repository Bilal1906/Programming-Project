'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Topbar from '../../component/topbar'

export default function NieuweStageAanvraag() {
  const router = useRouter()

  const [bedrijf, setBedrijf] = useState({
    naam: '', adres: '', sector: '', website: '', telefoon: ''
  })

  const [mentor, setMentor] = useState({
    naam: '', functie: '', email: '', telefoon: ''
  })

  const [opdracht, setOpdracht] = useState({
    omschrijving: '', startdatum: '2025-02-03', einddatum: '2025-05-23'
  })

  const [fout, setFout] = useState('')

  const handleIndienen = async (e) => {
    e.preventDefault()
    setFout('')

    if (!bedrijf.naam || !bedrijf.adres || !mentor.naam || !mentor.email || !opdracht.omschrijving) {
      setFout('Vul alle verplichte velden in!')
      return
    }

    // Later: API call
    console.log('Stage indienen:', { bedrijf, mentor, opdracht })
    router.push('/student/dashboard-first')
  }

  const inputStyle = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
  const labelStyle = "block text-xs text-gray-500 mb-1"

  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Stageaanvraag"
        subtitel="Dashboard › Nieuwe stageaanvraag"
      />

      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">

        {/* Stappen indicator */}
        <div className="bg-white rounded-xl p-4 mb-4 flex items-center gap-4 text-sm">
          {[
            { nr: 1, label: 'Jouw gegevens' },
            { nr: 2, label: 'Bedrijfsgegevens' },
            { nr: 3, label: 'Stagementor' },
            { nr: 4, label: 'Opdracht & periode' },
          ].map((stap, i) => (
            <div key={stap.nr} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#1e3a5f] text-white text-xs flex items-center justify-center font-bold">
                {stap.nr}
              </div>
              <span className="text-gray-600 font-medium">{stap.label}</span>
              {i < 3 && <span className="text-gray-300 ml-2">——</span>}
            </div>
          ))}
        </div>

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 text-sm text-blue-700">
          Na het indienen wordt je aanvraag doorgestuurd naar je docent en vervolgens beoordeeld door de admin. Je ontvangt een bevestiging via e-mail zodra je stage is goedgekeurd.
        </div>

        <form onSubmit={handleIndienen} className="space-y-4">

          {/* Jouw gegevens */}
          <div className="bg-white rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-[#1e3a5f] text-white text-xs flex items-center justify-center font-bold">1</div>
              <h2 className="font-semibold text-gray-800">Jouw gegevens</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelStyle}>Naam</label>
                <input className={inputStyle} value="Bilal Jaaboub" disabled />
              </div>
              <div>
                <label className={labelStyle}>Opleiding</label>
                <input className={inputStyle} value="Toegepaste Informatica" disabled />
              </div>
              <div>
                <label className={labelStyle}>Academiejaar</label>
                <input className={inputStyle} value="2025-2026" disabled />
              </div>
              <div>
                <label className={labelStyle}>E-mailadres</label>
                <input className={inputStyle} value="bilal.jaaboub@ehb.be" disabled />
              </div>
            </div>
          </div>

          {/* Bedrijfsgegevens */}
          <div className="bg-white rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-[#1e3a5f] text-white text-xs flex items-center justify-center font-bold">2</div>
              <h2 className="font-semibold text-gray-800">Bedrijfsgegevens</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelStyle}>Bedrijfsnaam *</label>
                <input className={inputStyle} placeholder="bv. Proximus NV" value={bedrijf.naam} onChange={e => setBedrijf({...bedrijf, naam: e.target.value})} />
              </div>
              <div>
                <label className={labelStyle}>Adres *</label>
                <input className={inputStyle} placeholder="Straat + nummer, gemeente" value={bedrijf.adres} onChange={e => setBedrijf({...bedrijf, adres: e.target.value})} />
              </div>
              <div>
                <label className={labelStyle}>Sector</label>
                <input className={inputStyle} placeholder="bv. IT-consultancy, Fintech" value={bedrijf.sector} onChange={e => setBedrijf({...bedrijf, sector: e.target.value})} />
              </div>
              <div>
                <label className={labelStyle}>Website</label>
                <input className={inputStyle} placeholder="https://www.bedrijf.be" value={bedrijf.website} onChange={e => setBedrijf({...bedrijf, website: e.target.value})} />
              </div>
              <div className="col-span-2">
                <label className={labelStyle}>Telefoonnummer</label>
                <input className={inputStyle} placeholder="+32 ..." value={bedrijf.telefoon} onChange={e => setBedrijf({...bedrijf, telefoon: e.target.value})} />
              </div>
            </div>
          </div>

          {/* Stagementor */}
          <div className="bg-white rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-[#1e3a5f] text-white text-xs flex items-center justify-center font-bold">3</div>
              <h2 className="font-semibold text-gray-800">Stagementor</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelStyle}>Naam mentor *</label>
                <input className={inputStyle} placeholder="Volledige naam" value={mentor.naam} onChange={e => setMentor({...mentor, naam: e.target.value})} />
              </div>
              <div>
                <label className={labelStyle}>Functie</label>
                <input className={inputStyle} placeholder="bv. Software Engineer, HR Manager" value={mentor.functie} onChange={e => setMentor({...mentor, functie: e.target.value})} />
              </div>
              <div>
                <label className={labelStyle}>E-mail mentor *</label>
                <input className={inputStyle} placeholder="mentor@bedrijf.be" value={mentor.email} onChange={e => setMentor({...mentor, email: e.target.value})} />
              </div>
              <div>
                <label className={labelStyle}>Telefoonnummer mentor</label>
                <input className={inputStyle} placeholder="+32 ..." value={mentor.telefoon} onChange={e => setMentor({...mentor, telefoon: e.target.value})} />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">De mentor ontvangt een account-uitnodiging na goedkeuring.</p>
          </div>

          {/* Stageopdracht & periode */}
          <div className="bg-white rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-[#1e3a5f] text-white text-xs flex items-center justify-center font-bold">4</div>
              <h2 className="font-semibold text-gray-800">Stageopdracht & periode</h2>
            </div>
            <div className="mb-3">
              <label className={labelStyle}>Omschrijving van de opdracht *</label>
              <textarea
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 h-24 resize-none"
                placeholder="Beschrijf de stageactiviteiten, gebruikte technologieën, doelstellingen en verwachte resultaten..."
                value={opdracht.omschrijving}
                onChange={e => setOpdracht({...opdracht, omschrijving: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelStyle}>Startdatum *</label>
                <input type="date" className={inputStyle} value={opdracht.startdatum} onChange={e => setOpdracht({...opdracht, startdatum: e.target.value})} />
              </div>
              <div>
                <label className={labelStyle}>Einddatum *</label>
                <input type="date" className={inputStyle} value={opdracht.einddatum} onChange={e => setOpdracht({...opdracht, einddatum: e.target.value})} />
              </div>
            </div>
          </div>

          {/* Foutmelding */}
          {fout && (
            <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-3 text-sm">
              {fout}
            </div>
          )}

          {/* Knoppen */}
          <div className="flex items-center justify-between pb-6">
            <button
              type="button"
              onClick={() => router.push('/student/dashboard-first')}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              ← Annuleren
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.push('/student/stage')}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Stageaanvragen bekijken
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm bg-[#1e3a5f] text-white rounded-lg hover:bg-[#162d4a] cursor-pointer font-medium"
              >
                Aanvraag indienen
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}