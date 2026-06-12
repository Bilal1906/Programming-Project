"use client";

import Topbar from "../component/topbar";
import { Download } from "lucide-react";

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
    <div>
      <Topbar title="Documenten" subtitle="2025 - 2026" />

      <div className="p-4">
        <div className="flex flex-col gap-6">
          {STUDENTEN.map((student) => (
            <div key={student.id}>
              <p className="pl-4 text-sm text-gray-500 mb-2">
                {student.naam}
              </p>

              <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                {/* Stageovereenkomst */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Stageovereenkomst
                    </p>
                    <p className="text-xs text-gray-500">
                      Geüpload op 15/09/2025
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm text-green-600">
                      Goedgekeurd
                    </span>

                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                      <Download size={16} />
                      Downloaden
                    </button>
                  </div>
                </div>

                {/* Eindverslag */}
                <div className="flex items-center justify-between px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Eindverslag
                    </p>
                    <p className="text-xs text-gray-500">
                      Geüpload op 20/01/2026
                    </p>
                  </div>

                  <span className="text-sm text-orange-500">
                    In afwachting
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}