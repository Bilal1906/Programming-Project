import Topbar from '../component/topbar';

export default function ProfielPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Topbar title="Profiel" />

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <div className="max-w-2xl flex flex-col gap-6">

          {/* Header card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#B5D4F4] text-[#0C447C] grid place-items-center text-xl font-bold flex-shrink-0">
                RD
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Ruben Dejonckheere</h2>
                <p className="text-sm text-gray-500">Admin</p>
                <p className="text-xs text-gray-400 mt-1">Erasmus Hogeschool Brussel</p>
              </div>
            </div>
          </div>

          {/* Persoonlijke gegevens */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-5">Persoonlijke gegevens</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <p className="text-xs text-gray-400 mb-1">Voornaam</p>
                <p className="text-sm font-medium text-gray-900">Ruben</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Achternaam</p>
                <p className="text-sm font-medium text-gray-900">Dejonckheere</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">E-mailadres</p>
                <p className="text-sm font-medium text-gray-900">ruben.dejonckheere@docent.ehb.be</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Telefoon</p>
                <p className="text-sm font-medium text-gray-900">+32 475 23 45 67</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">School</p>
                <p className="text-sm font-medium text-gray-900">Erasmus Hogeschool Brussel</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Functie</p>
                <p className="text-sm font-medium text-gray-900">Admin</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}