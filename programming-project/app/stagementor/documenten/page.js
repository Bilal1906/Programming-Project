"use client";

const STUDENTEN = [
  {
    id: 1,
    naam: "Bilal Jaaboub",
  },
  {
    id: 2,
    naam: "Nassim El Ghzaoui",
  },
];

export default function DocumentenPage() {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        {STUDENTEN.map((student) => (
          <div key={student.id}>
            <div className="bg-gray-100 px-4 py-2 text-xs text-gray-500">
              {student.naam}
            </div>
            <div className="border-x border-b border-gray-200 rounded-b-lg bg-white">
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Stageovereenkomst
                  </p>
                  <p className="text-xs text-gray-500">
                    Geüpload op 15/09/2025
                  </p>
                </div>

                <span className="text-sm text-green-600">Goedgekeurd</span>
              </div>

              <div className="flex items-center justify-between px-4 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Eindverslag
                  </p>
                  <p className="text-xs text-gray-500">
                    Geüpload op 20/01/2026
                  </p>
                </div>

                <span className="text-sm text-amber-600">In afwachting</span>
              </div>
            </div>{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
