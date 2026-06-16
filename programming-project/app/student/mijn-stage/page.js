'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Topbar from '../component/topbar'
import { fetchMetAuth } from '@/app/lib/fetchMetAuth'

export default function MijnStage() {
  const router = useRouter()
  const [stage, setStage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMetAuth('/api/student/stage')
      .then(res => res?.json())
      .then(data => {
        if (data?.length > 0) setStage(data[0])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex-1 flex items-center justify-center bg-gray-100"><div className="text-sm text-gray-400">Laden...</div></div>

  if (!stage) return (
    <div className="flex-1 flex flex-col">
      <Topbar titel="Mijn Stage" subtitel="Geen actieve stage" />
      <div className="flex-1 flex items-center justify-center bg-gray-100"><p className="text-sm text-gray-400">Geen stage gevonden.</p></div>
    </div>
  )

  const startdatum = new Date(stage.startdatum).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' })
  const einddatum = new Date(stage.einddatum).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' })
  const voortgang = Math.min(100, Math.round((new Date() - new Date(stage.startdatum)) / (new Date(stage.einddatum) - new Date(stage.startdatum)) * 100))

  return (
    <div className="flex-1 flex flex-col">
      <Topbar titel="Mijn Stage" subtitel={`${stage.bedrijf_naam} · Toegepaste Informatica · 2025-2026`} />
      <div className="flex-1 bg-gray-100 p-6 space-y-4">

        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-800">Voortgang stage</span>
            <span className="text-sm font-semibold text-blue-600">{voortgang}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div className="bg-[#1e3a5f] h-2 rounded-full" style={{ width: `${voortgang}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{startdatum}</span>
            <span>{einddatum}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Bedrijfsgegevens</h2>
            <div className="space-y-3">
              {[
                { label: 'Bedrijf', waarde: stage.bedrijf_naam },
                { label: 'Adres', waarde: stage.bedrijf_adres },
                { label: 'Sector', waarde: stage.sector },
                { label: 'Website', waarde: stage.website, link: true },
                { label: 'Telefoonnummer', waarde: stage.bedrijf_telefoon },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-gray-400">{item.label}</span>
                  {item.link ? <a href={`https://${item.waarde}`} className="text-blue-500 hover:underline">{item.waarde}</a> : <span className="text-gray-800 font-medium">{item.waarde}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Stageperiode</h2>
            <div className="space-y-3">
              {[
                { label: 'Startdatum', waarde: startdatum },
                { label: 'Einddatum', waarde: einddatum },
                { label: 'Aantal weken', waarde: `${stage.aantal_weken} weken` },
                { label: 'Uren per week', waarde: `${stage.uren_per_week}u` },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-gray-800 font-medium">{item.waarde}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Contactpersonen</h2>
            <div className="space-y-4">
              {[
                { initialen: `${stage.mentor_voornaam?.[0]}${stage.mentor_achternaam?.[0]}`, naam: `${stage.mentor_voornaam} ${stage.mentor_achternaam}`, functie: `Stagementor · ${stage.bedrijf_naam}`, email: stage.mentor_email },
                { initialen: `${stage.docent_voornaam?.[0]}${stage.docent_achternaam?.[0]}`, naam: `${stage.docent_voornaam} ${stage.docent_achternaam}`, functie: 'Begeleider EhB · Docent', email: stage.docent_email },
              ].map((persoon) => (
                <div key={persoon.naam} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#c7d2e8] flex items-center justify-center text-xs font-bold text-[#1e3a5f] flex-shrink-0">{persoon.initialen}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{persoon.naam}</div>
                    <div className="text-xs text-gray-400">{persoon.functie}</div>
                    <a href={`mailto:${persoon.email}`} className="text-xs text-blue-500 hover:underline">{persoon.email}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Stageopdracht</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{stage.opdracht_omschrijving}</p>
          </div>
        </div>
      </div>
    </div>
  )
}