"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type PaymentStatus = "paid" | "unpaid" | "refunded" | "failed";

type Payment = {
  id: string;
  orderId: string;
  serviceType: "storage" | "moving" | "shredding";
  status: PaymentStatus;
  amount: number; // GBP
  currency: "GBP";
  method: "stripe" | "cash" | "bank_transfer";
  stripeSessionId?: string;
  receiptUrl?: string;
  customerName: string;
  customerEmail: string;
  postalCode: string;
  createdAt: string; // ISO
};

const DUMMY_PAYMENTS: Payment[] = [
  {
    id: "pay_001",
    orderId: "ord_002",
    serviceType: "moving",
    status: "paid",
    amount: 685,
    currency: "GBP",
    method: "stripe",
    stripeSessionId: "cs_test_a1b2c3",
    customerName: "Sarah Jones",
    customerEmail: "sarah@example.com",
    postalCode: "N7 0AB",
    createdAt: "2026-02-02T14:06:00Z",
  },
  {
    id: "pay_002",
    orderId: "ord_001",
    serviceType: "storage",
    status: "unpaid",
    amount: 120,
    currency: "GBP",
    method: "stripe",
    stripeSessionId: "cs_test_d4e5f6",
    customerName: "John Smith",
    customerEmail: "john@example.com",
    postalCode: "NW1 6XE",
    createdAt: "2026-02-01T10:30:00Z",
  },
  {
    id: "pay_003",
    orderId: "ord_003",
    serviceType: "shredding",
    status: "refunded",
    amount: 95,
    currency: "GBP",
    method: "stripe",
    stripeSessionId: "cs_test_g7h8i9",
    customerName: "ACME Ltd",
    customerEmail: "ops@acme.co.uk",
    postalCode: "E15 2PX",
    createdAt: "2025-12-10T09:45:00Z",
  },
];

type FilterMode = "all" | "week" | "month" | "year";

type RangeOption = {
  key: string;
  label: string;
  from: Date;
  toExclusive: Date;
};

function moneyGBP(n: number) {
  return `£${n.toFixed(2)}`;
}

function niceDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}

function badgeClass(s: PaymentStatus) {
  const base =
    "inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold";
  switch (s) {
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

function buildWeekOptions(weeksBack = 10): RangeOption[] {
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

    out.push({ key: `w-${i}`, label, from, toExclusive });
  }

  return out;
}

function buildMonthOptions(monthsBack = 18): RangeOption[] {
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

function buildYearOptions(yearsBack = 6): RangeOption[] {
  const now = new Date();
  const out: RangeOption[] = [];

  for (let i = 0; i < yearsBack; i++) {
    const y = now.getFullYear() - i;
    const from = new Date(y, 0, 1);
    const toExclusive = new Date(y + 1, 0, 1);

    out.push({ key: `y-${y}`, label: String(y), from, toExclusive });
  }

  return out;
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(DUMMY_PAYMENTS);
  const [q, setQ] = useState("");

  // dynamic date filtering
  const [mode, setMode] = useState<FilterMode>("all");

  const weekOptions = useMemo(() => buildWeekOptions(10), []);
  const monthOptions = useMemo(() => buildMonthOptions(18), []);
  const yearOptions = useMemo(() => buildYearOptions(6), []);

  const options =
    mode === "week"
      ? weekOptions
      : mode === "month"
      ? monthOptions
      : mode === "year"
      ? yearOptions
      : [];

  const [rangeKey, setRangeKey] = useState<string>("");

  useEffect(() => {
    if (mode === "all") {
      setRangeKey("");
      return;
    }
    setRangeKey(options[0]?.key ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const selectedRange = useMemo(() => {
    if (mode === "all") return null;
    return options.find((x) => x.key === rangeKey) ?? options[0] ?? null;
  }, [mode, options, rangeKey]);

  // Dummy actions (wire later)
  function markAsPaid(id: string) {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "paid" } : p))
    );
  }
  function markAsUnpaid(id: string) {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "unpaid" } : p))
    );
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();

    return payments.filter((p) => {
      // date filter
      if (selectedRange && !inRange(p.createdAt, selectedRange.from, selectedRange.toExclusive)) {
        return false;
      }

      // search
      if (!term) return true;

      const hay = [
        p.id,
        p.orderId,
        p.serviceType,
        p.status,
        p.customerName,
        p.customerEmail,
        p.postalCode,
        p.method,
        p.stripeSessionId ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return hay.includes(term);
    });
  }, [payments, q, selectedRange]);

  const stats = useMemo(() => {
    const baseList = filtered; // stats reflect filter selection
    const paid = baseList.filter((p) => p.status === "paid").reduce((a, b) => a + b.amount, 0);
    const unpaid = baseList.filter((p) => p.status === "unpaid").reduce((a, b) => a + b.amount, 0);
    const refunded = baseList.filter((p) => p.status === "refunded").reduce((a, b) => a + b.amount, 0);

    return {
      paidCount: baseList.filter((p) => p.status === "paid").length,
      unpaidCount: baseList.filter((p) => p.status === "unpaid").length,
      refundedCount: baseList.filter((p) => p.status === "refunded").length,
      paid,
      unpaid,
      refunded,
    };
  }, [filtered]);

  return (
    <main className="space-y-4">
      {/* Header / stats */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Payments</h1>
            <p className="text-xs text-slate-500">
              Dummy data — dynamic date filters
            </p>
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

        {/* Stats cards (reflect current filter) */}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold text-slate-500">Paid</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">
              {moneyGBP(stats.paid)}
            </div>
            <div className="mt-1 text-xs text-slate-600">{stats.paidCount} payments</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold text-slate-500">Unpaid</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">
              {moneyGBP(stats.unpaid)}
            </div>
            <div className="mt-1 text-xs text-slate-600">{stats.unpaidCount} payments</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold text-slate-500">Refunded</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">
              {moneyGBP(stats.refunded)}
            </div>
            <div className="mt-1 text-xs text-slate-600">{stats.refundedCount} payments</div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search: payment id, order id, email, postcode, session id…"
            className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
          />
          <div className="text-xs text-slate-600 sm:text-right">
            Showing{" "}
            <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">{payments.length}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-auto">
          <table className="min-w-[1060px] w-full text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-left">Order</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Postcode</th>
                <th className="p-3 text-right">Amount</th>
                <th className="p-3 text-left">Method</th>
                <th className="p-3 text-left">Created</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-6 text-center text-slate-500">
                    No payments match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="border-t border-slate-200">
                    <td className="p-3">
                      <Link
                        href={`/admin/payments/${p.id}`}
                        className="font-medium text-slate-900 hover:underline"
                      >
                        <div className="font-mono text-xs text-slate-700">{p.id}</div>
                        <div className="mt-1 text-xs text-slate-500">
                          Session:{" "}
                          {p.stripeSessionId ? (
                            <span className="font-mono">{p.stripeSessionId}</span>
                          ) : (
                            "—"
                          )}
                        </div>
                      </Link>
                    </td>

                    <td className="p-3">
                      {/* wire later to /admin/orders/[id] */}
                      <Link
                        href="/admin/orders"
                        className="font-mono text-xs text-emerald-700 hover:underline"
                        title="Wire to /admin/orders/[id] later"
                      >
                        {p.orderId}
                      </Link>
                    </td>

                    <td className="p-3 capitalize">{p.serviceType}</td>

                    <td className="p-3">
                      <span className={badgeClass(p.status)}>{p.status}</span>
                    </td>

                    <td className="p-3">
                      <div className="font-medium text-slate-900">{p.customerName}</div>
                      <div className="text-xs text-slate-500">{p.customerEmail}</div>
                    </td>

                    <td className="p-3 font-semibold text-slate-900">{p.postalCode}</td>

                    <td className="p-3 text-right font-semibold text-slate-900">
                      {moneyGBP(p.amount)}
                    </td>

                    <td className="p-3">
                      <span className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700">
                        {p.method.replace("_", " ")}
                      </span>
                    </td>

                    <td className="p-3 text-slate-700">{niceDate(p.createdAt)}</td>

                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {/* <button
                          type="button"
                          onClick={() => markAsPaid(p.id)}
                          className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                        >
                          Mark paid
                        </button>
                        <button
                          type="button"
                          onClick={() => markAsUnpaid(p.id)}
                          className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                        >
                          Mark unpaid
                        </button> */}

                        <button
                          type="button"
                          disabled={!p.stripeSessionId}
                          className="h-9 rounded-xl bg-slate-900 px-3 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-40"
                          title={p.stripeSessionId ? "Wire to Stripe dashboard URL later" : "No Stripe session"}
                        >
                          Open Stripe
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
          Week/month/year range options are generated dynamically from today.
        </div>
      </div>
    </main>
  );
}
