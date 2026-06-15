'use client';

import { useState } from 'react';
import Topbar from '../component/topbar';

const initiele = [
  { student: 'Yagiz Biçer', bedrijf: 'Cegeka', statusStage: 'Goedgekeurd', statusKleur: '#065F46', overeenkomst: 'Ontbreekt', overeenkomstKleur: '#92400E' },
  { student: 'Nassim El Ghzaoui', bedrijf: 'Ordina', statusStage: 'Actief', statusKleur: '#1E40AF', overeenkomst: 'Geregistreerd', overeenkomstKleur: '#065F46' },
  { student: 'Bilal Jaaboub', bedrijf: 'Accenture Belgium', statusStage: 'Goedgekeurd', statusKleur: '#065F46', overeenkomst: 'Ontbreekt', overeenkomstKleur: '#92400E' },
  { student: 'Syrine Benamar', bedrijf: 'Delaware', statusStage: 'Actief', statusKleur: '#1E40AF', overeenkomst: 'Geregistreerd', overeenkomstKleur: '#065F46' },
  { student: 'Soufiane Jay-Yufi', bedrijf: '—', statusStage: 'Actief', statusKleur: '#1E40AF', overeenkomst: 'Geregistreerd', overeenkomstKleur: '#065F46' },
];

export default function OvereenkomstenPage() {
  const [bewerkModus, setBewerkModus] = useState(false);
  const [geselecteerd, setGeselecteerd] = useState([]);

  const toggleSelectie = (naam) => {
    setGeselecteerd((prev) =>
      prev.includes(naam) ? prev.filter((n) => n !== naam) : [...prev, naam]
    );
  };

  const handleVerwijder = () => {
    if (geselecteerd.length === 0) {
      alert('Selecteer minstens één overeenkomst.');
      return;
    }
    if (window.confirm(`Weet u zeker dat u ${geselecteerd.length} overeenkomst(en) wilt verwijderen?`)) {
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
      <Topbar title="Overeenkomsten" />

      <div className="flex-1 p-6 bg-gray-50">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Overeenkomstenoverzicht</h2>
            <p className="text-sm text-gray-400">Voeg toe, bewerk en verwijder één of meerdere overeenkomst(en)</p>
          </div>
          <div className="flex gap-2">
            {bewerkModus ? (
              <>
                <button onClick={handleVerwijder} className="bg-[#DC2626] text-white text-sm px-5 py-2 rounded-lg font-medium hover:bg-[#B91C1C]">Verwijder</button>
                <button onClick={handleVoltooien} className="bg-[#1A2E4A] text-white text-sm px-5 py-2 rounded-lg font-medium hover:bg-[#152438]">Voltooien</button>
              </>
            ) : (
              <button onClick={() => setBewerkModus(true)} className="bg-[#1A2E4A] text-white text-sm px-5 py-2 rounded-lg font-medium hover:bg-[#152438]">Bewerken</button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {bewerkModus && <th className="px-5 py-3 w-10"></th>}
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Student</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Bedrijf</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Status stage</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Overeenkomst</th>
              </tr>
            </thead>
            <tbody>
              {initiele.map((o) => (
                <tr key={o.student} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  {bewerkModus && (
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={geselecteerd.includes(o.student)}
                        onChange={() => toggleSelectie(o.student)}
                        className="w-4 h-4 accent-[#1A2E4A] cursor-pointer"
                      />
                    </td>
                  )}
                  <td className="px-5 py-4 font-medium text-gray-900">{o.student}</td>
                  <td className="px-5 py-4 text-gray-600">{o.bedrijf}</td>
                  <td className="px-5 py-4"><span className="text-sm" style={{ color: o.statusKleur }}>{o.statusStage}</span></td>
                  <td className="px-5 py-4"><span className="text-sm" style={{ color: o.overeenkomstKleur }}>{o.overeenkomst}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}