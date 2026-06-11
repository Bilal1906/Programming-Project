'use client'

import { useState } from 'react'
import Topbar from '../component/topbar'

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
          <button
            onClick={() => setWeek(w => Math.min(16, w + 1))}
            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer"
          >
            ›
          </button>
        </div>

      </div>
    </div>
  )
}