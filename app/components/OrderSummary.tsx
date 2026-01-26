import React from "react";

export type OrderItem = {
    label: string;
    qty?: number;        // storage uses this (e.g. 2)
    subLabel?: string;   // moving uses this (e.g. "4 Bed Flat", "1 Miles")
    price: number;
};

export type OrderSummaryProps = {
    title?: string;                 // default: "Your Order"
    currencySymbol?: string;        // default: "£"
    storagePerMonth: number;        // e.g. 8.00
    discount?: number;              // e.g. 1.20  (positive number; we render as -£1.20)
    totalDueNow: number;            // e.g. 6.80
    items: OrderItem[];             // list of selected storage items
    note?: string;
    ctaLabel?: string;
    onCtaClick?: () => void;        // optional: for client-side actions
    ctaHref?: string;               // optional: for link navigation
    durationMonth: number;
    enableButton?: boolean;
};

function money(n: number, currencySymbol: string) {
    // Keep it simple & stable for SSR: fixed 2 decimals, no locale formatting
    return `${currencySymbol}${n.toFixed(2)}`;
}

export function OrderSummary({
    title = "Your Order",
    currencySymbol = "£",
    storagePerMonth,
    discount = 0,
    totalDueNow,
    items,
    note = "Storage is billed monthly. You can cancel or modify your plan at any time.",
    ctaLabel = "Proceed to Payment",
    onCtaClick,
    ctaHref,
    durationMonth,
    enableButton = false,
}: OrderSummaryProps) {
    const discountDisplay = discount > 0 ? `−${money(discount, currencySymbol)}` : money(0, currencySymbol);

    const Cta = ({ enableButton = true }) => {
        // if (ctaHref) {
        //     return (
        //         <a
        //             href={ctaHref}
        //             className="h-12 w-full rounded-xl bg-slate-900 text-sm font-medium text-white hover:bg-slate-800 transition inline-flex items-center justify-center"
        //         >
        //             {ctaLabel}
        //         </a>
        //     );
        // }

        return (
            <button
                type="button"
                disabled={!enableButton}
                onClick={onCtaClick}
                className="h-12 w-full rounded-xl bg-slate-900 text-sm font-medium text-white hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
            >
                {ctaLabel}
            </button>
        );
    };

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
            <h2 className="text-xl font-medium text-slate-900 text-center">{title}</h2>

            {/* Totals */}
            <div className="space-y-3">
                <div className="flex justify-between text-sm text-slate-700">
                    <span>Storage per month</span>
                    <span>{money(storagePerMonth, currencySymbol)}</span>
                </div>
                {typeof durationMonth === "number" && (
                    <div className="flex justify-between text-sm text-slate-700">
                        <span>Duration</span>
                        <span>{durationMonth} months</span>
                    </div>
                )}

                <div className="flex justify-between text-sm text-slate-700">
                    <span>Discount</span>
                    <span className={discount > 0 ? "text-[#4CAF50]" : "text-slate-700"}>
                        {discount > 0 ? discountDisplay : money(0, currencySymbol)}
                    </span>
                </div>

                <div className="h-px bg-slate-200" />

                <div className="flex justify-between text-base font-medium text-slate-900">
                    <span>Total due now</span>
                    <span>{money(totalDueNow, currencySymbol)}</span>
                </div>
            </div>

            {/* Items */}
            <div className="rounded-xl bg-slate-50 p-4 space-y-3">
                {items.length === 0 ? (
                    <div className="text-sm text-slate-600">No items added yet.</div>
                ) : (
                    items.map((it, idx) => {
                        const isMovingItem = Boolean(it.subLabel);

                        return (
                            <div key={`${it.label}-${it.subLabel ?? idx}`}>
                                {isMovingItem ? (
                                    /* MOVING STYLE (2 lines) */
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-sm font-medium text-slate-900">
                                            <span>{it.label}</span>
                                            <span>{money(it.price, currencySymbol)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-slate-600">
                                            <span>{it.subLabel}</span>
                                            <span>{money(it.price, currencySymbol)}</span>
                                        </div>
                                    </div>
                                ) : (
                                    /* STORAGE STYLE (single line only) */
                                    <div className="flex justify-between text-sm text-slate-700">
                                        <span>{it.qty} × {it.label}</span>
                                        <span className="text-slate-900">{money(it.price, currencySymbol)}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>



            {/* Note */}
            <p className="text-xs text-slate-500">{note}</p>

            {/* CTA */}
            <Cta enableButton={enableButton} />
        </section>
    );
}
