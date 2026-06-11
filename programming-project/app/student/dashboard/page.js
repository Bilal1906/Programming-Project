'use client'

import Topbar from '../component/topbar'

export default function StudentDashboardActief() {
  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Dashboard"
        subtitel="Welkom terug, Bilal 👋"
      />
      <div className="flex-1 bg-gray-100 p-6">
        <p className="text-gray-400 text-sm">Inhoud komt hier.</p>
      </div>
    </div>
  )
}