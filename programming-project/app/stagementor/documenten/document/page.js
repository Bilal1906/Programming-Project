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

                <div className="h-[500px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg mt-6">
                  <p className="text-gray-400 text-sm">
                    Het document wordt hier weergegeven
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-3">
            <div className="flex flex-col gap-4">
              <div className="bg-[#2563eb] text-white rounded-md px-4 py-2 text-sm font-medium">
                Downloaden
              </div>

              <div className="bg-white border border-gray-200 rounded-lg h-64" />

              <div className="bg-white border border-gray-200 rounded-lg h-48" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}