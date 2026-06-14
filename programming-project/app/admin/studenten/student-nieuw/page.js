'use client';

import Topbar from '../../component/topbar';

export default function StudentNieuwPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Student" />

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Nieuwe student aanmaken
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          Voeg een nieuwe student toe aan het systeem
        </p>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        </div>
      </div>
    </main>
  );
}