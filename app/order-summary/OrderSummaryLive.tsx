"use client";

import React, { useMemo } from "react";
import { useStorageCheckout, type StorageItemId } from "../components/checkout/CheckoutStore";

const PRICE_PER_MONTH: Record<StorageItemId, number> = {
  "small-box": 5,
  "medium-box": 8,
  "large-box": 12,
  "xl-box": 15,
  suitcase: 10,
  "half-container": 75,
  "full-container": 150,
};

const LABELS: Record<StorageItemId, string> = {
  "small-box": "Small Box",
  "medium-box": "Medium Box",
  "large-box": "Large Box",
  "xl-box": "XL Box",
  suitcase: "Suitcase",
  "half-container": "½ Container",
  "full-container": "Full Container",
};

function money(n: number, sym = "£") {
  return `${sym}${n.toFixed(2)}`;
}

export function StorageOrderSummary() {
  const { state } = useStorageCheckout();

  const totalItems = useMemo(
    () => Object.values(state.quantities).reduce((a, b) => a + b, 0),
    [state.quantities]
  );

  const { items, storagePerMonth, discount, totalDueNow } = useMemo(() => {
    const items = (Object.keys(state.quantities) as StorageItemId[])
      .filter((id) => state.quantities[id] > 0)
      .map((id) => ({
        id,
        label: LABELS[id],
        qty: state.quantities[id],
        price: PRICE_PER_MONTH[id] * state.quantities[id], // monthly line total
      }));

    const storagePerMonth = +items.reduce((sum, it) => sum + it.price, 0).toFixed(2);

    const months = state.durationMonth === 0 ? 1 : state.durationMonth;

    const discountRate =
      months === 3 ? 0.05 : months === 6 ? 0.1 : months === 12 ? 0.15 : 0;

    // show discount per month
    const durationSubtotal = +(storagePerMonth * months).toFixed(2);
    const discount = +((durationSubtotal * discountRate) / months).toFixed(2);

    const totalDueNow = +(storagePerMonth - discount).toFixed(2);

    return { items, storagePerMonth, discount, totalDueNow };
  }, [state.quantities, state.durationMonth]);

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
      <h2 className="text-xl font-medium text-slate-900 text-center">Your Order</h2>

      {/* Totals */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-slate-700">
          <span>Storage per month</span>
          <span>{money(storagePerMonth)}</span>
        </div>

        <div className="flex justify-between text-sm text-slate-700">
          <span>Duration</span>
          <span>{state.durationMonth || 0} months</span>
        </div>

        <div className="flex justify-between text-sm text-slate-700">
          <span>Discount</span>
          <span className={discount > 0 ? "text-[#4CAF50]" : "text-slate-700"}>
            {discount > 0 ? `−${money(discount)}` : money(0)}
          </span>
        </div>

        <div className="h-px bg-slate-200" />

        <div className="flex justify-between text-base font-medium text-slate-900">
          <span>Total due now</span>
          <span>{money(totalDueNow)}</span>
        </div>
      </div>

      {/* Items */}
      <div className="rounded-xl bg-slate-50 p-4 space-y-3">
        {items.length === 0 ? (
          <div className="text-sm text-slate-600">No items added yet.</div>
        ) : (
          items.map((it) => (
            <div key={it.id} className="flex justify-between text-sm text-slate-700">
              <span>
                {it.qty} × {it.label}
              </span>
              <span className="text-slate-900">{money(it.price)}</span>
            </div>
          ))
        )}
      </div>

      {/* Note */}
      <p className="text-xs text-slate-500">
        {totalItems === 0
          ? "Add items on the left to see your order summary."
          : `Collection: ${state.collectionDate || "—"} • Slot: ${state.timeSlot || "—"}`}
      </p>

      {/* CTA */}
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
