export default function Topbar({ title, backHref, backLabel, subtitle }) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-2">
      
      {backHref && (
        <>
          <Link href={backHref} className="flex items-center gap-1 text-sm text-gray-400">
            <ChevronLeft className="w-4 h-4" />
            {backLabel}
          </Link>
          <span className="text-gray-300">/</span>
        </>
      )}

      <span className="text-sm font-semibold text-gray-900">{title}</span>

      {subtitle && (
        <>
          <span className="text-gray-300">·</span>
          <span className="text-sm text-gray-400">{subtitle}</span>
        </>
      )}

    </div>
  );
}