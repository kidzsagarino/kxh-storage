"use client";

import React, { useEffect, useMemo, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;

  maxAmount: number; // e.g. payment.amount
  currency?: string; // "GBP"

  onConfirm: (payload: { amount: number; reason: string; note?: string }) => Promise<void> | void;
};

function money(n: number, sym = "£") {
  return `${sym}${n.toFixed(2)}`;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const REASONS = [
  { value: "duplicate", label: "Duplicate payment" },
  { value: "customer_request", label: "Customer requested refund" },
  { value: "service_cancelled", label: "Service cancelled" },
  { value: "rescheduled", label: "Rescheduled / not available" },
  { value: "pricing_issue", label: "Pricing issue" },
  { value: "other", label: "Other" },
] as const;

export function RefundModal({ open, onClose, maxAmount, currency = "GBP", onConfirm }: Props) {
  const [full, setFull] = useState(true);
  const [amountStr, setAmountStr] = useState(maxAmount.toFixed(2));
  const [reason, setReason] = useState<(typeof REASONS)[number]["value"]>("customer_request");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  // Reset when opening
  useEffect(() => {
    if (!open) return;
    setFull(true);
    setAmountStr(maxAmount.toFixed(2));
    setReason("customer_request");
    setNote("");
    setSubmitting(false);
    setTouched(false);
  }, [open, maxAmount]);

  // keep amount in sync for full refund
  useEffect(() => {
    if (!open) return;
    if (full) setAmountStr(maxAmount.toFixed(2));
  }, [full, maxAmount, open]);

  const amount = useMemo(() => {
    const x = Number(amountStr);
    return Number.isFinite(x) ? x : NaN;
  }, [amountStr]);

  const amountOk = useMemo(() => {
    if (!Number.isFinite(amount)) return false;
    return amount > 0 && amount <= maxAmount;
  }, [amount, maxAmount]);

  const canSubmit = amountOk && !!reason && !submitting;

  async function handleConfirm() {
    setTouched(true);
    if (!canSubmit) return;

    try {
      setSubmitting(true);
      const safeAmount = clamp(amount, 0.01, maxAmount);
      await onConfirm({ amount: safeAmount, reason, note: note.trim() || undefined });
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  // close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close refund modal"
        className="absolute inset-0 bg-black/30"
      />

      {/* Dialog */}
      <div className="relative mx-auto mt-24 w-[92%] max-w-lg">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.25)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Refund payment</h3>
              <p className="mt-1 text-xs text-slate-500">
                Available to refund:{" "}
                <span className="font-semibold text-slate-700">
                  {money(maxAmount)} {currency}
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {/* Full refund toggle */}
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <input
                type="checkbox"
                checked={full}
                onChange={(e) => setFull(e.target.checked)}
                className="h-4 w-4"
              />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-900">Full refund</div>
                <div className="text-xs text-slate-600">
                  Refund the full amount ({money(maxAmount)}).
                </div>
              </div>
            </label>

            {/* Amount */}
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700">Amount</label>
              <div className="flex items-center gap-2">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                  £
                </span>
                <input
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  onBlur={() => setTouched(true)}
                  disabled={full}
                  inputMode="decimal"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-emerald-200 disabled:bg-slate-100 disabled:text-slate-500"
                  placeholder="0.00"
                />
              </div>

              {touched && !amountOk && (
                <div className="text-xs text-rose-600">
                  Enter a valid amount between £0.01 and {money(maxAmount)}.
                </div>
              )}
            </div>

            {/* Reason */}
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700">Reason</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as any)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-emerald-200"
              >
                {REASONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Optional note */}
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Note <span className="text-xs font-normal text-slate-500">(optional)</span>
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Internal note for staff (not shown to customer)…"
              />
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                disabled={submitting}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={!canSubmit}
                className="h-11 rounded-xl bg-rose-600 px-5 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Processing…" : "Confirm refund"}
              </button>
            </div>

            {/* Warning */}
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
              Refunds should be confirmed with the customer when necessary. This action is not reversible.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
