"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RefundModal } from "../_components/RefundModal";

type ServiceType = "storage" | "moving" | "shredding";
type PaymentStatus = "paid" | "unpaid" | "refunded" | "failed";

type PaymentEvent = {
  id: string;
  at: string; // ISO
  title: string;
  desc?: string;
  kind: "info" | "success" | "warning" | "danger";
};

type Payment = {
  id: string;
  orderId: string;
  serviceType: ServiceType;
  status: PaymentStatus;

  amount: number; // GBP
  currency: "GBP";
  method: "stripe" | "cash" | "bank_transfer";

  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  receiptUrl?: string;

  customer: {
    name: string;
    email: string;
    phone?: string;
    postalCode: string;
  };

  createdAt: string; // ISO
  updatedAt?: string; // ISO
  notes?: string;

  events: PaymentEvent[];
};

// ---- Dummy data ----
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
    stripePaymentIntentId: "pi_test_123",
    receiptUrl: "",
    customer: {
      name: "Sarah Jones",
      email: "sarah@example.com",
      phone: "07999 123456",
      postalCode: "N7 0AB",
    },
    createdAt: "2026-02-02T14:06:00Z",
    updatedAt: "2026-02-02T14:07:30Z",
    notes: "Customer requested afternoon slot confirmation.",
    events: [
      {
        id: "e1",
        at: "2026-02-02T14:06:00Z",
        title: "Payment created",
        desc: "Stripe checkout session created.",
        kind: "info",
      },
      {
        id: "e2",
        at: "2026-02-02T14:07:30Z",
        title: "Payment succeeded",
        desc: "Funds captured successfully.",
        kind: "success",
      },
    ],
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
    stripePaymentIntentId: "",
    receiptUrl: "",
    customer: {
      name: "John Smith",
      email: "john@example.com",
      phone: "07123 456789",
      postalCode: "NW1 6XE",
    },
    createdAt: "2026-02-01T10:30:00Z",
    notes: "Waiting for customer to complete checkout.",
    events: [
      {
        id: "e1",
        at: "2026-02-01T10:30:00Z",
        title: "Payment created",
        desc: "Checkout link generated.",
        kind: "info",
      },
    ],
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
    stripePaymentIntentId: "pi_test_777",
    receiptUrl: "",
    customer: {
      name: "ACME Ltd",
      email: "ops@acme.co.uk",
      postalCode: "E15 2PX",
    },
    createdAt: "2025-12-10T09:45:00Z",
    updatedAt: "2025-12-11T11:12:00Z",
    notes: "Refund issued due to reschedule.",
    events: [
      {
        id: "e1",
        at: "2025-12-10T09:45:00Z",
        title: "Payment created",
        desc: "Stripe checkout session created.",
        kind: "info",
      },
      {
        id: "e2",
        at: "2025-12-10T09:50:00Z",
        title: "Payment succeeded",
        desc: "Funds captured successfully.",
        kind: "success",
      },
      {
        id: "e3",
        at: "2025-12-11T11:12:00Z",
        title: "Refund processed",
        desc: "Full refund issued in Stripe.",
        kind: "warning",
      },
    ],
  },
];

const STATUS_OPTIONS: PaymentStatus[] = ["paid", "unpaid", "refunded", "failed"];

function moneyGBP(n: number) {
  return `£${n.toFixed(2)}`;
}

function niceDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
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

function eventDot(kind: PaymentEvent["kind"]) {
  const base = "h-2.5 w-2.5 rounded-full";
  switch (kind) {
    case "success":
      return `${base} bg-emerald-500`;
    case "warning":
      return `${base} bg-amber-500`;
    case "danger":
      return `${base} bg-rose-500`;
    default:
      return `${base} bg-slate-400`;
  }
}

export default function AdminPaymentByIdPage() {
  const params = useParams<{ id: string }>();
  const paymentId = params?.id;

  const initial = useMemo(
    () => DUMMY_PAYMENTS.find((p) => p.id === paymentId) ?? null,
    [paymentId]
  );

  // Local state so status edits work in UI (dummy)
  const [payment, setPayment] = useState<Payment | null>(initial);

  const [refundOpen, setRefundOpen] = useState(false);

  async function handleRefund(payload: { amount: number; reason: string; note?: string }) {
    // ✅ Dummy behavior: mark refunded + add an event
    setPayment((p) => {
      if (!p) return p;

      return {
        ...p,
        status: "refunded",
        updatedAt: new Date().toISOString(),
        events: [
          ...p.events,
          {
            id: `e_${Math.random().toString(16).slice(2)}`,
            at: new Date().toISOString(),
            title: "Refund requested",
            desc: `Amount: £${payload.amount.toFixed(2)} • Reason: ${payload.reason}${payload.note ? ` • Note: ${payload.note}` : ""
              }`,
            kind: "warning",
          },
        ],
      };
    });
  }

  if (!payment) {
    return (
      <main className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Payment not found</div>
          <p className="mt-2 text-sm text-slate-600">
            No dummy payment matches <span className="font-mono">{String(paymentId)}</span>.
          </p>
          <div className="mt-4">
            <Link
              href="/admin/payments"
              className="inline-flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Back to Payments
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const status = payment.status;

  const isStripe = payment.method === "stripe";
  const canOpenStripe = isStripe && !!payment.stripeSessionId;

  function dummySave() {
    alert("Dummy: saved (wire to API later)");
  }

  function dummyRefund() {
    setPayment((p) =>
      p ? { ...p, status: "refunded", updatedAt: new Date().toISOString() } : p
    );
    alert("Dummy: refunded (wire to Stripe later)");
  }

  function dummyMarkPaid() {
    setPayment((p) =>
      p ? { ...p, status: "paid", updatedAt: new Date().toISOString() } : p
    );
  }

  function dummyMarkUnpaid() {
    setPayment((p) =>
      p ? { ...p, status: "unpaid", updatedAt: new Date().toISOString() } : p
    );
  }

  return (
    <main className="space-y-4">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-semibold text-slate-900">Payment</h1>
              <span className="font-mono text-xs text-slate-600">{payment.id}</span>
              <span className={payBadge(payment.status)}>{payment.status}</span>
              <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 capitalize">
                {payment.serviceType}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Created: {niceDate(payment.createdAt)} • Updated: {niceDate(payment.updatedAt)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin/payments"
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50 inline-flex items-center"
            >
              Back
            </Link>

            <select
              value={payment.status}
              onChange={(e) =>
                setPayment((p) =>
                  p ? { ...p, status: e.target.value as PaymentStatus } : p
                )
              }
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  Set: {s}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={dummySave}
              className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-4 lg:grid-cols-[1fr_380px] items-start">
        {/* Left */}
        <div className="space-y-4">
          {/* Payment details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Payment details</h2>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">Amount</div>
                <div className="mt-1 text-base font-semibold text-slate-900">
                  {moneyGBP(payment.amount)}{" "}
                  <span className="text-xs font-semibold text-slate-500">
                    ({payment.currency})
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">Method</div>
                <div className="mt-1 text-sm font-semibold text-slate-900 capitalize">
                  {payment.method.replace("_", " ")}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:col-span-2">
                <div className="text-xs font-semibold text-slate-500">Order</div>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <Link
                    href={`/admin/orders/${payment.orderId}`}
                    className="font-mono text-xs text-emerald-700 hover:underline"
                  >
                    {payment.orderId}
                  </Link>
                  <span className="text-xs text-slate-500 capitalize">
                    {payment.serviceType}
                  </span>
                </div>
              </div>
            </div>

            {payment.method === "stripe" && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="text-xs font-semibold text-slate-500">Stripe session</div>
                  <div className="mt-1 font-mono text-xs text-slate-800">
                    {payment.stripeSessionId || "—"}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="text-xs font-semibold text-slate-500">Payment intent</div>
                  <div className="mt-1 font-mono text-xs text-slate-800">
                    {payment.stripePaymentIntentId || "—"}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
              <div className="text-xs font-semibold text-slate-500">Notes</div>
              <p className="mt-1 text-sm text-slate-700">{payment.notes || "—"}</p>
            </div>
          </section>

          {/* Customer snapshot */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Customer</h2>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">Name</div>
                <div className="mt-1 text-sm font-medium text-slate-900">
                  {payment.customer.name}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-500">Postcode</div>
                <div className="mt-1 text-sm font-medium text-slate-900">
                  {payment.customer.postalCode}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:col-span-2">
                <div className="text-xs font-semibold text-slate-500">Email</div>
                <div className="mt-1 text-sm font-medium text-slate-900">
                  {payment.customer.email}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:col-span-2">
                <div className="text-xs font-semibold text-slate-500">Phone</div>
                <div className="mt-1 text-sm font-medium text-slate-900">
                  {payment.customer.phone || "—"}
                </div>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Timeline</h2>

            <div className="mt-3 space-y-3">
              {payment.events.length === 0 ? (
                <div className="text-sm text-slate-500">No events yet.</div>
              ) : (
                payment.events
                  .slice()
                  .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
                  .map((ev) => (
                    <div key={ev.id} className="flex gap-3">
                      <div className="mt-1">
                        <div className={eventDot(ev.kind)} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-semibold text-slate-900">
                            {ev.title}
                          </div>
                          <div className="text-xs text-slate-500">{niceDate(ev.at)}</div>
                        </div>
                        {ev.desc ? (
                          <div className="mt-1 text-sm text-slate-600">{ev.desc}</div>
                        ) : null}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </section>
        </div>

        {/* Right */}
        <aside className="space-y-4 lg:sticky lg:top-6">
          {/* Summary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
            <h2 className="text-sm font-semibold text-slate-900">Summary</h2>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Status</span>
              <span className={payBadge(status)}>{status}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Amount</span>
              <span className="font-semibold text-slate-900">
                {moneyGBP(payment.amount)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Method</span>
              <span className="font-semibold text-slate-900 capitalize">
                {payment.method.replace("_", " ")}
              </span>
            </div>

            <div className="h-px bg-slate-200" />

            <div className="grid gap-2">
              <button
                type="button"
                disabled={!canOpenStripe}
                onClick={() => alert("Dummy: open Stripe (wire later)")}
                className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-40"
              >
                Open Stripe
              </button>

              <button
                type="button"
                onClick={() => setRefundOpen(true)}
                className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Refund payment
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={dummyMarkPaid}
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Mark paid
                </button>
                <button
                  type="button"
                  onClick={dummyMarkUnpaid}
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Mark unpaid
                </button>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Print
              </button>
            </div>
          </div>

          {/* Developer note */}
          {/* <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
            When you wire this to Stripe later, replace alerts with:
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>GET /api/admin/payments/:id</li>
              <li>PATCH /api/admin/payments/:id (status/notes)</li>
              <li>POST /api/admin/payments/:id/refund</li>
            </ul>
          </div> */}
        </aside>
      </div>
      <RefundModal
        open={refundOpen}
        onClose={() => setRefundOpen(false)}
        maxAmount={payment.amount}
        currency={payment.currency}
        onConfirm={handleRefund}
      />
    </main>

  );
}
