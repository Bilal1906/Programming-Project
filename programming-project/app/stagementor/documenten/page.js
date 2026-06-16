'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Topbar from '../component/topbar';
import { FileText, Download } from 'lucide-react';
import { fetchMetAuth } from '@/app/lib/fetchMetAuth';

export default function DocumentenPage() {
  const [stagiairs, setStagiairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ondertekend, setOndertekend] = useState({});

  useEffect(() => {
    fetchMetAuth('/api/stagementor/stagiairs')
      .then(res => res?.json())
      .then(data => {
        if (data) setStagiairs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleOndertekenen = async (stage_id) => {
    const response = await fetchMetAuth('/api/student/documenten/ondertekenen', {
      method: 'PUT',
      body: JSON.stringify({
        stage_id,
        type: 'stageovereenkomst'
      })
    });

    if (response?.ok) {
      setOndertekend(prev => ({ ...prev, [stage_id]: true }));
      alert('Document succesvol ondertekend!');
    } else {
      alert('Er is een fout opgetreden.');
    }
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
      <Topbar title="Documenten" subtitle="2025 - 2026" />

      <div className="p-6 flex flex-col gap-6">
        {stagiairs.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg px-5 py-10 text-center">
            <p className="text-sm text-gray-400">Geen stagiairs gevonden</p>
          </div>
        ) : (
          stagiairs.map((s) => (
            <div key={s.stage_id}>
              <p className="text-xs text-gray-400 mb-2">{s.voornaam} {s.achternaam}</p>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

                {/* Stageovereenkomst */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1e3a5f] grid place-items-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Stageovereenkomst</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {ondertekend[s.stage_id] ? 'Ondertekend' : 'Wacht op ondertekening'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {ondertekend[s.stage_id] ? (
                      <span className="text-sm font-medium text-[#3B6D11]">✓ Ondertekend</span>
                    ) : (
                      <button
                        onClick={() => handleOndertekenen(s.stage_id)}
                        className="px-4 py-1.5 bg-[#1e3a5f] text-white text-sm rounded-lg hover:opacity-90 cursor-pointer font-medium"
                      >
                        Document ondertekenen
                      </button>
                    )}
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                      <Download size={16} />
                      Downloaden
                    </button>
                  </div>
                </div>

                {/* Eindverslag */}
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#fef3c7] grid place-items-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-[#854F0B]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Eindverslag</p>
                      <p className="text-xs text-gray-400 mt-0.5">Nog niet opgeladen · Verwacht einde stage</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[#854F0B]">In afwachting</span>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}