"use client";

import React, { useMemo } from "react";
import { useShreddingCheckout } from "../components/checkout/CheckoutStore";
import { money, to12Hour } from "../utils/utils";
import { isValidGBPhone } from "../lib/phone";
import { calculateDiscount } from "../lib/discount";
import { useDiscount } from "../hooks/useDiscount";
import { DiscountCodeInput } from "./DiscountCodeInput";



type Props = {
  onProceed: () => void;
  busy?: boolean;
  error?: string | null;
};

export function ShreddingOrderSummary({ onProceed, busy, error }: Props) {
  const { state, orderFlow } = useShreddingCheckout();

  const itemsBySku = orderFlow?.catalog?.shredding?.itemsBySku ?? {};

  const currencySymbol = orderFlow?.currency === "GBP" ? "£" : "";

  const discount = useDiscount("shredding");
  
  const itemsOk = Object.values(state.quantities ?? {}).some((n) => (Number(n) || 0) > 0);
  const scheduleOk = !!state.collectionDate && !!state.timeSlotId;

  const detailsOk =
    (state.address.houseNumber ?? "").trim().length > 0 &&
    (state.address.streetAddress ?? "").trim().length > 0 &&
    isValidGBPhone(state.customerDetails.phone ?? "");

  const canProceed = !!orderFlow?.ok && itemsOk && scheduleOk && detailsOk && !busy;
  const { items, subTotal, codeDiscount, totalDueNow } =
    React.useMemo(() => {
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

      const subTotal = +items
        .reduce((sum, it) => sum + it.total, 0)
        .toFixed(2);

      const codeDiscount = calculateDiscount({
        baseAmount: subTotal,
        discountMeta: discount.discountMeta,
      });

      const totalDueNow = Math.max(0, subTotal - codeDiscount);

      return { items, subTotal, codeDiscount, totalDueNow };

    }, [state.quantities, discount.discountMeta, itemsBySku]);

  return (
    <aside className="space-y-5">
      <h2 className="text-xl font-medium text-slate-900 text-center">Your Order</h2>

      <div className="space-y-3">
        <DiscountCodeInput
          code={discount.code}
          setCode={discount.setCode}
          onApply={discount.apply}
          onRemove={discount.remove}
          loading={discount.loading}
          error={discount.error}
          applied={!!discount.discountMeta}
           discountMeta={discount.discountMeta}
          baseAmount={totalDueNow}
        />
        {codeDiscount > 0 && (
          <div className="flex justify-between text-sm text-slate-700">
            <span>Discount code</span>
            <span className="text-emerald-600">
              −{money(codeDiscount, currencySymbol)}
            </span>
          </div>
        )}
        {subTotal > 0 && (
          <div className="flex justify-between text-sm text-slate-700">
            <span>Original Total</span>
            <span className="text-black-600">
              {money(subTotal, currencySymbol)}
            </span>
          </div>
        )}
        <div className="h-px bg-slate-200" />

        <div className="flex justify-between text-base font-medium text-slate-900">
          <span>Total due now</span>
          <span>{money(totalDueNow)}</span>
        </div>
      </div>

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
              : "";
            return `${state.collectionDate} ${slotLabel}`;
          })()}
      </p>
      {/* 
      <p className="text-xs text-slate-500">{note}</p> */}
      <p className="text-xs text-slate-500">
        {state.address.houseNumber + " " + state.address.streetAddress}
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
