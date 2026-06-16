'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Topbar from '../component/topbar'
import { fetchMetAuth } from '@/app/lib/fetchMetAuth'

export default function Evaluaties() {
  const router = useRouter()
  const [evaluaties, setEvaluaties] = useState([])
  const [loading, setLoading] = useState(true)
  const [actieveTab, setActieveTab] = useState('tussentijds')

  useEffect(() => {
    fetchMetAuth('/api/student/evaluaties')
      .then(res => res?.json())
      .then(data => {
        setEvaluaties(data ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const tussentijdseEvaluaties = evaluaties.filter(e => e.type === 'tussentijds')
  const finaleEvaluaties = evaluaties.filter(e => e.type === 'finaal')

  if (loading) return <div className="flex-1 flex items-center justify-center bg-gray-100"><div className="text-sm text-gray-400">Laden...</div></div>

  return (
    <div className="flex-1 flex flex-col">
      <Topbar titel="Evaluaties" subtitel="Proximus NV" />
      <div className="flex-1 bg-gray-100 p-6">
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {[{ id: 'tussentijds', label: 'Tussentijds' }, { id: 'finaal', label: 'Finaal' }].map((tab) => (
            <button key={tab.id} onClick={() => setActieveTab(tab.id)} className={`pb-3 text-sm font-medium border-b-2 cursor-pointer ${actieveTab === tab.id ? 'border-[#1e3a5f] text-[#1e3a5f]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {actieveTab === 'tussentijds' && (
          tussentijdseEvaluaties.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center"><p className="text-sm text-gray-400">Geen tussentijdse evaluatie gevonden.</p></div>
          ) : (
            tussentijdseEvaluaties.map((e) => (
              <div key={e.id} className="bg-white rounded-xl p-5 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-800">Tussentijdse evaluatie — Week {e.week_nummer}</h2>
                    <p className="text-xs text-gray-400">{e.datum ? new Date(e.datum).toLocaleDateString('nl-BE') : '-'}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${e.status === 'voltooid' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>{e.status}</span>
                </div>
                {e.algemene_feedback_docent && (
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">Feedback docent</h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-600">{e.algemene_feedback_docent}</div>
                  </div>
                )}
                <div>
                  <h3 className="text-xs font-semibold text-gray-600 mb-2">Zelfreflectie</h3>
                  <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 h-24 resize-none" placeholder="schrijf hier..." defaultValue={e.algemene_zelfreflectie_student} />
                </div>
              </div>
            ))
          )
        )}

        {actieveTab === 'finaal' && (
          finaleEvaluaties.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center"><p className="text-sm text-gray-400">Geen finale evaluatie gevonden.</p></div>
          ) : (
            finaleEvaluaties.map((e) => (
              <div key={e.id} className="bg-white rounded-xl p-5 mb-4">
                <h2 className="text-sm font-semibold text-gray-800 mb-4">Finale evaluatie — Week {e.week_nummer}</h2>
                <div>
                  <h3 className="text-xs font-semibold text-gray-600 mb-2">Zelfreflectie</h3>
                  <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 h-24 resize-none" placeholder="schrijf hier..." defaultValue={e.algemene_zelfreflectie_student} />
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  )
}