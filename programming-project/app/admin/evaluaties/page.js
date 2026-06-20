'use client'

import { useState, useEffect } from 'react'
import Topbar from '../component/topbar'
import { fetchMetAuth } from '@/app/lib/fetchMetAuth'
import { FileText } from 'lucide-react'

export default function AdminEvaluaties() {
  const [evaluaties, setEvaluaties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMetAuth('/api/admin/evaluaties')
      .then(r => r?.json())
      .then(data => {
        setEvaluaties(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handlePdf = (id) => {
    window.open(`/api/admin/evaluaties/${id}/pdf`, '_blank')
  }

  const statusBadge = (status) => {
    const map = {
      open: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      ingevuld: 'bg-blue-50 text-blue-700 border-blue-200',
      mentor_beoordeelt: 'bg-orange-50 text-orange-700 border-orange-200',
      voltooid: 'bg-green-50 text-green-700 border-green-200',
    }
    const labels = {
      open: 'Open', ingevuld: 'Ingevuld',
      mentor_beoordeelt: 'Mentor beoordeelt', voltooid: 'Voltooid',
    }
    return <span className={`text-xs px-2 py-1 rounded-full font-medium border ${map[status] || map.open}`}>{labels[status] || status}</span>
  }

  if (loading) return <div className="flex-1 flex items-center justify-center bg-gray-50"><div className="text-sm text-gray-400">Laden...</div></div>

  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Evaluaties" />
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Evaluaties</h2>
          <p className="text-sm text-gray-400">Overzicht van alle evaluaties — genereer eindoverzichten per student</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Student</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Type</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Deadline</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Status</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-400">Eindoverzicht</th>
              </tr>
            </thead>
            <tbody>
              {evaluaties.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-gray-400">Geen evaluaties gevonden.</td></tr>
              ) : (
                evaluaties.map(e => (
                  <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-gray-900">{e.student_voornaam} {e.student_achternaam}</td>
                    <td className="px-5 py-4 text-gray-600 capitalize">{e.type}</td>
                    <td className="px-5 py-4 text-gray-600">{e.datum ? new Date(e.datum + 'T12:00:00').toLocaleDateString('nl-BE') : '—'}</td>
                    <td className="px-5 py-4">{statusBadge(e.status)}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handlePdf(e.id)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1A2E4A] text-white text-xs rounded-lg hover:bg-[#152438] cursor-pointer"
                      >
                        <FileText size={14} />
                        PDF
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}