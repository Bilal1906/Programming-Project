'use client';

import Topbar from '../../component/topbar';

export default function LogboekDetailPage() {
  return (
    <div>
      <Topbar
        title="Logboek Bilal Jaaboub — Week 6"
        backHref="/stagementor/logboeken"
        backLabel="Logboeken"
      />

      <div className="p-6 flex flex-col gap-4">

        {/* HEADER */}
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#dbeafe] grid place-items-center text-sm font-bold text-[#1d4ed8] flex-shrink-0">
              BJ
            </div>
            <div>
              <p className="text-base font-bold text-gray-900">Bilal Jaaboub — Week 6</p>
              <p className="text-xs text-gray-400 mt-0.5">27 jan – 31 jan 2025 · 40u gelogd</p>
            </div>
          </div>
          <span className="text-xs font-medium text-[#854F0B]">Wacht op goedkeuring</span>
        </div>

      </div>
    </div>
  );
}