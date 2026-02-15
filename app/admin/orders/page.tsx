"use client";

import Link from "next/link";
import React, { useMemo, useState, useEffect } from "react";
import { getAdminOrders, updateOrderStatus } from "./action";
import { money, to12Hour } from "@/app/utils/utils"; // Assuming money helper exists, or use local logic

type OrderWithCustomer = any;

// --- Date Helpers ---
function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function startOfWeekMonday(d: Date) {
  const x = startOfDay(d);
  const day = x.getDay();
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
    out.push({ key: `w-${i}`, label, from, toExclusive });
  }
  return out;
}

export function buildMonthOptions(monthsBack = 18) {
  const now = new Date();
  const out = [];
  for (let i = 0; i < monthsBack; i++) {
    const from = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const toExclusive = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    out.push({ key: `m-${from.getFullYear()}-${from.getMonth() + 1}`, label: monthLabel(from), from, toExclusive });
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
    out.push({ key: `y-${y}`, label: String(y), from, toExclusive });
  }
  return out;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderWithCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<"all" | "week" | "month" | "year">("all");
  const [rangeKey, setRangeKey] = useState<string>("");

  const options = useMemo(() => {
    if (mode === "week") return buildWeekOptions(10);
    if (mode === "month") return buildMonthOptions(18);
    if (mode === "year") return buildYearOptions(6);
    return [];
  }, [mode]);

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
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [q, rangeKey, options]);

  async function handleStatusChange(id: string, status: string) {
    try {
      await updateOrderStatus(id, status);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    } catch (err) {
      alert("Failed to update status");
    }
  }

  return (
    <main className="space-y-4 p-4 max-w-7xl mx-auto">
      {/* Header & Filter Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold text-slate-900">Live Orders</h1>

          <div className="flex flex-wrap items-center gap-2">
            <select 
              value={mode} 
              onChange={(e) => { setMode(e.target.value as any); setRangeKey(""); }} 
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="all">All time</option>
              <option value="week">By Week</option>
              <option value="month">By Month</option>
              <option value="year">By Year</option>
            </select>

            {mode !== "all" && (
              <select 
                value={rangeKey} 
                onChange={(e) => setRangeKey(e.target.value)} 
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="">Select range...</option>
                {options.map((o) => (
                  <option key={o.key} value={o.key}>{o.label}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, or ORD#..."
            className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-auto">
          {loading ? (
            <div className="p-20 text-center text-slate-500 font-medium">Loading orders...</div>
          ) : (
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="px-4 py-4">Order #</th>
                  <th className="px-4 py-4">Customer</th>
                  <th className="px-4 py-4">Collection Address</th>
                  <th className="px-4 py-4">Service Date</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((o) => {
                  const pickupAddr = o.addresses?.find((a: any) => a.type === "PICKUP");
                  return (
                    <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-4">
                        <Link 
                          href={`/admin/orders/${o.id}`}
                          className="font-mono text-xs font-bold text-emerald-600 hover:underline"
                        >
                          #{o.orderNumber}
                        </Link>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {new Date(o.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-slate-900">{o.customer.fullName}</div>
                        <div className="text-xs text-slate-500">{o.customer.email}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-slate-700 truncate max-w-[200px]">{pickupAddr?.line1 || "—"}</div>
                        <div className="text-[11px] font-bold text-slate-400 uppercase">{pickupAddr?.postalCode}</div>
                        <div className="text-[11px] font-bold text-slate-400 uppercase">{pickupAddr?.line2}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-slate-900">
                          {o.serviceDate ? new Date(o.serviceDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : "—"}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase">
                          {o.timeSlot ? `${ to12Hour(o.timeSlot.startTime)} - ${to12Hour(o.timeSlot.endTime)}` : "—"}
                        </div>
                      </td>
                      {/* <td className="px-4 py-4">
                        <select
                          value={o.status}
                          onChange={(e) => handleStatusChange(o.id, e.target.value)}
                          className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-[11px] font-bold uppercase outline-none focus:ring-2 focus:ring-emerald-500/20"
                        >
                          <option value="DRAFT">Draft</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="COLLECTED">Collected</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td> */}
                      <td className="px-4 py-4">
                        {o.status}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="font-bold text-slate-900">
                          £{(o.totalMinor / 100).toFixed(2)}
                        </div>
                        {o.discountMinor > 0 && (
                          <div className="text-[10px] text-emerald-600 font-medium">
                            Disc. Applied
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {!loading && orders.length === 0 && (
            <div className="p-20 text-center text-slate-400">No orders found for this criteria.</div>
          )}
        </div>
      </div>
    </main>
  );
}