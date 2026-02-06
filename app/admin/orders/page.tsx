"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";

type Order = {
  id: string;
  serviceType: "storage" | "moving" | "shredding";
  status: "new" | "confirmed" | "collected" | "completed" | "cancelled";
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  collectionDate: string;
  timeSlot: string;
  totalDueNow: number;
  createdAt: string; // ISO
};

const DUMMY_ORDERS: Order[] = [
  { id: "ord_001", serviceType: "storage", status: "new", name: "John Smith", email: "john@example.com", phone: "07123 456789", address: "12 Baker Street, London", postalCode: "NW1 6XE", collectionDate: "2026-02-12", timeSlot: "(7:00 AM to 10:00 AM) morning", totalDueNow: 120, createdAt: "2026-02-01T10:22:00Z" },
  { id: "ord_002", serviceType: "moving", status: "confirmed", name: "Sarah Jones", email: "sarah@example.com", phone: "07999 123456", address: "45 Camden Road, London", postalCode: "N7 0AB", collectionDate: "2026-01-29", timeSlot: "(10:00 AM to 3:00 PM) afternoon", totalDueNow: 685, createdAt: "2026-01-29T14:05:00Z" },
  { id: "ord_003", serviceType: "shredding", status: "completed", name: "ACME Ltd", email: "ops@acme.co.uk", phone: "020 7123 4567", address: "Unit 5, Stratford, London", postalCode: "E15 2PX", collectionDate: "2025-12-10", timeSlot: "(3:00 PM to 6:00 PM) evening", totalDueNow: 95, createdAt: "2025-12-10T09:40:00Z" },
];

const STATUS_OPTIONS: Order["status"][] = ["new", "confirmed", "collected", "completed", "cancelled"];

type FilterMode = "all" | "week" | "month" | "year";

type RangeOption = {
  key: string;
  label: string;
  from: Date;
  toExclusive: Date;
};

function money(n: number) {
  return `£${n.toFixed(2)}`;
}

function badge(status: Order["status"]) {
  const base = "inline-flex rounded-full border px-2 py-1 text-xs font-semibold";
  switch (status) {
    case "new": return `${base} bg-slate-100 text-slate-700 border-slate-200`;
    case "confirmed": return `${base} bg-amber-50 text-amber-800 border-amber-200`;
    case "collected": return `${base} bg-sky-50 text-sky-800 border-sky-200`;
    case "completed": return `${base} bg-emerald-50 text-emerald-800 border-emerald-200`;
    case "cancelled": return `${base} bg-rose-50 text-rose-800 border-rose-200`;
  }
}

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function startOfWeekMonday(d: Date) {
  const x = startOfDay(d);
  const day = x.getDay(); // 0 Sun, 1 Mon...
  const diff = (day === 0 ? -6 : 1) - day;
  x.setDate(x.getDate() + diff);
  return x;
}

function inRange(iso: string, from: Date, toExclusive: Date) {
  const t = new Date(iso);
  if (Number.isNaN(t.getTime())) return false;
  return t >= from && t < toExclusive;
}

function monthLabel(d: Date) {
  return d.toLocaleString(undefined, { month: "long", year: "numeric" });
}

function buildWeekOptions(weeksBack = 8): RangeOption[] {
  const now = new Date();
  const thisWeekStart = startOfWeekMonday(now);

  const out: RangeOption[] = [];
  for (let i = 0; i < weeksBack; i++) {
    const from = new Date(thisWeekStart);
    from.setDate(from.getDate() - i * 7);

    const toExclusive = new Date(from);
    toExclusive.setDate(toExclusive.getDate() + 7);

    const label =
      i === 0 ? "This week" : i === 1 ? "Last week" : `${i} weeks ago`;

    out.push({
      key: `w-${i}`,
      label,
      from,
      toExclusive,
    });
  }
  return out;
}

function buildMonthOptions(monthsBack = 12): RangeOption[] {
  const now = new Date();
  const out: RangeOption[] = [];

  for (let i = 0; i < monthsBack; i++) {
    const from = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const toExclusive = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

    out.push({
      key: `m-${from.getFullYear()}-${from.getMonth() + 1}`,
      label: monthLabel(from),
      from,
      toExclusive,
    });
  }

  return out;
}

function buildYearOptions(yearsBack = 5): RangeOption[] {
  const now = new Date();
  const out: RangeOption[] = [];

  for (let i = 0; i < yearsBack; i++) {
    const y = now.getFullYear() - i;
    const from = new Date(y, 0, 1);
    const toExclusive = new Date(y + 1, 0, 1);

    out.push({
      key: `y-${y}`,
      label: String(y),
      from,
      toExclusive,
    });
  }

  return out;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(DUMMY_ORDERS);

  const [q, setQ] = useState("");
  const [mode, setMode] = useState<FilterMode>("all");

  // second dropdown: dynamic range option
  const weekOptions = useMemo(() => buildWeekOptions(10), []);
  const monthOptions = useMemo(() => buildMonthOptions(18), []);
  const yearOptions = useMemo(() => buildYearOptions(6), []);

  const options = mode === "week" ? weekOptions : mode === "month" ? monthOptions : mode === "year" ? yearOptions : [];
  const [rangeKey, setRangeKey] = useState<string>(""); // selected option key

  // keep rangeKey valid when switching mode
  React.useEffect(() => {
    if (mode === "all") {
      setRangeKey("");
      return;
    }
    const first = options[0]?.key ?? "";
    setRangeKey(first);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  function updateStatus(id: string, status: Order["status"]) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  const selectedRange = useMemo(() => {
    if (mode === "all") return null;
    const list = options;
    return list.find((x) => x.key === rangeKey) ?? list[0] ?? null;
  }, [mode, options, rangeKey]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();

    return orders.filter((o) => {
      // dynamic date filter
      if (selectedRange && !inRange(o.createdAt, selectedRange.from, selectedRange.toExclusive)) {
        return false;
      }

      // search filter
      if (!term) return true;

      const hay = [
        o.id,
        o.serviceType,
        o.status,
        o.name,
        o.email,
        o.phone,
        o.postalCode,
        o.collectionDate,
        o.timeSlot,
      ]
        .join(" ")
        .toLowerCase();

      return hay.includes(term);
    });
  }, [orders, q, selectedRange]);

  return (
    <main className="space-y-4">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Orders</h1>
            <p className="text-xs text-slate-500">Dummy data — dynamic filters</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as FilterMode)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none"
            >
              <option value="all">All time</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>

            {mode !== "all" && (
              <select
                value={rangeKey || options[0]?.key || ""}
                onChange={(e) => setRangeKey(e.target.value)}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none"
              >
                {options.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search orders…"
            className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
          />
          <div className="text-xs text-slate-600 sm:text-right">
            Showing{" "}
            <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">{orders.length}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-auto">
          <table className="min-w-[980px] w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 text-left">Order</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Postcode</th>
                <th className="p-3 text-left">Collection Date</th>
                <th className="p-3 text-left">Time Slot</th>
                <th className="p-3 text-right">Total</th>
                <th className="p-3 text-left">Created</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-slate-500">
                    No orders match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="p-3 font-mono text-xs">
                      <Link
                        href={`/admin/orders/${o.id}`}
                        className="font-mono text-xs text-emerald-700 hover:underline"
                      >
                        {o.id}
                      </Link>
                    </td>
                    <td className="p-3 capitalize">{o.serviceType}</td>

                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className={badge(o.status)}>{o.status}</span>
                        <select
                          value={o.status}
                          onChange={(e) =>
                            setOrders((prev) =>
                              prev.map((x) =>
                                x.id === o.id
                                  ? { ...x, status: e.target.value as Order["status"] }
                                  : x
                              )
                            )
                          }
                          className="h-9 rounded-xl border border-slate-200 bg-white px-2 text-xs"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    <td className="p-3">
                      <div className="font-medium">{o.name}</div>
                      <div className="text-xs text-slate-500">{o.email}</div>
                    </td>

                    <td className="p-3 font-semibold">{o.postalCode}</td>

                    <td className="p-3">
                      {o.collectionDate}{" "}
                      
                    </td>
                    <td className="p-3 text-slate-500">{o.timeSlot}</td>
                    <td className="p-3 text-right font-semibold">
                      {money(o.totalDueNow)}
                    </td>

                    <td className="p-3 text-slate-700">
                      {new Date(o.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t bg-slate-50 px-4 py-3 text-xs text-slate-600">
          Week/month/year options are generated dynamically from today.
        </div>
      </div>
    </main>
  );
}
