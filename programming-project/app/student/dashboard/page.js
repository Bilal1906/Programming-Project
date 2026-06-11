'use client'

import Topbar from '../component/topbar'

export default function StudentDashboardActief() {
  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Dashboard"
        subtitel="Welkom terug, Bilal 👋"
      />
      <div className="flex-1 bg-gray-100 p-6 space-y-4">

        {/* Bovenste kaarten */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-1">Logboeken deze week</div>
            <div className="text-3xl font-bold text-gray-900">2/5</div>
            <div className="text-xs text-gray-400 mt-1">Ma & Di ingevuld</div>
          </div>
          <div className="bg-white rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Tussentijdse evaluatie</div>
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 font-medium">
              In behandeling
            </span>
            <div className="text-xs text-gray-400 mt-2">Steve Weemaels beoordeelt</div>
          </div>
        </div>

        {/* Mijn stage */}
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Mijn stage — Proximus NV</h2>
              <p className="text-xs text-gray-400">Stagementor: Steve Weemaels · Begeleider EhB: Joachim Quartier</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium">
              Goedgekeurd
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-xs text-gray-400 mb-1">Bedrijf</div>
              <div className="text-sm font-medium">Proximus NV</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Startdatum</div>
              <div className="text-sm font-medium">3 februari 2025</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Einddatum</div>
              <div className="text-sm font-medium">23 mei 2025</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Stagementor</div>
              <div className="text-sm font-medium">Steve Weemaels</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Begeleider EhB</div>
              <div className="text-sm font-medium">Joachim Quartier</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Duur</div>
              <div className="text-sm font-medium">16 weken · 560u</div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Voortgang stage</span>
            <span className="text-xs font-semibold text-blue-600">44% — week 7 van 16</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-[#1e3a5f] h-2 rounded-full" style={{ width: '44%' }} />
          </div>
        </div>

      </div>
    </div>
  )
}