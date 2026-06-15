'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '../../component/topbar';

// Beschikbare studenten met al hun gegevens
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
};

// Stagementors gelinkt aan bedrijf
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

export default function OvereenkomstNieuwPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    studentNaam: '',
    studentEmail: '',
    studentOpleiding: '',
    docentNaam: '',
    docentEmail: '',
    docentTelefoon: '',
    mentorNaam: '',
    mentorEmail: '',
    bedrijfNaam: '',
    bedrijfEmail: '',
  });

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2E4A] focus:border-transparent';

  const readonlyClass = `${inputClass} bg-gray-50 text-gray-500`;

  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Overeenkomsten" />

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Nieuwe overeenkomst aanmaken
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          Selecteer de personen — overige gegevens worden automatisch ingevuld.
        </p>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-400 mb-4">Student</p>
            <hr className="border-gray-100 mb-6" />
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-400 mb-4">Docent</p>
            <hr className="border-gray-100 mb-6" />
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-400 mb-4">Stagementor</p>
            <hr className="border-gray-100 mb-6" />
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-400 mb-4">Bedrijf</p>
            <hr className="border-gray-100 mb-6" />
          </div>
        </div>
      </div>
    </main>
  );
}