'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Topbar from '../../component/topbar';

const competenties = [
  'De lerende professional beheerst het volledige project - of operationeel planningsproces',
  'De lerende professional ontwerpt IT-oplossingen volgens de industriestandaarden',
  'De lerende professional implementeert digitale producten in een professionele omgeving',
  'De lerende professional integreert technologie en infrastructuur binnen een professionele omgeving',
  'De lerende professional hanteert een onderzoekende houding om tot innovatieve oplossingen te komen',
  'De lerende professional communiceert helder en transparant in een professionele omgeving en/of in teamverband',
  'De lerende professional denkt kritisch na om problemen efficiënt en effectief op te lossen',
  'De lerende professional ziet persoonlijke ontwikkeling als de basis voor professionele groei',
  'De lerende professional ontwikkelt een professionele attitude en handelt kwaliteitsvol',
  'De lerende professional demonstreert ondernemend handelen in functie van waardecreatie',
  'De lerende professional handelt ethisch en deontologisch',
]

export default function EvaluatieDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [evaluatie, setEvaluatie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState('');
  const [scores, setScores] = useState(competenties.map(() => ''));
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || localStorage.getItem('token');

    if (!token) {
      router.push('/authentificator/login');
      return;
    }

    fetch('/api/stagementor/evaluaties', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        const gevonden = data.find(e => e.id === parseInt(id));
        setEvaluatie(gevonden);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleOpslaan = async () => {
    setFout('');
    setBezig(true);

    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || localStorage.getItem('token');

    const response = await fetch('/api/stagementor/evaluaties', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        evaluatie_id: parseInt(id),
        feedback,
        scores: scores.map((score, i) => ({
          competentie_id: i + 1,
          score: parseFloat(score) || 0,
          feedback: '',
        }))
      })
    });

    const data = await response.json();

    if (response.ok) {
      router.push('/stagementor/evaluaties');
    } else {
      setFout(data.fout);
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

  if (!evaluatie) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-sm text-gray-400">Evaluatie niet gevonden.</div>
      </div>
    );
  }

  return (
    <div>
      <Topbar
        title={`${evaluatie.type === 'tussentijds' ? 'Tussentijdse' : 'Finale'} evaluatie`}
        subtitle={`${evaluatie.student_voornaam} ${evaluatie.student_achternaam}`}
      />

      <div className="p-6 flex flex-col gap-4">

        {/* Info */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Student</p>
              <p className="text-sm font-medium">{evaluatie.student_voornaam} {evaluatie.student_achternaam}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Type</p>
              <p className="text-sm font-medium">{evaluatie.type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Status</p>
              <p className={`text-sm font-medium ${
                evaluatie.status === 'voltooid' ? 'text-[#3B6D11]' : 'text-[#1d4ed8]'
              }`}>
                {evaluatie.status === 'voltooid' ? 'Voltooid' : 'Nog in te vullen'}
              </p>
            </div>
          </div>
        </div>

        {/* Scores */}
        {evaluatie.status === 'open' && (
          <>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Competenties beoordelen</h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3">Competentie</th>
                    <th className="text-center text-xs font-semibold text-gray-600 pb-3 w-24">Score (0-4)</th>
                  </tr>
                </thead>
                <tbody>
                  {competenties.map((c, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="text-sm text-gray-800 py-3 pr-4">{c}</td>
                      <td className="py-3 w-24">
                        <input
                          type="number"
                          min="0"
                          max="4"
                          step="1"
                          className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400 text-center"
                          placeholder="0-4"
                          value={scores[i]}
                          onChange={e => {
                            const nieuw = [...scores];
                            nieuw[i] = e.target.value;
                            setScores(nieuw);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">Algemene feedback</h2>
              <textarea
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 h-24 resize-none"
                placeholder="Algemene feedback voor de student..."
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
              />
            </div>

            {fout && (
              <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-3 text-sm">
                {fout}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => router.push('/stagementor/evaluaties')}
                className="px-5 py-2 bg-white border border-gray-200 text-gray-600 text-sm rounded-lg font-medium hover:bg-gray-50 cursor-pointer"
              >
                ← Terug
              </button>
              <button
                onClick={handleOpslaan}
                disabled={bezig}
                className="px-5 py-2 bg-[#1e3a5f] text-white text-sm rounded-lg font-medium hover:bg-[#162d4a] cursor-pointer disabled:opacity-50"
              >
                {bezig ? 'Bezig...' : 'Evaluatie opslaan'}
              </button>
            </div>
          </>
        )}

        {evaluatie.status === 'voltooid' && (
          <button
            onClick={() => router.push('/stagementor/evaluaties')}
            className="px-5 py-2 bg-white border border-gray-200 text-gray-600 text-sm rounded-lg font-medium hover:bg-gray-50 cursor-pointer w-fit"
          >
            ← Terug naar overzicht
          </button>
        )}

      </div>
    </div>
  );
}