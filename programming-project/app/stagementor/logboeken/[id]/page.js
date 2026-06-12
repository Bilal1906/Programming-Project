'use client';
'use client';

import Topbar from '../../component/topbar';

export default function LogboekDetailPage() {
  return (
    <div>
      <Topbar
        title="Logboek detail"
        backHref="/stagementor/logboeken"
        backLabel="Logboeken"
      />

      <div className="p-6">
        <p className="text-sm text-gray-600">Logboek detail</p>
      </div>
    </div>
  );
}