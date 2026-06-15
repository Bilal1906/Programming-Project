'use client';

import Topbar from '../../component/topbar';

export default function OvereenkomstNieuwPage() {
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
          {/* Student */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-400 mb-4">Student</p>
            <hr className="border-gray-100 mb-6" />
          </div>

          {/* Docent */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-400 mb-4">Docent</p>
            <hr className="border-gray-100 mb-6" />
          </div>

          {/* Stagementor */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-400 mb-4">Stagementor</p>
            <hr className="border-gray-100 mb-6" />
          </div>

          {/* Bedrijf */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs text-gray-400 mb-4">Bedrijf</p>
            <hr className="border-gray-100 mb-6" />
          </div>
        </div>
      </div>
    </main>
  );
}