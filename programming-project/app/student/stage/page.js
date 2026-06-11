'use client'

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
          <div key={aanvraag.id} className="bg-white rounded-xl px-5 py-4 flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm text-gray-900">{aanvraag.bedrijf}</div>
              <div className="text-xs text-gray-400">{aanvraag.ingediend}{aanvraag.opleiding ? ` · ${aanvraag.opleiding}` : ''}</div>
            </div>
            {statusBadge(aanvraag.status)}
          </div>
        ))}
      </div>
    </div>
  )
}