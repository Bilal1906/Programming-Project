'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Topbar from '../../component/topbar';
import { fetchMetAuth } from '@/app/lib/fetchMetAuth';

export default function DocumentPage() {
  const router = useRouter();
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bezig, setBezig] = useState(false);

  useEffect(() => {
    fetchMetAuth(`/api/stagementor/documenten/${id}`)
      .then(res => res?.json())
      .then(data => {
        setDoc(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleOndertekenen = async () => {
    setBezig(true);

    const response = await fetchMetAuth('/api/student/documenten/ondertekenen', {
      method: 'PUT',
      body: JSON.stringify({
        stage_id: parseInt(id),
        type: 'stageovereenkomst'
      })
    });

    if (response?.ok) {
      setDoc(prev => ({ ...prev, document_status: 'ondertekend', ondertekend_op: new Date().toISOString() }));
      alert('Document succesvol ondertekend!');
    } else {
      alert('Er is een fout opgetreden.');
    }
    setBezig(false);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-sm text-gray-400">Laden...</div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-sm text-gray-400">Document niet gevonden.</div>
      </div>
    );
  }

  const isOndertekend = doc.document_status === 'ondertekend';

  return (
    <div>
      <Topbar
        title={`Stageovereenkomst — ${doc.student_voornaam} ${doc.student_achternaam}`}
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
                  <h1 className="mt-4 text-2xl font-semibold text-gray-900">Stageovereenkomst</h1>
                  <p className="mt-2 text-sm text-gray-500">Academiejaar 2025-2026 · Toegepaste Informatica</p>
                </div>

                <div className="mt-6 border-t border-[#1e3a5f]" />

                <div className="h-[500px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg mt-6">
                  <p className="text-gray-400 text-sm">Het document wordt hier weergegeven</p>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-6">
                  <div>
                    <div className={`h-16 border-b ${isOndertekend ? 'border-green-400' : 'border-gray-300'}`} />
                    <p className="mt-2 text-xs text-gray-500 text-center">Student</p>
                  </div>
                  <div>
                    <div className={`h-16 border-b ${isOndertekend ? 'border-green-400' : 'border-gray-300'}`} />
                    <p className="mt-2 text-xs text-gray-500 text-center">Bedrijf</p>
                  </div>
                  <div>
                    <div className={`h-16 border-b ${isOndertekend ? 'border-green-400' : 'border-gray-300'}`} />
                    <p className="mt-2 text-xs text-gray-500 text-center">Hogeschool</p>
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
                  <h3 className="text-sm font-semibold text-gray-900">Documentinfo</h3>
                </div>
                <div className="p-4 space-y-3 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs">Type</p>
                    <p className="text-gray-700">Stageovereenkomst</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Status</p>
                    <p className={`font-medium ${isOndertekend ? 'text-green-600' : 'text-orange-500'}`}>
                      {isOndertekend ? 'Ondertekend' : 'Wacht op ondertekening'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Laatst gewijzigd</p>
                    <p className="text-gray-700">
                      {doc.ondertekend_op ? new Date(doc.ondertekend_op).toLocaleDateString('nl-BE') : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Documentnummer</p>
                    <p className="text-gray-700">DOC-2025-{String(doc.stage_id).padStart(3, '0')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">Partijen</h3>
                </div>
                <div className="p-4 space-y-3 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs">Student</p>
                    <p className="text-gray-700">{doc.student_voornaam} {doc.student_achternaam}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Bedrijf</p>
                    <p className="text-gray-700">{doc.bedrijf_naam}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Stagementor</p>
                    <p className="text-gray-700">{doc.mentor_voornaam} {doc.mentor_achternaam}</p>
                  </div>
                </div>
              </div>

              {!isOndertekend && (
                <button
                  onClick={handleOndertekenen}
                  disabled={bezig}
                  className="w-full bg-[#1e3a5f] hover:opacity-90 text-white rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50"
                >
                  {bezig ? 'Bezig...' : 'Document ondertekenen'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}