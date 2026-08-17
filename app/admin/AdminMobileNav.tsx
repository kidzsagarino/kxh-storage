"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ClipboardList,
  ReceiptText,
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
  const pathname =
    usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-5 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1">
        {items.map(
          ({
            label,
            href,
            icon: Icon,
          }) => {
            const active =
              pathname === href ||
              pathname.startsWith(
                `${href}/`
              );

            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex min-w-0 flex-col
                  items-center justify-center
                  gap-1 rounded-xl
                  px-1 py-2
                  transition
                  ${
                    active
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }
                `}
              >
                <Icon
                  className="h-5 w-5"
                  strokeWidth={
                    active ? 2.5 : 2
                  }
                />

                <span
                  className={`
                    max-w-full truncate
                    text-[10px] leading-none
                    ${
                      active
                        ? "font-bold"
                        : "font-medium"
                    }
                  `}
                >
                  {label}
                </span>
              </Link>
            );
          }
        )}
      </div>
    </nav>
  );
}