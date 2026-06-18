'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Topbar from '../../component/topbar';
import { fetchMetAuth } from '@/app/lib/fetchMetAuth';

export default function StagementorDocumentPage() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bezig, setBezig] = useState(false);

  useEffect(() => {
    fetchMetAuth(`/api/stagementor/documenten/${id}`)
      .then(res => res?.json())
      .then(data => { setDoc(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleOndertekenen = async () => {
    setBezig(true);
    const response = await fetchMetAuth('/api/student/documenten/ondertekenen', {
      method: 'PUT',
      body: JSON.stringify({ stage_id: parseInt(id) }),
    });
    if (response?.ok) {
      setDoc(prev => ({ ...prev, signed_stagementor: 1, document_status: prev.signed_student ? 'ondertekend' : 'in_afwachting' }));
      alert('Document succesvol ondertekend!');
    } else {
      alert('Er is een fout opgetreden.');
    }
    setBezig(false);
  };

  const handleDownload = async () => {
    const response = await fetchMetAuth(`/api/admin/stages/${id}/pdf`);
    if (!response || !response.ok) {
      alert('Fout bij downloaden');
      return;
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stageovereenkomst-${id}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) return <div className="flex-1 flex items-center justify-center bg-gray-100"><div className="text-sm text-gray-400">Laden...</div></div>;
  if (!doc) return <div className="flex-1 flex items-center justify-center bg-gray-100"><div className="text-sm text-gray-400">Document niet gevonden.</div></div>;

  const isOndertekend = doc.document_status === 'ondertekend';
  const ikHebGetekend = doc.signed_stagementor === 1;

  return (
    <div>
      <Topbar title={`Stageovereenkomst — ${doc.student_voornaam} ${doc.student_achternaam}`} backHref="/stagementor/documenten" backLabel="Documenten" />
      <div className="p-6">
        <div className="grid grid-cols-12 gap-6">

          <div className="col-span-9">
            <div className="bg-white border border-gray-200 rounded-lg min-h-[700px]">
              <div className="p-8">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded bg-[#1e3a5f]" />
                    <span>Competent — EHB</span>
                  </div>
                  <h1 className="mt-4 text-2xl font-semibold text-gray-900">Stageovereenkomst</h1>
                  <p className="mt-2 text-sm text-gray-500">{doc.academiejaar} · {doc.opleiding}</p>
                </div>
                <div className="mt-6 border-t border-[#1e3a5f]" />

                <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
                  <div><p className="text-xs text-gray-400 mb-1">Student</p><p className="font-medium">{doc.student_voornaam} {doc.student_achternaam}</p><p className="text-gray-500">{doc.student_email}</p></div>
                  <div><p className="text-xs text-gray-400 mb-1">Bedrijf</p><p className="font-medium">{doc.bedrijf_naam}</p></div>
                  <div><p className="text-xs text-gray-400 mb-1">Stagementor</p><p className="font-medium">{doc.mentor_voornaam} {doc.mentor_achternaam}</p></div>
                  <div><p className="text-xs text-gray-400 mb-1">Periode</p><p className="font-medium">{doc.startdatum ? new Date(doc.startdatum).toLocaleDateString('nl-BE') : '-'} – {doc.einddatum ? new Date(doc.einddatum).toLocaleDateString('nl-BE') : '-'}</p></div>
                </div>

                {doc.opdracht_omschrijving && (
                  <div className="mt-6 text-sm">
                    <p className="text-xs text-gray-400 mb-1">Opdracht</p>
                    <p className="text-gray-700">{doc.opdracht_omschrijving}</p>
                  </div>
                )}

                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <div className={`h-16 border-b-2 ${doc.signed_student ? 'border-green-400' : 'border-gray-300'}`} />
                    <p className="mt-2 text-xs text-gray-500 text-center">Student {doc.signed_student ? '✓' : ''}</p>
                  </div>
                  <div>
                    <div className={`h-16 border-b-2 ${doc.signed_stagementor ? 'border-green-400' : 'border-gray-300'}`} />
                    <p className="mt-2 text-xs text-gray-500 text-center">Stagementor {doc.signed_stagementor ? '✓' : ''}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3 flex flex-col gap-4">

            <button onClick={handleDownload} className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-md px-4 py-2 text-sm font-medium">
              Downloaden
            </button>

            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Documentinfo</h3>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div><p className="text-gray-400 text-xs">Status</p><p className={`font-medium ${isOndertekend ? 'text-green-600' : 'text-orange-500'}`}>{isOndertekend ? 'Ondertekend' : 'Wacht op ondertekening'}</p></div>
                <div><p className="text-gray-400 text-xs">Ondertekend op</p><p className="text-gray-700">{doc.signed_at ? new Date(doc.signed_at).toLocaleDateString('nl-BE') : '-'}</p></div>
                <div><p className="text-gray-400 text-xs">Documentnummer</p><p className="text-gray-700">DOC-2025-{String(doc.stage_id).padStart(3, '0')}</p></div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Handtekeningen</h3>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div className="flex items-center justify-between"><span className="text-gray-600">Student</span><span className={doc.signed_student ? 'text-green-600 font-medium' : 'text-orange-500'}>{doc.signed_student ? '✓ Getekend' : 'Wacht...'}</span></div>
                <div className="flex items-center justify-between"><span className="text-gray-600">Stagementor</span><span className={doc.signed_stagementor ? 'text-green-600 font-medium' : 'text-orange-500'}>{doc.signed_stagementor ? '✓ Getekend' : 'Wacht...'}</span></div>
              </div>
            </div>

            {!ikHebGetekend && (
              <button onClick={handleOndertekenen} disabled={bezig} className="w-full bg-[#1e3a5f] hover:opacity-90 text-white rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50">
                {bezig ? 'Bezig...' : 'Document ondertekenen'}
              </button>
            )}
            {ikHebGetekend && <div className="w-full text-center text-sm text-green-600 font-medium py-2">✓ U heeft getekend</div>}
          </div>
        </div>
      </div>
    </div>
  );
}