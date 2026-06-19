'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '../component/topbar';
import { fetchMetAuth } from '@/app/lib/fetchMetAuth';

export default function ProfielPage() {
  const router = useRouter();
  const [gebruiker, setGebruiker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [huidigWachtwoord, setHuidigWachtwoord] = useState('');
  const [nieuwWachtwoord, setNieuwWachtwoord] = useState('');
  const [bevestigWachtwoord, setBevestigWachtwoord] = useState('');
  const [bericht, setBericht] = useState('');
  const [fout, setFout] = useState('');

  useEffect(() => {
    fetchMetAuth('/api/user/profiel')
      .then(res => res?.json())
      .then(data => {
        if (data) setGebruiker(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleWachtwoordOpslaan = async (e) => {
    e.preventDefault();
    setFout('');
    setBericht('');

    if (nieuwWachtwoord !== bevestigWachtwoord) {
      setFout('Wachtwoorden komen niet overeen!');
      return;
    }

    const response = await fetchMetAuth('/api/user/profiel', {
      method: 'PUT',
      body: JSON.stringify({ huidigWachtwoord, nieuwWachtwoord })
    });

    if (!response) return;

    const data = await response.json();

    if (!response.ok) {
      setFout(data.fout);
    } else {
      setBericht('Wachtwoord succesvol gewijzigd!');
      setHuidigWachtwoord('');
      setNieuwWachtwoord('');
      setBevestigWachtwoord('');
    }
  };

  const handleUitloggen = () => {
    document.cookie = 'token=; path=/; max-age=0';
    document.cookie = 'rol=; path=/; max-age=0';
    router.push('/authentificator/login');
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-sm text-gray-400">Laden...</div>
      </div>
    );
  }

  return (
    <div>
      <Topbar title="Mijn profiel" />

      <div className="p-6 max-w-4xl">

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center font-semibold text-lg">
              {gebruiker?.voornaam?.[0]}{gebruiker?.achternaam?.[0]}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {gebruiker?.voornaam} {gebruiker?.achternaam}
              </h1>
              <p className="text-sm text-gray-500">Stagementor</p>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Persoonlijke gegevens</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <p className="text-xs text-gray-400">Voornaam</p>
              <p className="text-sm text-gray-900 mt-1">{gebruiker?.voornaam}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Achternaam</p>
              <p className="text-sm text-gray-900 mt-1">{gebruiker?.achternaam}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">E-mailadres</p>
              <p className="text-sm text-gray-900 mt-1">{gebruiker?.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Telefoon</p>
              <p className="text-sm text-gray-900 mt-1">{gebruiker?.telefoon}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Functie</p>
              <p className="text-sm text-gray-900 mt-1">Stagementor</p>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Wachtwoord wijzigen</h2>
          </div>
          <div className="p-6 space-y-4">
            <form onSubmit={handleWachtwoordOpslaan} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Huidig wachtwoord</label>
                <input
                  type="password"
                  placeholder="Uw huidig wachtwoord"
                  value={huidigWachtwoord}
                  onChange={e => setHuidigWachtwoord(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Nieuw wachtwoord</label>
                <input
                  type="password"
                  placeholder="Kies een nieuw wachtwoord"
                  value={nieuwWachtwoord}
                  onChange={e => setNieuwWachtwoord(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Bevestig nieuw wachtwoord</label>
                <input
                  type="password"
                  placeholder="Herhaal uw nieuw wachtwoord"
                  value={bevestigWachtwoord}
                  onChange={e => setBevestigWachtwoord(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
                />
              </div>
              {fout && <p className="text-red-500 text-xs">{fout}</p>}
              {bericht && <p className="text-green-500 text-xs">{bericht}</p>}
              <button
                type="submit"
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium px-4 py-2 rounded-md"
              >
                Wachtwoord opslaan
              </button>
            </form>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleUitloggen}
            className="border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-md text-sm font-medium"
          >
            Uitloggen
          </button>
        </div>

      </div>
    </div>
  );
}