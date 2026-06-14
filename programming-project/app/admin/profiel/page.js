import Topbar from "../component/topbar";

export default function ProfielPage() {
  return (
    <>
      <Topbar title="Profiel" />

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-xl space-y-4">
          {/* Profielkaart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#1A2E4A] text-white flex items-center justify-center font-bold text-lg">
                RD
              </div>

              <div>
                <h1 className="text-xl font-semibold text-[#1A2E4A]">
                  Ruben Dejonckheere
                </h1>

                <p className="text-sm text-gray-500">Admin</p>

                <p className="text-xs text-gray-400">
                  Erasmus Hogeschool Brussel
                </p>
              </div>
            </div>
          </div>

          {/* Persoonlijke gegevens */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="font-semibold text-sm text-[#1A2E4A] mb-4">
              Persoonlijke gegevens
            </h2>

            <div className="grid grid-cols-2 gap-y-5 gap-x-8 text-sm">
              <div>
                <p className="text-gray-400 text-xs">Voornaam</p>
                <p className="font-medium">Ruben</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Achternaam</p>
                <p className="font-medium">Dejonckheere</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">E-mailadres</p>
                <p className="font-medium">
                  ruben.dejonckheere@docent.ehb.be
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Telefoon</p>
                <p className="font-medium">
                  +32 475 23 45 67
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">School</p>
                <p className="font-medium">
                  Erasmus Hogeschool Brussel
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Functie</p>
                <p className="font-medium">Admin</p>
              </div>
            </div>
          </div>

          {/* Wachtwoord wijzigen */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="font-semibold text-sm text-[#1A2E4A] mb-4">
              Wachtwoord wijzigen
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Huidig wachtwoord
                </label>

                <input
                  type="password"
                  placeholder="Uw huidig wachtwoord"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Nieuw wachtwoord
                </label>

                <input
                  type="password"
                  placeholder="Kies een nieuw wachtwoord"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Bevestig nieuw wachtwoord
                </label>

                <input
                  type="password"
                  placeholder="Herhaal uw nieuw wachtwoord"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Wachtwoord opslaan
              </button>
            </div>
          </div>

          {/* Uitloggen */}
          <button className="border border-red-200 text-red-600 bg-white px-4 py-2 rounded-md text-sm">
            Uitloggen
          </button>
        </div>
      </div>
    </>
  );
}