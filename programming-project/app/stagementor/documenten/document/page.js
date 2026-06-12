"use client";

import Topbar from "../../component/topbar";

export default function DocumentPage() {
  return (
    <div>
      <Topbar
        title="Stageovereenkomst — Bilal Jaaboub"
        backHref="/stagementor/documenten"
        backLabel="Documenten"
      />

      <div className="p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main content */}
          <div className="col-span-9">
            <div className="bg-white border border-gray-200 rounded-lg min-h-[700px]">
              <div className="p-8">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded bg-[#1e3a5f]" />
                    <span>Competent — EHB</span>
                  </div>

                  <h1 className="mt-4 text-2xl font-semibold text-gray-900">
                    Stageovereenkomst
                  </h1>

                  <p className="mt-2 text-sm text-gray-500">
                    Academiejaar 2024–2025 · Toegepaste Informatica
                  </p>
                </div>

                <div className="mt-6 border-t border-[#1e3a5f]" />

                {/* Document */}
                <div className="h-[500px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg mt-6">
                  <p className="text-gray-400 text-sm">
                    Het document wordt hier weergegeven
                  </p>
                </div>

                {/* Signatures */}
                <div className="mt-8 grid grid-cols-3 gap-6">
                  <div>
                    <div className="h-16 border-b border-gray-300" />
                    <p className="mt-2 text-xs text-gray-500 text-center">
                      Student
                    </p>
                  </div>

                  <div>
                    <div className="h-16 border-b border-gray-300" />
                    <p className="mt-2 text-xs text-gray-500 text-center">
                      Bedrijf
                    </p>
                  </div>

                  <div>
                    <div className="h-16 border-b border-gray-300" />
                    <p className="mt-2 text-xs text-gray-500 text-center">
                      Hogeschool
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-3">
            <div className="flex flex-col gap-4">
              <button className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-md px-4 py-2 text-sm font-medium">
                Downloaden
              </button>

              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Documentinfo
                  </h3>
                </div>

                <div className="p-4 space-y-3 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs">Type</p>
                    <p className="text-gray-700">Stageovereenkomst</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">Status</p>
                    <p className="text-green-600 font-medium">
                      Goedgekeurd
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">
                      Laatst gewijzigd
                    </p>
                    <p className="text-gray-700">03/02/2025</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">
                      Documentnummer
                    </p>
                    <p className="text-gray-700">DOC-2025-001</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Partijen
                  </h3>
                </div>

                <div className="p-4 space-y-3 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs">Student</p>
                    <p className="text-gray-700">Bilal Jaaboub</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">Bedrijf</p>
                    <p className="text-gray-700">Bedrijfsnaam BV</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">Stagementor</p>
                    <p className="text-gray-700">Steve Weemaels</p>
                  </div>
                </div>
              </div>

              {/* Sign action */}
              <button className="w-full bg-[#1e3a5f] hover:opacity-90 text-white rounded-md px-4 py-2 text-sm font-medium">
                Document ondertekenen
              </button>
            </div>
          </div>
          {/* End sidebar */}
        </div>
      </div>
    </div>
  );
}