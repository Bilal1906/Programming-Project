"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  StickyNote,
  GraduationCap,
  BookOpen,
} from "lucide-react";

const navItems = [
  {
    href: "/admin/dashboard",
    label: "dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    href: "/admin/stage",
    label: "stage",
    icon: <StickyNote className="w-4 h-4" />,
  },
  {
    href: "/admin/studenten",
    label: "studenten",
    icon: <Users className="w-4 h-4" />,
  },
  {
    href: "/admin/docenten",
    label: "docenten",
    icon: <Users className="w-4 h-4" />,
  },
  {
    href: "/admin/stagementors",
    label: "stagementors",
    icon: <Users className="w-4 h-4" />,
  },
  {
    href: "/admin/overeenkomsten",
    label: "overeenkomsten",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    href: "/admin/competenties",
    label: "competenties",
    icon: <BookOpen className="w-4 h-4" />,
  },
];

export default function Sidebar({ user }) {
  const pathname = usePathname();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "RD";

  return (
    <aside className="w-52 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col py-5 h-screen sticky top-0">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem", marginLeft: "1rem" }}>
        <svg width="36" height="36" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="120" rx="20" fill="#1a2340" />
          <path d="M50 45 A30 30 0 1 0 50 75" fill="none" stroke="white" strokeWidth="9" strokeLinecap="round" />
          <polyline points="65,68 75,80 95,55" fill="none" stroke="#4ade80" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontWeight: "600", fontSize: "1.1rem" }}>Competent</span>
      </div>

      <nav className="flex flex-col flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-100 ${
                isActive
                  ? "bg-[#eef2ff] text-[#1e3a5f] font-semibold border-l-2 border-[#1A2E4A]"
                  : "text-gray-500 font-medium border-l-2 border-transparent"
              }`}
            >
              <span className={isActive ? "text-[#1e3a5f]" : "text-gray-400"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/admin/profiel"
        className="flex items-center gap-2.5 px-4 py-3 border-t border-gray-100 mt-2"
      >
        <div className={`w-8 h-8 rounded-full grid place-items-center text-xs font-bold flex-shrink-0 ${
          pathname === "/admin/profiel" ? "bg-[#1e3a5f] text-white" : "bg-[#B5D4F4] text-[#0C447C]"
        }`}>
          {initials}
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-gray-900 truncate">{user?.name ?? "Ruben Dejonckheere"}</div>
          <div className="text-xs text-gray-400">Admin</div>
        </div>
      </Link>
    </aside>
  );
}