import Topbar from "../component/topbar";

export default function StudentenPage() {
  const studenten = [
    {
      naam: "Bilal Jaaboub",
      email: "bilal.jaaboub@student.ehb.be",
      telefoon: "+32 470 11 22 33",
      docent: "Joachim Quartier",
      stage: "Ingediend",
    },
    {
      naam: "Nassim El Ghzaoui",
      email: "nassim.elghzaoui@student.ehb.be",
      telefoon: "+32 471 22 33 44",
      docent: "Joachim Quartier",
      stage: "Actief",
    },
    {
      naam: "Yagiz Biçer",
      email: "yagiz.bicer@student.ehb.be",
      telefoon: "+32 472 33 44 55",
      docent: "Tom Aertssens",
      stage: "Goedgekeurd",
    },
    {
      naam: "Syrine Benamar",
      email: "syrine.benamar@student.ehb.be",
      telefoon: "+32 473 44 55 66",
      docent: "Tom Aertssens",
      stage: "Aanpassingen",
    },
    {
      naam: "Soufiane Jay-Yufi",
      email: "soufiane.jayyufi@student.ehb.be",
      telefoon: "+32 474 55 66 77",
      docent: "Joachim Quartier",
      stage: "Geen stage",
    },
  ];

  const statusStijl = (status) => {
    switch (status) {
      case "Ingediend":
        return "bg-yellow-100 text-yellow-700";
      case "Actief":
        return "bg-blue-100 text-blue-700";
      case "Goedgekeurd":
        return "bg-green-100 text-green-700";
      case "Aanpassingen":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <>
      <Topbar title="Student" />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm p-5">

          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Studentenoverzicht
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Voeg toe, bewerk en verwijder één of meerdere student(en)
              </p>
            </div>
            <button className="bg-[#1A2E4A] text-white px-4 py-2 rounded-md text-sm font-medium">
              Bewerken
            </button>
          </div>

          {/* Tabel */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-400">
                <tr>
                  <th className="text-left p-4 font-medium">Student</th>
                  <th className="text-left p-4 font-medium">E-mail</th>
                  <th className="text-left p-4 font-medium">Telefoon</th>
                  <th className="text-left p-4 font-medium">Docent</th>
                  <th className="text-left p-4 font-medium">Stage</th>
                  <th className="text-right p-4"></th>
                </tr>
              </thead>

              <tbody>
                {studenten.map((student, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4 font-semibold text-gray-900">
                      {student.naam}
                    </td>
                    <td className="p-4 text-gray-500">{student.email}</td>
                    <td className="p-4 text-gray-500">{student.telefoon}</td>
                    <td className="p-4 text-gray-500">{student.docent}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStijl(student.stage)}`}
                      >
                        {student.stage}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {student.stage === "Geen stage" ? (
                        <button className="text-[#1A2E4A] font-medium text-sm">
                          Aanmaken
                        </button>
                      ) : (
                        <button className="text-[#1A2E4A] font-medium text-sm">
                          Detail
                        </button>
                      )}
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