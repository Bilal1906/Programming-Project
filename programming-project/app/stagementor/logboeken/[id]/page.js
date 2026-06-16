'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Topbar from '../../component/topbar';
import { fetchMetAuth } from '@/app/lib/fetchMetAuth';

export default function LogboekDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [logboek, setLogboek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bezig, setBezig] = useState(false);

  useEffect(() => {
    fetchMetAuth('/api/stagementor/logboeken')
      .then(res => res?.json())
      .then(data => {
        if (!data) return;
        const gevonden = data.find(l => l.id === parseInt(id));
        setLogboek(gevonden);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleGoedkeuren = async (nieuweStatus) => {
    setBezig(true);

    const response = await fetchMetAuth('/api/stagementor/logboeken', {
      method: 'PUT',
      body: JSON.stringify({
        id: parseInt(id),
        status: nieuweStatus,
      })
    });

    if (!response) return;

    const data = await response.json();

    if (response.ok) {
      router.push('/stagementor/logboeken');
    } else {
      alert(data.fout);
      setBezig(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-sm text-gray-400">Laden...</div>
      </div>
    );
  }

  if (!logboek) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-sm text-gray-400">Logboek niet gevonden.</div>
      </div>
    );
  }

  return (
    <div>
      <Topbar
        title={`Logboek Week ${logboek.week_nummer}`}
        subtitle={`${logboek.student_voornaam} ${logboek.student_achternaam} · ${new Date(logboek.datum_van).toLocaleDateString('nl-BE')} - ${new Date(logboek.datum_tot).toLocaleDateString('nl-BE')}`}
      />

      <div className="p-6 flex flex-col gap-4">

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Student</p>
              <p className="text-sm font-medium">{logboek.student_voornaam} {logboek.student_achternaam}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Periode</p>
              <p className="text-sm font-medium">
                {new Date(logboek.datum_van).toLocaleDateString('nl-BE')} – {new Date(logboek.datum_tot).toLocaleDateString('nl-BE')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Totaal uren</p>
              <p className="text-sm font-medium">{logboek.totaal_uren}u</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Status</p>
              <p className={`text-sm font-medium ${
                logboek.status === 'goedgekeurd' ? 'text-[#3B6D11]' :
                logboek.status === 'ingediend' ? 'text-[#854F0B]' :
                'text-gray-600'
              }`}>
                {logboek.status === 'goedgekeurd' ? 'Goedgekeurd' :
                 logboek.status === 'ingediend' ? 'Wacht op goedkeuring' :
                 logboek.status}
              </p>
            </div>
          </div>
        </div>

        {logboek.status === 'ingediend' && (
          <div className="flex gap-3">
            <button
              onClick={() => handleGoedkeuren('goedgekeurd')}
              disabled={bezig}
              className="px-5 py-2 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 cursor-pointer disabled:opacity-50"
            >
              ✓ Goedkeuren
            </button>
            <button
              onClick={() => handleGoedkeuren('afgekeurd')}
              disabled={bezig}
              className="px-5 py-2 bg-red-600 text-white text-sm rounded-lg font-medium hover:bg-red-700 cursor-pointer disabled:opacity-50"
            >
              ✗ Afkeuren
            </button>
            <button
              onClick={() => router.push('/stagementor/logboeken')}
              className="px-5 py-2 bg-white border border-gray-200 text-gray-600 text-sm rounded-lg font-medium hover:bg-gray-50 cursor-pointer"
            >
              ← Terug
            </button>
          </div>
        )}

        {logboek.status !== 'ingediend' && (
          <button
            onClick={() => router.push('/stagementor/logboeken')}
            className="px-5 py-2 bg-white border border-gray-200 text-gray-600 text-sm rounded-lg font-medium hover:bg-gray-50 cursor-pointer w-fit"
          >
            ← Terug naar overzicht
          </button>
        )}

      </div>
    </div>
  );
}