'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '../component/topbar';
import { ChevronRight } from 'lucide-react';

export default function StagiairsPage() {
  const [stagiairs, setStagiairs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/stagementor/stagiairs', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setStagiairs(data));
    }
  }, []);

  const getInitials = (voornaam, achternaam) => {
    return `${voornaam?.[0] ?? ''}${achternaam?.[0] ?? ''}`.toUpperCase();
  };

  const formatDatum = (datum) => {
    if (!datum) return '';
    return new Date(datum).toLocaleDateString('nl-BE', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    }).replace(/\//g, '/');
  };

  return (
    <div>
      <Topbar title="Mijn stagiairs" subtitle="2025–2026" />

      <div className="p-6 flex flex-col gap-3">
        {stagiairs.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg px-5 py-10 text-center">
            <p className="text-sm text-gray-400">Geen stagiairs gevonden</p>
          </div>
        ) : (
          stagiairs.map((s) => (
            <div
              key={s.stage_id}
              onClick={() => router.push(`/stagementor/stagiairs/${s.stage_id}`)}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#dbeafe] grid place-items-center text-xs font-bold text-[#1d4ed8] flex-shrink-0">
                    {getInitials(s.voornaam, s.achternaam)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {s.voornaam} {s.achternaam}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {s.email} · {s.telefoon}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-5 gap-4 px-5 py-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Opleiding</p>
                  <p className="text-sm font-medium text-gray-900">{s.opleiding}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Periode</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDatum(s.startdatum)} – {formatDatum(s.einddatum)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Docent</p>
                  <p className="text-sm font-medium text-gray-900">
                    {s.docent_voornaam} {s.docent_achternaam}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Week</p>
                  <p className="text-sm font-medium text-gray-900">
                    6 van {s.aantal_weken}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Status</p>
                  <p className="text-sm font-semibold text-orange-500">
                    1 logboek te keuren
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}