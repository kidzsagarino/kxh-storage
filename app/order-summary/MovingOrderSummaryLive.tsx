"use client";

import React, { useMemo } from "react";
import {
  useMovingCheckout,
  type TimeSlotId,
} from "../components/checkout/CheckoutStore";

function money(n: number, sym = "£") {
  return `${sym}${n.toFixed(2)}`;
}

type Props = {
  onProceed: () => void;
  busy?: boolean;
  error?: string | null;
};

// Map your UI slot id -> DB key used in orderFlow.settings.timeSlotSettings
const SLOT_KEY_BY_ID: Record<Exclude<TimeSlotId, "">, "MORNING" | "AFTERNOON" | "EVENING"> =
{
  morning: "MORNING",
  afternoon: "AFTERNOON",
  evening: "EVENING",
};

function timeRangeToLabel(start?: string, end?: string) {
  // start/end like "07:00"
  if (!start || !end) return "";
  const to12 = (t: string) => {
    const [hhStr, mmStr] = t.split(":");
    const hh = Number(hhStr);
    const mm = Number(mmStr);
    if (!Number.isFinite(hh) || !Number.isFinite(mm)) return t;

    const suffix = hh >= 12 ? "pm" : "am";
    const h12 = ((hh + 11) % 12) + 1;
    return mm === 0 ? `${h12}${suffix}` : `${h12}:${String(mm).padStart(2, "0")}${suffix}`;
  };
  return `${to12(start)} – ${to12(end)}`;
}

export function MovingOrderSummary({ onProceed, busy, error }: Props) {
  const { state, orderFlow } = useMovingCheckout() as any;

  const originOk = state.fromLocation.streetAddress.trim().length > 0 && state.fromLocation.houseNumber.trim().length > 0;
  const destinationOk = state.toLocation.streetAddress.trim().length > 0 && state.toLocation.houseNumber.trim().length > 0;
  const itemOk = state.movingItemId !== "";
  const packageOk = state.movingPackageId !== "";
  const scheduleOk = !!state.collectionDate && !!state.timeSlotId;

  const canProceed = !!orderFlow?.ok && originOk && destinationOk && itemOk && packageOk && scheduleOk && !busy;

  const { items, totalDueNow, note, currencySymbol } = useMemo(() => {
    const sym = orderFlow?.currency === "GBP" ? "£" : "£";

    const pricePerMileMinor =
      Number(orderFlow?.settings?.movingPricePerMileMinor ?? 58) || 58;

    const milesRaw = Number(state.distanceMiles ?? 0);
    const miles = Math.max(0, Math.round(milesRaw * 100) / 100); // 2dp number

    const distanceCostMinor = Math.round(miles * pricePerMileMinor);
    const distanceCost = distanceCostMinor / 100;

    const itemsById = Object.fromEntries(
      Object.values(orderFlow?.catalog?.moving?.itemsBySku ?? {}).map((item: any) => [item.id, item])
    );

    const homeSku = state.movingItemId as string;
    const home = itemsById[homeSku];

    const homeLabel = home?.name ?? "";
    const homeCost = home?.price?.price ? Number(home.price.price) : 0;

    const packageById = Object.fromEntries(
      Object.values(orderFlow?.catalog?.moving?.packagesBySku ?? {}).map((item: any) => [item.id, item])
    );

    const pkgSku = state.movingPackageId as string;
    const pkg = packageById[pkgSku];

    const pkgLabel = pkg?.name ?? "";
    const pkgCost = pkg?.price?.price ? Number(pkg.price.price) : 0;

    const rows: { key: string; label: string; subLabel: string; price: number }[] = [];

    // ✅ Distance line item
    rows.push({
      key: "distance",
      label: "Distance",
      subLabel: miles ? `${miles} miles` : "—",
      price: +distanceCost.toFixed(2),
    });

    if (homeSku) {
      rows.push({
        key: "home",
        label: "Move Size",
        subLabel: homeLabel || homeSku,
        price: +homeCost.toFixed(2),
      });
    }

    if (pkgSku) {
      rows.push({
        key: "package",
        label: "Package",
        subLabel: pkgLabel || pkgSku,
        price: +pkgCost.toFixed(2),
      });
    }

    const total = +(distanceCost + homeCost + pkgCost).toFixed(2);

    const slotId = state.timeSlotId as TimeSlotId;
    let slotText = "";

    if (slotId) {
      const key = SLOT_KEY_BY_ID[slotId as Exclude<TimeSlotId, "">];
      const slotSetting = orderFlow?.settings?.timeSlotSettings?.find((s: any) => s.key === key);
      if (slotSetting?.enabled && slotSetting?.label) slotText = slotSetting.label;

      if (!slotText) {
        const name =
          slotId === "morning" ? "Morning" : slotId === "afternoon" ? "Afternoon" : "Evening";
        const t = orderFlow?.timeSlots?.find((x: any) => x.name === name);
        const range = timeRangeToLabel(t?.startTime, t?.endTime);
        slotText = range ? `${name} (${range})` : name;
      }
    }

    const note = `Collection: ${state.collectionDate || "—"}${slotText ? ` (${slotText})` : ""
      }`;

    return { items: rows, totalDueNow: total, note, currencySymbol: sym };
  }, [state, orderFlow]);

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
      <h2 className="text-xl font-medium text-slate-900 text-center">Your Order</h2>

      <div className="space-y-3">
        <div className="h-px bg-slate-200" />
        <div className="flex justify-between text-base font-medium text-slate-900">
          <span>Total due now</span>
          <span>{money(totalDueNow, currencySymbol)}</span>
        </div>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 space-y-4">
        {items.map((it) => (
          <div key={it.key} className="space-y-1">
            <div className="flex justify-between text-sm font-medium text-slate-900">
              <span>{it.label}</span>
              <span>{money(it.price, currencySymbol)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span className="min-w-0 truncate">{it.subLabel}</span>
              <span>{money(it.price, currencySymbol)}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500">{note}</p>

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
