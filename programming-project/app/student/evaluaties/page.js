'use client'

import { useState } from 'react'
import Topbar from '../component/topbar'

const competenties = [
  { naam: 'De lerende professional beheerst het volledige project - of operationeel planningsproces', docent: '3 / 10', mentor: '1 / 4', gemiddelde: '3 / 10' },
  { naam: 'De lerende professional ontwerpt IT-oplossingen volgens de industriestandaarden', docent: '8 / 10', mentor: '2 / 4', gemiddelde: '7 / 10' },
  { naam: 'De lerende professional implementeert digitale producten in een professionele omgeving', docent: '7.5 / 10', mentor: '3 / 4', gemiddelde: '7.5 / 10' },
  { naam: 'De lerende professional integreert technologie en infrastructuur binnen een professionele omgeving', docent: '6 / 10', mentor: '3 / 4', gemiddelde: '6.5 / 10' },
  { naam: 'De lerende professional hanteert een onderzoekende houding om tot innovatieve oplossingen te komen', docent: '10 / 10', mentor: '4 / 4', gemiddelde: '10 / 10' },
  { naam: 'De lerende professional communiceert helder en transparant in een professionele omgeving en/of in teamverband', docent: '9 / 10', mentor: '3 / 4', gemiddelde: '7 / 10' },
  { naam: 'De lerende professional denkt kritisch na om problemen efficiënt en effectief op te lossen', docent: '2 / 10', mentor: '2 / 4', gemiddelde: '3 / 10' },
  { naam: 'De lerende professional ziet persoonlijke ontwikkeling als de basis voor professionele groei', docent: '4.5 / 10', mentor: '1 / 4', gemiddelde: '4 / 10' },
  { naam: 'De lerende professional ontwikkelt een professionele attitude en handelt kwaliteitsvol', docent: '8.5 / 10', mentor: '2 / 4', gemiddelde: '7.5 / 10' },
  { naam: 'De lerende professional demonstreert ondernemend handelen in functie van waardecreatie', docent: '5 / 10', mentor: '3 / 4', gemiddelde: '5.5 / 10' },
  { naam: 'De lerende professional handelt ethisch en deontologisch', docent: '8 / 10', mentor: '4 / 4', gemiddelde: '8.5 / 10' },
]

export default function Evaluaties() {
  const [actieveTab, setActieveTab] = useState('overzicht')

  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Evaluaties"
        subtitel="Proximus NV · Tussentijdse evaluatie — Week 7"
      />
      <div className="flex-1 bg-gray-100 p-6">

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {[
            { id: 'overzicht', label: 'Tussentijds' },
            { id: 'finaal', label: 'Finaal' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActieveTab(tab.id)}
              className={`pb-3 text-sm font-medium border-b-2 cursor-pointer ${
                actieveTab === tab.id
                  ? 'border-[#1e3a5f] text-[#1e3a5f]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {actieveTab === 'overzicht' && (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Evaluatie</h1>

            {/* Scores tabel */}
            <div className="bg-white rounded-xl p-5 mb-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Scores per Competentie</h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Competentie</th>
                    <th className="text-center text-xs font-semibold text-gray-600 pb-3">Score Docent</th>
                    <th className="text-center text-xs font-semibold text-gray-600 pb-3">Score Stagementor</th>
                    <th className="text-center text-xs font-semibold text-gray-600 pb-3">Gemiddelde</th>
                  </tr>
                </thead>
                <tbody>
                  {competenties.map((c, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="text-sm text-gray-700 py-3 pr-4">{c.naam}</td>
                      <td className="text-center text-sm font-medium text-gray-900 py-3">{c.docent}</td>
                      <td className="text-center text-sm font-bold text-[#1e3a5f] py-3">{c.mentor}</td>
                      <td className="text-center text-sm font-medium text-gray-900 py-3">{c.gemiddelde}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Detail docent */}
            <div className="bg-white rounded-xl p-5 mb-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Evaluatie detail Docent</h2>
              <table className="w-full mb-4">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Competenties</th>
                    <th className="text-center text-xs font-semibold text-gray-600 pb-3 w-24">Punten</th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3 pl-4">Zelfreflectie</th>
                  </tr>
                </thead>
                <tbody>
                  {competenties.map((c, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="text-sm font-medium text-gray-800 py-3 pr-4">{c.naam}</td>
                      <td className="text-center text-sm text-gray-900 py-3 w-24">{c.docent}</td>
                      <td className="py-3 pl-4">
                        <input
                          type="text"
                          className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400"
                          placeholder="Zelfreflectie..."
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Algemene feedback van de docent</h3>
                <div className="border border-gray-200 rounded-lg p-3 text-sm text-gray-600 bg-gray-50">
                  Bilal functioneert uitstekend binnen het team en communiceert professioneel met collega's. Hij neemt initiatief bij technische problemen en zoekt zelfstandig naar oplossingen. Tijdens de voorbije weken heeft hij sterke vooruitgang geboekt in zowel technische als professionele competenties. Aandachtspunt blijft het uitgebreider documenteren van uitgevoerde werkzaamheden.
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Zelfreflectie</h3>
                <textarea
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 h-24 resize-none"
                  placeholder="schrijf hier..."
                />
              </div>
            </div>
          </>
        )}

        {actieveTab === 'finaal' && (
          <div className="bg-white rounded-xl p-5">
            <p className="text-sm text-gray-400">Finale evaluatie nog niet beschikbaar.</p>
          </div>
        )}

      </div>
    </div>
  )
}