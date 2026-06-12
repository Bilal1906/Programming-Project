'use client'

import Topbar from '../component/topbar'

const vereisteDocumenten = [
  { naam: 'Stageovereenkomst_Bilal_Jaaboub.pdf', info: 'Ondertekend door alle partijen · 30 jan 2025 · 245 KB', status: 'ontvangen' },
  { naam: 'Stageaanvraag_goedkeuring.pdf', info: 'Goedgekeurd door Ruben Dejockheere · 22 jan 2025 · 102 KB', status: 'ontvangen' },
  { naam: 'Verzekeringsbewijs_stage_2025-2026.pdf', info: 'EhB verzekering · geldig academiejaar 2024-2025 · 88 KB', status: 'ontvangen' },
  { naam: 'Eindverslag_template.docx', info: 'Template — nog niet ingediend · deadline: 23 mei 2025', status: 'vereist' },
]

const mijnUploads = [
  { naam: 'Tussentijds_verslag_Bilal.pdf', info: 'Geüpload door jou · 15 apr 2025 · 312 KB', status: 'ingediend' },
]

const statusBadge = (status) => {
  const stijlen = {
    ontvangen: 'bg-green-50 text-green-700 border border-green-200',
    vereist: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    ingediend: 'bg-green-50 text-green-700 border border-green-200',
  }
  const labels = {
    ontvangen: '✓ Ontvangen',
    vereist: 'Vereist',
    ingediend: '✓ Ingediend',
  }
  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${stijlen[status]}`}>
      {labels[status]}
    </span>
  )
}

export default function Documenten() {
  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Documenten"
        subtitel="Stageovereenkomsten & bijlagen · Proximus NV"
      />
      <div className="flex-1 bg-gray-100 p-6 space-y-4">

        {/* Waarschuwingsbanner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0"></div>
          <p className="text-sm text-yellow-800">
            Je eindverslag moet uiterlijk op <strong>23 mei 2025</strong> worden ingediend. Upload het ingevulde document voor de deadline.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-4">

            {/* Vereiste documenten */}
            <div className="bg-white rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Vereiste documenten</h2>
              <div className="space-y-3">
                {vereisteDocumenten.map((doc) => (
                  <div key={doc.naam} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">📄</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{doc.naam}</div>
                        <div className="text-xs text-gray-400">{doc.info}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusBadge(doc.status)}
                      <button className="text-xs px-3 py-1 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer">
                        ↓ Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mijn uploads */}
            <div className="bg-white rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Mijn uploads</h2>
              <div className="space-y-3 mb-4">
                {mijnUploads.map((doc) => (
                  <div key={doc.naam} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">📄</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{doc.naam}</div>
                        <div className="text-xs text-gray-400">{doc.info}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusBadge(doc.status)}
                      <button className="text-xs px-3 py-1 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer">
                        ↓ Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upload zone */}
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 cursor-pointer">
                <div className="text-3xl mb-2">☁️</div>
                <div className="text-sm font-medium text-gray-700 mb-1">Nieuw document uploaden</div>
                <div className="text-xs text-gray-400">Sleep een bestand hierheen of klik om te bladeren · PDF, DOCX · max 10MB</div>
              </div>
            </div>

          </div>

          {/* Sidebar rechts */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">Document checklist</h2>
              <div className="space-y-2">
                {[
                  { label: 'Stageovereenkomst', voltooid: true },
                  { label: 'Goedkeuring stageaanvraag', voltooid: true },
                  { label: 'Verzekeringsbewijs', voltooid: true },
                  { label: 'Tussentijds verslag', voltooid: true },
                  { label: 'Eindverslag', voltooid: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.voltooid ? 'bg-green-500' : 'bg-gray-200'}`}>
                      {item.voltooid && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className={`text-sm ${item.voltooid ? 'text-gray-800' : 'text-gray-400'}`}>{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm">
                <span className="text-gray-400">Volledigheid</span>
                <span className="font-semibold text-[#1e3a5f]">4/5</span>
              </div>
            </div>

            {/* Deadlines */}
            <div className="bg-white rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">Deadlines</h2>
              <div className="space-y-2">
                {[
                  { label: 'Stageovereenkomst', status: 'Ingediend', kleur: 'text-green-600' },
                  { label: 'Tussentijds verslag', status: 'Ingediend', kleur: 'text-green-600' },
                  { label: 'Eindverslag', status: '23 mei 2025', kleur: 'text-yellow-600' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.label}</span>
                    <span className={`font-medium ${item.kleur}`}>
                      {item.status === 'Ingediend' ? '✓ ' : ''}{item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="bg-white rounded-xl p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">Info</h2>
              <p className="text-xs text-gray-500 leading-relaxed mb-2">
                De <strong>stageovereenkomst</strong> is cruciaal voor je verzekering. Zorg dat dit document correct ondertekend is door alle partijen.
              </p>
              <p className="text-xs text-gray-500">
                Vragen over documenten? Contacteer <strong>Joachim Quartier</strong> via{' '}
                <a href="mailto:joachim.quartier@ehb.be" className="text-blue-500 hover:underline">
                  joachim.quartier@ehb.be
                </a>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}