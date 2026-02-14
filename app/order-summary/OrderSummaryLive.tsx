"use client";

import React, { useMemo } from "react";
import { useStorageCheckout } from "../components/checkout/CheckoutStore";
import { money, to12Hour } from "../utils/utils";

export function StorageOrderSummary() {
  const { state, orderFlow } = useStorageCheckout();

  const itemsBySku = orderFlow?.catalog?.storage?.itemsBySku ?? {};
  const discountTiers = orderFlow?.catalog?.storage?.discountTiers ?? [];

  const currencySymbol = orderFlow?.currency === "GBP" ? "£" : "";

  console.log(state);

  const { items, storagePerMonth, months, discountPerMonth, totalDueNow } =
    useMemo(() => {
      const months = state.durationMonth > 0 ? state.durationMonth : 1;

      const items = Object.entries(state.quantities)
        .filter(([_, qty]) => (qty ?? 0) > 0)
        .map(([sku, qty]) => {
          const catalogItem = itemsBySku[sku];

          const unitPrice = Number(catalogItem?.price?.price ?? 0);
          const lineMonthly = +(unitPrice * (qty ?? 0)).toFixed(2);

          return {
            sku,
            label: catalogItem?.name ?? sku,
            qty: qty ?? 0,
            unitPrice,
            lineMonthly,
          };
        });

      const storagePerMonth = +items
        .reduce((sum, it) => sum + it.lineMonthly, 0)
        .toFixed(2);

      const tier = [...discountTiers]
        .sort((a, b) => b.minMonths - a.minMonths)
        .find((t) => months >= t.minMonths);

      const percentOff = tier?.percentOff ?? 0;
      const discountRate = percentOff / 100;

      const discountPerMonth = +(storagePerMonth * discountRate).toFixed(2);
      const totalDueNow = +(storagePerMonth - discountPerMonth).toFixed(2);

      console.log(state, orderFlow);

      return {
        items,
        storagePerMonth,
        months,
        discountPerMonth,
        totalDueNow,
      };
    }, [state.quantities, state.durationMonth, itemsBySku, discountTiers]);

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
      <h2 className="text-xl font-medium text-slate-900 text-center">
        Your Order
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between text-sm text-slate-700">
          <span>Storage per month</span>
          <span>{money(storagePerMonth, currencySymbol)}</span>
        </div>

        <div className="flex justify-between text-sm text-slate-700">
          <span>Duration</span>
          <span>{months} months</span>
        </div>

        <div className="flex justify-between text-sm text-slate-700">
          <span>Discount</span>
          <span className={discountPerMonth > 0 ? "text-emerald-600" : ""}>
            {discountPerMonth > 0
              ? `−${money(discountPerMonth, currencySymbol)}`
              : money(0, currencySymbol)}
          </span>
        </div>

        <div className="h-px bg-slate-200" />

        <div className="flex justify-between text-base font-medium text-slate-900">
          <span>Total due now</span>
          <span>{money(totalDueNow, currencySymbol)}</span>
        </div>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 space-y-3">
        {items.length === 0 ? (
          <div className="text-sm text-slate-600">
            No items added yet.
          </div>
        ) : (
          items.map((it) => (
            <div
              key={it.sku}
              className="flex justify-between text-sm text-slate-700"
            >
              <span>
                {it.qty} × {it.label}
              </span>
              <span className="text-slate-900">
                {money(it.lineMonthly, currencySymbol)}
              </span>
            </div>
          ))
        )}
      </div>

      <p className="text-xs text-slate-500">
        {
          items.length === 0
            ? "Add items on the left to see your order summary."
            : (() => {
              const slot = orderFlow?.timeSlots?.find(
                (s: any) => s.id === state.timeSlotId
              );

              const slotLabel = slot
                ? `${slot.name} (${to12Hour(slot.startTime)} - ${to12Hour(slot.endTime)})`
                : "—";

              return `Collection: ${state.collectionDate || "—"} • Slot: ${slotLabel}`;
            })()
        }
      </p>

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
