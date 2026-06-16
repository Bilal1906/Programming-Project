'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Topbar from '../component/topbar'
import { fetchMetAuth } from '@/app/lib/fetchMetAuth'

export default function Logboeken() {
  const router = useRouter()
  const [logboeken, setLogboeken] = useState([])
  const [loading, setLoading] = useState(true)
  const [week, setWeek] = useState(1)

  useEffect(() => {
    fetchMetAuth('/api/student/logboeken')
      .then(res => res?.json())
      .then(data => {
        setLogboeken(data ?? [])
        if (data?.length > 0) setWeek(data[data.length - 1].week_nummer)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const huidigLogboek = logboeken.find(l => l.week_nummer === week)

  if (loading) return <div className="flex-1 flex items-center justify-center bg-gray-100"><div className="text-sm text-gray-400">Laden...</div></div>

  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Logboeken"
        subtitel={`Proximus NV · Week ${week} van 16`}
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
              Week {week} — {huidigLogboek ? `${new Date(huidigLogboek.datum_van).toLocaleDateString('nl-BE')} t/m ${new Date(huidigLogboek.datum_tot).toLocaleDateString('nl-BE')}` : 'Geen data'}
            </div>
            <div className="text-xs text-gray-400">Wekelijks afgecheckt door stagementor</div>
          </div>
          <div className="flex items-center gap-2">
            {huidigLogboek?.status === 'ingediend' && (
              <span className="text-xs px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">Wacht op afcheck mentor</span>
            )}
            <button onClick={() => setWeek(w => Math.min(16, w + 1))} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer">›</button>
          </div>
        </div>

        {!huidigLogboek ? (
          <div className="bg-white rounded-xl p-8 text-center"><p className="text-sm text-gray-400">Geen logboek voor week {week}.</p></div>
        ) : (
          <div className="bg-white rounded-xl p-5">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div><div className="text-xs text-gray-400 mb-1">Totaal uren</div><div className="text-sm font-bold text-yellow-600">{huidigLogboek.totaal_uren} / 40u</div></div>
              <div><div className="text-xs text-gray-400 mb-1">Status week</div><div className="text-sm font-bold text-gray-900">{huidigLogboek.status}</div></div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-gray-800">Week indienen bij stagementor</div>
                <div className="text-xs text-gray-400">Alle 5 dagen moeten ingevuld zijn en minimaal 40u gelogd.</div>
              </div>
              <button className={`px-4 py-2 text-sm rounded-lg font-medium ${huidigLogboek.status === 'onvolledig' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#1e3a5f] text-white cursor-pointer'}`}>
                Week indienen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}