'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '../component/topbar';

export default function ProfielPage() {
  const router = useRouter();
  const [vorig, setVorig] = useState('');
  const [nieuw, setNieuw] = useState('');
  const [bevestig, setBevestig] = useState('');

  const handleOpslaan = () => {
    if (!vorig || !nieuw || !bevestig) {
      alert('Vul alle velden in.');
      return;
    }
    if (nieuw !== bevestig) {
      alert('De nieuwe wachtwoorden komen niet overeen.');
      return;
    }
    if (window.confirm('Wachtwoord opslaan?')) {
      alert('Wachtwoord opgeslagen!');
      setVorig(''); setNieuw(''); setBevestig('');
    }
  };

  const handleUitloggen = () => {
    if (window.confirm('Weet u zeker dat u wilt uitloggen?')) {
      document.cookie = 'token=; path=/; max-age=0';
      document.cookie = 'rol=; path=/; max-age=0';
      router.push('/authentificator/login');
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent";

  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Profiel" />

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <div className="max-w-2xl flex flex-col gap-6">

          {/* Header card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#B5D4F4] text-[#0C447C] grid place-items-center text-xl font-bold flex-shrink-0">
                RD
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Ruben Dejonckheere</h2>
                <p className="text-sm text-gray-500">Admin</p>
                <p className="text-xs text-gray-400 mt-1">Erasmus Hogeschool Brussel</p>
              </div>
            </div>
          </div>

          {/* Persoonlijke gegevens */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-5">Persoonlijke gegevens</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <p className="text-xs text-gray-400 mb-1">Voornaam</p>
                <p className="text-sm font-medium text-gray-900">Ruben</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Achternaam</p>
                <p className="text-sm font-medium text-gray-900">Dejonckheere</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">E-mailadres</p>
                <p className="text-sm font-medium text-gray-900">ruben.dejonckheere@docent.ehb.be</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Telefoon</p>
                <p className="text-sm font-medium text-gray-900">+32 475 23 45 67</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">School</p>
                <p className="text-sm font-medium text-gray-900">Erasmus Hogeschool Brussel</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Functie</p>
                <p className="text-sm font-medium text-gray-900">Admin</p>
              </div>
            </div>
          </div>

          {/* Wachtwoord wijzigen */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-5">Wachtwoord wijzigen</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Huidig wachtwoord</label>
                <input type="password" value={vorig} onChange={(e) => setVorig(e.target.value)} placeholder="Uw huidig wachtwoord" className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Nieuw wachtwoord</label>
                <input type="password" value={nieuw} onChange={(e) => setNieuw(e.target.value)} placeholder="Kies een nieuw wachtwoord" className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Bevestig nieuw wachtwoord</label>
                <input type="password" value={bevestig} onChange={(e) => setBevestig(e.target.value)} placeholder="Herhaal uw nieuwe wachtwoord" className={inputClass} />
              </div>
              <div>
                <button onClick={handleOpslaan} className="bg-[#1a56db] text-white text-sm px-5 py-2.5 rounded-lg font-medium hover:bg-[#1849b8]">
                  Wachtwoord opslaan
                </button>
              </div>
            </div>
          </div>

          {/* Uitloggen */}
          <div>
            <button onClick={handleUitloggen} className="bg-white border border-red-200 text-red-500 text-sm px-5 py-2.5 rounded-lg font-medium hover:bg-red-50 inline-flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Uitloggen
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}