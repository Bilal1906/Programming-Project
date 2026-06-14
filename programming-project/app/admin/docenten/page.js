'use client';

import Topbar from '../component/topbar';

const initieleDocenten = [
  { naam: 'Steve Weemaels', email: 'steve.weemaels@docent.ehb.be', telefoon: '+32 470 11 22 33', vakken: 'ETJB, PE1, PE2, ...' },
  { naam: 'David van Steertegem', email: 'david.vansteertegem@docent.ehb.be', telefoon: '+32 471 22 33 44', vakken: 'PE1, PE2' },
  { naam: 'Tom Aertssens', email: 'tom.aertssens@student.ehb.be', telefoon: '+32 472 33 44 55', vakken: 'Web essentials' },
  { naam: 'Joachiem Quartier', email: 'joachiem.quartier@docent.ehb.be', telefoon: '+32 473 44 55 66', vakken: 'PSD1, PE1, PE2, ...' },
  { naam: 'Herman Gillaerts', email: 'herman.gillaerts@docent.ehb.be', telefoon: '+32 474 55 66 77', vakken: 'PSD' },
];

export default function DocentenPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Docent" />

      <div className="flex-1 p-6 bg-gray-50">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Docentenoverzicht
            </h2>

            <p className="text-sm text-gray-400">
              Voeg toe, bewerk en verwijder één of meerdere docent(en)
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">
                  Docent
                </th>

                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">
                  E-mail
                </th>

                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">
                  Telefoon
                </th>

                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">
                  Vak(ken)
                </th>
              </tr>
            </thead>

            <tbody>
              {initieleDocenten.map((d) => (
                <tr
                  key={d.naam}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {d.naam}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {d.email}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {d.telefoon}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {d.vakken}
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