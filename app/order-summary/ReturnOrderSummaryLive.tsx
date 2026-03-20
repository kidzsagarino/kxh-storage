"use client";

import React from "react";
import { useReturnCheckout } from "../components/checkout/CheckoutStore";
import { money, to12Hour } from "../utils/utils";
import { isValidGBPhone } from "../lib/phone";

type Props = {
    onProceed: () => void;
    busy?: boolean;
    error?: string | null;
};

export function ReturnOrderSummary({ onProceed, busy, error }: Props) {
    const { state, orderFlow } = useReturnCheckout();

    const itemsBySku = orderFlow?.catalog?.return?.itemsBySku ?? {};
    const currencySymbol = orderFlow?.currency === "GBP" ? "£" : "";

    const { items, totalDueNow } = React.useMemo(() => {

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

        const itemTotal = +items
            .reduce((sum, it) => sum + it.lineMonthly, 0)
            .toFixed(2);

        const totalDueNow = +(itemTotal).toFixed(2);

        return { items, totalDueNow };

    }, [state.quantities, itemsBySku]);

    const typeOk = !!state.returnItemId;
    const scheduleOk = !!state.collectionDate && !!state.timeSlotId;
    const orderOk = (state.originalOrderNumber ?? "").trim().length > 0;

    const detailsOk =
        (state.customerDetails.name ?? "").trim().length > 0 &&
        (state.customerDetails.email ?? "").trim().length > 0 &&
        isValidGBPhone(state.customerDetails.phone ?? "") &&
        (state.fromLocation.houseNumber ?? "").trim().length > 0 &&
        (state.fromLocation.streetAddress ?? "").trim().length > 0 &&
        (state.toLocation.houseNumber ?? "").trim().length > 0 &&
        (state.toLocation.streetAddress ?? "").trim().length > 0;

    const canProceed =
        !!orderFlow?.ok && typeOk && scheduleOk && orderOk && detailsOk && !busy;

    const slot = orderFlow?.timeSlots?.find((s: any) => s.id === state.timeSlotId);
    const slotLabel = slot
        ? `${slot.name} (${to12Hour(slot.startTime)} - ${to12Hour(slot.endTime)})`
        : "";

    return (
        <aside className="space-y-5">
            <h2 className="text-xl font-medium text-slate-900 text-center">
                Your Return Request
            </h2>

            <div className="space-y-3">
                <div className="flex justify-between text-sm text-slate-700">
                    <span>Order number</span>
                    <span>{state.originalOrderNumber?.trim() || "—"}</span>
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

            <div className="space-y-2 text-xs text-slate-500">
                <p>
                    <span className="font-medium text-slate-700">Collection:</span>{" "}
                    {state.fromLocation.houseNumber || state.fromLocation.streetAddress
                        ? `${state.fromLocation.houseNumber} ${state.fromLocation.streetAddress}`.trim()
                        : "—"}
                </p>

                <p>
                    <span className="font-medium text-slate-700">Return to:</span>{" "}
                    {state.toLocation.houseNumber || state.toLocation.streetAddress
                        ? `${state.toLocation.houseNumber} ${state.toLocation.streetAddress}`.trim()
                        : "—"}
                </p>

                <p>
                    {!state.collectionDate || !state.timeSlotId
                        ? "Choose a return date and time slot to see the schedule summary."
                        : `${state.collectionDate} ${slotLabel}`}
                </p>
            </div>

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