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
    stagementor: 'Steve Weemaels',
    begeleider: 'Joachim Quartier',
    startdatum: '3 februari 2025',
    einddatum: '23 mei 2025',
    duur: '16 weken · 560u',
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

const statusBadge = (status) => {
  const stijlen = {
    goedgekeurd: 'bg-green-50 text-green-700 border border-green-200',
    behandeling: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    afgekeurd: 'bg-red-50 text-red-700 border border-red-200',
    concept: 'bg-gray-100 text-gray-600 border border-gray-200',
  }
  const labels = {
    goedgekeurd: '✓ Goedgekeurd',
    behandeling: 'In behandeling',
    afgekeurd: 'Afgekeurd',
    concept: 'Concept',
  }
  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${stijlen[status]}`}>
      {labels[status]}
    </span>
  )
}

export default function StageAanvragen() {
  const router = useRouter()
  const [openId, setOpenId] = useState(null)

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
          <div key={aanvraag.id} className="bg-white rounded-xl overflow-hidden">
            <div
              className="flex items-center justify-between px-5 py-4 cursor-pointer"
              onClick={() => setOpenId(openId === aanvraag.id ? null : aanvraag.id)}
            >
              <div>
                <div className="font-semibold text-sm text-gray-900">{aanvraag.bedrijf}</div>
                <div className="text-xs text-gray-400">{aanvraag.ingediend}{aanvraag.opleiding ? ` · ${aanvraag.opleiding}` : ''}</div>
              </div>
              <div className="flex items-center gap-3">
                {statusBadge(aanvraag.status)}
                <span className="text-gray-400 text-sm">{openId === aanvraag.id ? '∧' : '∨'}</span>
              </div>
            </div>

            {openId === aanvraag.id && aanvraag.stagementor && (
              <div className="px-5 pb-5 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Bedrijf</div>
                    <div className="text-sm font-medium">{aanvraag.bedrijf}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Stagementor</div>
                    <div className="text-sm font-medium">{aanvraag.stagementor}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Begeleider EhB</div>
                    <div className="text-sm font-medium">{aanvraag.begeleider}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Startdatum</div>
                    <div className="text-sm font-medium">{aanvraag.startdatum}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Einddatum</div>
                    <div className="text-sm font-medium">{aanvraag.einddatum}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Duur</div>
                    <div className="text-sm font-medium">{aanvraag.duur}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}