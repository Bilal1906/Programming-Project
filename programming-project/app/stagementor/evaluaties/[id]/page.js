'use client';

import { useState } from 'react';
import Topbar from '../../component/topbar';

// niveaus van de rubriek
const NIVEAUS = [
  { score: 1, label: 'Onvoldoende', kleur: '#dc2626' },
  { score: 2, label: 'In ontwikkeling', kleur: '#3b82f6' },
  { score: 3, label: 'Voldoende', kleur: '#16a34a' },
  { score: 4, label: 'Sterk', kleur: '#1e3a5f' },
];

const COMPETENTIES = [
  'D1. De lerende professional beheerst het volledige project- of operationeel planningsproces',
  'D2. De lerende professional ontwerpt IT-oplossingen volgens de industriestandaarden',
  'D3. De lerende professional implementeert digitale producten in een professionele omgeving',
  'D4. De lerende professional integreert technologie en infrastructuur binnen een professionele omgeving',
  'D5. De lerende professional hanteert een onderzoekende houding om tot innovatieve oplossingen te komen',
  'D6. De lerende professional communiceert helder en transparant in een professionele omgeving en/of in teamverband',
  'D7. De lerende professional denkt kritisch na om problemen efficiënt en effectief op te lossen',
  'D8. De lerende professional ziet persoonlijke ontwikkeling als de basis voor professionele groei',
  'D9. De lerende professional ontwikkelt een professionele attitude en handelt kwaliteitsvol',
  'D10. De lerende professional demonstreert ondernemend handelen in functie van waardecreatie',
  'D11. De lerende professional handelt ethisch en deontologisch',
];

export default function EvaluatieDetailPage() {
  const [tab, setTab] = useState('tussentijds');

  const [commentaren, setCommentaren] = useState(
    COMPETENTIES.map(() => '')
  );

  const updateCommentaar = (index, value) => {
    const copy = [...commentaren];
    copy[index] = value;
    setCommentaren(copy);
  };

  return (
    <div>
      <Topbar
        title="Bilal Jaaboub — Tussentijdse evaluatie"
        backHref="/stagementor/evaluaties"
        backLabel="Evaluaties"
      />

      <div className="p-6 flex flex-col gap-4">

        {/* TABS */}
        <div className="flex gap-6 border-b border-gray-200">
          <button
            onClick={() => setTab('tussentijds')}
            className={`pb-2 text-sm font-medium ${
              tab === 'tussentijds'
                ? 'text-gray-900 border-b-2 border-[#1e3a5f]'
                : 'text-gray-400'
            }`}
          >
            Tussentijds
          </button>

          <button
            onClick={() => setTab('finaal')}
            className={`pb-2 text-sm font-medium ${
              tab === 'finaal'
                ? 'text-gray-900 border-b-2 border-[#1e3a5f]'
                : 'text-gray-400'
            }`}
          >
            Finaal
          </button>
        </div>

        {/* RUBRIEK LEGENDE */}
        <div className="flex items-center gap-5 flex-wrap">
          <span className="text-xs font-semibold text-gray-500">
            Rubriek:
          </span>

          {NIVEAUS.map((n) => (
            <div key={n.score} className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded-full grid place-items-center text-[10px] font-bold text-white"
                style={{ backgroundColor: n.kleur }}
              >
                {n.score}
              </span>

              <span className="text-xs text-gray-500">
                {n.label}
              </span>
            </div>
          ))}
        </div>

        {/* COMPETENTIES + COMMENTAAR */}
        <div className="flex flex-col gap-4">
          {COMPETENTIES.map((competentie, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md overflow-hidden"
            >
              <div className="p-4">
                <p className="text-sm text-gray-700">
                  {competentie}
                </p>
              </div>

              <div className="border-t border-gray-200 bg-gray-50 p-3">
                <textarea
                  rows={3}
                  value={commentaren[index]}
                  onChange={(e) =>
                    updateCommentaar(index, e.target.value)
                  }
                  placeholder="Schrijf je commentaar hier..."
                  className="w-full bg-transparent resize-none outline-none text-sm"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}