'use client'

import { useRouter } from 'next/navigation'
import DocentTopbar from '../component/topbar'

const weken = [
  { week: 'Week 1', periode: '03/02/2025 - 07/02/2025', uren: '40u', status: 'ingediend' },
  { week: 'Week 2', periode: '10/02/2025 - 14/02/2025', uren: '40u', status: 'ingediend' },
  { week: 'Week 3', periode: '17/02/2025 - 21/02/2025', uren: '40u', status: 'ingediend' },
  { week: 'Week 4', periode: '24/02/2025 - 28/02/2025', uren: '40u', status: 'ingediend' },
]

export default function DocentLogboeken() {
  const router = useRouter()

  return (
    <div className="flex-1 flex flex-col">
      <DocentTopbar
        titel="Logboeken"
        subtitel="2025-2026 · Erasmushogeschool Brussel"
      />
      <div className="flex-1 bg-gray-100 p-6 space-y-4">

        <div className="bg-white rounded-xl p-5">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Logboeken</h2>
          <p className="text-sm text-gray-400">Bilal Jaaboub</p>
        </div>

        <div className="bg-white rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Weekoverzicht</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Week</th>
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Periode</th>
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Uren</th>
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Actie</th>
              </tr>
            </thead>
            <tbody>
              {weken.map((w) => (
                <tr key={w.week} className="border-b border-gray-50">
                  <td className="text-sm text-gray-800 py-3">{w.week}</td>
                  <td className="text-sm text-gray-600 py-3">{w.periode}</td>
                  <td className="text-sm text-gray-600 py-3">{w.uren}</td>
                  <td className="py-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                      {w.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="px-3 py-1.5 bg-[#1e3a5f] text-white text-xs rounded-lg cursor-pointer">
                      Bekijken
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">Opmerking</h2>
          <p className="text-sm text-gray-500">
            Docenten bekijken logboeken enkel ter opvolging. Logboeken worden niet goedgekeurd door de docent. De student registreert dagelijks taken en competenties. De stagementor controleert wekelijks.
          </p>
        </div>

      </div>
    </div>
  )
}