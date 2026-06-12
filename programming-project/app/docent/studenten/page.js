'use client'

import { useRouter } from 'next/navigation'
import DocentTopbar from '../component/topbar'

const studenten = [
  { naam: 'Bilal Jaaboub', email: 'bilal@student.ehb.be', telefoon: '0470 00 00 01', bedrijf: 'Cronos', mentor: 'Steve Weemaels' },
  { naam: 'Nassim El Ghzaoui', email: 'nassim@student.ehb.be', telefoon: '0470 00 00 02', bedrijf: 'Cegeka', mentor: 'David Van Steertegem' },
  { naam: 'Yagiz Biçer', email: 'yagiz@student.ehb.be', telefoon: '0470 00 00 03', bedrijf: 'AE', mentor: 'Steve Weemaels' },
  { naam: 'Syrine Benamar', email: 'syrine@student.ehb.be', telefoon: '0470 00 00 04', bedrijf: 'Delaware', mentor: 'David Van Steertegem' },
  { naam: 'Soufiane Jay-Yufi', email: 'soufiane@student.ehb.be', telefoon: '0470 00 00 05', bedrijf: 'Inetum', mentor: 'Steve Weemaels' },
]

export default function DocentStudenten() {
  const router = useRouter()

  return (
    <div className="flex-1 flex flex-col">
      <DocentTopbar
        titel="Studenten"
        subtitel="2025-2026 · Erasmushogeschool Brussel"
      />
      <div className="flex-1 bg-gray-100 p-6">

        <div className="bg-white rounded-xl p-5 mb-4">
          <h2 className="text-xl font-bold text-gray-900">5 Studenten</h2>
          <p className="text-sm text-gray-400">Bekijk contactgegevens, stagebedrijven, mentoren en stage-informatie.</p>
        </div>

        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Studentenlijst</h2>
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
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">E-mail</th>
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Telefoon</th>
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
                  <td className="text-sm text-gray-600 py-3">{s.email}</td>
                  <td className="text-sm text-gray-600 py-3">{s.telefoon}</td>
                  <td className="text-sm text-gray-600 py-3">{s.bedrijf}</td>
                  <td className="text-sm text-gray-600 py-3">{s.mentor}</td>
                  <td className="py-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">Actief</span>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => router.push('/docent/studenten/bilal')}
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