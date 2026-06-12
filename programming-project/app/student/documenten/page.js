'use client'

import Topbar from '../component/topbar'

export default function Documenten() {
  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Documenten"
        subtitel="Stageovereenkomsten & bijlagen · Proximus NV"
      />
      <div className="flex-1 bg-gray-100 p-6">
        <p className="text-gray-400 text-sm">Inhoud komt hier.</p>
      </div>
    </div>
  )
}