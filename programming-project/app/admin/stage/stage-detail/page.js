'use client';

import { useState } from 'react';
import Link from 'next/link';
import Topbar from '../../component/topbar';

export default function StageDetailPage() {
  const [form, setForm] = useState({
    naam: 'Bilal Jaaboub',
    opleiding: 'Toegepaste Informatica',
    academiejaar: '2025 - 2026',
    email: 'bilal.jaaboub@student.ehb.be',
    telefoon: '+32 470 11 22 33',
    docent: 'Joachim Quartier',
    bedrijfsnaam: 'Accenture Belgium',
    adres: 'Moutstraat 25, 1000 Brussel',
    sector: 'IT-consultancy',
    website: 'https://www.accenture.com/be',
    mentorVoornaam: 'Steve',
    mentorAchternaam: 'Weemaels',
    mentorEmail: 'steve.weemaels@accenture.com',
    mentorTelefoon: '+32 470 99 88 77',
    mentorFunctie: 'Senior Software Engineer',
    opdracht: 'Ontwikkeling van interne tooling voor projectopvolging met React en .NET. Focus op API-integraties en unit testing.',
    startdatum: '2025-02-03',
    einddatum: '2025-06-27',
    feedback: '',
  });

  const update = (veld, waarde) => setForm({ ...form, [veld]: waarde });

  const handleGoedkeuren = () => { if (window.confirm('Weet u zeker dat u deze stage wilt goedkeuren?')) alert('Stage goedgekeurd!'); };
  const handleAanpassingen = () => { if (window.confirm('Aanpassingen vereist versturen?')) alert('Aanpassingen vereist verstuurd!'); };
  const handleAfkeuren = () => { if (window.confirm('Weet u zeker dat u deze stage wilt afkeuren?')) alert('Stage afgekeurd!'); };

  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Stage" />

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Stage bewerken</h2>
        <p className="text-sm text-gray-400 mb-6">
          Bekijk en pas de stagegegevens aan
        </p>

        <div className="flex gap-6">
          <div className="flex-1 flex flex-col gap-6">

            {/* Studentgegevens */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">Studentgegevens</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Naam</label>
                  <input type="text" value={form.naam} onChange={(e) => update('naam', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Opleiding</label>
                  <input type="text" value={form.opleiding} onChange={(e) => update('opleiding', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Academiejaar</label>
                  <input type="text" value={form.academiejaar} onChange={(e) => {
                    let v = e.target.value.replace(/[^0-9\-\s]/g, '');
                    if (v.length === 4 && !v.includes('-')) v += ' - ';
                    if (v.length <= 11) update('academiejaar', v);
                  }} placeholder="bv. 2025 - 2026" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">E-mail</label>
                  <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Telefoon</label>
                  <input type="tel" value={form.telefoon} onChange={(e) => update('telefoon', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
                </div>
              </div>
            </div>

            {/* Bedrijfsgegevens */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">Bedrijfsgegevens</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Bedrijfsnaam</label>
                  <input type="text" value={form.bedrijfsnaam} onChange={(e) => update('bedrijfsnaam', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Adres</label>
                  <input type="text" value={form.adres} onChange={(e) => update('adres', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Sector</label>
                  <input type="text" value={form.sector} onChange={(e) => update('sector', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Website</label>
                  <input type="url" value={form.website} onChange={(e) => update('website', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
                </div>
              </div>

              <h4 className="text-sm font-semibold text-gray-500 mt-6 mb-4">Bedrijfsmentor</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Voornaam</label>
                  <input type="text" value={form.mentorVoornaam} onChange={(e) => update('mentorVoornaam', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Achternaam</label>
                  <input type="text" value={form.mentorAchternaam} onChange={(e) => update('mentorAchternaam', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">E-mail</label>
                  <input type="email" value={form.mentorEmail} onChange={(e) => update('mentorEmail', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Telefoon</label>
                  <input type="tel" value={form.mentorTelefoon} onChange={(e) => update('mentorTelefoon', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Functie</label>
                  <input type="text" value={form.mentorFunctie} onChange={(e) => update('mentorFunctie', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
                </div>
              </div>
            </div>

            {/* Opdracht & periode */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">Opdracht & periode</h3>
              <div className="mb-4">
                <label className="text-xs text-gray-400 block mb-1">Omschrijving van de opdracht</label>
                <textarea value={form.opdracht} onChange={(e) => update('opdracht', e.target.value)} rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Startdatum</label>
                  <input type="date" value={form.startdatum} onChange={(e) => update('startdatum', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Einddatum</label>
                  <input type="date" value={form.einddatum} onChange={(e) => update('einddatum', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" />
                </div>
              </div>
            </div>

            <Link href="/admin/stage" className="text-sm text-gray-500 hover:text-gray-900 mb-4">
              ← Terug naar overzicht
            </Link>
          </div>

          {/* Rechterkolom */}
          <div className="w-72 flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-1">Docent</h3>
              <p className="text-xs text-gray-400 mb-4">De docent die de student zal opvolgen tijdens de stage.</p>
              <label className="text-xs text-gray-400 block mb-1">Docent voor deze stage</label>
              <select value={form.docent} onChange={(e) => update('docent', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent">
                <option value="">Selecteer docent</option>
                <option value="Joachim Quartier">Joachim Quartier</option>
                <option value="Tom Aertssens">Tom Aertssens</option>
              </select>
            </div>

            <div className="bg-orange-50 rounded-xl border border-orange-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-1">Beoordeling</h3>
              <p className="text-xs text-gray-400 mb-4">Beoordeel de stageaanvraag</p>
              <label className="text-xs text-gray-500 block mb-2">Feedback (bij aanpassingen)</label>
              <textarea value={form.feedback} onChange={(e) => update('feedback', e.target.value)} placeholder="Geef duidelijke feedback aan de student..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 mb-4 resize-none bg-white focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent" rows={3} />
              <div className="flex flex-col gap-2">
                <button onClick={handleGoedkeuren} className="w-full py-2.5 rounded-lg text-sm font-medium text-white bg-[#065F46] hover:bg-[#054F3B] transition-colors">Goedkeuren</button>
                <button onClick={handleAanpassingen} className="w-full py-2.5 rounded-lg text-sm font-medium text-white bg-[#D97706] hover:bg-[#B45309] transition-colors">Aanpassingen vereist</button>
                <button onClick={handleAfkeuren} className="w-full py-2.5 rounded-lg text-sm font-medium text-white bg-[#DC2626] hover:bg-[#B91C1C] transition-colors">Afkeuren</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}