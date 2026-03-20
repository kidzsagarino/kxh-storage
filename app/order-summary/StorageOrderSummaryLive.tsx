"use client";

import React, { useMemo } from "react";
import { useStorageCheckout } from "../components/checkout/CheckoutStore";
import { money, to12Hour } from "../utils/utils";
import { isValidGBPhone } from "../lib/phone";

type Props = {
  onProceed: () => void;
  busy?: boolean;
  error?: string | null;
};

export function StorageOrderSummary({ onProceed, busy, error }: Props) {
  const { state, orderFlow } = useStorageCheckout();

  const itemsBySku = orderFlow?.catalog?.storage?.itemsBySku ?? {};
  const discountTiers = orderFlow?.catalog?.storage?.discountTiers ?? [];
  const currencySymbol = orderFlow?.currency === "GBP" ? "£" : "";

  const { items, storagePerMonth, months, discountPerMonth, totalDueNow } =
    React.useMemo(() => {
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

      return { items, storagePerMonth, months, discountPerMonth, totalDueNow };
    }, [state.quantities, state.durationMonth, itemsBySku, discountTiers]);

  const durationOk = (orderFlow?.catalog?.storage?.discountTiers ?? []).some(
    (d: any) => d.minMonths === state.durationMonth
  );

  const itemsOk = Object.values(state.quantities ?? {}).some((n) => (Number(n) || 0) > 0);

  const scheduleOk = !!state.collectionDate && !!state.timeSlotId;

  const detailsOk =
    (state.address.houseNumber ?? "").trim().length > 0 &&
    (state.address.streetAddress ?? "").trim().length > 0 &&
    isValidGBPhone(state.customerDetails.phone ?? "");

  const canProceed = !!orderFlow?.ok && durationOk && itemsOk && scheduleOk && detailsOk && !busy;

  return (
    <aside className="space-y-5">
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
          <div className="text-sm text-slate-600">No items added yet.</div>
        ) : (
          items.map((it) => (
            <div key={it.sku} className="flex justify-between text-sm text-slate-700">
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
        {state.address.houseNumber + " " + state.address.streetAddress}
      </p>
      <p className="text-xs text-slate-500">
        {items.length === 0
          ? "Add items on the left to see your order summary."
          : (() => {
            const slot = orderFlow?.timeSlots?.find((s: any) => s.id === state.timeSlotId);
            const slotLabel = slot
              ? `${slot.name} (${to12Hour(slot.startTime)} - ${to12Hour(slot.endTime)})`
              : "";
            return `${state.collectionDate} ${slotLabel}`;
          })()}
      </p>

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}
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
