'use client';

import { useState } from 'react';
import Topbar from '../component/topbar';

const initieleDocenten = [
  { naam: 'Steve Weemaels', email: 'steve.weemaels@docent.ehb.be', telefoon: '+32 470 11 22 33', vakken: 'ETJB, PE1, PE2, ...' },
  { naam: 'David van Steertegem', email: 'david.vansteertegem@docent.ehb.be', telefoon: '+32 471 22 33 44', vakken: 'PE1, PE2' },
  { naam: 'Tom Aertssens', email: 'tom.aertssens@student.ehb.be', telefoon: '+32 472 33 44 55', vakken: 'Web essentials' },
  { naam: 'Joachiem Quartier', email: 'joachiem.quartier@docent.ehb.be', telefoon: '+32 473 44 55 66', vakken: 'PSD1, PE1, PE2, ...' },
  { naam: 'Herman Gillaerts', email: 'herman.gillaerts@docent.ehb.be', telefoon: '+32 474 55 66 77', vakken: 'PSD' },
];

export default function DocentenPage() {
  const [bewerkModus, setBewerkModus] = useState(false);
  const [geselecteerd, setGeselecteerd] = useState([]);

  const toggleSelectie = (naam) => {
    setGeselecteerd((prev) =>
      prev.includes(naam)
        ? prev.filter((n) => n !== naam)
        : [...prev, naam]
    );
  };

  const handleVerwijder = () => {
    if (geselecteerd.length === 0) {
      alert('Selecteer minstens één docent.');
      return;
    }

    if (
      window.confirm(
        `Weet u zeker dat u ${geselecteerd.length} docent(en) wilt verwijderen?`
      )
    ) {
      alert('Verwijderd!');
      setGeselecteerd([]);
      setBewerkModus(false);
    }
  };

  const handleVoltooien = () => {
    alert('Wijzigingen opgeslagen!');
    setGeselecteerd([]);
    setBewerkModus(false);
  };

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

          <div className="flex gap-2">
            {bewerkModus ? (
              <>
                <button
                  onClick={handleVerwijder}
                  className="bg-[#DC2626] text-white text-sm px-5 py-2 rounded-lg font-medium hover:bg-[#B91C1C]"
                >
                  Verwijder
                </button>

                <button
                  onClick={handleVoltooien}
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
                {bewerkModus && (
                  <th className="px-5 py-3 w-10"></th>
                )}

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
                  {bewerkModus && (
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={geselecteerd.includes(d.naam)}
                        onChange={() => toggleSelectie(d.naam)}
                        className="w-4 h-4 accent-[#1A2E4A] cursor-pointer"
                      />
                    </td>
                  )}

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