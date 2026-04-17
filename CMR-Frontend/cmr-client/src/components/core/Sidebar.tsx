'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/" },
  { name: "Leads", href: "/leads" },
  { name: "Templates", href: "/templates" },
  { name: "Email Scheduler", href: "/email-scheduler" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-50 text-slate-700 min-h-screen flex flex-col border-r border-slate-200">
      {/* LOGO */}
      <div className="px-6 py-5 text-lg font-semibold text-slate-900 border-b border-slate-200">
        CRM System
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                block px-4 py-2 rounded-lg text-sm transition
                ${
                  active
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="px-6 py-4 border-t border-slate-200 text-xs text-slate-500">
        © {new Date().getFullYear()} CRM
      </div>
    </aside>
  );
}