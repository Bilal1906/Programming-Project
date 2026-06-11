'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Star,
  Paperclip,
  User,
  Layers,
} from 'lucide-react';

const navItems = [
  { href: '/student', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { href: '/student/mijn-stage', label: 'Mijn Stage', icon: <FileText className="w-4 h-4" /> },
  { href: '/student/logboeken', label: 'Logboeken', icon: <BookOpen className="w-4 h-4" /> },
  { href: '/student/evaluaties', label: 'Evaluaties', icon: <Star className="w-4 h-4" /> },
  { href: '/student/documenten', label: 'Documenten', icon: <Paperclip className="w-4 h-4" /> },
  { href: '/student/profiel', label: 'Profiel', icon: <User className="w-4 h-4" /> },
];

export default function Sidebar({ user }) {
  const pathname = usePathname();
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'BJ';

  return (
    <aside className="w-52 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col py-5 min-h-screen">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 mb-7">
        <div className="w-8 h-8 bg-[#1e3a5f] rounded-lg grid place-items-center flex-shrink-0">
          <Layers className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-bold text-gray-900 tracking-tight">Competent</span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col flex-1">
        {navItems.map((item) => {
          const isActive = item.href === '/student'
            ? pathname === '/student'
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-100 ${
                isActive
                  ? 'bg-[#eef2ff] text-[#1e3a5f] font-semibold'
                  : 'text-gray-500 font-medium'
              }`}
            >
              <span className={isActive ? 'text-[#1e3a5f]' : 'text-gray-400'}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User row */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-t border-gray-100 mt-2">
        <div className="w-8 h-8 rounded-full bg-[#c7d2e8] grid place-items-center text-xs font-bold text-[#1e3a5f] flex-shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-gray-900 truncate">
            {user?.name ?? 'Bilal Jaaboub'}
          </div>
          <div className="text-xs text-gray-400">Student</div>
        </div>
      </div>
    </aside>
  );
}