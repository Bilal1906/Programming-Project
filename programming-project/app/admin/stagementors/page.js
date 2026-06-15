'use client';

import { useState } from 'react';
import Topbar from '../component/topbar';

const initieleStagementors = [
  { naam: 'Lars Vermeulen', email: 'lars.vermeulen@gmail.com', bedrijf: 'Cegeka', overeenkomst: 'Ontbreekt', overeenkomstKleur: '#92400E' },
  { naam: 'Emma De Ridder', email: 'emma.de.ridder@gmail.com', bedrijf: 'Ordina', overeenkomst: 'Geregistreerd', overeenkomstKleur: '#065F46' },
  { naam: 'Noah Van Hove', email: 'noah.van.hove@gmail.com', bedrijf: 'Accenture Belgium', overeenkomst: 'Ontbreekt', overeenkomstKleur: '#92400E' },
  { naam: 'Sophie Claessens', email: 'sophie.claessens@gmail.com', bedrijf: 'Delaware', overeenkomst: 'Geregistreerd', overeenkomstKleur: '#065F46' },
  { naam: 'Milan Peeters', email: 'milan.peeters@gmail.com', bedrijf: '—', overeenkomst: 'Geregistreerd', overeenkomstKleur: '#065F46' },
];

export default function StagementorsPage() {
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
      alert('Selecteer minstens één stagementor.');
      return;
    }

    if (
      window.confirm(
        `Weet u zeker dat u ${geselecteerd.length} stagementor(en) wilt verwijderen?`
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
                {bewerkModus && <th className="px-5 py-3 w-10"></th>}

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
                  {bewerkModus && (
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={geselecteerd.includes(m.naam)}
                        onChange={() => toggleSelectie(m.naam)}
                        className="w-4 h-4 accent-[#1A2E4A] cursor-pointer"
                      />
                    </td>
                  )}

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