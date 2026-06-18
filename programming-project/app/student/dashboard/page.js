'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Topbar from '../component/topbar'
import { fetchMetAuth } from '@/app/lib/fetchMetAuth'

export default function StudentDashboardActief() {
  const router = useRouter()
  const [stage, setStage] = useState(null)
  const [logboeken, setLogboeken] = useState([])
  const [gebruiker, setGebruiker] = useState(null)
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

  const payload = JSON.parse(atob(token.split('.')[1]))
  setGebruiker(payload)

  Promise.all([
    fetchMetAuth('/api/student/stage').then(r => r?.json()),
    fetchMetAuth('/api/student/logboeken').then(r => r?.json()),
  ]).then(([stageData, logboekenData]) => {
    const actieveStage = stageData?.find(s => s.status === 'actief')
    if (!actieveStage) {
      router.push('/student/dashboard-first')
      return
    }
    setStage(actieveStage)
    setLogboeken(logboekenData ?? [])
    setLoading(false)
  }).catch(() => setLoading(false))
}, [])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-sm text-gray-400">Laden...</div>
      </div>
    )
  }

  const voortgang = stage ? Math.min(100, Math.round(
    (new Date() - new Date(stage.startdatum)) /
    (new Date(stage.einddatum) - new Date(stage.startdatum)) * 100
  )) : 0

  const huidigWeek = logboeken.length > 0 ? logboeken[logboeken.length - 1] : null
  const ingevuldeDagen = huidigWeek ? Math.min(5, Math.round(huidigWeek.totaal_uren / 8)) : 0

  return (
    <div className="flex-1 flex flex-col">
      <Topbar titel="Dashboard" subtitel={`Welkom terug, ${gebruiker?.voornaam ?? 'Student'} 👋`} />
      <div className="flex-1 bg-gray-100 p-6 space-y-4">

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-1">Logboeken deze week</div>
            <div className="text-3xl font-bold text-gray-900">{ingevuldeDagen}/5</div>
            <div className="text-xs text-gray-400 mt-1">{ingevuldeDagen} dag{ingevuldeDagen !== 1 ? 'en' : ''} ingevuld</div>
          </div>
          <div className="bg-white rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Stage status</div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              stage?.status === 'actief' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
            }`}>
              {stage?.status ?? 'Onbekend'}
            </span>
          </div>
        </div>

        {stage && (
          <div className="bg-white rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Mijn stage — {stage.bedrijf_naam}</h2>
                <p className="text-xs text-gray-400">Stagementor: {stage.mentor_voornaam} {stage.mentor_achternaam} · Begeleider EhB: {stage.docent_voornaam} {stage.docent_achternaam}</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium">Goedgekeurd</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div><div className="text-xs text-gray-400 mb-1">Bedrijf</div><div className="text-sm font-medium">{stage.bedrijf_naam}</div></div>
              <div><div className="text-xs text-gray-400 mb-1">Startdatum</div><div className="text-sm font-medium">{new Date(stage.startdatum).toLocaleDateString('nl-BE')}</div></div>
              <div><div className="text-xs text-gray-400 mb-1">Einddatum</div><div className="text-sm font-medium">{new Date(stage.einddatum).toLocaleDateString('nl-BE')}</div></div>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Voortgang stage</span>
              <span className="text-xs font-semibold text-blue-600">{voortgang}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-[#1e3a5f] h-2 rounded-full" style={{ width: `${voortgang}%` }} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Logboek deze week</h2>
                <p className="text-xs text-gray-400">Week {huidigWeek?.week_nummer ?? '-'}</p>
              </div>
              <button onClick={() => router.push('/student/logboeken')} className="px-3 py-1.5 bg-[#1e3a5f] text-white text-xs rounded-lg cursor-pointer font-medium">
                📋 Logboek invullen
              </button>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="w-full bg-gray-100 rounded-full h-1.5 mr-3">
                <div className="bg-[#1e3a5f] h-1.5 rounded-full" style={{ width: `${Math.min(100, ((huidigWeek?.totaal_uren ?? 0) / 40) * 100)}%` }} />
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">{huidigWeek?.totaal_uren ?? 0}u / 40u</span>
            </div>
            <div className="flex gap-2 mb-4">
              {['Ma', 'Di', 'Wo', 'Do', 'Vr'].map((dag, i) => (
                <div key={dag} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${i < ingevuldeDagen ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                  {dag}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Milestones</h2>
            <div className="space-y-3">
              {[
                { label: 'Stageaanvraag ingediend', voltooid: true },
                { label: 'Goedgekeurd door admin', voltooid: stage?.status !== 'ingediend' },
                { label: 'Stage gestart', voltooid: stage?.status === 'actief' },
                { label: 'Tussentijdse evaluatie afgerond', voltooid: false },
                { label: 'Eindpresentatie', voltooid: false },
              ].map((milestone) => (
                <div key={milestone.label} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${milestone.voltooid ? 'bg-green-500' : 'bg-gray-200'}`}>
                    {milestone.voltooid && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`text-sm ${milestone.voltooid ? 'text-gray-800' : 'text-gray-400'}`}>{milestone.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}