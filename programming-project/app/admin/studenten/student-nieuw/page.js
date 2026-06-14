'use client';

import { useState } from 'react';
import Topbar from '../../component/topbar';

export default function StudentNieuwPage() {
  const [form, setForm] = useState({
    voornaam: '',
    achternaam: '',
    email: '',
    wachtwoord: '',
    telefoon: '',
    rol: 'Student',
    opleiding: 'Toegepaste Informatica',
    academiejaar: '',
    adres: '',
  });

  const update = (veld, waarde) => {
    setForm({
      ...form,
      [veld]: waarde,
    });
  };

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent';

  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Student" />

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Nieuwe student aanmaken
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          Voeg een nieuwe student toe aan het systeem
        </p>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        </div>
      </div>
    </main>
  );
}