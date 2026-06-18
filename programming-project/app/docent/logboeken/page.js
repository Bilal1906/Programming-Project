'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DocentTopbar from '../component/topbar'
import { fetchMetAuth } from '@/app/lib/fetchMetAuth'

export default function DocentLogboeken() {
  const router = useRouter()
  const [logboeken, setLogboeken] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMetAuth('/api/docent/logboeken')
      .then(res => res?.json())
      .then(data => {
        setLogboeken(data ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex-1 flex items-center justify-center bg-gray-100"><div className="text-sm text-gray-400">Laden...</div></div>

  return (
    <div className="flex-1 flex flex-col">
      <DocentTopbar titel="Logboeken" subtitel="2025-2026 · Erasmushogeschool Brussel" />
      <div className="flex-1 bg-gray-100 p-6 space-y-4">
        <div className="bg-white rounded-xl p-5">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Logboeken</h2>
          <p className="text-sm text-gray-400">Overzicht van alle logboeken</p>
        </div>
        <div className="bg-white rounded-xl p-5">
          {logboeken.length === 0 ? (
            <p className="text-sm text-gray-400">Geen logboeken gevonden.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Student</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Week</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Periode</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Uren</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Actie</th>
                </tr>
              </thead>
              <tbody>
                {logboeken.map((l) => (
                  <tr key={l.id} className="border-b border-gray-50">
                    <td className="text-sm text-gray-800 py-3">{l.student_voornaam} {l.student_achternaam}</td>
                    <td className="text-sm text-gray-600 py-3">Week {l.week_nummer}</td>
                    <td className="text-sm text-gray-600 py-3">{new Date(l.datum_van).toLocaleDateString('nl-BE')} - {new Date(l.datum_tot).toLocaleDateString('nl-BE')}</td>
                    <td className="text-sm text-gray-600 py-3">{l.totaal_uren}u</td>
                    <td className="py-3"><span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">{l.status}</span></td>
                    <td className="py-3"><button className="px-3 py-1.5 bg-[#1e3a5f] text-white text-xs rounded-lg cursor-pointer">Bekijken</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="bg-white rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">Opmerking</h2>
          <p className="text-sm text-gray-500">Docenten bekijken logboeken enkel ter opvolging. De stagementor controleert wekelijks.</p>
        </div>
      </div>
    </div>
  )
}