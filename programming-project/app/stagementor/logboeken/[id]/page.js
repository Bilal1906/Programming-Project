'use client';

import { useState } from 'react';
import Topbar from '../../component/topbar';

export default function LogboekDetailPage() {
  const [goedgekeurd, setGoedgekeurd] = useState(false);

  return (
    <div>
      <Topbar
        title="Logboek Bilal Jaaboub — Week 6"
        backHref="/stagementor/logboeken"
        backLabel="Logboeken"
      />

      <div className="p-6 flex flex-col gap-4">

        {/* HEADER */}
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#dbeafe] grid place-items-center text-sm font-bold text-[#1d4ed8] flex-shrink-0">
              BJ
            </div>
            <div>
              <p className="text-base font-bold text-gray-900">Bilal Jaaboub — Week 6</p>
              <p className="text-xs text-gray-400 mt-0.5">27 jan – 31 jan 2025 · 40u gelogd</p>
            </div>
          </div>
          <span className={`text-xs font-medium ${goedgekeurd ? 'text-[#3B6D11]' : 'text-[#854F0B]'}`}>
            {goedgekeurd ? 'Goedgekeurd' : 'Wacht op goedkeuring'}
          </span>
        </div>

        {/* MAANDAG */}
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-4">
          <div className="flex items-start justify-between">
            <p className="text-sm font-semibold text-gray-900">Maandag 27 januari</p>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-gray-800" />
              <span className="text-xs text-gray-400">8u</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Implementatie REST API voor gebruikersbeheer. CRUD-endpoints aangemaakt en getest met Postman. Documentatie bijgewerkt.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs px-2 py-1 rounded bg-[#eff6ff] text-[#1d4ed8] font-medium">D3 · Implementeren</span>
            <span className="text-xs px-2 py-1 rounded bg-[#eff6ff] text-[#1d4ed8] font-medium">D2 · Oplossingen ontwerpen</span>
          </div>
        </div>

        {/* DINSDAG */}
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-4">
          <div className="flex items-start justify-between">
            <p className="text-sm font-semibold text-gray-900">Dinsdag 28 januari</p>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-gray-800" />
              <span className="text-xs text-gray-400">8u</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Unit tests geschreven voor de nieuwe API-endpoints. Stand-up bijgewoond en taken afgestemd met het team.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs px-2 py-1 rounded bg-[#eff6ff] text-[#1d4ed8] font-medium">D6 · Communiceren</span>
            <span className="text-xs px-2 py-1 rounded bg-[#eff6ff] text-[#1d4ed8] font-medium">D3 · Implementeren</span>
          </div>
        </div>

        {/* WOENSDAG */}
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-4">
          <div className="flex items-start justify-between">
            <p className="text-sm font-semibold text-gray-900">Woensdag 29 januari</p>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-gray-800" />
              <span className="text-xs text-gray-400">8u</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Bug gefixt in de authenticatiemodule. Zelfstandig de oorzaak opgespoord en opgelost zonder hulp van collega&apos;s.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs px-2 py-1 rounded bg-[#eff6ff] text-[#1d4ed8] font-medium">D7 · Kritisch denken</span>
            <span className="text-xs px-2 py-1 rounded bg-[#eff6ff] text-[#1d4ed8] font-medium">D8 · Persoonlijke ontwikkeling</span>
          </div>
        </div>

        {/* DONDERDAG */}
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-4">
          <div className="flex items-start justify-between">
            <p className="text-sm font-semibold text-gray-900">Donderdag 30 januari</p>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-gray-800" />
              <span className="text-xs text-gray-400">8u</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Documentatie bijgewerkt voor de nieuwe endpoints. Overleg gehad met de product owner over de roadmap voor sprint 3.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs px-2 py-1 rounded bg-[#eff6ff] text-[#1d4ed8] font-medium">D6 · Communiceren</span>
            <span className="text-xs px-2 py-1 rounded bg-[#eff6ff] text-[#1d4ed8] font-medium">D1 · Projectplanning</span>
          </div>
        </div>

        {/* VRIJDAG */}
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-4">
          <div className="flex items-start justify-between">
            <p className="text-sm font-semibold text-gray-900">Vrijdag 31 januari</p>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-gray-800" />
              <span className="text-xs text-gray-400">8u</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Sprint review gepresenteerd aan het team. Feedback verwerkt en nieuwe sprint backlog opgesteld voor volgende week.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs px-2 py-1 rounded bg-[#eff6ff] text-[#1d4ed8] font-medium">D6 · Communiceren</span>
            <span className="text-xs px-2 py-1 rounded bg-[#eff6ff] text-[#1d4ed8] font-medium">D5 · Onderzoekende houding</span>
          </div>
        </div>

        {/* GOEDKEUREN KNOP */}
        <div className="flex justify-end">
          <button
            onClick={() => setGoedgekeurd(true)}
            disabled={goedgekeurd}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white ${
              goedgekeurd ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1e3a5f] hover:bg-[#162d49] cursor-pointer'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            {goedgekeurd ? 'Goedgekeurd' : 'Logboek goedkeuren'}
          </button>
        </div>

      </div>
    </div>
  );
}