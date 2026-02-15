"use client";

import React, { useMemo } from "react";
import { useMovingCheckout, type TimeSlotId } from "../components/checkout/CheckoutStore";

const PRICE_PER_MILE = 0.58;

const HOME_TYPE_PRICE = {
  "small-move": 250,
  "1-bedroom-flat": 650,
  "2-bedroom-flat": 850,
  "3-bedroom-flat": 1100,
  "4-bedroom-flat": 1358,
  "office-move": 2000,
} as const;

const HOME_TYPE_LABEL = {
  "small-move": "Small Move",
  "1-bedroom-flat": "1 Bed Flat",
  "2-bedroom-flat": "2 Bed Flat",
  "3-bedroom-flat": "3 Bed Flat",
  "4-bedroom-flat": "4 Bed Flat",
  "office-move": "Office Move",
} as const;

const PACKAGE_PRICE = {
  "basic-package": 0,
  "move-and-pack": 295,
} as const;

const PACKAGE_LABEL = {
  "basic-package": "Package - Basic",
  "move-and-pack": "Package - Move & Pack",
} as const;

const SLOT_LABEL: Record<Exclude<TimeSlotId, "">, string> = {
  morning: "7am - 9am",
  afternoon: "10am - 3pm",
  evening: "3pm - 6pm",
};

function money(n: number, sym = "£") {
  return `${sym}${n.toFixed(2)}`;
}

export function MovingOrderSummary() {
  const { state } = useMovingCheckout();

  const { items, totalDueNow, note } = useMemo(() => {
    const miles = Math.max(0, Number(state.distanceMiles ?? 1));
    const distanceCost = +(miles * PRICE_PER_MILE).toFixed(2);

    const homeId = state.movingItemId;
    const homeCost = homeId ? HOME_TYPE_PRICE[homeId] : 0;

    const pkgId = state.movingPackageId;
    const pkgCost = pkgId ? PACKAGE_PRICE[pkgId] : 0;

    const items: { key: string; label: string; subLabel: string; price: number }[] = [];

    items.push({
      key: "distance",
      label: "Distance",
      subLabel: `${miles} miles`,
      price: distanceCost,
    });

    if (homeId) {
      items.push({
        key: "home",
        label: "Home Type",
        subLabel: HOME_TYPE_LABEL[homeId],
        price: homeCost,
      });
    }

    if (pkgId) {
      items.push({
        key: "package",
        label: "Package",
        subLabel: PACKAGE_LABEL[pkgId],
        price: pkgCost,
      });
    }

    const totalDueNow = +(distanceCost + homeCost + pkgCost).toFixed(2);

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

      {/* Moving Items (2-line rows) */}
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
