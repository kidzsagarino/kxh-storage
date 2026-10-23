
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ClipboardList,
  ReceiptText,
  FileText,
  CreditCard,
  BadgePercent,
  Settings,
} from "lucide-react";

const items = [
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ClipboardList,
  },
  {
    label: "Billings",
    href: "/admin/billings",
    icon: ReceiptText,
  },
  {
    label: "Invoices",
    href: "/admin/invoices",
    icon: FileText,
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    label: "Discounts",
    href: "/admin/discounts",
    icon: BadgePercent,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md md:hidden print:hidden"
    >
      <div className="flex w-full flex-row flex-nowrap items-stretch justify-between gap-0.5 px-1 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {items.map(({ label, href, icon: Icon }) => {
          const active =
            pathname === href ||
            pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`
                flex min-w-0 flex-1 flex-col
                items-center justify-center
                gap-1 rounded-lg px-0.5 py-2
                text-center transition-colors
                ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }
              `}
            >
              <Icon
                className="h-5 w-5 shrink-0"
                strokeWidth={active ? 2.5 : 2}
              />

              <span
                className={`block w-full truncate text-center text-[9px] leading-tight sm:text-[10px] ${
                  active ? "font-bold" : "font-medium"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
