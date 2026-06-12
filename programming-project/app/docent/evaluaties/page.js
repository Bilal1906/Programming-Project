'use client'

import DocentTopbar from '../component/topbar'

const evaluaties = [
  { student: 'Bilal Jaaboub', datum: '15/03/2025', type: 'Tussentijds', status: 'voltooid' },
  { student: 'Nassim El Ghzaoui', datum: '20/03/2025', type: 'Tussentijds', status: 'voltooid' },
  { student: 'Yagiz Biçer', datum: '-', type: 'Tussentijds', status: 'open' },
  { student: 'Syrine Benamar', datum: '18/03/2025', type: 'Tussentijds', status: 'voltooid' },
  { student: 'Soufiane Jay-Yufi', datum: '-', type: 'Tussentijds', status: 'open' },
]

const statusBadge = (status) => {
  const stijlen = {
    voltooid: 'bg-green-50 text-green-700 border border-green-200',
    open: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  }
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${stijlen[status]}`}>
      {status === 'voltooid' ? 'Voltooid' : 'Open'}
    </span>
  )
}

export default function DocentEvaluaties() {
  return (
    <div className="flex-1 flex flex-col">
      <DocentTopbar
        titel="Evaluaties"
        subtitel="2025-2026 · Erasmushogeschool Brussel"
      />
      <div className="flex-1 bg-gray-100 p-6 space-y-4">

        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Evaluaties</h2>
              <p className="text-sm text-gray-400">Overzicht van tussentijdse evaluaties</p>
            </div>
            <button className="px-4 py-2 bg-[#1e3a5f] text-white text-sm rounded-lg cursor-pointer font-medium">
              Nieuwe Evaluatie
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Student</th>
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Datum</th>
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Type</th>
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Actie</th>
              </tr>
            </thead>
            <tbody>
              {evaluaties.map((e) => (
                <tr key={e.student} className="border-b border-gray-50">
                  <td className="text-sm text-gray-800 py-3">{e.student}</td>
                  <td className="text-sm text-gray-600 py-3">{e.datum}</td>
                  <td className="text-sm text-gray-600 py-3">{e.type}</td>
                  <td className="py-3">{statusBadge(e.status)}</td>
                  <td className="py-3">
                    <button className={`px-3 py-1.5 text-white text-xs rounded-lg cursor-pointer ${
                      e.status === 'open' ? 'bg-[#1e3a5f]' : 'bg-[#1e3a5f]'
                    }`}>
                      {e.status === 'open' ? 'Invullen' : 'Bekijken'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">Evaluatieproces</h2>
          <p className="text-sm text-gray-500">
            De docent kan tussentijdse evaluaties registreren om de voortgang van studenten op te volgen. Evaluaties worden gekoppeld aan competenties en bevatten scores en feedback. Competenties blijven flexibel zodat de opleiding deze later kan aanpassen.
          </p>
        </div>

      </div>
    </div>
  )
}