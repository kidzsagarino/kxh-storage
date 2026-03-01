"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getOrderById } from "./actions";
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

function formatNextBilling(value: any) {
  if (!value) return "—";
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { dateStyle: "medium" });
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
      //await updateOrderStatus(order.id, order.status);
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
  const deliveryAddress = order.addresses?.find((a: any) => a.type === "DROPOFF");
  const stripePayment = order.payments;
  const slot = order.timeSlot;
  const nextBillingAt = order?.subscription?.nextBillingAt ?? order?.nextBillingAt ?? order?.billing?.nextBillingAt ?? null;

  const hasPacking = order.moving?.packingAssistance || order.items?.some((i: any) => i.name.toLowerCase().includes('pack'));
  const isMoving = order.serviceType?.toUpperCase() === "MOVING";
  const movingPricePerMileMinor = order?.pricing?.movingPricePerMileMinor ?? 58;
  const distanceMiles = isMoving ? Number(order.distanceMiles ?? 0) : 0;
  const distanceCostMinor = isMoving ? Math.max(0, distanceMiles) * movingPricePerMileMinor : 0;

  const isStorage = order.serviceType?.toUpperCase() === "STORAGE";
  const isShredding = order.serviceType?.toUpperCase() === "SHREDDING";

  const discountPercent = order.storageDiscountTier?.percentOff || 0;
  const durationMonths = order.items?.[0]?.months || 0;

  const getMapUrl = (addr: any) =>
    addr ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${addr.line1} ${addr.postalCode}`)}` : "#";

  // Calculate discount amount for storage orders
  const storageDiscountAmountMinor = isStorage && order.storageDiscountTier
    ? Math.round((order.subtotalMinor || 0) * (order.storageDiscountTier.percentOff / 100))
    : 0;

  return (
    <main className="space-y-4">
      {/* Top header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5">
            {/* New Service Profile Section */}
            <section className="mb-4 w-50">
              <div className="flex items-left justify-left">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-200">
                      {/* Icon changes based on service */}
                      {isMoving && "🚚"}
                      {isStorage && "📦"}
                      {isShredding && "♻️"}
                    </div>
                    <span className="text-sm font-bold text-slate-900 capitalize">
                      {order.serviceType?.toLowerCase()} Service
                    </span>
                  </div>
                </div>

                {/* Secondary Fact: e.g. Duration or Items count */}
                {/* <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {isMoving ? "Packing" : "Duration"}
                  </span>
                  <div className="text-sm font-semibold text-slate-700">
                    {isMoving ? (hasPacking ? "Yes" : "No") : `${durationMonths} Months`}
                  </div>
                </div> */}
              </div>
            </section>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Order <span className="font-mono font-medium text-slate-500 ml-1">#{order.orderNumber}</span>
              </h1>

              <div className="flex items-center gap-1.5 ml-2">
                <span className={statusBadge(order.status)}>
                  {order.status}
                </span>
              </div>
            </div>

            {/* Bottom Row: Metadata */}
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Placed {new Date(order.createdAt).toLocaleDateString('en-GB', { dateStyle: 'medium' })}</span>
              </div>

              <span className="text-slate-300">•</span>

              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin/orders"
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50 inline-flex items-center"
            >
              Back
            </Link>

            {/* <select
              value={order.status}
              onChange={(e) => setOrder({ ...order, status: e.target.value })}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none"
            >
              <option value="DRAFT">DRAFT</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="COLLECTED">COLLECTED</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select> */}

            {/* <button
              onClick={handleSaveStatus}
              disabled={isSaving}
              className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save"}
            </button> */}
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
                <div className="text-xs font-semibold text-slate-500">Address</div>
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
              {isMoving && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-xs font-semibold text-slate-500">Distance</div>
                  <div className="mt-1 text-sm font-medium text-slate-900">
                    {distanceMiles ? `${distanceMiles} mile${distanceMiles === 1 ? "" : "s"}` : "—"}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Cost: {money(distanceCostMinor / 100)}
                  </div>
                </div>
              )}
              {order.notes && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-xs font-semibold text-slate-500">Notes</div>
                  <div className="mt-1 text-sm font-medium text-slate-900">
                    {order.notes}
                  </div>

                </div>
              )}
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
                  <div className="text-xs font-semibold text-slate-500">Address</div>
                  <div className="mt-1 text-sm font-medium text-slate-900">{deliveryAddress.line2}</div>
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
                  {isMoving && (
                    <tr>
                      <td className="p-3 font-medium text-slate-900">
                        Distance ({distanceMiles} mile{distanceMiles === 1 ? "" : "s"})
                      </td>
                      <td className="p-3 text-right text-slate-600">1</td>
                      <td className="p-3 text-right font-semibold text-slate-900">
                        {money(distanceCostMinor / 100)}
                      </td>
                    </tr>
                  )}
                  {/* Moving package row if present */}
                  {isMoving && order.movingPackage && (
                    <tr>
                      <td className="p-3 font-medium text-slate-900">
                        {order.movingPackage.name || order.movingPackage.sku || "Moving Package"}
                      </td>
                      <td className="p-3 text-right text-slate-600">1</td>
                      <td className="p-3 text-right font-semibold text-slate-900">
                        {money(order.movingPackage.prices?.[0]?.priceMinor / 100)}
                      </td>
                    </tr>
                  )}
                  {/* Storage discount tier row if present */}
                  {isStorage && order.storageDiscountTier && (
                    <tr>
                      <td className="p-3 font-medium text-slate-900">Discount Tier</td>
                      <td className="p-3 text-right text-slate-600">{order.storageDiscountTier.minMonths} mo</td>
                      <td className="p-3 text-right font-semibold text-slate-900">{money(storageDiscountAmountMinor / 100)}</td>
                    </tr>
                  )}
                  {/* Order items */}
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
            {isStorage && (
              <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 font-semibold">Next billing cycle</span>
                  <span className="font-bold text-slate-900">
                    {formatNextBilling(nextBillingAt)}
                  </span>
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Based on the active subscription period end
                </div>
              </div>
            )}
            <div className="flex flex-col gap-4">
              <span className="text-sm font-semibold text-slate-600">Payment History</span>

              <div className="flex flex-col space-y-3">
                {stripePayment && stripePayment.length > 0 ? (
                  stripePayment.map((payment: any, index: number) => (
                    <div
                      key={payment.id || index}
                      className="flex items-start justify-between gap-2 border-b border-slate-50 pb-2 last:border-0"
                    >
                      {/* Left Side: Status & Reference */}
                      <div className="flex flex-col gap-1 min-w-0 flex-1"> {/* min-w-0 allows truncation/wrap */}
                        <div className="flex">
                          <span className={payBadge(payment.status || "unpaid")}>
                            {payment.status || "unpaid"}
                          </span>
                        </div>
                        {payment.providerRef && (
                          <span className="text-[10px] font-mono text-slate-400 break-all leading-tight">
                            Ref: {payment.providerRef}
                          </span>
                        )}
                      </div>

                      {/* Right Side: Date & Time */}
                      <div className="flex flex-col items-end shrink-0"> {/* shrink-0 keeps the date from squishing */}
                        <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                          {payment.createdAt
                            ? new Date(payment.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
                            : "N/A"}
                        </span>
                        {payment.createdAt && (
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">
                            {new Date(payment.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <span className={payBadge("unpaid")}>No payments found</span>
                  </div>
                )}
              </div>
            </div>
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
              <button
                onClick={async () => {
                  if (!order?.id) return;
                  const res = await fetch(`/api/orders/send-receipt`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ paidOrderId: order.id }),
                  });
                  if (res.ok) {
                    alert("Receipt sent to customer email.");
                  } else {
                    alert("Failed to send receipt.");
                  }
                }}
                className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Send Receipt PDF
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}