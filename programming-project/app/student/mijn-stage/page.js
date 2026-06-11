'use client'

import Topbar from '../component/topbar'

export default function MijnStage() {
  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Mijn Stage"
        subtitel="Proximus NV · Toegepaste Informatica 3 · 2025-2026"
      />
      <div className="flex-1 bg-gray-100 p-6">
        <p className="text-gray-400 text-sm">Inhoud komt hier.</p>
      </div>
    </div>
  )
}