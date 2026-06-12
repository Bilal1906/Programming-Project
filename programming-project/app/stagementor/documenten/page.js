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

            <div className="border-x border-b border-gray-200 rounded-b-lg h-24 bg-white" />
          </div>
        ))}
      </div>
    </div>
  );
}