'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Topbar from '../../component/topbar';
import { fetchMetAuth } from '@/app/lib/fetchMetAuth';

export default function OvereenkomstBewerkenPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetchMetAuth(`/api/admin/stages/${id}`)
      .then(res => res?.json())
      .then(d => {
        if (d && !d.fout) setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const inputClass = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 bg-gray-50';

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-sm text-gray-400">Laden...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-sm text-gray-400">Overeenkomst niet gevonden.</div>
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Overeenkomsten" />

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Overeenkomst bekijken</h2>
        <p className="text-sm text-gray-400 mb-6">Bekijk de gegevens van de overeenkomst</p>

        <div className="grid grid-cols-2 gap-6">

          {/* Student */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-400 mb-4">Student</p>
            <hr className="border-gray-100 mb-6" />
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Naam</label>
                <input type="text" value={`${data.student_voornaam} ${data.student_achternaam}`} readOnly className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Email</label>
                <input type="email" value={data.student_email || ''} readOnly className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Opleiding</label>
                <input type="text" value={data.opleiding || ''} readOnly className={inputClass} />
              </div>
            </div>
          </div>

          {/* Docent */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-400 mb-4">Docent</p>
            <hr className="border-gray-100 mb-6" />
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Naam</label>
                <input type="text" value={data.docent_id ? `${data.docent_voornaam || ''} ${data.docent_achternaam || ''}`.trim() : 'Niet toegewezen'} readOnly className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Email</label>
                <input type="email" value={data.docent_email || ''} readOnly className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Telefoon</label>
                <input type="tel" value={data.docent_telefoon || ''} readOnly className={inputClass} />
              </div>
            </div>
          </div>

          {/* Stagementor */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-400 mb-4">Stagementor</p>
            <hr className="border-gray-100 mb-6" />
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Naam</label>
                <input type="text" value={`${data.mentor_voornaam || ''} ${data.mentor_achternaam || ''}`.trim()} readOnly className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Email</label>
                <input type="email" value={data.mentor_email || ''} readOnly className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Functie</label>
                <input type="text" value={data.mentor_functie || ''} readOnly className={inputClass} />
              </div>
            </div>
          </div>

          {/* Bedrijf */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-400 mb-4">Bedrijf</p>
            <hr className="border-gray-100 mb-6" />
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Naam</label>
                <input type="text" value={data.bedrijf_naam || ''} readOnly className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Adres</label>
                <input type="text" value={data.bedrijf_adres || ''} readOnly className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Sector</label>
                <input type="text" value={data.sector || ''} readOnly className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Website</label>
                <input type="text" value={data.website || ''} readOnly className={inputClass} />
              </div>
            </div>
          </div>

        </div>

        {/* Stage info */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-6">
          <p className="text-xs text-gray-400 mb-4">Stage</p>
          <hr className="border-gray-100 mb-6" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Status</label>
              <input type="text" value={data.status || ''} readOnly className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Ingediend op</label>
              <input type="text" value={data.ingediend_op ? new Date(data.ingediend_op).toLocaleDateString('nl-BE') : ''} readOnly className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Startdatum</label>
              <input type="text" value={data.startdatum ? new Date(data.startdatum).toLocaleDateString('nl-BE') : ''} readOnly className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Einddatum</label>
              <input type="text" value={data.einddatum ? new Date(data.einddatum).toLocaleDateString('nl-BE') : ''} readOnly className={inputClass} />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-400 block mb-1">Opdracht</label>
              <textarea value={data.opdracht_omschrijving || ''} readOnly rows={3} className={`${inputClass} resize-none`} />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button onClick={() => router.push('/admin/overeenkomsten')} className="bg-white border border-gray-200 text-gray-700 text-sm px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50">
            ← Terug
          </button>
        </div>
      </div>
    </main>
  );
}