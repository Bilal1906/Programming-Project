import Topbar from "../../component/topbar";

export default function StageDetailPage() {
  return (
    <>
      <Topbar title="Stage" />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Nieuwe stage registreren
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Handmatig een stage aanmaken (zelfde structuur als studentenformulier)
        </p>

        <div className="grid grid-cols-4 gap-6">
          {/* Linkerkant */}
          <div className="col-span-3 space-y-4">
            {/* Student */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h2 className="text-xs font-semibold text-gray-400 mb-4">
                Sectie 1 — Studentgegevens
              </h2>

              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <p className="text-gray-400">Naam</p>
                  <p>Bilal Jaaboub</p>

                  <p className="text-gray-400 mt-4">Academiejaar</p>
                  <p>2025-2026</p>

                  <p className="text-gray-400 mt-4">Telefoon</p>
                  <p>+32 470 11 22 33</p>
                </div>

                <div>
                  <p className="text-gray-400">Opleiding</p>
                  <p>Toegepaste Informatica</p>

                  <p className="text-gray-400 mt-4">E-mail</p>
                  <p>bilal.jaaboub@student.ehb.be</p>

                  <p className="text-gray-400 mt-4">EHB-docent</p>
                  <p>Joachim Quartier</p>
                </div>
              </div>
            </div>

            {/* Bedrijf */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h2 className="text-xs font-semibold text-gray-400 mb-4">
                Sectie 2 — Bedrijfsgegevens
              </h2>

              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <p className="text-gray-400">Bedrijfsnaam</p>
                  <p>Accenture Belgium</p>

                  <p className="text-gray-400 mt-4">Sector</p>
                  <p>IT-consultancy</p>
                </div>

                <div>
                  <p className="text-gray-400">Adres</p>
                  <p>Moutstraat 25, 1000 Brussel</p>

                  <p className="text-gray-400 mt-4">Website</p>
                  <p>https://www.accenture.com/be</p>
                </div>
              </div>
            </div>

            {/* Opdracht */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h2 className="text-xs font-semibold text-gray-400 mb-4">
                Sectie 3 — Opdracht & periode
              </h2>

              <p className="text-sm mb-6">
                Ontwikkeling van interne tooling voor projectopvolging met
                React en .NET. Focus op API-integraties en unit testing.
              </p>

              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <p className="text-gray-400">Startdatum</p>
                  <p>3 februari 2025</p>

                  <p className="text-gray-400 mt-4">Ingediend op</p>
                  <p>15 januari 2025</p>
                </div>

                <div>
                  <p className="text-gray-400">Einddatum</p>
                  <p>27 juni 2025</p>
                </div>
              </div>
            </div>

            {/* Footer tabel */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-400">
                  <tr>
                    <th className="text-left p-4">Student</th>
                    <th className="text-left p-4">E-mail</th>
                    <th className="text-left p-4">Opleiding</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="p-4">Bilal Jaaboub</td>
                    <td className="p-4">
                      bilal.jaaboub@student.ehb.be
                    </td>
                    <td className="p-4">
                      Toegepaste Informatica
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button className="text-sm text-gray-500">
              ← Terug naar overzicht
            </button>
          </div>

          {/* Rechterkant */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h2 className="font-semibold mb-1">Stagementor</h2>

              <p className="text-xs text-gray-400 mb-4">
                De mentor houdt de stage bij het bedrijf.
              </p>

              <label className="text-xs text-gray-500">
                Mentor voor deze stage
              </label>

              <input
                type="text"
                value="Steve Weemaels"
                readOnly
                className="w-full border rounded-md p-2 mt-1"
              />

              <p className="text-xs text-gray-500 mt-4">
                Functie: Senior Software Engineer
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-5">
              <h2 className="font-semibold mb-4">Beoordeling</h2>

              <label className="text-xs text-gray-500">
                Feedback (bij aanpassingen)
              </label>

              <textarea
                rows="4"
                placeholder="Geef feedback aan de student..."
                className="w-full border rounded-md p-2 mt-1 mb-4"
              />

              <div className="space-y-2">
                <button className="w-full bg-green-600 text-white py-2 rounded-md">
                  Goedkeuren
                </button>

                <button className="w-full bg-orange-500 text-white py-2 rounded-md">
                  Aanpassingen vereist
                </button>

                <button className="w-full bg-red-600 text-white py-2 rounded-md">
                  Afkeuren
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}