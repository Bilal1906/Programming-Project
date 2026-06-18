'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Topbar from '../component/topbar'
import { fetchMetAuth } from '@/app/lib/fetchMetAuth'

export default function Logboeken() {
  const router = useRouter()
  const [logboeken, setLogboeken] = useState([])
  const [stage, setStage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [week, setWeek] = useState(1)
  const [bezig, setBezig] = useState(false)

  useEffect(() => {
    Promise.all([
      fetchMetAuth('/api/student/logboeken').then(r => r?.json()),
      fetchMetAuth('/api/student/stage').then(r => r?.json()),
    ]).then(([logboekenData, stageData]) => {
      const logboeken = logboekenData ?? []
      setLogboeken(logboeken)
      if (logboeken.length > 0) setWeek(logboeken[logboeken.length - 1].week_nummer)
      const actief = stageData?.find(s => s.status === 'actief')
      if (actief) setStage(actief)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const huidigLogboek = logboeken.find(l => l.week_nummer === week)
  const aantalWeken = stage?.aantal_weken || 16

  const handleIndienen = async () => {
    if (!huidigLogboek) return
    if (!window.confirm('Week indienen bij stagementor?')) return
    setBezig(true)
    const response = await fetchMetAuth('/api/student/logboeken', {
      method: 'PUT',
      body: JSON.stringify({ logboek_week_id: huidigLogboek.id }),
    })
    if (!response) { setBezig(false); return }
    const data = await response.json()
    if (response.ok) {
      setLogboeken(prev => prev.map(l =>
        l.id === huidigLogboek.id ? { ...l, status: 'ingediend' } : l
      ))
      alert('Logboek ingediend!')
    } else {
      alert(data.fout || 'Er ging iets mis')
    }
    setBezig(false)
  }

  if (loading) return <div className="flex-1 flex items-center justify-center bg-gray-100"><div className="text-sm text-gray-400">Laden...</div></div>

  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Logboeken"
        subtitel={`${stage?.bedrijf_naam ?? 'Stage'} · Week ${week} van ${aantalWeken}`}
        rechts={
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600"><strong>{huidigLogboek?.totaal_uren ?? 0}u</strong> / 40u deze week</span>
            <button onClick={() => router.push('/student/logboeken/nieuw')} className="px-4 py-2 bg-[#1e3a5f] text-white text-sm rounded-lg cursor-pointer font-medium">Dag toevoegen</button>
          </div>
        }
      />
      <div className="flex-1 bg-gray-100 p-6 space-y-4">

        <div className="bg-white rounded-xl p-4 flex items-center justify-between">
          <button onClick={() => setWeek(w => Math.max(1, w - 1))} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer">‹</button>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900">
              Week {week} — {huidigLogboek
                ? `${new Date(huidigLogboek.datum_van).toLocaleDateString('nl-BE')} t/m ${new Date(huidigLogboek.datum_tot).toLocaleDateString('nl-BE')}`
                : 'Geen data'}
            </div>
            <div className="text-xs text-gray-400">Wekelijks afgecheckt door stagementor</div>
          </div>
          <div className="flex items-center gap-2">
            {huidigLogboek?.status === 'ingediend' && (
              <span className="text-xs px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">Wacht op afcheck mentor</span>
            )}
            {huidigLogboek?.status === 'goedgekeurd' && (
              <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">Goedgekeurd</span>
            )}
            <button onClick={() => setWeek(w => Math.min(aantalWeken, w + 1))} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer">›</button>
          </div>
        </div>

        {!huidigLogboek ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-sm text-gray-400">Geen logboek voor week {week}.</p>
            <button onClick={() => router.push('/student/logboeken/nieuw')} className="mt-4 px-4 py-2 bg-[#1e3a5f] text-white text-sm rounded-lg cursor-pointer font-medium">
              Logboek aanmaken voor week {week}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-5">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-400 mb-1">Totaal uren</div>
                <div className="text-sm font-bold text-yellow-600">{huidigLogboek.totaal_uren} / 40u</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Status week</div>
                <div className="text-sm font-bold text-gray-900">{huidigLogboek.status}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-gray-800">Week indienen bij stagementor</div>
                <div className="text-xs text-gray-400">Alle 5 dagen moeten ingevuld zijn en minimaal 40u gelogd.</div>
              </div>
              <button
                onClick={handleIndienen}
                disabled={bezig || huidigLogboek.status === 'ingediend' || huidigLogboek.status === 'goedgekeurd'}
                className={`px-4 py-2 text-sm rounded-lg font-medium ${
                  huidigLogboek.status === 'onvolledig'
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : huidigLogboek.status === 'ingediend' || huidigLogboek.status === 'goedgekeurd'
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#1e3a5f] text-white cursor-pointer'
                }`}
              >
                {huidigLogboek.status === 'ingediend' ? 'Ingediend' : huidigLogboek.status === 'goedgekeurd' ? 'Goedgekeurd' : 'Week indienen'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}