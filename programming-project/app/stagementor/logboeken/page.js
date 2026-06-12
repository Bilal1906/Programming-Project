'use client';

import { useRouter } from 'next/navigation';
import Topbar from '../component/topbar';

export default function LogboekenPage() {
  const router = useRouter();

  return (
    <div>
      <Topbar title="Logboeken" subtitle="2025 - 2026" />

      <div className="p-6 flex flex-col gap-6">

        {/* BILAL */}
        <div>
          <p className="text-xs text-gray-400 mb-2">Bilal Jaaboub</p>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

            <div
              onClick={() => router.push('/stagementor/logboeken/1')}
              className="flex items-center justify-between px-5 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Week 6</p>
                  <p className="text-xs text-gray-400 mt-0.5">27 jan – 31 jan 2025</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-800" />
                  <span className="text-xs text-gray-500">40u gelogd</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#854F0B]">Wacht op goedkeuring</span>
                <span className="text-black text-[10px]">▸</span>
              </div>
            </div>

            <div
              onClick={() => router.push('/stagementor/logboeken/2')}
              className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Week 5</p>
                  <p className="text-xs text-gray-400 mt-0.5">20 jan – 24 jan 2025</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-800" />
                  <span className="text-xs text-gray-500">40u gelogd</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#3B6D11]">Goedgekeurd</span>
                <span className="text-black text-[10px]">▸</span>
              </div>
            </div>

          </div>
        </div>

        {/* NASSIM */}
        <div>
          <p className="text-xs text-gray-400 mb-2">Nassim El Ghzaoui</p>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

            <div
              onClick={() => router.push('/stagementor/logboeken/3')}
              className="flex items-center justify-between px-5 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Week 6</p>
                  <p className="text-xs text-gray-400 mt-0.5">27 jan – 31 jan 2025</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-800" />
                  <span className="text-xs text-gray-500">39u gelogd</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#3B6D11]">Goedgekeurd</span>
                <span className="text-black text-[10px]">▸</span>
              </div>
            </div>

            <div
              onClick={() => router.push('/stagementor/logboeken/4')}
              className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Week 5</p>
                  <p className="text-xs text-gray-400 mt-0.5">20 jan – 24 jan 2025</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-800" />
                  <span className="text-xs text-gray-500">40u gelogd</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#3B6D11]">Goedgekeurd</span>
                <span className="text-black text-[10px]">▸</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}