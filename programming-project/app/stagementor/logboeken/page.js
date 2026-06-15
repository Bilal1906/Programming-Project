'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '../component/topbar';

export default function LogboekenPage() {
  const router = useRouter();
  const [logboeken, setLogboeken] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || localStorage.getItem('token');

    if (token) {
      fetch('/api/stagementor/logboeken', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          setLogboeken(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  // Groepeer logboeken per student
  const perStudent = logboeken.reduce((acc, l) => {
    const naam = `${l.student_voornaam} ${l.student_achternaam}`;
    if (!acc[naam]) acc[naam] = [];
    acc[naam].push(l);
    return acc;
  }, {});

  const formatDatum = (datum) => {
    if (!datum) return '';
    return new Date(datum).toLocaleDateString('nl-BE', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-sm text-gray-400">Laden...</div>
      </div>
    );
  }

  return (
    <div>
      <Topbar title="Logboeken" subtitle="2025 - 2026" />

      <div className="p-6 flex flex-col gap-6">
        {Object.keys(perStudent).length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg px-5 py-10 text-center">
            <p className="text-sm text-gray-400">Geen logboeken gevonden</p>
          </div>
        ) : (
          Object.entries(perStudent).map(([naam, weken]) => (
            <div key={naam}>
              <p className="text-xs text-gray-400 mb-2">{naam}</p>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {weken.map((l, i) => (
                  <div
                    key={l.id}
                    onClick={() => router.push(`/stagementor/logboeken/${l.id}`)}
                    className={`flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 ${
                      i < weken.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Week {l.week_nummer}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {formatDatum(l.datum_van)} – {formatDatum(l.datum_tot)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-800" />
                        <span className="text-xs text-gray-500">{l.totaal_uren}u gelogd</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium ${
                        l.status === 'goedgekeurd' ? 'text-[#3B6D11]' :
                        l.status === 'ingediend' ? 'text-[#854F0B]' :
                        'text-gray-400'
                      }`}>
                        {l.status === 'goedgekeurd' ? 'Goedgekeurd' :
                         l.status === 'ingediend' ? 'Wacht op goedkeuring' :
                         l.status}
                      </span>
                      <span className="text-black text-[10px]">▸</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}