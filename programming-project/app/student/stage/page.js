'use client'

import { useRouter } from 'next/navigation'
import Topbar from '../component/topbar'

export default function StageAanvragen() {
  const router = useRouter()

  return (
    <div className="flex-1 flex flex-col">
      <Topbar
        titel="Mijn stageaanvragen"
        subtitel="Dashboard · Stageaanvragen"
        rechts={
          <button
            onClick={() => router.push('/student/stage/nieuw')}
            className="px-4 py-2 bg-[#1e3a5f] text-white text-sm rounded-lg hover:bg-[#162d4a] cursor-pointer font-medium"
          >
            Nieuwe aanvraag
          </button>
        }
      />

      <div className="flex-1 bg-gray-100 p-6">
        <p className="text-gray-400 text-sm">Geen aanvragen gevonden.</p>
      </div>
    </div>
  )
}