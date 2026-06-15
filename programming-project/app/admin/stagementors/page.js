'use client';

import Topbar from '../component/topbar';

const initieleStagementors = [
  { naam: 'Lars Vermeulen', email: 'lars.vermeulen@gmail.com', bedrijf: 'Cegeka', overeenkomst: 'Ontbreekt', overeenkomstKleur: '#92400E' },
  { naam: 'Emma De Ridder', email: 'emma.de.ridder@gmail.com', bedrijf: 'Ordina', overeenkomst: 'Geregistreerd', overeenkomstKleur: '#065F46' },
  { naam: 'Noah Van Hove', email: 'noah.van.hove@gmail.com', bedrijf: 'Accenture Belgium', overeenkomst: 'Ontbreekt', overeenkomstKleur: '#92400E' },
  { naam: 'Sophie Claessens', email: 'sophie.claessens@gmail.com', bedrijf: 'Delaware', overeenkomst: 'Geregistreerd', overeenkomstKleur: '#065F46' },
  { naam: 'Milan Peeters', email: 'milan.peeters@gmail.com', bedrijf: '—', overeenkomst: 'Geregistreerd', overeenkomstKleur: '#065F46' },
];

export default function StagementorsPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Stagementor" />

      <div className="flex-1 p-6 bg-gray-50">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Stagementorenoverzicht
            </h2>

            <p className="text-sm text-gray-400">
              Voeg toe, bewerk en verwijder één of meerdere stagementor(s)
            </p>

            <p className="text-sm text-gray-400">
              Na goedkeuring moet de student een ondertekende stageovereenkomst uploaden.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">
                  Stagementor
                </th>

                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">
                  Email
                </th>

                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">
                  Bedrijf
                </th>

                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">
                  Overeenkomst
                </th>
              </tr>
            </thead>

            <tbody>
              {initieleStagementors.map((m) => (
                <tr
                  key={m.naam}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {m.naam}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {m.email}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {m.bedrijf}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className="text-sm"
                      style={{ color: m.overeenkomstKleur }}
                    >
                      {m.overeenkomst}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}