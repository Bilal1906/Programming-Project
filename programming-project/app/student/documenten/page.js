'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Topbar from '../component/topbar'
import { fetchMetAuth } from '@/app/lib/fetchMetAuth'

export default function Documenten() {
  const router = useRouter()
  const [documenten, setDocumenten] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMetAuth('/api/student/documenten')
      .then(res => res?.json())
      .then(data => {
        setDocumenten(data ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex-1 flex items-center justify-center bg-gray-100"><div className="text-sm text-gray-400">Laden...</div></div>

  return (
    <div className="flex-1 flex flex-col">
      <Topbar titel="Documenten" subtitel="Stageovereenkomsten & bijlagen · Proximus NV" />
      <div className="flex-1 bg-gray-100 p-6 space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0"></div>
          <p className="text-sm text-yellow-800">Zorg dat alle vereiste documenten tijdig worden ingediend.</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-4">
            <div className="bg-white rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Mijn documenten</h2>
              {documenten.length === 0 ? (
                <p className="text-sm text-gray-400">Geen documenten gevonden.</p>
              ) : (
                <div className="space-y-3">
                  {documenten.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0"><span className="text-white text-xs">📄</span></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{doc.bestandsnaam}</div>
                          <div className="text-xs text-gray-400">Geüpload door {doc.uploader_voornaam} {doc.uploader_achternaam} · {new Date(doc.uploaded_op).toLocaleDateString('nl-BE')} · {doc.bestandsgrootte_kb} KB</div>
                        </div>
                      </div>
                      <button className="text-xs px-3 py-1 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer">↓ Download</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Nieuw document uploaden</h2>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 cursor-pointer">
                <div className="text-3xl mb-2">☁️</div>
                <div className="text-sm font-medium text-gray-700 mb-1">Sleep een bestand hierheen of klik om te bladeren</div>
                <div className="text-xs text-gray-400">PDF, DOCX · max 10MB</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 h-fit">
            <h2 className="text-sm font-semibold text-gray-800 mb-3">Info</h2>
            <p className="text-xs text-gray-500 leading-relaxed">Upload hier alle documenten die nodig zijn voor je stage. Zorg dat de stageovereenkomst correct ondertekend is door alle partijen.</p>
          </div>
        </div>
      </div>
    </div>
  )
}