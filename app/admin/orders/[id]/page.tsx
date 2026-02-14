"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getOrderById, updateOrderStatus } from "./actions"; 
import { money, to12Hour } from "@/app/utils/utils";

// ---- UI Helpers ----

function statusBadge(status: string) {
  const base = "inline-flex rounded-full border px-2 py-1 text-xs font-semibold uppercase";
  const s = status?.toLowerCase();
  switch (s) {
    case "draft":
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
    default:
      return `${base} bg-slate-50 text-slate-400 border-slate-200`;
  }
}

function payBadge(status: string) {
  const base = "inline-flex rounded-full border px-2 py-1 text-xs font-semibold uppercase";
  const s = status?.toLowerCase();
  switch (s) {
    case "paid":
    case "succeeded":
      return `${base} bg-emerald-50 text-emerald-800 border-emerald-200`;
    case "unpaid":
    case "pending":
      return `${base} bg-amber-50 text-amber-800 border-amber-200`;
    case "failed":
      return `${base} bg-rose-50 text-rose-800 border-rose-200`;
    case "refunded":
      return `${base} bg-slate-100 text-slate-700 border-slate-200`;
    default:
      return `${base} bg-slate-50 text-slate-400 border-slate-200`;
  }
}

export default function AdminOrderByIdPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadOrder() {
      if (!params?.id) return;
      try {
        const data = await getOrderById(params.id);
        setOrder(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [params?.id]);

  async function handleSaveStatus() {
    if (!order) return;
    setIsSaving(true);
    try {
      await updateOrderStatus(order.id, order.status);
      alert("Status updated successfully!");
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setIsSaving(false);
    }
  }

  if (loading) return <div className="p-10 text-center text-slate-500">Loading Order...</div>;

  if (!order) {
    return (
      <main className="p-10 text-center">
        <h1 className="text-xl font-bold">Order not found</h1>
        <Link href="/admin/orders" className="text-emerald-600 hover:underline">Back to list</Link>
      </main>
    );
  }

  const pickupAddress = order.addresses?.find((a: any) => a.type === "PICKUP");
  const deliveryAddress = order.addresses?.find((a: any) => a.type === "DELIVERY");
  const stripePayment = order.payments?.find((p: any) => p.provider === "STRIPE");
  const slot = order.timeSlot;

  const hasPacking = order.moving?.packingAssistance || order.items?.some((i: any) => i.name.toLowerCase().includes('pack'));
  const isMoving = order.serviceType?.toUpperCase() === "MOVING";
  
  const discountPercent = order.storageDiscountTier?.percentOff || 0;
  const durationMonths = order.items?.[0]?.months || 0;

  const getMapUrl = (addr: any) =>
    addr ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${addr.line1} ${addr.postalCode}`)}` : "#";

  return (
    <main className="space-y-4">
      {/* Top header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-slate-900">Order</h1>
              <span className="font-mono text-xs text-slate-600">{order.orderNumber}</span>
              <span className={statusBadge(order.status)}>{order.status}</span>
              <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 capitalize">
                {order.serviceType?.toLowerCase()}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Created: {new Date(order.createdAt).toLocaleString()}
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
              onChange={(e) => setOrder({ ...order, status: e.target.value })}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none"
            >
              <option value="DRAFT">DRAFT</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="COLLECTED">COLLECTED</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>

            <button
              onClick={handleSaveStatus}
              disabled={isSaving}
              className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_380px] items-start">
        <div className="space-y-4">

          {/* Customer */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Customer</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">Name</div>
                <div className="mt-1 text-sm font-medium text-slate-900">{order.customer?.fullName}</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">Phone</div>
                <div className="mt-1 text-sm font-medium text-slate-900">{order.customer?.phone || "N/A"}</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:col-span-2">
                <div className="text-xs font-semibold text-slate-500">Email</div>
                <div className="mt-1 text-sm font-medium text-slate-900">{order.customer?.email}</div>
              </div>
            </div>
          </section>

          {/* Collection Address & Schedule */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-slate-900">Collection Details</h2>
              <a href={getMapUrl(pickupAddress)} target="_blank" className="text-xs text-emerald-600 font-bold hover:underline">VIEW MAP</a>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">House Number</div>
                <div className="mt-1 text-sm font-medium text-slate-900">{pickupAddress?.line1}</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">Street Address</div>
                <div className="mt-1 text-sm font-medium text-slate-900">{pickupAddress?.line2}</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">Postcode</div>
                <div className="mt-1 text-sm font-medium text-slate-900">{pickupAddress?.postalCode}</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">Date</div>
                <div className="mt-1 text-sm font-medium text-slate-900">
                  {order.serviceDate ? new Date(order.serviceDate).toLocaleDateString('en-GB', { dateStyle: 'long' }) : "—"}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">Time slot</div>
                <div className="mt-1 text-sm font-medium text-slate-900">
                  {slot ? `${to12Hour(slot.startTime)} – ${to12Hour(slot.endTime)}` : "—"}
                </div>
              </div>
            </div>
          </section>

          {/* Delivery Address (If Moving) */}
          {isMoving && deliveryAddress && (
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold text-blue-700">Delivery Details</h2>
                <a href={getMapUrl(deliveryAddress)} target="_blank" className="text-xs text-blue-600 font-bold hover:underline">VIEW MAP</a>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:col-span-1">
                  <div className="text-xs font-semibold text-slate-500">Address</div>
                  <div className="mt-1 text-sm font-medium text-slate-900">{deliveryAddress.line1}</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-xs font-semibold text-slate-500">Postcode</div>
                  <div className="mt-1 text-sm font-medium text-slate-900">{deliveryAddress.postalCode}</div>
                </div>
              </div>
            </section>
          )}

          {/* Packing Checklist */}
          {hasPacking && (
            <section className="bg-emerald-900 rounded-3xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Packing Service Required</h3>
              </div>
              <p className="text-sm text-emerald-50 font-medium mb-4">The customer has requested packing assistance.</p>
              <div className="grid grid-cols-2 gap-3">
                {['Large Boxes', 'Bubble Wrap', 'Packing Tape', 'Marker Pens'].map(tool => (
                  <div key={tool} className="flex items-center gap-2 text-xs text-emerald-200">
                    <div className="w-4 h-4 rounded border border-emerald-700 flex items-center justify-center text-[8px]">✓</div>
                    {tool}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Notes */}
          {/* <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-amber-900 tracking-tight">Driver Instructions / Notes</h2>
            <p className="mt-2 text-sm text-amber-800 leading-relaxed italic">
              {order.notes || "No special instructions provided."}
            </p>
          </section> */}

          {/* Items Table */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Manifest / Inventory</h2>
            <div className="mt-3 overflow-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="p-3 text-left">Item</th>
                    <th className="p-3 text-right">Qty</th>
                    <th className="p-3 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {order.items?.map((it: any) => (
                    <tr key={it.id}>
                      <td className="p-3 font-medium text-slate-900">{it.name}</td>
                      <td className="p-3 text-right text-slate-600">{it.quantity}</td>
                      <td className="p-3 text-right font-semibold text-slate-900">
                        {money(it.lineTotalMinor / 100)}
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
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Payment Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium text-slate-900">{money(order.subtotalMinor / 100)}</span>
              </div>

              {/* Green Discount Card */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-800 font-semibold">Discount Applied</span>
                  <span className="font-bold text-emerald-900">− {money(order.discountMinor / 100)}</span>
                </div>
                <div className="text-xs text-emerald-700">
                  {durationMonths} month plan • {discountPercent}% off
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                <span className="font-bold text-slate-900">Total</span>
                <span className="font-bold text-xl text-slate-900">{money(order.totalMinor / 100)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-2">
              <span className="text-slate-600">Payment status</span>
              <span className={payBadge(order.payments?.[0]?.status || "unpaid")}>{order.payments?.[0]?.status || "unpaid"}</span>
            </div>

            {stripePayment && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                <div className="font-bold text-slate-500 uppercase text-[10px]">Stripe Reference</div>
                <div className="mt-1 font-mono break-all">{stripePayment.providerRef}</div>
              </div>
            )}

            <div className="grid gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Print Manifest
              </button>
              <button
                onClick={() => alert("Email functionality wire-up required")}
                className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Email Customer
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}