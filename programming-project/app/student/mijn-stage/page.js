'use client'

import Topbar from '../component/topbar'

const stage = {
  bedrijf: 'Proximus NV',
  adres: 'Bd. du Roi Albert II 27, 1030 Brussel',
  sector: 'Telecom / IT',
  website: 'www.proximus.be',
  telefoon: '+32 2 202 41 11',
  startdatum: '3 februari 2025',
  einddatum: '23 mei 2025',
  duur: '16 weken · 560u',
  academiejaar: '2024-2025',
  opleiding: 'Toegepaste Informatica 3',
  aantalWeken: 16,
  huidigeWeek: 7,
  voortgang: 44,
}

export default function MijnStage() {
  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Mijn Stage"
        subtitel="Proximus NV · Toegepaste Informatica 3 · 2025-2026"
      />
      <div className="flex-1 bg-gray-100 p-6 space-y-4">

        {/* Voortgang */}
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-800">Voortgang stage</span>
            <span className="text-sm font-semibold text-blue-600">{stage.voortgang}% — week {stage.huidigeWeek} van {stage.aantalWeken}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div className="bg-[#1e3a5f] h-2 rounded-full" style={{ width: `${stage.voortgang}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{stage.startdatum}</span>
            <span>{stage.einddatum}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">

          {/* Bedrijfsgegevens */}
          <div className="bg-white rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Bedrijfsgegevens</h2>
            <div className="space-y-3">
              {[
                { label: 'Bedrijf', waarde: stage.bedrijf },
                { label: 'Adres', waarde: stage.adres },
                { label: 'Sector', waarde: stage.sector },
                { label: 'Website', waarde: stage.website, link: true },
                { label: 'Telefoonnummer', waarde: stage.telefoon },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-gray-400">{item.label}</span>
                  {item.link
                    ? <a href={`https://${item.waarde}`} className="text-blue-500 hover:underline">{item.waarde}</a>
                    : <span className="text-gray-800 font-medium">{item.waarde}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Stageperiode */}
          <div className="bg-white rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Stageperiode</h2>
            <div className="space-y-3">
              {[
                { label: 'Startdatum', waarde: stage.startdatum },
                { label: 'Einddatum', waarde: stage.einddatum },
                { label: 'Duur', waarde: stage.duur },
                { label: 'Academiejaar', waarde: stage.academiejaar },
                { label: 'Opleiding', waarde: stage.opleiding },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-gray-800 font-medium">{item.waarde}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}