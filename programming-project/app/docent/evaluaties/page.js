'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DocentTopbar from '../component/topbar'

const statusBadge = (status) => {
  const stijlen = {
    voltooid: 'bg-green-50 text-green-700 border border-green-200',
    open: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    ingevuld: 'bg-blue-50 text-blue-700 border border-blue-200',
    mentor_beoordeelt: 'bg-orange-50 text-orange-700 border border-orange-200',
  }
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${stijlen[status] || stijlen.open}`}>
      {status}
    </span>
  )
}

export default function DocentEvaluaties() {
  const router = useRouter()
  const [evaluaties, setEvaluaties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || localStorage.getItem('token')

    if (!token) {
      router.push('/authentificator/login')
      return
    }

    fetch('/api/docent/evaluaties', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setEvaluaties(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-sm text-gray-400">Laden...</div>
      </div>
    )
  }

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
          {evaluaties.length === 0 ? (
            <p className="text-sm text-gray-400">Geen evaluaties gevonden.</p>
          ) : (
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
                  <tr key={e.id} className="border-b border-gray-50">
                    <td className="text-sm text-gray-800 py-3">{e.student_voornaam} {e.student_achternaam}</td>
                    <td className="text-sm text-gray-600 py-3">
                      {e.datum ? new Date(e.datum).toLocaleDateString('nl-BE') : '-'}
                    </td>
                    <td className="text-sm text-gray-600 py-3">{e.type}</td>
                    <td className="py-3">{statusBadge(e.status)}</td>
                    <td className="py-3">
                      <button className="px-3 py-1.5 bg-[#1e3a5f] text-white text-xs rounded-lg cursor-pointer">
                        {e.status === 'open' ? 'Invullen' : 'Bekijken'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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