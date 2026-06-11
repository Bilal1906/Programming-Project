'use client'

import Topbar from '../component/topbar'

const stage = {
  bedrijf: 'Proximus NV',
  startdatum: '3 feb 2025',
  einddatum: '23 mei 2025',
  aantalWeken: 16,
  huidigeWeek: 7,
  voortgang: 44,
}

export default function MijnStage() {
  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Mijn Stage"
        subtitel="Proximus NV · Toegepaste Informatica 3 · 2025-2026"
      />
      <div className="flex-1 bg-gray-100 p-6">

        {/* Voortgang */}
        <div className="bg-white rounded-xl p-5 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-800">Voortgang stage</span>
            <span className="text-sm font-semibold text-blue-600">{stage.voortgang}% — week {stage.huidigeWeek} van {stage.aantalWeken}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div
              className="bg-[#1e3a5f] h-2 rounded-full"
              style={{ width: `${stage.voortgang}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{stage.startdatum}</span>
            <span>{stage.einddatum}</span>
          </div>
        </div>

      </div>
    </div>
  )
}