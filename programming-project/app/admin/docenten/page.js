import Topbar from "../component/topbar";

export default function DocentenPage() {
  const docenten = [
    {
      naam: "Steve Weemaels",
      email: "steve.weemaels@docent.ehb.be",
      telefoon: "+32 470 11 22 33",
      vakken: "ETIB, PE1, PE2, ...",
    },
    {
      naam: "David van Steertegem",
      email: "david.vansteertegem@docent.ehb.be",
      telefoon: "+32 471 22 33 44",
      vakken: "PE1, PE2",
    },
    {
      naam: "Tom Aertssens",
      email: "tom.aertssens@student.ehb.be",
      telefoon: "+32 472 33 44 55",
      vakken: "Web Essentials",
    },
    {
      naam: "Joachiem Quartier",
      email: "joachiem.quartier@docent.ehb.be",
      telefoon: "+32 473 44 55 66",
      vakken: "PSD1, PE1, PE2, ...",
    },
    {
      naam: "Herman Gillaerts",
      email: "herman.gillaerts@docent.ehb.be",
      telefoon: "+32 474 55 66 77",
      vakken: "PSD",
    },
  ];

  return (
    <>
      <Topbar title="Docent" />

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1A2E4A]">
              Docentenoverzicht
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Voeg toe, bewerk en verwijder één of meerdere docent(en)
            </p>
          </div>

          <button className="bg-[#1A2E4A] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[#243d61]">
            Bewerken
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-400">
              <tr>
                <th className="text-left p-4 font-medium">Docent</th>
                <th className="text-left p-4 font-medium">E-mail</th>
                <th className="text-left p-4 font-medium">Telefoon</th>
                <th className="text-left p-4 font-medium">Vak(ken)</th>
              </tr>
            </thead>

            <tbody>
              {docenten.map((docent, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-4 font-semibold text-gray-800">
                    {docent.naam}
                  </td>

                  <td className="p-4 text-gray-600">
                    {docent.email}
                  </td>

                  <td className="p-4 text-gray-600">
                    {docent.telefoon}
                  </td>

                  <td className="p-4 text-gray-600">
                    {docent.vakken}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}