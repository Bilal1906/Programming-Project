import Topbar from "../component/topbar";

export default function StudentenPage() {
  return (
    <>
      <Topbar title="Student" />

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1A2E4A]">
              Studentenoverzicht
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Voeg toe, bewerk en verwijder één of meerdere student(en)
            </p>
          </div>

          <button className="bg-[#1A2E4A] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[#243d61]">
            Bewerken
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-400">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Student</th>
                <th className="text-left px-4 py-3 font-medium">E-mail</th>
                <th className="text-left px-4 py-3 font-medium">Telefoon</th>
                <th className="text-left px-4 py-3 font-medium">Docent</th>
                <th className="text-left px-4 py-3 font-medium">Stage</th>
                <th className="text-right px-4 py-3 font-medium"></th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="px-4 py-4 font-semibold">Bilal Jaaboub</td>
                <td className="px-4 py-4">
                  bilal.jaaboub@student.ehb.be
                </td>
                <td className="px-4 py-4">+32 470 11 22 33</td>
                <td className="px-4 py-4">Joachim Quartier</td>
                <td className="px-4 py-4">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                    Ingediend
                  </span>
                </td>
                <td className="px-4 py-4 text-right text-[#1A2E4A]">
                  Detail
                </td>
              </tr>

              <tr className="border-t">
                <td className="px-4 py-4 font-semibold">
                  Nassim El Ghzaoui
                </td>
                <td className="px-4 py-4">
                  nassim.elghzaoui@student.ehb.be
                </td>
                <td className="px-4 py-4">+32 471 22 33 44</td>
                <td className="px-4 py-4">Joachim Quartier</td>
                <td className="px-4 py-4">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    Actief
                  </span>
                </td>
                <td className="px-4 py-4 text-right text-[#1A2E4A]">
                  Detail
                </td>
              </tr>

              <tr className="border-t">
                <td className="px-4 py-4 font-semibold">Yagiz Biçer</td>
                <td className="px-4 py-4">
                  yagiz.bicer@student.ehb.be
                </td>
                <td className="px-4 py-4">+32 472 33 44 55</td>
                <td className="px-4 py-4">Tom Aertssens</td>
                <td className="px-4 py-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    Goedgekeurd
                  </span>
                </td>
                <td className="px-4 py-4 text-right text-[#1A2E4A]">
                  Detail
                </td>
              </tr>

              <tr className="border-t">
                <td className="px-4 py-4 font-semibold">
                  Syrine Benamar
                </td>
                <td className="px-4 py-4">
                  syrine.benamar@student.ehb.be
                </td>
                <td className="px-4 py-4">+32 473 44 55 66</td>
                <td className="px-4 py-4">Tom Aertssens</td>
                <td className="px-4 py-4">
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
                    Aanpassingen
                  </span>
                </td>
                <td className="px-4 py-4 text-right text-[#1A2E4A]">
                  Detail
                </td>
              </tr>

              <tr className="border-t">
                <td className="px-4 py-4 font-semibold">
                  Soufiane Jay-Yufi
                </td>
                <td className="px-4 py-4">
                  soufiane.jayyufi@student.ehb.be
                </td>
                <td className="px-4 py-4">+32 474 55 66 77</td>
                <td className="px-4 py-4">Joachim Quartier</td>
                <td className="px-4 py-4">
                  <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs">
                    Geen stage
                  </span>
                </td>
                <td className="px-4 py-4 text-right text-[#1A2E4A]">
                  Aanmaken
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}