"use client";

import Link from "next/link";
import Topbar from "../component/topbar";
import { FileText, Download } from "lucide-react";

const STUDENTEN = [
  { id: 1, naam: "Bilal Jaaboub" },
  { id: 2, naam: "Nassim El Ghzaoui" },
];

export default function DocumentenPage() {
  return (
    <div>
      <Topbar title="Documenten" subtitle="2025 - 2026" />

      <div className="p-6 flex flex-col gap-6">
        {STUDENTEN.map((student) => (
          <div key={student.id}>
            <p className="text-xs text-gray-400 mb-2">{student.naam}</p>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Stageovereenkomst */}
              <Link
                href="/stagementor/documenten/document"
                className="block hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1e3a5f] grid place-items-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-white" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Stageovereenkomst
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Ondertekend · Opgeladen op 03/02/2025
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-[#3B6D11]">
                      Goedgekeurd
                    </span>

                    <button
                      onClick={(e) => e.preventDefault()}
                      className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Download size={16} />
                      Downloaden
                    </button>
                  </div>
                </div>
              </Link>

              {/* Eindverslag */}
              <Link
                href="/stagementor/documenten/document"
                className="block hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#fef3c7] grid place-items-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-[#854F0B]" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Eindverslag
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Nog niet opgeladen · Verwacht einde stage
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-medium text-[#854F0B]">
                    In afwachting
                  </span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}