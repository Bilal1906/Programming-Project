'use client'

import { useRouter } from 'next/navigation'
import DocentTopbar from '../component/topbar'

const studenten = [
  { naam: 'Bilal Jaaboub', bedrijf: 'Cronos', mentor: 'Steve Weemaels' },
  { naam: 'Nassim El Ghzaoui', bedrijf: 'Cegeka', mentor: 'David Van Steertegem' },
  { naam: 'Yagiz Biçer', bedrijf: 'AE', mentor: 'Steve Weemaels' },
  { naam: 'Syrine Benamar', bedrijf: 'Delaware', mentor: 'David Van Steertegem' },
  { naam: 'Soufiane Jay-Yufi', bedrijf: 'Inetum', mentor: 'Steve Weemaels' },
]

export default function DocentDashboard() {
  const router = useRouter()

  return (
    <div className="flex-1 flex flex-col">
      <DocentTopbar
        titel="Dashboard"
        subtitel="2025-2026 · Erasmushogeschool Brussel"
      />
      <div className="flex-1 bg-gray-100 p-6 space-y-4">

        {/* Welkom */}
        <div className="bg-white rounded-xl p-5">
          <h2 className="text-lg font-bold text-gray-900">Welkom terug, Joachim 👋</h2>
          <p className="text-sm text-gray-400">Je begeleidt momenteel 5 studenten.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5">
            <div className="text-3xl font-bold text-gray-900">5</div>
            <div className="text-xs text-gray-400 mt-1">Actieve Studenten</div>
          </div>
          <div className="bg-white rounded-xl p-5">
            <div className="text-3xl font-bold text-gray-900">2</div>
            <div className="text-xs text-gray-400 mt-1">Nieuwe Logboeken</div>
          </div>
          <div className="bg-white rounded-xl p-5">
            <div className="text-3xl font-bold text-gray-900">1</div>
            <div className="text-xs text-gray-400 mt-1">Open Evaluaties</div>
          </div>
        </div>

        {/* Studenten tabel */}
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Studenten</h2>
            <input
              type="text"
              placeholder="Zoek student..."
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Student</th>
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Bedrijf</th>
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Mentor</th>
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Actie</th>
              </tr>
            </thead>
            <tbody>
              {studenten.map((s) => (
                <tr key={s.naam} className="border-b border-gray-50">
                  <td className="text-sm text-gray-800 py-3">{s.naam}</td>
                  <td className="text-sm text-gray-600 py-3">{s.bedrijf}</td>
                  <td className="text-sm text-gray-600 py-3">{s.mentor}</td>
                  <td className="py-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">Actief</span>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => router.push('/docent/studenten')}
                      className="px-3 py-1.5 bg-[#1e3a5f] text-white text-xs rounded-lg cursor-pointer"
                    >
                      Bekijken
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}