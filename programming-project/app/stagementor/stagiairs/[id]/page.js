'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Topbar from '../../component/topbar';
import { BookOpen, Star, Paperclip } from 'lucide-react';

export default function StagiairDetailPage() {
  const { id } = useParams();
  const [stagiair, setStagiair] = useState(null);

 useEffect(() => {
  const token = localStorage.getItem('token');

  if (token && id) {
    fetch(`/api/stagementor/stagiairs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        console.log("DATA API:", data);
        setStagiair(data);
      });
  }
}, [id]);

  const getInitials = (voornaam, achternaam) => {
    return `${voornaam?.[0] ?? ''}${achternaam?.[0] ?? ''}`.toUpperCase();
  };

  const formatDatum = (datum) => {
    if (!datum) return '';
    return new Date(datum).toLocaleDateString('nl-BE', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  if (!stagiair) {
    return (
      <div>
        <Topbar title="Laden..." backHref="/stagementor/stagiairs" backLabel="Mijn stagiairs" />
        <div className="p-6 text-sm text-gray-400">Laden...</div>
      </div>
    );
  }

  return (
    <div>
      <Topbar
        title={`${stagiair.voornaam} ${stagiair.achternaam}`}
        backHref="/stagementor/stagiairs"
        backLabel="Mijn stagiairs"
      />

      <div className="p-6 flex flex-col gap-4">

        {/* STUDENT INFO */}
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#dbeafe] grid place-items-center text-sm font-bold text-[#1d4ed8] flex-shrink-0">
              {getInitials(stagiair.voornaam, stagiair.achternaam)}
            </div>
            <div>
              <p className="text-base font-bold text-gray-900">
                {stagiair.voornaam} {stagiair.achternaam}
              </p>
              <div className="flex items-center gap-3 mt-0.5">
                <p className="text-xs text-gray-400">{stagiair.email}</p>
                <p className="text-xs text-gray-400">{stagiair.telefoon}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 border-t border-gray-100 pt-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Opleiding</p>
              <p className="text-sm font-medium text-gray-900">{stagiair.opleiding}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Stageperiode</p>
              <p className="text-sm font-medium text-gray-900">
                {formatDatum(stagiair.startdatum)} – {formatDatum(stagiair.einddatum)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Docent</p>
              <p className="text-sm font-medium text-gray-900">
                {stagiair.docent_voornaam} {stagiair.docent_achternaam}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Bedrijf</p>
              <p className="text-sm font-medium text-gray-900">{stagiair.bedrijf_naam}</p>
            </div>
          </div>
        </div>

        {/* ACTIE KAARTEN */}
        <div className="grid grid-cols-3 gap-4">

          <div className="bg-white border border-gray-200 rounded-lg px-5 py-4 cursor-pointer">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-7 h-7 bg-gray-900 grid place-items-center rounded flex-shrink-0">
                <BookOpen className="w-3.5 h-3.5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Logboeken</p>
            </div>
            <p className="text-xs text-orange-500 font-medium">1 te keuren</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg px-5 py-4 cursor-pointer">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-7 h-7 bg-gray-900 grid place-items-center rounded flex-shrink-0">
                <Star className="w-3.5 h-3.5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Evaluaties</p>
            </div>
            <p className="text-xs text-gray-400">Te doen</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg px-5 py-4 cursor-pointer">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-7 h-7 bg-gray-900 grid place-items-center rounded flex-shrink-0">
                <Paperclip className="w-3.5 h-3.5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Documenten</p>
            </div>
            <p className="text-xs text-gray-400">2 bestanden</p>
          </div>

        </div>
      </div>
    </div>
  );
}
