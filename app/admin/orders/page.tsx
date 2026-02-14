"use client";

import Link from "next/link";
import React, { useMemo, useState, useEffect } from "react";
import { getAdminOrders, updateOrderStatus } from "./action";

// Types from your actual Prisma schema
type OrderWithCustomer = any; // You can import the generated Prisma type here

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

function monthLabel(d: Date) {
  return d.toLocaleString(undefined, { month: "long", year: "numeric" });
}

export function buildWeekOptions(weeksBack = 10) {
  const now = new Date();
  const thisWeekStart = startOfWeekMonday(now);
  const out = [];

  for (let i = 0; i < weeksBack; i++) {
    const from = new Date(thisWeekStart);
    from.setDate(from.getDate() - i * 7);

    const toExclusive = new Date(from);
    toExclusive.setDate(toExclusive.getDate() + 7);

    const label = i === 0 ? "This week" : i === 1 ? "Last week" : `${i} weeks ago`;

    out.push({
      key: `w-${i}`,
      label,
      from,
      toExclusive,
    });
  }
  return out;
}

export function buildMonthOptions(monthsBack = 18) {
  const now = new Date();
  const out = [];

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

export function buildYearOptions(yearsBack = 6) {
  const now = new Date();
  const out = [];

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
  const [orders, setOrders] = useState<OrderWithCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<"all" | "week" | "month" | "year">("all");

  // Reuse your dynamic range builders
  const options = useMemo(() => {
    if (mode === "week") return buildWeekOptions(10);
    if (mode === "month") return buildMonthOptions(18);
    if (mode === "year") return buildYearOptions(6);
    return [];
  }, [mode]);

  const [rangeKey, setRangeKey] = useState<string>("");

  // Fetch Logic
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const selectedRange = options.find((x) => x.key === rangeKey);

      try {
        const data = await getAdminOrders({
          q: q,
          from: selectedRange?.from,
          to: selectedRange?.toExclusive,
        });
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [q, rangeKey, options]);

  // Handle Status Update in DB
  async function handleStatusChange(id: string, status: string) {
    try {
      await updateOrderStatus(id, status);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    } catch (err) {
      alert("Failed to update status");
    }
  }

  return (
    <main className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-lg font-semibold text-slate-900">Live Orders</h1>

          <div className="flex flex-wrap items-center gap-2">
            <select value={mode} onChange={(e) => setMode(e.target.value as any)} className="...">
              <option value="all">All time</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>

            {mode !== "all" && (
              <select value={rangeKey} onChange={(e) => setRangeKey(e.target.value)} className="...">
                {options.map((o) => (
                  <option key={o.key} value={o.key}>{o.label}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, email, or ORD#..."
          className="..."
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-auto">
          {loading ? (
            <div className="p-10 text-center">Loading orders...</div>
          ) : (
            <table className="min-w-[980px] w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="...">Order #</th>
                  <th className="...">Customer</th>
                  <th className="...">Status</th>
                  <th className="...">Total</th>
                  <th className="...">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const pickupAddr = o.addresses.find((a: any) => a.type === "PICKUP");
                  return (
                    <tr key={o.id} className="border-t">
                      <td className="p-3 font-mono text-emerald-700">
                        <Link href={`/admin/orders/${o.id}`}>{o.orderNumber}</Link>
                      </td>
                      <td className="p-3">
                        <div>{o.customer.fullName}</div>
                        <div className="text-xs text-slate-400">{o.customer.email}</div>
                      </td>
                      <td className="p-3">
                        <select
                          value={o.status}
                          onChange={(e) => handleStatusChange(o.id, e.target.value)}
                          className="h-9 rounded-xl border border-slate-200 bg-white px-2 text-xs"
                        >
                          <option value="DRAFT">Draft</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3 font-semibold">{pickupAddr?.postalCode || "—"}</td>
                      <td className="p-3">
                        {o.serviceDate ? new Date(o.serviceDate).toLocaleDateString() : "—"}
                      </td>
                      <td className="p-3 text-slate-500">
                        {o.timeSlot ? `${o.timeSlot.startTime} - ${o.timeSlot.endTime}` : "—"}
                      </td>
                      <td className="p-3 text-right font-semibold">
                        £{(o.totalMinor / 100).toFixed(2)}
                      </td>
                      <td className="p-3 text-slate-500">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}