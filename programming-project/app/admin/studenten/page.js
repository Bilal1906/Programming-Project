'use client';

import { useState } from 'react';
import Topbar from '../component/topbar';

const initialeStudenten = [
  { naam: 'Bilal Jaaboub', email: 'bilal.jaaboub@student.ehb.be', telefoon: '+32 470 11 22 33', docent: 'Joachim Quartier', stage: 'Ingediend', stageKleur: '#92400E' },
  { naam: 'Nassim El Ghzaoui', email: 'nassim.elghzaoui@student.ehb.be', telefoon: '+32 471 22 33 44', docent: 'Joachim Quartier', stage: 'Actief', stageKleur: '#1E40AF' },
  { naam: 'Yagiz Biçer', email: 'yagiz.bicer@student.ehb.be', telefoon: '+32 472 33 44 55', docent: 'Tom Aertssens', stage: 'Goedgekeurd', stageKleur: '#065F46' },
  { naam: 'Syrine Benamar', email: 'syrine.benamar@student.ehb.be', telefoon: '+32 473 44 55 66', docent: 'Tom Aertssens', stage: 'Aanpassingen', stageKleur: '#9A3412' },
  { naam: 'Soufiane Jay-Yufi', email: 'soufiane.jayyufi@student.ehb.be', telefoon: '+32 474 55 66 77', docent: 'Joachim Quartier', stage: 'Geen stage', stageKleur: '#64748B' },
];

export default function StudentenPage() {
  const [bewerkModus, setBewerkModus] = useState(false);

  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Student" />

      <div className="flex-1 p-6 bg-gray-50">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Studentenoverzicht
            </h2>
            <p className="text-sm text-gray-400">
              Voeg toe, bewerk en verwijder één of meerdere student(en)
            </p>
          </div>

          <div className="flex gap-2">
            {bewerkModus ? (
              <>
                <button
                  className="bg-[#DC2626] text-white text-sm px-5 py-2 rounded-lg font-medium hover:bg-[#B91C1C]"
                >
                  Verwijderen
                </button>

                <button
                  onClick={() => setBewerkModus(false)}
                  className="bg-[#1A2E4A] text-white text-sm px-5 py-2 rounded-lg font-medium hover:bg-[#152438]"
                >
                  Voltooien
                </button>
              </>
            ) : (
              <button
                onClick={() => setBewerkModus(true)}
                className="bg-[#1A2E4A] text-white text-sm px-5 py-2 rounded-lg font-medium hover:bg-[#152438]"
              >
                Bewerken
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">
                  Student
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">
                  E-mail
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">
                  Telefoon
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">
                  Docent
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">
                  Stage
                </th>
              </tr>
            </thead>

            <tbody>
              {initialeStudenten.map((s) => (
                <tr
                  key={s.naam}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {s.naam}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {s.email}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {s.telefoon}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {s.docent}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className="text-sm"
                      style={{ color: s.stageKleur }}
                    >
                      {s.stage}
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