'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Topbar from '../component/topbar'

const statusBadge = (status) => {
  const stijlen = {
    goedgekeurd: 'bg-green-50 text-green-700 border border-green-200',
    ingediend: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    aanpassingen: 'bg-orange-50 text-orange-700 border border-orange-200',
    afgekeurd: 'bg-red-50 text-red-700 border border-red-200',
    concept: 'bg-gray-100 text-gray-600 border border-gray-200',
    actief: 'bg-blue-50 text-blue-700 border border-blue-200',
  }
  const labels = {
    goedgekeurd: '✓ Goedgekeurd',
    ingediend: 'In behandeling',
    aanpassingen: 'Aanpassingen nodig',
    afgekeurd: 'Afgekeurd',
    concept: 'Concept',
    actief: 'Actief',
  }
  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${stijlen[status] || stijlen.concept}`}>
      {labels[status] || status}
    </span>
  )
}

export default function StageAanvragen() {
  const router = useRouter()
  const [aanvragen, setAanvragen] = useState([])
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState(null)

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || localStorage.getItem('token')

    if (!token) {
      router.push('/authentificator/login')
      return
    }

    fetch('/api/student/stage', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setAanvragen(data)
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
      <Topbar
        titel="Mijn stageaanvragen"
        subtitel="Dashboard · Stageaanvragen"
        rechts={
          <button
            onClick={() => router.push('/student/stage/nieuw')}
            className="px-4 py-2 bg-[#1e3a5f] text-white text-sm rounded-lg hover:bg-[#162d4a] cursor-pointer font-medium"
          >
            Nieuwe aanvraag
          </button>
        }
      />

      <div className="flex-1 bg-gray-100 p-6 space-y-3">
        {aanvragen.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-sm text-gray-400">Geen stageaanvragen gevonden.</p>
            <button
              onClick={() => router.push('/student/stage/nieuw')}
              className="mt-4 px-4 py-2 bg-[#1e3a5f] text-white text-sm rounded-lg cursor-pointer"
            >
              Eerste aanvraag indienen
            </button>
          </div>
        ) : (
          aanvragen.map((aanvraag) => (
            <div key={aanvraag.id} className="bg-white rounded-xl overflow-hidden">
              <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer"
                onClick={() => setOpenId(openId === aanvraag.id ? null : aanvraag.id)}
              >
                <div>
                  <div className="font-semibold text-sm text-gray-900">{aanvraag.bedrijf_naam}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(aanvraag.startdatum).toLocaleDateString('nl-BE')} · Toegepaste Informatica
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {statusBadge(aanvraag.status)}
                  <span className="text-gray-400 text-sm">{openId === aanvraag.id ? '∧' : '∨'}</span>
                </div>
              </div>

              {openId === aanvraag.id && (
                <div className="px-5 pb-5 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Bedrijf</div>
                      <div className="text-sm font-medium">{aanvraag.bedrijf_naam}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Stagementor</div>
                      <div className="text-sm font-medium">{aanvraag.mentor_voornaam} {aanvraag.mentor_achternaam}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Begeleider EhB</div>
                      <div className="text-sm font-medium">{aanvraag.docent_voornaam} {aanvraag.docent_achternaam}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Startdatum</div>
                      <div className="text-sm font-medium">{new Date(aanvraag.startdatum).toLocaleDateString('nl-BE')}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Einddatum</div>
                      <div className="text-sm font-medium">{new Date(aanvraag.einddatum).toLocaleDateString('nl-BE')}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Status</div>
                      <div className="text-sm font-medium">{aanvraag.status}</div>
                    </div>
                  </div>
                  {aanvraag.feedback_commissie && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                      <strong>Feedback:</strong> {aanvraag.feedback_commissie}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}