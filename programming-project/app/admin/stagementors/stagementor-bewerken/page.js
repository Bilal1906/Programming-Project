'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '../../component/topbar';

export default function StagementorBewerkenPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    voornaam: 'Lars',
    achternaam: 'Vermeulen',
    email: 'lars.vermeulen@gmail.com',
    wachtwoord: 'Lars12345!',
    telefoon: '+32 470 11 22 33',
    rol: 'Stagementor',
    id: '#65432',
    timeOfCreation: '03/03/2026 16:04',
    bedrijfsId: '#62',
    functie: 'IT consultant',
  });

  const update = (veld, waarde) => setForm({ ...form, [veld]: waarde });

  const handleOpslaan = () => {
    if (window.confirm('Wijzigingen opslaan?')) {
      alert('Opgeslagen!');
      router.push('/admin/stagementors');
    }
  };

  const handleAnnuleren = () => router.push('/admin/stagementors');

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent";

  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Stagementor" />

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Stagementor bewerken</h2>
        <p className="text-sm text-gray-400 mb-6">Bewerk de gegevens van een stagementor</p>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs text-gray-400 mb-4">{form.voornaam} {form.achternaam}</p>
          <hr className="border-gray-100 mb-6" />

          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Voornaam</label>
              <input type="text" value={form.voornaam} onChange={(e) => update('voornaam', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Achternaam</label>
              <input type="text" value={form.achternaam} onChange={(e) => update('achternaam', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Email</label>
              <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Wachtwoord</label>
              <input type="text" value={form.wachtwoord} onChange={(e) => update('wachtwoord', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Telefoon</label>
              <input type="tel" value={form.telefoon} onChange={(e) => update('telefoon', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Rol</label>
              <input type="text" value={form.rol} onChange={(e) => update('rol', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">ID</label>
              <input type="text" value={form.id} disabled className={`${inputClass} bg-gray-50 text-gray-500`} />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Time of Creation</label>
              <input type="text" value={form.timeOfCreation} disabled className={`${inputClass} bg-gray-50 text-gray-500`} />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Bedrijfs ID</label>
              <input type="text" value={form.bedrijfsId} disabled className={`${inputClass} bg-gray-50 text-gray-500`} />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Functie</label>
              <input type="text" value={form.functie} onChange={(e) => update('functie', e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Actieknoppen */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={handleAnnuleren} className="bg-white border border-gray-200 text-gray-700 text-sm px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50">
            Annuleren
          </button>
          <button onClick={handleOpslaan} className="bg-[#1A2E4A] text-white text-sm px-5 py-2.5 rounded-lg font-medium hover:bg-[#152438]">
            Opslaan
          </button>
        </div>
      </div>
    </main>
  );
}