'use client';

import Topbar from '../../component/topbar';

export default function StudentBewerkenPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Student" />

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Student bewerken
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          Bewerk de gegevens van een student
        </p>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs text-gray-400 mb-4">
            Bilal Jaaboub
          </p>

          <hr className="border-gray-100 mb-6" />
        </div>
      </div>
    </main>
  );
}