'use client';

import { useEffect, useState } from 'react';
import Topbar from '../component/topbar';
import { ChevronRight, BookOpen, Star, Users } from 'lucide-react';
import { fetchMetAuth } from '@/app/lib/fetchMetAuth';

export default function StagementorDashboard() {
  const [user, setUser] = useState(null);
  const [stagiairs, setStagiairs] = useState([]);

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || localStorage.getItem('token');

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    }

    fetchMetAuth('/api/stagementor/stagiairs')
      .then(res => res?.json())
      .then(data => {
        if (data) setStagiairs(data);
      });
  }, []);

  const getInitials = (voornaam, achternaam) => {
    return `${voornaam?.[0] ?? ''}${achternaam?.[0] ?? ''}`.toUpperCase();
  };

  return (
    <div>
      <Topbar title="Dashboard" subtitle="2025 - 2026" />

      <div className="p-6 flex flex-col gap-3">

        <div className="mb-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Welkom terug, {user ? user.voornaam : '...'}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Overzicht van uw stagiairs deze week
          </p>
        </div>

        <p className="text-xs text-gray-400">Mijn stagiairs</p>

        {stagiairs.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg px-5 py-10 flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gray-100 rounded-full grid place-items-center mb-1">
              <Users className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm font-semibold text-gray-600">Geen stagiairs toegewezen</p>
            <p className="text-xs text-gray-400">U heeft momenteel geen actieve stagiairs</p>
          </div>
        ) : (
          stagiairs.map((s) => (
            <div key={s.stage_id} className="bg-white border border-gray-200 rounded-lg flex items-center justify-between px-5 py-4 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#dbeafe] grid place-items-center text-xs font-bold text-[#1d4ed8] flex-shrink-0">
                  {getInitials(s.voornaam, s.achternaam)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {s.voornaam} {s.achternaam}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Stage loopt · Docent: {s.docent_voornaam} {s.docent_achternaam}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          ))
        )}

        <div className="grid grid-cols-2 gap-3">

          <div className="bg-white border border-gray-200 rounded-lg flex items-center justify-between px-5 py-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 grid place-items-center rounded flex-shrink-0">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Logboeken te keuren</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div className="bg-white border border-gray-200 rounded-lg flex items-center justify-between px-5 py-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 grid place-items-center rounded flex-shrink-0">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Evaluaties te doen</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

        </div>
      </div>
    </div>
  );
}