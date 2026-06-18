'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '../../component/topbar';
import { fetchMetAuth } from '@/app/lib/fetchMetAuth';

export default function LogboekNieuw() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [bezig, setBezig] = useState(false)
  const [fout, setFout] = useState('')
  const [stageId, setStageId] = useState(null)
  const [bedrijfNaam, setBedrijfNaam] = useState('')
  const [competenties, setCompetenties] = useState([])

  const [form, setForm] = useState({
    datum: '',
    uren: '',
    taken: '',
    reflectie: '',
    leerpunten: '',
    geselecteerdeCompetenties: [],
  })

  useEffect(() => {
    Promise.all([
      fetchMetAuth('/api/student/stage').then(r => r?.json()),
      fetchMetAuth('/api/competenties').then(r => r?.json()),
    ]).then(([stageData, competentieData]) => {
      const actief = stageData?.find(s => s.status === 'actief')
      if (actief) {
        setStageId(actief.id)
        setBedrijfNaam(actief.bedrijf_naam)
      }
      setCompetenties(competentieData ?? [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const toggleCompetentie = (id) => {
    setForm(prev => ({
      ...prev,
      geselecteerdeCompetenties: prev.geselecteerdeCompetenties.includes(id)
        ? prev.geselecteerdeCompetenties.filter(x => x !== id)
        : [...prev.geselecteerdeCompetenties, id]
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

    const vandaag = new Date(form.datum)
    const dagVanWeek = vandaag.getDay()
    const maandag = new Date(vandaag)
    maandag.setDate(vandaag.getDate() - (dagVanWeek === 0 ? 6 : dagVanWeek - 1))
    const vrijdag = new Date(maandag)
    vrijdag.setDate(maandag.getDate() + 4)

    const startOfYear = new Date(vandaag.getFullYear(), 0, 1)
    const week_nummer = Math.ceil(((vandaag - startOfYear) / (7 * 24 * 60 * 60 * 1000)) + 1)

    const response = await fetchMetAuth('/api/student/logboeken', {
      method: 'POST',
      body: JSON.stringify({
        stage_id: stageId,
        week_nummer,
        datum_van: maandag.toISOString().split('T')[0],
        datum_tot: vrijdag.toISOString().split('T')[0],
        dagen: [{
          datum: form.datum,
          uren: parseFloat(form.uren),
          taken: form.taken,
          reflectie: form.reflectie,
          leerpunten: form.leerpunten,
          competenties: form.geselecteerdeCompetenties,
        }]
      })
    })

    if (!response) { setBezig(false); return }
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
  const vandaagDag = form.datum ? dagen[new Date(form.datum).getDay() - 1] || '' : ''

  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Logboek invullen"
        subtitel={`${bedrijfNaam || 'Stage'} · ${vandaagDag ? `${vandaagDag} ${form.datum}` : 'Kies een datum'}`}
      />
      <div className="flex-1 bg-gray-100 p-6">
        <div className="grid grid-cols-3 gap-4">

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
                    placeholder="Beschrijf wat je vandaag hebt gedaan..."
                    value={form.taken}
                    onChange={e => setForm({...form, taken: e.target.value})}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-gray-500 mb-1">Reflectie</label>
                  <textarea
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 h-24 resize-none"
                    placeholder="Wat leerde je vandaag? Hoe verliep de dag?"
                    value={form.reflectie}
                    onChange={e => setForm({...form, reflectie: e.target.value})}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-gray-500 mb-1">Leerpunten / problemen</label>
                  <textarea
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 h-24 resize-none"
                    placeholder="Eventuele moeilijkheden, vragen of inzichten..."
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
                  Terug
                </button>
                <button
                  type="submit"
                  disabled={bezig}
                  className="px-5 py-2 text-sm bg-[#1e3a5f] text-white rounded-lg hover:bg-[#162d4a] cursor-pointer font-medium disabled:opacity-50"
                >
                  {bezig ? 'Bezig...' : 'Dag indienen'}
                </button>
              </div>

            </form>
          </div>

          <div className="space-y-4">

            <div className="bg-white rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-2">Competenties vandaag</h2>
              <p className="text-xs text-gray-400 mb-3">Welke competenties heb je aangetoond?</p>
              {competenties.length === 0 ? (
                <p className="text-xs text-gray-400">Geen competenties beschikbaar.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {competenties.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCompetentie(c.id)}
                      className={`text-xs px-3 py-1 rounded-full border cursor-pointer ${
                        form.geselecteerdeCompetenties.includes(c.id)
                          ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {c.naam}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">Week overzicht</h2>
              <div className="space-y-2">
                {dagen.map((dag) => (
                  <div key={dag} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{dag.slice(0, 2)}</span>
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