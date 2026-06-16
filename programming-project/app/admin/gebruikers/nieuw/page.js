'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '../../component/topbar';
import { fetchMetAuth } from '@/app/lib/fetchMetAuth';

export default function NieuweGebruikerPage() {
  const router = useRouter();
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState('');

  const [form, setForm] = useState({
    voornaam: '',
    achternaam: '',
    email: '',
    telefoon: '',
    rol: 'student',
    wachtwoord: '',
    bevestigWachtwoord: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFout('');

    if (!form.voornaam || !form.achternaam || !form.email || !form.wachtwoord) {
      setFout('Vul alle verplichte velden in!');
      return;
    }

    if (form.wachtwoord !== form.bevestigWachtwoord) {
      setFout('Wachtwoorden komen niet overeen!');
      return;
    }

    setBezig(true);

    const response = await fetchMetAuth('/api/admin/gebruikers', {
      method: 'POST',
      body: JSON.stringify({
        voornaam: form.voornaam,
        achternaam: form.achternaam,
        email: form.email,
        telefoon: form.telefoon,
        rol: form.rol,
        wachtwoord: form.wachtwoord,
      })
    });

    if (!response) return;

    const data = await response.json();

    if (!response.ok) {
      setFout(data.fout);
      setBezig(false);
    } else {
      router.push('/admin/studenten');
    }
  };

  const inputStyle = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400";
  const labelStyle = "block text-xs text-gray-500 mb-1";

  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Nieuwe gebruiker" />

      <div className="flex-1 p-6 bg-gray-50">
        <div className="max-w-2xl">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Nieuwe gebruiker aanmaken</h2>
            <p className="text-sm text-gray-400">Voeg een nieuwe student, docent of stagementor toe aan het systeem.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Persoonlijke gegevens</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>Voornaam *</label>
                  <input
                    type="text"
                    className={inputStyle}
                    placeholder="Voornaam"
                    value={form.voornaam}
                    onChange={e => setForm({...form, voornaam: e.target.value})}
                  />
                </div>
                <div>
                  <label className={labelStyle}>Achternaam *</label>
                  <input
                    type="text"
                    className={inputStyle}
                    placeholder="Achternaam"
                    value={form.achternaam}
                    onChange={e => setForm({...form, achternaam: e.target.value})}
                  />
                </div>
                <div>
                  <label className={labelStyle}>E-mailadres *</label>
                  <input
                    type="email"
                    className={inputStyle}
                    placeholder="naam@ehb.be"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className={labelStyle}>Telefoon</label>
                  <input
                    type="text"
                    className={inputStyle}
                    placeholder="+32 ..."
                    value={form.telefoon}
                    onChange={e => setForm({...form, telefoon: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <label className={labelStyle}>Rol *</label>
                  <select
                    className={inputStyle}
                    value={form.rol}
                    onChange={e => setForm({...form, rol: e.target.value})}
                  >
                    <option value="student">Student</option>
                    <option value="docent">Docent</option>
                    <option value="stagementor">Stagementor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Wachtwoord instellen</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>Wachtwoord *</label>
                  <input
                    type="password"
                    className={inputStyle}
                    placeholder="Kies een wachtwoord"
                    value={form.wachtwoord}
                    onChange={e => setForm({...form, wachtwoord: e.target.value})}
                  />
                </div>
                <div>
                  <label className={labelStyle}>Bevestig wachtwoord *</label>
                  <input
                    type="password"
                    className={inputStyle}
                    placeholder="Herhaal wachtwoord"
                    value={form.bevestigWachtwoord}
                    onChange={e => setForm({...form, bevestigWachtwoord: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {fout && (
              <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-3 text-sm">
                {fout}
              </div>
            )}

            <div className="flex gap-3 pb-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                ← Annuleren
              </button>
              <button
                type="submit"
                disabled={bezig}
                className="px-5 py-2 text-sm bg-[#1A2E4A] text-white rounded-lg hover:bg-[#152438] cursor-pointer font-medium disabled:opacity-50"
              >
                {bezig ? 'Bezig...' : 'Gebruiker aanmaken'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}