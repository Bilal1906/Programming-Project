'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Topbar from '../component/topbar'
import { fetchMetAuth } from '@/app/lib/fetchMetAuth'

export default function StagementorEvaluaties() {
  const router = useRouter()
  const [evaluaties, setEvaluaties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMetAuth('/api/stagementor/evaluaties')
      .then(r => r?.json())
      .then(data => {
        setEvaluaties(data ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex-1 flex items-center justify-center bg-gray-100"><div className="text-sm text-gray-400">Laden...</div></div>

  const statusBadge = (status) => {
    const map = {
      open: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      ingevuld: 'bg-blue-50 text-blue-700 border-blue-200',
      mentor_beoordeelt: 'bg-orange-50 text-orange-700 border-orange-200',
      voltooid: 'bg-green-50 text-green-700 border-green-200',
    }
    const labels = {
      open: 'Open',
      ingevuld: 'Ingevuld',
      mentor_beoordeelt: 'Mentor beoordeelt',
      voltooid: 'Voltooid',
    }
    return <span className={`text-xs px-2 py-1 rounded-full font-medium border ${map[status] || map.open}`}>{labels[status] || status}</span>
  }

  return (
    <div className="flex-1 flex flex-col">
      <Topbar titel="Evaluaties" subtitel="2025-2026 · Erasmushogeschool Brussel" />
      <div className="flex-1 bg-gray-100 p-6 space-y-4">
        <div className="bg-white rounded-xl p-5">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Evaluaties</h2>
          <p className="text-sm text-gray-400">Beoordeel de competenties van je stagiair(s)</p>
        </div>

        <div className="bg-white rounded-xl p-5">
          {evaluaties.length === 0 ? (
            <p className="text-sm text-gray-400">Geen evaluaties gevonden.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Student</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Deadline</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Type</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Actie</th>
                </tr>
              </thead>
              <tbody>
                {evaluaties.map(e => (
                  <tr key={e.id} className="border-b border-gray-50">
                    <td className="text-sm text-gray-800 py-3">{e.student_voornaam} {e.student_achternaam}</td>
                    <td className="text-sm text-gray-600 py-3">{e.datum ? new Date(e.datum + 'T12:00:00').toLocaleDateString('nl-BE') : '—'}</td>
                    <td className="text-sm text-gray-600 py-3 capitalize">{e.type}</td>
                    <td className="py-3">{statusBadge(e.status)}</td>
                    <td className="py-3">
                      <button
                        onClick={() => router.push(`/stagementor/evaluaties/${e.id}`)}
                        className="px-3 py-1.5 bg-[#1e3a5f] text-white text-xs rounded-lg cursor-pointer"
                      >
                        {e.status === 'open' ? 'Invullen' : 'Bekijken'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}