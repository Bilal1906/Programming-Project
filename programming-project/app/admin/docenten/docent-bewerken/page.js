'use client';

import { useState } from 'react';
import Topbar from '../../component/topbar';

export default function DocentBewerkenPage() {
  const [form, setForm] = useState({
    voornaam: 'Steve',
    achternaam: 'Weemaels',
    email: 'steve.weemaels@docent.ehb.be',
    wachtwoord: 'Steve12345!',
    telefoon: '+32 470 11 22 33',
    rol: 'Docent',
    id: '#65432',
    timeOfCreation: '03/03/2026 16:04',
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
      <Topbar title="Docent" />

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Docent bewerken
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          Bewerk de gegevens van een docent
        </p>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs text-gray-400 mb-4">
            {form.voornaam} {form.achternaam}
          </p>

          <hr className="border-gray-100 mb-6" />
        </div>
      </div>
    </main>
  );
}