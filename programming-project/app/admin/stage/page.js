import Topbar from "../component/topbar";

export default function StagePage() {
  const stages = [
    {
      student: "Bilal Jaaboub",
      bedrijf: "Accenture Belgium",
      mentor: "Steve Weemaels",
      periode: "3 feb – 27 jun 2025",
      status: "Ingediend",
    },
    {
      student: "Syrine Benamar",
      bedrijf: "Delaware",
      mentor: "David Van Steertegem",
      periode: "1 mrt – 30 jun 2025",
      status: "Aanpassingen",
    },
    {
      student: "Yagiz Biçer",
      bedrijf: "Cegeka",
      mentor: "Steve Weemaels",
      periode: "10 feb – 20 jun 2025",
      status: "Goedgekeurd",
    },
    {
      student: "Nassim El Ghzaoui",
      bedrijf: "Ordina",
      mentor: "David Van Steertegem",
      periode: "20 jan – 30 mei 2025",
      status: "Actief",
    },
  ];

  return (
    <>
      <Topbar title="Stage" />

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm p-5">
          
          {/* Bovenste balk */}
          <div className="flex justify-between items-center mb-5">
            <div className="flex gap-2 flex-wrap">
              <button className="px-4 py-2 rounded-full bg-[#1e3a5f] text-white text-xs font-medium">
                Alle
              </button>

              <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-xs">
                Te beoordelen
              </button>

              <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-xs">
                Aanpassingen
              </button>

              <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-xs">
                Goedgekeurd
              </button>

              <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-xs">
                Actief
              </button>

              <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-xs">
                Afgekeurd
              </button>
            </div>

            <button className="bg-[#1e3a5f] text-white px-4 py-2 rounded-md text-sm">
              + Nieuwe stage
            </button>
          </div>

          {/* Tabel */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="text-left p-4">Student</th>
                  <th className="text-left p-4">Bedrijf</th>
                  <th className="text-left p-4">Mentor (stage)</th>
                  <th className="text-left p-4">Periode</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-right p-4"></th>
                </tr>
              </thead>

              <tbody>
                {stages.map((stage, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4 font-medium">{stage.student}</td>
                    <td className="p-4">{stage.bedrijf}</td>
                    <td className="p-4">{stage.mentor}</td>
                    <td className="p-4">{stage.periode}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          stage.status === "Ingediend"
                            ? "bg-yellow-100 text-yellow-700"
                            : stage.status === "Aanpassingen"
                            ? "bg-orange-100 text-orange-700"
                            : stage.status === "Goedgekeurd"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {stage.status}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <button className="text-[#1e3a5f] font-medium">
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}