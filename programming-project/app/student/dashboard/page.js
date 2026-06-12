'use client'

import { useRouter } from 'next/navigation'
import Topbar from '../component/topbar'

export default function StudentDashboardActief() {
  const router = useRouter()

  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Dashboard"
        subtitel="Welkom terug, Bilal 👋"
      />
      <div className="flex-1 bg-gray-100 p-6 space-y-4">

        {/* Bovenste kaarten */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-1">Logboeken deze week</div>
            <div className="text-3xl font-bold text-gray-900">2/5</div>
            <div className="text-xs text-gray-400 mt-1">Ma & Di ingevuld</div>
          </div>
          <div className="bg-white rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Tussentijdse evaluatie</div>
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 font-medium">
              In behandeling
            </span>
            <div className="text-xs text-gray-400 mt-2">Steve Weemaels beoordeelt</div>
          </div>
        </div>

        {/* Mijn stage */}
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Mijn stage — Proximus NV</h2>
              <p className="text-xs text-gray-400">Stagementor: Steve Weemaels · Begeleider EhB: Joachim Quartier</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium">
              Goedgekeurd
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-xs text-gray-400 mb-1">Bedrijf</div>
              <div className="text-sm font-medium">Proximus NV</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Startdatum</div>
              <div className="text-sm font-medium">3 februari 2025</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Einddatum</div>
              <div className="text-sm font-medium">23 mei 2025</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Stagementor</div>
              <div className="text-sm font-medium">Steve Weemaels</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Begeleider EhB</div>
              <div className="text-sm font-medium">Joachim Quartier</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Duur</div>
              <div className="text-sm font-medium">16 weken · 560u</div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Voortgang stage</span>
            <span className="text-xs font-semibold text-blue-600">44% — week 7 van 16</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-[#1e3a5f] h-2 rounded-full" style={{ width: '44%' }} />
          </div>
        </div>

        {/* Logboek + Milestones */}
        <div className="grid grid-cols-2 gap-4">

          {/* Logboek deze week */}
          <div className="bg-white rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Logboek deze week</h2>
                <p className="text-xs text-gray-400">Week 7 · 2-6 juni 2025</p>
              </div>
              <button
                onClick={() => router.push('/student/logboeken')}
                className="px-3 py-1.5 bg-[#1e3a5f] text-white text-xs rounded-lg cursor-pointer font-medium"
              >
                📋 Logboek invullen
              </button>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="w-full bg-gray-100 rounded-full h-1.5 mr-3">
                <div className="bg-[#1e3a5f] h-1.5 rounded-full" style={{ width: '40%' }} />
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">16u / 40u</span>
            </div>
            <div className="flex gap-2 mb-4">
              {['Ma', 'Di', 'Wo', 'Do', 'Vr'].map((dag, i) => (
                <div key={dag} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  i === 0 ? 'bg-green-100 text-green-700' :
                  i === 1 ? 'bg-green-100 text-green-700' :
                  i === 2 ? 'bg-[#1e3a5f] text-white' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {dag}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Afcheckstatus mentor</span>
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                Wacht op afcheck Steve Weemaels
              </span>
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Milestones</h2>
            <div className="space-y-3">
              {[
                { label: 'Stageaanvraag ingediend', datum: '15 jan 2025', voltooid: true },
                { label: 'Goedgekeurd door admin', datum: '22 jan 2025', voltooid: true },
                { label: 'Stageovereenkomst ondertekend', datum: '30 jan 2025', voltooid: true },
                { label: 'Stage gestart', datum: '3 feb 2025', voltooid: true },
                { label: 'Tussentijdse evaluatie afgerond', datum: 'gepland: week 8', voltooid: false },
                { label: 'Eindpresentatie', datum: 'gepland: 23 mei 2025', voltooid: false },
              ].map((milestone) => (
                <div key={milestone.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                      milestone.voltooid ? 'bg-green-500' : 'bg-gray-200'
                    }`}>
                      {milestone.voltooid && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className={`text-sm ${milestone.voltooid ? 'text-gray-800' : 'text-gray-400'}`}>
                      {milestone.label}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{milestone.datum}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}