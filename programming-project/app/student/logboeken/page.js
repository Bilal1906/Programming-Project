'use client'

import { useState } from 'react'
import Topbar from '../component/topbar'

const dagen = [
  {
    naam: 'Maandag',
    datum: '2 juni',
    uren: 8,
    status: 'goedgekeurd',
    competenties: ['Technisch', 'Communicatie'],
  },
  {
    naam: 'Dinsdag',
    datum: '3 juni',
    uren: 8,
    status: 'goedgekeurd',
    competenties: ['Technisch', 'Kwaliteit werk'],
  },
  {
    naam: 'Woensdag',
    datum: '4 juni',
    uren: 0,
    status: 'vandaag',
    competenties: [],
  },
  {
    naam: 'Donderdag',
    datum: '5 juni',
    uren: 0,
    status: 'toekomst',
    competenties: [],
  },
  {
    naam: 'Vrijdag',
    datum: '6 juni',
    uren: 0,
    status: 'toekomst',
    competenties: [],
  },
]

export default function Logboeken() {
  const [week, setWeek] = useState(7)

  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Logboeken"
        subtitel="Proximus NV · Week 7 van 16"
        rechts={
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600"><strong>16u</strong> / 40u deze week</span>
            <button className="px-4 py-2 bg-[#1e3a5f] text-white text-sm rounded-lg cursor-pointer font-medium">
              Dag toevoegen
            </button>
          </div>
        }
      />
      <div className="flex-1 bg-gray-100 p-6 space-y-4">

        {/* Week navigator */}
        <div className="bg-white rounded-xl p-4 flex items-center justify-between">
          <button
            onClick={() => setWeek(w => Math.max(1, w - 1))}
            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer"
          >
            ‹
          </button>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900">Week {week} — 2 t/m 6 juni 2025</div>
            <div className="text-xs text-gray-400">Wekelijks afgecheckt door Steve Weemaels</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
              Wacht op afcheck mentor
            </span>
            <button
              onClick={() => setWeek(w => Math.min(16, w + 1))}
              className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer"
            >
              ›
            </button>
          </div>
        </div>

        {/* Dag kaarten */}
        <div className="grid grid-cols-5 gap-3">
          {dagen.map((dag) => (
            <div key={dag.naam} className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <div className="text-xs font-semibold text-gray-800">{dag.naam}</div>
                  <div className="text-xs text-gray-400">{dag.datum}</div>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  dag.status === 'goedgekeurd' ? 'bg-green-500' :
                  dag.status === 'vandaag' ? 'bg-blue-500' :
                  'bg-gray-200'
                }`} />
              </div>

              <div className="text-2xl font-bold text-gray-900 my-2">{dag.uren}u</div>

              {dag.status === 'goedgekeurd' && (
                <div className="space-y-1 mb-2">
                  {dag.competenties.map(c => (
                    <div key={c} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded">{c}</div>
                  ))}
                  <div className="text-xs text-green-600 font-medium mt-1">✓ Goedgekeurd</div>
                </div>
              )}

              {dag.status === 'vandaag' && (
                <div className="text-xs text-gray-400 mb-2">vandaag — nog open</div>
              )}

              {dag.status === 'toekomst' && (
                <div className="text-xs text-gray-300 mb-2">nog niet beschikbaar</div>
              )}

              {dag.status === 'vandaag' && (
                <button className="w-full border border-dashed border-gray-200 rounded-lg py-2 text-xs text-gray-400 hover:bg-gray-50 cursor-pointer">
                  + Dag invullen
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}