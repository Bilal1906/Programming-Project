'use client';

import { useRouter } from 'next/navigation';
import Topbar from '../component/topbar';

export default function EvaluatiesPage() {
  const router = useRouter();

  return (
    <div>
      <Topbar title="Evaluaties" subtitle="2025–2026" />

      <div className="p-6 flex flex-col gap-6">

        {/* BILAL */}
        <div>
          <p className="text-xs text-gray-400 mb-2">Bilal Jaaboub</p>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

            {/* Tussentijdse evaluatie */}
            <div
              onClick={() => router.push('/stagementor/evaluaties/1')}
              className="flex items-center justify-between px-5 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">Tussentijdse evaluatie</p>
                <p className="text-xs text-gray-400 mt-0.5">Verwacht rond week 7</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#1d4ed8]">Nog in te vullen</span>
                <span className="text-black text-[10px]">▸</span>
              </div>
            </div>

            {/* Finale evaluatie */}
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">Finale evaluatie</p>
                <p className="text-xs text-gray-400 mt-0.5">Beschikbaar na tussentijdse evaluatie</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#854F0B]">Nog niet beschikbaar</span>
                <span className="text-black text-[10px]">▸</span>
              </div>
            </div>

          </div>
        </div>

        {/* NASSIM */}
        <div>
          <p className="text-xs text-gray-400 mb-2">Nassim El Ghzaoui</p>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

            {/* Tussentijdse evaluatie */}
            <div
              onClick={() => router.push('/stagementor/evaluaties/2')}
              className="flex items-center justify-between px-5 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">Tussentijdse evaluatie</p>
                <p className="text-xs text-gray-400 mt-0.5">Verwacht rond week 7</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#1d4ed8]">Nog in te vullen</span>
                <span className="text-black text-[10px]">▸</span>
              </div>
            </div>

            {/* Finale evaluatie */}
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">Finale evaluatie</p>
                <p className="text-xs text-gray-400 mt-0.5">Beschikbaar na tussentijdse evaluatie</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#854F0B]">Nog niet beschikbaar</span>
                <span className="text-black text-[10px]">▸</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}