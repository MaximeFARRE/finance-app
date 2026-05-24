"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isAdmin } from "@/lib/auth";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/admin/tracks", label: "Contenus", icon: "📚", exact: false },
  { href: "/admin/import", label: "Import", icon: "📥", exact: false },
  { href: "/admin/export", label: "Export", icon: "📤", exact: false },
] as const;

function AdminGuard({ children }: { children: React.ReactNode }) {
  if (!isAdmin()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Accès refusé.</p>
      </div>
    );
  }
  return <>{children}</>;
}

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-gray-200 bg-white py-6">
      <div className="px-6 mb-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">📈</span>
          <span className="text-sm font-bold text-gray-900">Finance Admin</span>
        </Link>
      </div>

      <nav className="flex flex-col gap-1 px-3">
        {NAV_ITEMS.map(({ href, label, icon, exact }) => {
          const active = exact
            ? pathname === href
            : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-6">
        <Link
          href="/tracks"
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Retour à l'app
        </Link>
      </div>
    </aside>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </AdminGuard>
  );
}
