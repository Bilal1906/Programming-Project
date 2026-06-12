'use client';

import { useState } from 'react';
import Topbar from '../../component/topbar';

// niveaus van de rubriek
const NIVEAUS = [
  { score: 1, label: 'Onvoldoende',    kleur: '#dc2626' },
  { score: 2, label: 'In ontwikkeling', kleur: '#3b82f6' },
  { score: 3, label: 'Voldoende',       kleur: '#16a34a' },
  { score: 4, label: 'Sterk',           kleur: '#1e3a5f' },
];

export default function EvaluatieDetailPage() {
  const [tab, setTab] = useState('tussentijds');

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
          <span className="text-xs font-semibold text-gray-500">Rubriek:</span>
          {NIVEAUS.map((n) => (
            <div key={n.score} className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded-full grid place-items-center text-[10px] font-bold text-white"
                style={{ backgroundColor: n.kleur }}
              >
                {n.score}
              </span>
              <span className="text-xs text-gray-500">{n.label}</span>
            </div>
          ))}
        </div>

        {/* competenties volgen in commit 2 */}

      </div>
    </div>
  );
}