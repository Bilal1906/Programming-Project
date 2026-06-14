import Link from 'next/link';
import Topbar from '../component/topbar';

const stages = [
  {
    student: 'Bilal Jaaboub',
    bedrijf: 'Accenture Belgium',
    mentor: 'Steve Weemaels',
    periode: '3 feb – 27 jun 2025',
    status: 'Ingediend',
  },
  {
    student: 'Syrine Benamar',
    bedrijf: 'Delaware',
    mentor: 'David Van Steertegem',
    periode: '1 mrt – 30 jun 2025',
    status: 'Aanpassingen',
  },
  {
    student: 'Yagiz Biçer',
    bedrijf: 'Cegeka',
    mentor: 'Steve Weemaels',
    periode: '10 feb – 20 jun 2025',
    status: 'Goedgekeurd',
  },
  {
    student: 'Nassim El Ghzaoui',
    bedrijf: 'Ordina',
    mentor: 'David Van Steertegem',
    periode: '20 jan – 30 mei 2025',
    status: 'Actief',
  },
  {
    student: 'Soufiane Jay-Yufi',
    bedrijf: '—',
    mentor: '—',
    periode: '—',
    status: 'Geen aanvraag',
  },
];

export default function StagePage() {
  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Stage" />

      <div className="flex-1 p-6 bg-gray-50">
        {/* Nieuwe stage knop */}
        <div className="flex justify-end mb-6">
          <Link
            href="/admin/stage/stage-nieuw"
            className="bg-[#1A2E4A] text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-[#152438]"
          >
            + Nieuwe stage
          </Link>
        </div>

        {/* Tabel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Student</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Bedrijf</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Mentor (stage)</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Periode</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Status</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-400"></th>
              </tr>
            </thead>
            <tbody>
              {stages.map((s) => (
                <tr key={s.student} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-medium text-gray-900">{s.student}</td>
                  <td className="px-5 py-4 text-gray-600">{s.bedrijf}</td>
                  <td className="px-5 py-4 text-gray-600">{s.mentor}</td>
                  <td className="px-5 py-4 text-gray-600">{s.periode}</td>
                  <td className="px-5 py-4 text-gray-600">{s.status}</td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href="/admin/stage/stage-nieuw"
                      className="text-sm text-blue-600 hover:underline font-medium"
                    >
                      Detail
                    </Link>
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