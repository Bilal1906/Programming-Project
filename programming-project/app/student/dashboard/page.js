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

      </div>
    </div>
  )
}