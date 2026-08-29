import type { ReactNode } from "react";

import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getServerSession,
} from "next-auth/next";

import {
  authOptions,
} from "@/app/lib/auth-options";

import LogoutButton from "./LogoutButton";
import AdminMobileNav from "./AdminMobileNav";


function AdminNav() {
  const links = [
    {
      href: "/admin/orders",
      label: "Orders",
    },
    {
      href: "/admin/billings",
      label: "Billings",
    },
    {
      href: "/admin/payments",
      label: "Payments",
    },
    {
      href: "/admin/discounts",
      label: "Discounts",
    },
    {
      href: "/admin/settings",
      label: "Settings",
    },
  ];

  return (
    <nav className="space-y-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}


function AdminTopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur print:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.webp"
            alt="KXH Logo"
            width={100}
            height={50}
          />

          <div>
            <div className="text-sm font-semibold text-slate-900">
              Admin
            </div>

            <div className="text-sm text-slate-500">
              Internal portal
            </div>
          </div>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}


export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.user) {
    redirect("/login");
  }

  if (
    (session.user as { role?: string })
      .role !== "ADMIN"
  ) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdminTopBar />

      <div className="px-3 py-3 pb-24 md:pb-3">
        <div className="grid items-start gap-3 md:grid-cols-[260px_1fr]">
          <aside className="hidden md:block print:hidden">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="px-3 pb-2 text-sm font-semibold text-slate-500">
                Navigation
              </div>

              <AdminNav />

              <div className="mt-3 border-t border-slate-200 pt-3">
                <div className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                  Tip: Use Orders to
                  confirm pickups and
                  update statuses.
                </div>
              </div>
            </div>
          </aside>

          <main className="min-w-0">
            {children}
          </main>
        </div>
      </div>

      <AdminMobileNav />
    </div>
  );
}