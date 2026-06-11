'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Topbar from '../component/topbar'

const aanvragen = [
  {
    id: 1,
    bedrijf: 'Proximus NV',
    ingediend: '15 jan 2025',
    opleiding: 'Toegepaste Informatica 3',
    status: 'goedgekeurd',
  },
  {
    id: 2,
    bedrijf: 'Accenture Belgium',
    ingediend: '10 jan 2025',
    opleiding: 'Toegepaste Informatica 3',
    status: 'behandeling',
  },
  {
    id: 3,
    bedrijf: 'Small Startup BV',
    ingediend: '2 jan 2025',
    opleiding: 'Toegepaste Informatica 3',
    status: 'afgekeurd',
  },
  {
    id: 4,
    bedrijf: 'Concept — Naam bedrijf nog niet ingevuld',
    ingediend: 'Opgeslagen als concept op 20 dec 2024',
    opleiding: '',
    status: 'concept',
  },
]

export default function StageAanvragen() {
  const router = useRouter()

  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Mijn stageaanvragen"
        subtitel="Dashboard · Stageaanvragen"
        rechts={
          <button
            onClick={() => router.push('/student/stage/nieuw')}
            className="px-4 py-2 bg-[#1e3a5f] text-white text-sm rounded-lg hover:bg-[#162d4a] cursor-pointer font-medium"
          >
            Nieuwe aanvraag
          </button>
        }
      />

      <div className="flex-1 bg-gray-100 p-6 space-y-3">
        {aanvragen.map((aanvraag) => (
          <div key={aanvraag.id} className="bg-white rounded-xl px-5 py-4">
            <div className="font-semibold text-sm">{aanvraag.bedrijf}</div>
            <div className="text-xs text-gray-400">{aanvraag.ingediend}</div>
          </div>
        ))}
      </div>
    </div>
  )
}