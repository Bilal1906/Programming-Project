'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '../../component/topbar';

const studenten = {
  'Bilal Jaaboub': { email: 'bilal.jaaboub@student.ehb.be', opleiding: 'Toegepaste Informatica' },
  'Nassim El Ghzaoui': { email: 'nassim.elghzaoui@student.ehb.be', opleiding: 'Toegepaste Informatica' },
  'Yagiz Biçer': { email: 'yagiz.bicer@student.ehb.be', opleiding: 'Toegepaste Informatica' },
  'Syrine Benamar': { email: 'syrine.benamar@student.ehb.be', opleiding: 'Toegepaste Informatica' },
  'Soufiane Jay-Yufi': { email: 'soufiane.jayyufi@student.ehb.be', opleiding: 'Toegepaste Informatica' },
};

const docenten = {
  'Joachim Quartier': { email: 'joachim.quartier@docent.ehb.be', telefoon: '+32 473 44 55 66' },
  'Tom Aertssens': { email: 'tom.aertssens@docent.ehb.be', telefoon: '+32 472 33 44 55' },
  'Steve Weemaels': { email: 'steve.weemaels@docent.ehb.be', telefoon: '+32 470 11 22 33' },
};

const stagementors = {
  'Steve Weemaels': { email: 'steve.weemaels@accenture.com', bedrijf: 'Accenture Belgium' },
  'David Van Steertegem': { email: 'david.vansteertegem@delaware.be', bedrijf: 'Delaware' },
  'Lars Vermeulen': { email: 'lars.vermeulen@cegeka.com', bedrijf: 'Cegeka' },
  'Emma De Ridder': { email: 'emma.deridder@ordina.be', bedrijf: 'Ordina' },
};

const bedrijven = {
  'Accenture Belgium': { email: 'info@accenture.com' },
  Delaware: { email: 'info@delaware.be' },
  Cegeka: { email: 'info@cegeka.com' },
  Ordina: { email: 'info@ordina.be' },
};

export default function OvereenkomstBewerkenPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    studentNaam: 'Bilal Jaaboub',
    studentEmail: 'bilal.jaaboub@student.ehb.be',
    studentOpleiding: 'Toegepaste Informatica',
    docentNaam: 'Steve Weemaels',
    docentEmail: 'steve.weemaels@docent.ehb.be',
    docentTelefoon: '+32 470 11 22 33',
    mentorNaam: 'Lars Vermeulen',
    mentorEmail: 'lars.vermeulen@cegeka.com',
    bedrijfNaam: 'Cegeka',
    bedrijfEmail: 'info@cegeka.com',
  });

  const selecteerStudent = (naam) => {
    const d = studenten[naam];

    setForm({
      ...form,
      studentNaam: naam,
      studentEmail: d?.email || '',
      studentOpleiding: d?.opleiding || '',
    });
  };

  const selecteerDocent = (naam) => {
    const d = docenten[naam];

    setForm({
      ...form,
      docentNaam: naam,
      docentEmail: d?.email || '',
      docentTelefoon: d?.telefoon || '',
    });
  };

  const selecteerMentor = (naam) => {
    const m = stagementors[naam];
    const b = m ? bedrijven[m.bedrijf] : null;

    setForm({
      ...form,
      mentorNaam: naam,
      mentorEmail: m?.email || '',
      bedrijfNaam: m?.bedrijf || '',
      bedrijfEmail: b?.email || '',
    });
  };

  const handleOpslaan = () => {
    if (
      !form.studentNaam ||
      !form.docentNaam ||
      !form.mentorNaam ||
      !form.bedrijfNaam
    ) {
      alert(
        'Alle velden moeten ingevuld zijn. Selecteer een student, docent en stagementor.'
      );
      return;
    }

    if (window.confirm('Wijzigingen opslaan?')) {
      alert('Opgeslagen!');
      router.push('/admin/overeenkomsten');
    }
  };

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent';

  const readonlyClass = `${inputClass} bg-gray-50 text-gray-500`;

  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Overeenkomsten" />

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Overeenkomsten bewerken
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          Bewerk de gegevens van de overeenkomst
        </p>

        <div className="grid grid-cols-2 gap-6">
          {/* Student */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-400 mb-4">Student</p>
            <hr className="border-gray-100 mb-6" />

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Naam</label>
                <select
                  value={form.studentNaam}
                  onChange={(e) => selecteerStudent(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Selecteer student</option>
                  {Object.keys(studenten).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Email</label>
                <input type="email" value={form.studentEmail} readOnly className={readonlyClass} />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Opleiding</label>
                <input type="text" value={form.studentOpleiding} readOnly className={readonlyClass} />
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
                <select
                  value={form.docentNaam}
                  onChange={(e) => selecteerDocent(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Selecteer docent</option>
                  {Object.keys(docenten).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Email</label>
                <input type="email" value={form.docentEmail} readOnly className={readonlyClass} />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Telefoon</label>
                <input type="tel" value={form.docentTelefoon} readOnly className={readonlyClass} />
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
                <select
                  value={form.mentorNaam}
                  onChange={(e) => selecteerMentor(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Selecteer stagementor</option>
                  {Object.keys(stagementors).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Email</label>
                <input type="email" value={form.mentorEmail} readOnly className={readonlyClass} />
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
                <input type="text" value={form.bedrijfNaam} readOnly className={readonlyClass} />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Email</label>
                <input type="email" value={form.bedrijfEmail} readOnly className={readonlyClass} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => router.push('/admin/overeenkomsten')}
            className="bg-white border border-gray-200 text-gray-700 text-sm px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50"
          >
            Annuleren
          </button>

          <button
            onClick={handleOpslaan}
            className="bg-[#1A2E4A] text-white text-sm px-6 py-2.5 rounded-lg font-medium hover:bg-[#152438]"
          >
            Opslaan
          </button>
        </div>
      </div>
    </main>
  );
}