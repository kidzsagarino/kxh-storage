"use client";

import React, { useMemo } from "react";
import { useShreddingCheckout, type TimeSlotId } from "../components/checkout/CheckoutStore";
import { to12Hour } from "../utils/utils";

const BAG_PRICE = 7;
const BOX_PRICE = 9;

const SLOT_LABEL: Record<Exclude<TimeSlotId, "">, string> = {
  morning: "7am - 9am",
  afternoon: "10am - 3pm",
  evening: "3pm - 6pm",
};

function money(n: number, sym = "£") {
  return `${sym}${n.toFixed(2)}`;
}


type Props = {
  onProceed: () => void;
  busy?: boolean;
  error?: string | null;
};

export function ShreddingOrderSummary({ onProceed, busy, error }: Props) {
  const { state, orderFlow } = useShreddingCheckout();

  const itemsBySku = orderFlow?.catalog?.shredding?.itemsBySku ?? {};

  const currencySymbol = orderFlow?.currency === "GBP" ? "£" : "";

  const itemsOk = Object.values(state.quantities ?? {}).some((n) => (Number(n) || 0) > 0);
  const scheduleOk = !!state.collectionDate && !!state.timeSlotId;

  const detailsOk =
    (state.customerDetails.postalCode ?? "").trim().length > 0 &&
    (state.customerDetails.phone ?? "").trim().length > 0 &&
    (state.customerDetails.address ?? "").trim().length > 0;

  const canProceed = !!orderFlow?.ok && itemsOk && scheduleOk && detailsOk && !busy;
  const { items, totalDueNow } =
    useMemo(() => {
      const items = Object.entries(state.quantities)
        .filter(([_, qty]) => (qty ?? 0) > 0)
        .map(([sku, qty]) => {
          const catalogItem = itemsBySku[sku];

          const unitPrice = Number(catalogItem?.price?.price ?? 0);
          const total = +(unitPrice * (qty ?? 0)).toFixed(2);

          return {
            sku,
            label: catalogItem?.name ?? sku,
            qty: qty ?? 0,
            unitPrice,
            total,
          };
        });

      const totalDueNow = +items
        .reduce((sum, it) => sum + it.total, 0)
        .toFixed(2);

      return { items, totalDueNow };

    }, [state.quantities, itemsBySku]);

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
      <h2 className="text-xl font-medium text-slate-900 text-center">Your Order</h2>

      <div className="space-y-3">
        <div className="h-px bg-slate-200" />

        <div className="flex justify-between text-base font-medium text-slate-900">
          <span>Total due now</span>
          <span>{money(totalDueNow)}</span>
        </div>
      </div>

      {/* Shredding Items (2-line rows) */}
      <div className="rounded-xl bg-slate-50 p-4 space-y-4">
        {items.length === 0 ? (
          <div className="text-sm text-slate-600">No items added yet.</div>
        ) : (
          items.map((it) => (
            <div key={it.sku} className="flex justify-between text-sm text-slate-700">
              <span>
                {it.qty} × {it.label}
              </span>
              <span className="text-slate-900">
                {money(it.total, currencySymbol)}
              </span>
            </div>
          ))
        )}
      </div>
      <p className="text-xs text-slate-500">
        {items.length === 0
          ? "Add items on the left to see your order summary."
          : (() => {
            const slot = orderFlow?.timeSlots?.find((s: any) => s.id === state.timeSlotId);
            const slotLabel = slot
              ? `${slot.name} (${to12Hour(slot.startTime)} - ${to12Hour(slot.endTime)})`
              : "—";
            return `Collection: ${state.collectionDate || "—"} • Slot: ${slotLabel}`;
          })()}
      </p>
      {/* 
      <p className="text-xs text-slate-500">{note}</p> */}

      <button
        type="button"
        onClick={onProceed}
        disabled={!canProceed}
        className="h-12 w-full rounded-xl bg-slate-900 text-sm font-medium text-white hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
      >
        {busy && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        )}
        {busy ? "Opening payment..." : "Proceed to Payment"}
      </button>
    </aside>
  );
}
