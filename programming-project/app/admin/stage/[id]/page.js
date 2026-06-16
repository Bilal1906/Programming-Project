'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Topbar from '../../component/topbar';

export default function StageDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [stage, setStage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [bezig, setBezig] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || localStorage.getItem('token');

    if (!token) {
      router.push('/authentificator/login');
      return;
    }

    fetch('/api/admin/stages', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        const gevonden = data.find(s => s.id === parseInt(id));
        setStage(gevonden);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleStatusUpdate = async (nieuweStatus) => {
    setBezig(true);

    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || localStorage.getItem('token');

    const response = await fetch('/api/admin/stages', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        id: parseInt(id),
        status: nieuweStatus,
        feedback_commissie: feedback
      })
    });

    const data = await response.json();

    if (response.ok) {
      router.push('/admin/stage');
    } else {
      alert(data.fout);
      setBezig(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-sm text-gray-400">Laden...</div>
      </div>
    );
  }

  if (!stage) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-sm text-gray-400">Stage niet gevonden.</div>
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Stage detail" />

      <div className="flex-1 p-6 bg-gray-50">
        <div className="max-w-3xl flex flex-col gap-4">

          {/* Student + bedrijf info */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {stage.student_voornaam} {stage.student_achternaam}
              </h2>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                stage.status === 'ingediend' ? 'bg-orange-50 text-orange-600 border border-orange-200' :
                stage.status === 'goedgekeurd' ? 'bg-green-50 text-green-600 border border-green-200' :
                stage.status === 'afgekeurd' ? 'bg-red-50 text-red-600 border border-red-200' :
                'bg-gray-100 text-gray-600'
              }`}>
                {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Student</p>
                <p className="text-sm font-medium">{stage.student_voornaam} {stage.student_achternaam}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">E-mail</p>
                <p className="text-sm font-medium">{stage.student_email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Bedrijf</p>
                <p className="text-sm font-medium">{stage.bedrijf_naam}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Stagementor</p>
                <p className="text-sm font-medium">{stage.mentor_voornaam} {stage.mentor_achternaam}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Docent</p>
                <p className="text-sm font-medium">{stage.docent_voornaam} {stage.docent_achternaam}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Periode</p>
                <p className="text-sm font-medium">
                  {new Date(stage.startdatum).toLocaleDateString('nl-BE')} – {new Date(stage.einddatum).toLocaleDateString('nl-BE')}
                </p>
              </div>
            </div>
          </div>

          {/* Feedback */}
          {stage.status === 'ingediend' && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Feedback (optioneel)</h3>
              <textarea
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 h-24 resize-none"
                placeholder="Geef feedback aan de student..."
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
              />
            </div>
          )}

          {/* Acties */}
          {stage.status === 'ingediend' && (
            <div className="flex gap-3">
              <button
                onClick={() => handleStatusUpdate('goedgekeurd')}
                disabled={bezig}
                className="px-6 py-2.5 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 cursor-pointer disabled:opacity-50"
              >
                ✓ Goedkeuren
              </button>
              <button
                onClick={() => handleStatusUpdate('aanpassingen')}
                disabled={bezig}
                className="px-6 py-2.5 bg-orange-500 text-white text-sm rounded-lg font-medium hover:bg-orange-600 cursor-pointer disabled:opacity-50"
              >
                Aanpassingen vragen
              </button>
              <button
                onClick={() => handleStatusUpdate('afgekeurd')}
                disabled={bezig}
                className="px-6 py-2.5 bg-red-600 text-white text-sm rounded-lg font-medium hover:bg-red-700 cursor-pointer disabled:opacity-50"
              >
                ✗ Afkeuren
              </button>
              <button
                onClick={() => router.push('/admin/stage')}
                className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 text-sm rounded-lg font-medium hover:bg-gray-50 cursor-pointer"
              >
                ← Terug
              </button>
            </div>
          )}

          {stage.status !== 'ingediend' && (
            <button
              onClick={() => router.push('/admin/stage')}
              className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 text-sm rounded-lg font-medium hover:bg-gray-50 cursor-pointer w-fit"
            >
              ← Terug naar overzicht
            </button>
          )}

        </div>
      </div>
    </main>
  );
}