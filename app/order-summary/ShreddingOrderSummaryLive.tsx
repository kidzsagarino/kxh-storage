"use client";

import React, { useMemo } from "react";
import { useShreddingCheckout, type TimeSlotId } from "../components/checkout/CheckoutStore";

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

export function ShreddingOrderSummary() {
  const { state } = useShreddingCheckout();

  const { items, totalDueNow, note } = useMemo(() => {
    const bagQty = Math.max(0, Number(state.items?.bagQty ?? 0));
    const boxQty = Math.max(0, Number(state.items?.boxQty ?? 0));

    const bagCost = +(bagQty * BAG_PRICE).toFixed(2);
    const boxCost = +(boxQty * BOX_PRICE).toFixed(2);

    const items: { key: string; label: string; subLabel: string; price: number }[] = [];

    items.push({
      key: "bag",
      label: "Bag",
      subLabel: `${bagQty} × (up to 15 lbs)`,
      price: bagCost,
    });

    items.push({
      key: "archive-box",
      label: "Archive Box",
      subLabel: `${boxQty} × (up to 15 lbs)`,
      price: boxCost,
    });

    const totalDueNow = +(bagCost + boxCost).toFixed(2);

    const slotText = state.timeSlotId ? SLOT_LABEL[state.timeSlotId as Exclude<TimeSlotId, "">] : "";
    const note = `Collection: ${state.collectionDate || "—"}${slotText ? ` (${slotText})` : ""}`;

    return { items, totalDueNow, note };
  }, [state]);

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
        {items.map((it) => (
          <div key={it.key} className="space-y-1">
            <div className="flex justify-between text-sm font-medium text-slate-900">
              <span>{it.label}</span>
              <span>{money(it.price)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>{it.subLabel}</span>
              <span>{money(it.price)}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500">{note}</p>

      <button
        type="button"
        disabled={!state.enableButton}
        className="h-12 w-full rounded-xl bg-slate-900 text-sm font-medium text-white hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Proceed to Payment
      </button>
    </aside>
  );
}
