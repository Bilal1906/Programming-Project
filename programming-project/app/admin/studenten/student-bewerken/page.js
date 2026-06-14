'use client';

import { useState } from 'react';
import Topbar from '../../component/topbar';

export default function StudentBewerkenPage() {
  const [form, setForm] = useState({
    voornaam: 'Bilal',
    achternaam: 'Jaaboub',
    email: 'bilal.jaaboub@student.ehb.be',
    wachtwoord: 'Bilal12345!',
    telefoon: '+32 470 11 22 33',
    rol: 'Student',
    id: '#12345678',
    timeOfCreation: '03/03/2025 16:04',
    opleiding: 'Toegepaste Informatica',
    academiejaar: '2025-2026',
    adres: 'Kerkstraat 123, Molenbeek, Brussel',
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
          Student bewerken
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          Bewerk de gegevens van een student
        </p>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs text-gray-400 mb-4">
            Bilal Jaaboub
          </p>

          <hr className="border-gray-100 mb-6" />
        </div>
      </div>
    </main>
  );
}