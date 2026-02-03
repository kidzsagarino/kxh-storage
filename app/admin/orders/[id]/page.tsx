"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type ServiceType = "storage" | "moving" | "shredding";
type OrderStatus = "new" | "confirmed" | "collected" | "completed" | "cancelled";
type PaymentStatus = "paid" | "unpaid" | "refunded" | "failed";

type OrderItem = {
  key: string;
  label: string;
  subLabel?: string;
  qty?: number;
  price?: number;
};

type Order = {
  id: string;
  serviceType: ServiceType;
  status: OrderStatus;
  createdAt: string; // ISO

  customer: {
    name: string;
    email: string;
    phone: string;
  };

  address: {
    line1: string;
    city?: string;
    postalCode: string;
  };

  schedule: {
    collectionDate: string; // YYYY-MM-DD
    timeSlot: "morning" | "afternoon" | "evening" | "";
  };

  // service-specific (optional)
  moving?: {
    fromAddress: string;
    toAddress: string;
    distanceMiles: number;
    packingAssistance: boolean;
  };

  storage?: {
    durationMonths: 3 | 6 | 12;
  };

  shredding?: {
    notes?: string;
  };

  items: OrderItem[];

  totals: {
    subtotal: number;
    discount: number; // positive number
    totalDueNow: number;
  };

  payment: {
    status: PaymentStatus;
    method: "stripe" | "cash" | "bank_transfer";
    stripeSessionId?: string;
    receiptUrl?: string;
  };
};

// ---- Dummy data ----
const DUMMY_ORDERS: Order[] = [
  {
    id: "ord_001",
    serviceType: "storage",
    status: "new",
    createdAt: "2026-02-01T10:22:00Z",
    customer: { name: "John Smith", email: "john@example.com", phone: "07123 456789" },
    address: { line1: "12 Baker Street, London", postalCode: "NW1 6XE" },
    schedule: { collectionDate: "2026-02-12", timeSlot: "morning" },
    storage: { durationMonths: 6 },
    items: [
      { key: "duration", label: "Duration", subLabel: "6 months" },
      { key: "small-box", label: "Small Box", qty: 2, price: 8 },
      { key: "suitcase", label: "Suitcase", qty: 1, price: 10 },
    ],
    totals: { subtotal: 126, discount: 6, totalDueNow: 120 },
    payment: { status: "unpaid", method: "stripe", stripeSessionId: "cs_test_d4e5f6" },
  },
  {
    id: "ord_002",
    serviceType: "moving",
    status: "confirmed",
    createdAt: "2026-02-02T14:06:00Z",
    customer: { name: "Sarah Jones", email: "sarah@example.com", phone: "07999 123456" },
    address: { line1: "45 Camden Road, London", postalCode: "N7 0AB" },
    schedule: { collectionDate: "2026-02-14", timeSlot: "afternoon" },
    moving: {
      fromAddress: "Camden, London N7",
      toAddress: "Islington, London N1",
      distanceMiles: 8,
      packingAssistance: true,
    },
    items: [
      { key: "distance", label: "Distance", subLabel: "8 miles", price: 4.64 },
      { key: "home", label: "Home Type", subLabel: "2 Bed Flat", price: 850 },
      { key: "pack", label: "Packing Assistance", subLabel: "Yes", price: 295 },
    ],
    totals: { subtotal: 1149.64, discount: 0, totalDueNow: 1149.64 },
    payment: { status: "paid", method: "stripe", stripeSessionId: "cs_test_a1b2c3" },
  },
  {
    id: "ord_003",
    serviceType: "shredding",
    status: "completed",
    createdAt: "2025-12-10T09:40:00Z",
    customer: { name: "ACME Ltd", email: "ops@acme.co.uk", phone: "020 7123 4567" },
    address: { line1: "Unit 5, Stratford, London", postalCode: "E15 2PX" },
    schedule: { collectionDate: "2025-12-12", timeSlot: "evening" },
    shredding: { notes: "Call on arrival. Reception closes at 5pm." },
    items: [
      { key: "bag", label: "Bag (up to 15 lbs)", qty: 1, price: 12 },
      { key: "archive", label: "Archive Box (up to 15 lbs)", qty: 1, price: 18 },
    ],
    totals: { subtotal: 30, discount: 0, totalDueNow: 30 },
    payment: { status: "refunded", method: "stripe", stripeSessionId: "cs_test_g7h8i9" },
  },
];

function money(n: number) {
  return `£${n.toFixed(2)}`;
}

function niceDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}

function statusBadge(status: OrderStatus) {
  const base = "inline-flex rounded-full border px-2 py-1 text-xs font-semibold";
  switch (status) {
    case "new":
      return `${base} bg-slate-100 text-slate-700 border-slate-200`;
    case "confirmed":
      return `${base} bg-amber-50 text-amber-800 border-amber-200`;
    case "collected":
      return `${base} bg-sky-50 text-sky-800 border-sky-200`;
    case "completed":
      return `${base} bg-emerald-50 text-emerald-800 border-emerald-200`;
    case "cancelled":
      return `${base} bg-rose-50 text-rose-800 border-rose-200`;
  }
}

function payBadge(status: PaymentStatus) {
  const base = "inline-flex rounded-full border px-2 py-1 text-xs font-semibold";
  switch (status) {
    case "paid":
      return `${base} bg-emerald-50 text-emerald-800 border-emerald-200`;
    case "unpaid":
      return `${base} bg-amber-50 text-amber-800 border-amber-200`;
    case "failed":
      return `${base} bg-rose-50 text-rose-800 border-rose-200`;
    case "refunded":
      return `${base} bg-slate-100 text-slate-700 border-slate-200`;
  }
}

const SLOT_LABEL: Record<Exclude<Order["schedule"]["timeSlot"], "">, string> = {
  morning: "7am – 10am",
  afternoon: "10am – 3pm",
  evening: "3pm – 6pm",
};

const ORDER_STATUS_OPTIONS: OrderStatus[] = [
  "new",
  "confirmed",
  "collected",
  "completed",
  "cancelled",
];

export default function AdminOrderByIdPage() {
  const params = useParams<{ id: string }>();
  const orderId = params?.id;

  const initial = useMemo(
    () => DUMMY_ORDERS.find((o) => o.id === orderId) ?? null,
    [orderId]
  );

  // Local state so you can update status in UI (dummy)
  const [order, setOrder] = useState<Order | null>(initial);

  if (!order) {
    return (
      <main className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Order not found</div>
          <p className="mt-2 text-sm text-slate-600">
            No dummy order matches <span className="font-mono">{String(orderId)}</span>.
          </p>
          <div className="mt-4">
            <Link
              href="/admin/orders"
              className="inline-flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const slotText = order.schedule.timeSlot ? SLOT_LABEL[order.schedule.timeSlot] : "—";

  return (
    <main className="space-y-4">
      {/* Top header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-slate-900">Order</h1>
              <span className="font-mono text-xs text-slate-600">{order.id}</span>
              <span className={statusBadge(order.status)}>{order.status}</span>
              <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 capitalize">
                {order.serviceType}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Created: {niceDate(order.createdAt)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin/orders"
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50 inline-flex items-center"
            >
              Back
            </Link>

            <select
              value={order.status}
              onChange={(e) =>
                setOrder((o) => (o ? { ...o, status: e.target.value as OrderStatus } : o))
              }
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none"
            >
              {ORDER_STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  Set: {s}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
              title="Wire to real API later"
              onClick={() => alert("Dummy: saved (wire to API later)")}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid gap-4 lg:grid-cols-[1fr_380px] items-start">
        {/* Left column */}
        <div className="space-y-4">
          {/* Customer */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Customer</h2>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">Name</div>
                <div className="mt-1 text-sm font-medium text-slate-900">{order.customer.name}</div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">Phone</div>
                <div className="mt-1 text-sm font-medium text-slate-900">{order.customer.phone}</div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:col-span-2">
                <div className="text-xs font-semibold text-slate-500">Email</div>
                <div className="mt-1 text-sm font-medium text-slate-900">{order.customer.email}</div>
              </div>
            </div>
          </section>

          {/* Address + Schedule */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Collection</h2>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">Address</div>
                <div className="mt-1 text-sm font-medium text-slate-900">{order.address.line1}</div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">Postcode</div>
                <div className="mt-1 text-sm font-medium text-slate-900">{order.address.postalCode}</div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">Date</div>
                <div className="mt-1 text-sm font-medium text-slate-900">{order.schedule.collectionDate || "—"}</div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">Time slot</div>
                <div className="mt-1 text-sm font-medium text-slate-900">{slotText}</div>
              </div>
            </div>
          </section>

          {/* Service-specific details */}
          {order.serviceType === "moving" && order.moving && (
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Moving details</h2>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:col-span-2">
                  <div className="text-xs font-semibold text-slate-500">From</div>
                  <div className="mt-1 text-sm font-medium text-slate-900">{order.moving.fromAddress}</div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:col-span-2">
                  <div className="text-xs font-semibold text-slate-500">To</div>
                  <div className="mt-1 text-sm font-medium text-slate-900">{order.moving.toAddress}</div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-xs font-semibold text-slate-500">Distance</div>
                  <div className="mt-1 text-sm font-medium text-slate-900">
                    {order.moving.distanceMiles} miles
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-xs font-semibold text-slate-500">Packing assistance</div>
                  <div className="mt-1 text-sm font-medium text-slate-900">
                    {order.moving.packingAssistance ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            </section>
          )}

          {order.serviceType === "storage" && order.storage && (
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Storage details</h2>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-xs font-semibold text-slate-500">Duration</div>
                  <div className="mt-1 text-sm font-medium text-slate-900">
                    {order.storage.durationMonths} months
                  </div>
                </div>
              </div>
            </section>
          )}

          {order.serviceType === "shredding" && order.shredding && (
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Shredding notes</h2>
              <p className="mt-2 text-sm text-slate-700">
                {order.shredding.notes || "—"}
              </p>
            </section>
          )}

          {/* Items */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Items</h2>

            <div className="mt-3 overflow-auto rounded-xl border border-slate-200">
              <table className="min-w-[700px] w-full text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="p-3 text-left">Item</th>
                    <th className="p-3 text-left">Details</th>
                    <th className="p-3 text-right">Qty</th>
                    <th className="p-3 text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((it) => (
                    <tr key={it.key} className="border-t border-slate-200">
                      <td className="p-3 font-medium text-slate-900">{it.label}</td>
                      <td className="p-3 text-slate-600">{it.subLabel || "—"}</td>
                      <td className="p-3 text-right text-slate-900">{it.qty ?? "—"}</td>
                      <td className="p-3 text-right font-semibold text-slate-900">
                        {typeof it.price === "number" ? money(it.price) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right column */}
        <aside className="space-y-4 lg:sticky lg:top-6">
          {/* Totals */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
            <h2 className="text-sm font-semibold text-slate-900">Payment summary</h2>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold text-slate-900">{money(order.totals.subtotal)}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Discount</span>
              <span className="font-semibold text-slate-900">
                − {money(order.totals.discount)}
              </span>
            </div>

            <div className="h-px bg-slate-200" />

            <div className="flex items-center justify-between text-base">
              <span className="font-semibold text-slate-900">Total due now</span>
              <span className="font-bold text-slate-900">{money(order.totals.totalDueNow)}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Payment status</span>
              <span className={payBadge(order.payment.status)}>{order.payment.status}</span>
            </div>

            <div className="text-xs text-slate-500">
              Method: <span className="font-semibold text-slate-700">{order.payment.method.replace("_", " ")}</span>
            </div>

            {order.payment.stripeSessionId ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                Stripe session:
                <div className="mt-1 font-mono">{order.payment.stripeSessionId}</div>
              </div>
            ) : null}

            <div className="grid gap-2">
              <button
                type="button"
                onClick={() => alert("Dummy: open Stripe (wire later)")}
                disabled={!order.payment.stripeSessionId}
                className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-40"
              >
                Open Stripe
              </button>

              <button
                type="button"
                onClick={() => alert("Dummy: refund (wire later)")}
                className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Refund payment
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Print
              </button>
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
            <div className="text-sm font-semibold text-slate-900">Quick actions</div>
            <button
              type="button"
              onClick={() => alert("Dummy: send email (wire later)")}
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Email customer
            </button>
            <button
              type="button"
              onClick={() => alert("Dummy: create invoice (wire later)")}
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Create invoice
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
