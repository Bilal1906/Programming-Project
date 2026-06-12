'use client';

import { useRouter } from 'next/navigation';
import Topbar from '../component/topbar';

export default function EvaluatiesPage() {
  const router = useRouter();

  return (
    <div>
      <Topbar title="Evaluaties" subtitle="2025 - 2026" />

      <div className="p-6 flex flex-col gap-3">

        {/* BILAL */}
        <div
          onClick={() => router.push('/stagementor/evaluaties/1')}
          className="bg-white border border-gray-200 rounded-lg flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#dbeafe] grid place-items-center text-xs font-bold text-[#1d4ed8] flex-shrink-0">
              BJ
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Bilal Jaaboub</p>
              <p className="text-xs text-gray-400 mt-0.5">Tussentijdse evaluatie</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#854F0B]">Te evalueren</span>
            <span className="text-black text-[10px]">▸</span>
          </div>
        </div>

        {/* NASSIM */}
        <div
          onClick={() => router.push('/stagementor/evaluaties/2')}
          className="bg-white border border-gray-200 rounded-lg flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#dbeafe] grid place-items-center text-xs font-bold text-[#1d4ed8] flex-shrink-0">
              NE
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Nassim El Ghzaoui</p>
              <p className="text-xs text-gray-400 mt-0.5">Tussentijdse evaluatie</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#3B6D11]">Voltooid</span>
            <span className="text-black text-[10px]">▸</span>
          </div>
        </div>

      </div>
    </div>
  );
}