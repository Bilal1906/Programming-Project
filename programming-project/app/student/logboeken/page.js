'use client'

import Topbar from '../component/topbar'

export default function Logboeken() {
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
      <div className="flex-1 bg-gray-100 p-6">
        <p className="text-gray-400 text-sm">Inhoud komt hier.</p>
      </div>
    </div>
  )
}