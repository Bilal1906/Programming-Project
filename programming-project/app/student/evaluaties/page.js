'use client'

import Topbar from '../component/topbar'

export default function Evaluaties() {
  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Evaluaties"
        subtitel="Proximus NV · Tussentijdse evaluatie — Week 7"
      />
      <div className="flex-1 bg-gray-100 p-6">
        <p className="text-gray-400 text-sm">Inhoud komt hier.</p>
      </div>
    </div>
  )
}