'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import DocentTopbar from '../../component/topbar'
import { fetchMetAuth } from '@/app/lib/fetchMetAuth'

export default function DocentEvaluatieDetail() {
  const router = useRouter()
  const { id } = useParams()
  const [evaluatie, setEvaluatie] = useState(null)
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [bezig, setBezig] = useState(false)
  const [fout, setFout] = useState('')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    fetchMetAuth(`/api/docent/evaluaties/${id}`)
      .then(r => r?.json())
      .then(data => {
        if (data && !data.fout) {
          setEvaluatie(data.evaluatie)
          setScores(data.scores)
          setFeedback(data.evaluatie.algemene_feedback_docent || '')
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const handleOpslaan = async () => {
    setFout('')
    setBezig(true)

    const response = await fetchMetAuth('/api/docent/evaluaties', {
      method: 'PUT',
      body: JSON.stringify({
        evaluatie_id: parseInt(id),
        algemene_feedback: feedback,
        scores: scores.map(s => ({
          competentie_id: s.competentie_id,
          score_docent: s.score_docent !== '' && s.score_docent !== null ? parseFloat(s.score_docent) : null,
        }))
      })
    })

    if (!response) { setBezig(false); return }
    const data = await response.json()
    if (response.ok) {
      alert('Opgeslagen!')
      router.push('/docent/evaluaties')
    } else {
      setFout(data.fout || 'Er ging iets mis')
      setBezig(false)
    }
  }

  if (loading) return <div className="flex-1 flex items-center justify-center bg-gray-100"><div className="text-sm text-gray-400">Laden...</div></div>
  if (!evaluatie) return <div className="flex-1 flex items-center justify-center bg-gray-100"><div className="text-sm text-gray-400">Evaluatie niet gevonden.</div></div>

  return (
    <div className="flex-1 flex flex-col">
      <DocentTopbar
        titel={`Evaluatie — ${evaluatie.type}`}
        subtitel={`${evaluatie.student_voornaam} ${evaluatie.student_achternaam} · ${evaluatie.datum ? new Date(evaluatie.datum + 'T12:00:00').toLocaleDateString('nl-BE') : ''}`}
      />
      <div className="flex-1 bg-gray-100 p-6 space-y-4 overflow-y-auto">

        <div className="bg-white rounded-xl p-5">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Student</p>
              <p className="text-sm font-medium">{evaluatie.student_voornaam} {evaluatie.student_achternaam}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Bedrijf</p>
              <p className="text-sm font-medium">{evaluatie.bedrijf_naam}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Type</p>
              <p className="text-sm font-medium capitalize">{evaluatie.type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Status</p>
              <p className="text-sm font-medium">{evaluatie.status}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">Score per competentie</h2>
          <p className="text-xs text-gray-400 mb-4">Geef een score van 0 tot 10.</p>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-600 pb-3">Competentie</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3 w-32">Jouw score</th>
                <th className="text-center text-xs font-semibold text-gray-600 pb-3 w-32">Mentor score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((s, i) => (
                <tr key={s.competentie_id} className="border-b border-gray-50">
                  <td className="text-sm text-gray-700 py-3 pr-4">{s.competentie_naam}</td>
                  <td className="py-3 w-32">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400 text-center"
                      placeholder="0-10"
                      value={s.score_docent ?? ''}
                      onChange={e => {
                        const nieuw = [...scores]
                        nieuw[i] = { ...nieuw[i], score_docent: e.target.value }
                        setScores(nieuw)
                      }}
                    />
                  </td>
                  <td className="py-3 w-32 text-center text-sm text-gray-500">
                    {s.score_mentor ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">Algemene feedback</h2>
          <p className="text-xs text-gray-400 mb-3">Jouw algemene feedback voor de student.</p>
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 h-32 resize-none"
            placeholder="Algemene feedback..."
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
          />
        </div>

        {fout && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-3 text-sm">{fout}</div>
        )}

        <div className="flex gap-3 pb-6">
          <button
            onClick={() => router.push('/docent/evaluaties')}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Annuleren
          </button>
          <button
            onClick={handleOpslaan}
            disabled={bezig}
            className="px-5 py-2 text-sm bg-[#1e3a5f] text-white rounded-lg hover:bg-[#162d4a] cursor-pointer font-medium disabled:opacity-50"
          >
            {bezig ? 'Bezig...' : 'Opslaan'}
          </button>
        </div>

      </div>
    </div>
  )
}