import Topbar from '../component/topbar';

const initiele = [
  { student: 'Yagiz Biçer', bedrijf: 'Cegeka', statusStage: 'Goedgekeurd', statusKleur: '#065F46', overeenkomst: 'Ontbreekt', overeenkomstKleur: '#92400E' },
  { student: 'Nassim El Ghzaoui', bedrijf: 'Ordina', statusStage: 'Actief', statusKleur: '#1E40AF', overeenkomst: 'Geregistreerd', overeenkomstKleur: '#065F46' },
  { student: 'Bilal Jaaboub', bedrijf: 'Accenture Belgium', statusStage: 'Goedgekeurd', statusKleur: '#065F46', overeenkomst: 'Ontbreekt', overeenkomstKleur: '#92400E' },
  { student: 'Syrine Benamar', bedrijf: 'Delaware', statusStage: 'Actief', statusKleur: '#1E40AF', overeenkomst: 'Geregistreerd', overeenkomstKleur: '#065F46' },
  { student: 'Soufiane Jay-Yufi', bedrijf: '—', statusStage: 'Actief', statusKleur: '#1E40AF', overeenkomst: 'Geregistreerd', overeenkomstKleur: '#065F46' },
];

export default function OvereenkomstenPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Overeenkomsten" />

      <div className="flex-1 p-6 bg-gray-50">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Overeenkomstenoverzicht</h2>
          <p className="text-sm text-gray-400">Voeg toe, bewerk en verwijder één of meerdere overeenkomst(en)</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Student</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Bedrijf</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Status stage</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Overeenkomst</th>
              </tr>
            </thead>
            <tbody>
              {initiele.map((o) => (
                <tr key={o.student} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
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