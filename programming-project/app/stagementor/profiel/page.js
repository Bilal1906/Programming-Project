"use client";

import Topbar from "../component/topbar";

export default function ProfielPage() {
  return (
    <div>
      <Topbar title="Mijn profiel" />

      <div className="p-6 max-w-4xl">
        {/* Profielkaart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center font-semibold text-lg">
              SW
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Steve Weemaels
              </h1>

              <p className="text-sm text-gray-500">Stagementor</p>

              <p className="text-sm text-gray-700 mt-1">
                Accenture Belgium
              </p>
            </div>
          </div>
        </div>

        {/* Persoonlijke gegevens */}
        <div className="mt-4 bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">
              Persoonlijke gegevens
            </h2>
          </div>

          <div className="p-6 grid grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <p className="text-xs text-gray-400">Voornaam</p>
              <p className="text-sm text-gray-900 mt-1">Steve</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Achternaam</p>
              <p className="text-sm text-gray-900 mt-1">Weemaels</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">E-mailadres</p>
              <p className="text-sm text-gray-900 mt-1">
                steve.weemaels@accenture.be
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Telefoon</p>
              <p className="text-sm text-gray-900 mt-1">
                +32 475 23 45 67
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Bedrijf</p>
              <p className="text-sm text-gray-900 mt-1">
                Accenture Belgium
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Functie</p>
              <p className="text-sm text-gray-900 mt-1">
                Senior Software Engineer
              </p>
            </div>
          </div>
        </div>

        {/* Wachtwoord wijzigen */}
        <div className="mt-4 bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">
              Wachtwoord wijzigen
            </h2>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Huidig wachtwoord
              </label>

              <input
                type="password"
                placeholder="Uw huidig wachtwoord"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Nieuw wachtwoord
              </label>

              <input
                type="password"
                placeholder="Kies een nieuw wachtwoord"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Bevestig nieuw wachtwoord
              </label>

              <input
                type="password"
                placeholder="Herhaal uw nieuw wachtwoord"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
              />
            </div>

            <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium px-4 py-2 rounded-md">
              Wachtwoord opslaan
            </button>
          </div>
        </div>

        {/* Uitloggen */}
        <div className="mt-4">
          <button className="border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-md text-sm font-medium">
            Uitloggen
          </button>
        </div>
      </div>
    </div>
  );
}