'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '../../component/topbar';

const competentieOpties = [
  'Technisch',
  'Communicatie',
  'Teamwerk',
  'Probleemoplossend Denken',
  'Professionele Houding',
  'Zelfstandigheid',
  'Kwaliteit werk',
  'Leerbereidheid',
]

export default function LogboekNieuw() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [bezig, setBezig] = useState(false)
  const [fout, setFout] = useState('')
  const [stageId, setStageId] = useState(null)

  const [form, setForm] = useState({
    datum: '',
    uren: '',
    taken: '',
    reflectie: '',
    leerpunten: '',
    competenties: [],
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

    fetch('/api/student/stage', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setStageId(data[0].id)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const toggleCompetentie = (c) => {
    setForm(prev => ({
      ...prev,
      competenties: prev.competenties.includes(c)
        ? prev.competenties.filter(x => x !== c)
        : [...prev.competenties, c]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFout('')

    if (!form.datum || !form.uren || !form.taken) {
      setFout('Vul alle verplichte velden in!')
      return
    }

    setBezig(true)

    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || localStorage.getItem('token')

    const vandaag = new Date(form.datum)
    const maandag = new Date(vandaag)
    maandag.setDate(vandaag.getDate() - vandaag.getDay() + 1)
    const vrijdag = new Date(maandag)
    vrijdag.setDate(maandag.getDate() + 4)

    const response = await fetch('/api/student/logboeken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        stage_id: stageId,
        week_nummer: Math.ceil((vandaag - new Date(vandaag.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000)),
        datum_van: maandag.toISOString().split('T')[0],
        datum_tot: vrijdag.toISOString().split('T')[0],
        dagen: [{
          datum: form.datum,
          uren: parseFloat(form.uren),
          taken: form.taken,
          reflectie: form.reflectie,
          leerpunten: form.leerpunten,
        }]
      })
    })

    const data = await response.json()

    if (!response.ok) {
      setFout(data.fout)
      setBezig(false)
    } else {
      router.push('/student/logboeken')
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-sm text-gray-400">Laden...</div>
      </div>
    )
  }

  const dagen = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag']
  const vandaagDag = form.datum ? dagen[new Date(form.datum).getDay() - 1] : ''

  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Logboek invullen"
        subtitel={`Proximus NV · ${vandaagDag ? `${vandaagDag} ${form.datum}` : 'Kies een datum'}`}
      />
      <div className="flex-1 bg-gray-100 p-6">
        <div className="grid grid-cols-3 gap-4">

          {/* Hoofdformulier */}
          <div className="col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="bg-white rounded-xl p-5">
                <h2 className="text-sm font-semibold text-gray-800 mb-4">
                  {vandaagDag || 'Dag'} — Dagverslag
                </h2>

                <div className="mb-4">
                  <label className="block text-xs text-gray-500 mb-1">Datum *</label>
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                    value={form.datum}
                    onChange={e => setForm({...form, datum: e.target.value})}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-gray-500 mb-1">Uitgevoerde taken *</label>
                  <textarea
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 h-24 resize-none"
                    placeholder="Beschrijf wat je vandaag hebt gedaan, welke taken je hebt uitgevoerd..."
                    value={form.taken}
                    onChange={e => setForm({...form, taken: e.target.value})}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-gray-500 mb-1">Reflectie</label>
                  <textarea
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 h-24 resize-none"
                    placeholder="Wat leerde je vandaag? Hoe verliep de dag? Wat ging goed of minder goed?"
                    value={form.reflectie}
                    onChange={e => setForm({...form, reflectie: e.target.value})}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-gray-500 mb-1">Leerpunten / problemen</label>
                  <textarea
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 h-24 resize-none"
                    placeholder="Eventuele moeilijkheden, vragen of inzichten die je wil noteren..."
                    value={form.leerpunten}
                    onChange={e => setForm({...form, leerpunten: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">Gewerkte uren *</label>
                  <input
                    type="number"
                    min="0"
                    max="12"
                    step="0.5"
                    className="w-32 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                    placeholder="8"
                    value={form.uren}
                    onChange={e => setForm({...form, uren: e.target.value})}
                  />
                </div>
              </div>

              {fout && (
                <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-3 text-sm">
                  {fout}
                </div>
              )}

              <div className="flex gap-3 pb-6">
                <button
                  type="button"
                  onClick={() => router.push('/student/logboeken')}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  ← Terug
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Concept opslaan
                </button>
                <button
                  type="submit"
                  disabled={bezig}
                  className="px-5 py-2 text-sm bg-[#1e3a5f] text-white rounded-lg hover:bg-[#162d4a] cursor-pointer font-medium disabled:opacity-50"
                >
                  {bezig ? 'Bezig...' : '→ Dag indienen'}
                </button>
              </div>

            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">

            {/* Competenties */}
            <div className="bg-white rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-2">Competenties vandaag</h2>
              <p className="text-xs text-gray-400 mb-3">Welke competenties heb je aangetoond tijdens deze dag?</p>
              <div className="flex flex-wrap gap-2">
                {competentieOpties.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleCompetentie(c)}
                    className={`text-xs px-3 py-1 rounded-full border cursor-pointer ${
                      form.competenties.includes(c)
                        ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Week overzicht */}
            <div className="bg-white rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">Week overzicht</h2>
              <div className="space-y-2">
                {dagen.map((dag) => (
                  <div key={dag} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 w-6">{dag.slice(0, 2)}</span>
                    <span className="text-gray-400 text-xs">Nog open</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}