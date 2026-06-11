'use client'

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
  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Evaluaties"
        subtitel="Proximus NV · Tussentijdse evaluatie — Week 7"
      />
      <div className="flex-1 bg-gray-100 p-6">

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Evaluatie</h1>

        <div className="bg-white rounded-xl p-5">
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
          <div className="flex justify-end gap-4 mt-3">
            <button className="text-xs text-blue-500 hover:underline">Meer details</button>
            <button className="text-xs text-blue-500 hover:underline">Meer details</button>
          </div>
        </div>

      </div>
    </div>
  )
}