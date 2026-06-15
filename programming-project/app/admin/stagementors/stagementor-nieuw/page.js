'use client';

import { useState } from 'react';
import Topbar from '../../component/topbar';

export default function StagementorNieuwPage() {
  const [form, setForm] = useState({
    voornaam: '',
    achternaam: '',
    email: '',
    wachtwoord: '',
    telefoon: '',
    rol: 'Stagementor',
    functie: '',
    bedrijfsnaam: '',
    adres: '',
    sector: '',
    website: '',
  });

  const update = (veld, waarde) =>
    setForm({
      ...form,
      [veld]: waarde,
    });

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent';

  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Stagementor" />

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Nieuwe stagementor aanmaken
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          Voeg een nieuwe stagementor toe aan het systeem
        </p>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <p className="text-xs text-gray-400 mb-4">
            Persoonlijke gegevens
          </p>

          <hr className="border-gray-100 mb-6" />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs text-gray-400 mb-4">
            Bedrijfsgegevens
          </p>

          <hr className="border-gray-100 mb-6" />
        </div>
      </div>
    </main>
  );
}