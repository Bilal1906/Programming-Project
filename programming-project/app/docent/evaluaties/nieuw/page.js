'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DocentTopbar from '../../component/topbar';

const competenties = [
  'De lerende professional beheerst het volledige project - of operationeel planningsproces',
  'De lerende professional ontwerpt IT-oplossingen volgens de industriestandaarden',
  'De lerende professional implementeert digitale producten in een professionele omgeving',
  'De lerende professional integreert technologie en infrastructuur binnen een professionele omgeving',
  'De lerende professional hanteert een onderzoekende houding om tot innovatieve oplossingen te komen',
  'De lerende professional communiceert helder en transparant in een professionele omgeving en/of in teamverband',
  'De lerende professional denkt kritisch na om problemen efficiënt en effectief op te lossen',
  'De lerende professional ziet persoonlijke ontwikkeling als de basis voor professionele groei',
  'De lerende professional ontwikkelt een professionele attitude en handelt kwaliteitsvol',
  'De lerende professional demonstreert ondernemend handelen in functie van waardecreatie',
  'De lerende professional handelt ethisch en deontologisch',
]

export default function NieuweEvaluatiePage() {
  const router = useRouter()
  const [studenten, setStudenten] = useState([])
  const [loading, setLoading] = useState(true)
  const [bezig, setBezig] = useState(false)
  const [fout, setFout] = useState('')

  const [form, setForm] = useState({
    student_naam: '',
    stage_id: '',
    datum: '',
    type: 'tussentijds',
    week_nummer: '',
    feedback: '',
    scores: competenties.map(() => ''),
  })

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || localStorage.getItem('token')

    if (!token) {
      router.push('/authentificator/login')
      return
    }

    fetch('/api/docent/studenten', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setStudenten(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFout('')

    if (!form.stage_id || !form.datum) {
      setFout('Vul alle verplichte velden in!')
      return
    }

    setBezig(true)

    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || localStorage.getItem('token')

    const response = await fetch('/api/docent/evaluaties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        stage_id: parseInt(form.stage_id),
        type: form.type,
        datum: form.datum,
        week_nummer: parseInt(form.week_nummer),
        feedback: form.feedback,
        scores: form.scores.map((score, i) => ({
          competentie_id: i + 1,
          score: parseFloat(score) || 0
        }))
      })
    })

    const data = await response.json()

    if (!response.ok) {
      setFout(data.fout)
      setBezig(false)
    } else {
      router.push('/docent/evaluaties')
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-sm text-gray-400">Laden...</div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <DocentTopbar
        titel="Nieuwe Evaluatie"
        subtitel="Tussentijdse evaluatie registreren"
      />
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-4">

          {/* Student selecteren */}
          <div className="bg-white rounded-xl p-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Student *</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                  value={form.stage_id}
                  onChange={e => setForm({...form, stage_id: e.target.value})}
                >
                  <option value="">Selecteer student</option>
                  {studenten.map((s, i) => (
                    <option key={i} value={i + 1}>
                      {s.voornaam} {s.achternaam}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Datum *</label>
                <input
                  type="date"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                  value={form.datum}
                  onChange={e => setForm({...form, datum: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Type</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                  value={form.type}
                  onChange={e => setForm({...form, type: e.target.value})}
                >
                  <option value="tussentijds">Tussentijds</option>
                  <option value="finaal">Finaal</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Week nummer</label>
                <input
                  type="number"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                  placeholder="bv. 7"
                  value={form.week_nummer}
                  onChange={e => setForm({...form, week_nummer: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Competenties */}
          <div className="bg-white rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Competenties</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Competentie</th>
                  <th className="text-center text-xs font-semibold text-gray-600 pb-3 w-24">Punten</th>
                </tr>
              </thead>
              <tbody>
                {competenties.map((c, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="text-sm font-medium text-gray-800 py-3 pr-4">{c}</td>
                    <td className="py-3 w-24">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400 text-center"
                        placeholder="0-10"
                        value={form.scores[i]}
                        onChange={e => {
                          const nieuw = [...form.scores]
                          nieuw[i] = e.target.value
                          setForm({...form, scores: nieuw})
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Algemene feedback */}
          <div className="bg-white rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-3">Algemene Feedback</h2>
            <textarea
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 h-24 resize-none"
              placeholder="Algemene feedback voor de student..."
              value={form.feedback}
              onChange={e => setForm({...form, feedback: e.target.value})}
            />
          </div>

          {fout && (
            <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-3 text-sm">
              {fout}
            </div>
          )}

          {/* Knoppen */}
          <div className="flex gap-3 pb-6">
            <button
              type="button"
              onClick={() => router.push('/docent/evaluaties')}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              ← Terug naar overzicht
            </button>
            <button
              type="button"
              disabled={bezig}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer disabled:opacity-50"
            >
              Concept
            </button>
            <button
              type="submit"
              disabled={bezig}
              className="px-5 py-2 text-sm bg-[#1e3a5f] text-white rounded-lg hover:bg-[#162d4a] cursor-pointer font-medium disabled:opacity-50"
            >
              {bezig ? 'Bezig...' : 'Evaluatie Opslaan'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}