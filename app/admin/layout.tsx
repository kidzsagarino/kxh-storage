import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

function AdminNav() {
  const links = [
    // { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/payments", label: "Payments" },
    { href: "/admin/settings", label: "Settings" },
  ];

  return (
    <nav className="space-y-1">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

function AdminTopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="">
             <Image src="/logo_new.png" alt="KXH Logo" width={100} height={300} />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Admin</div>
            <div className="text-xs text-slate-500">Internal portal</div>
          </div>
        </div>

        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Log out
          </button>
        </form>
      </div>
    </header>
  );
}

function AdminMobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white md:hidden">
      <div className="mx-auto grid grid-cols-4 gap-1 px-2 py-2">
        {/* <Link
          href="/admin/dashboard"
          className="rounded-xl px-2 py-2 text-center text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          Dashboard
        </Link> */}
        <Link
          href="/admin/orders"
          className="rounded-xl px-2 py-2 text-center text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          Orders
        </Link>
        <Link
          href="#"
          className="rounded-xl px-2 py-2 text-center text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          Payments
        </Link>
        <Link
          href="#"
          className="rounded-xl px-2 py-2 text-center text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          Settings
        </Link>
      </div>
    </nav>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdminTopBar />

      <div className="px-3 py-3">
        <div className="grid gap-3 md:grid-cols-[260px_1fr] items-start">
          {/* Sidebar (desktop) */}
          <aside className="hidden md:block">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="px-3 pb-2 text-xs font-semibold text-slate-500">
                Navigation
              </div>
              <AdminNav />
              <div className="mt-3 border-t border-slate-200 pt-3">
                <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                  Tip: Use Orders to confirm pickups and update statuses.
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>

      <AdminMobileNav />
      {/* spacing for mobile bottom nav */}
      <div className="h-16 md:hidden" />
    </div>
  );
}
