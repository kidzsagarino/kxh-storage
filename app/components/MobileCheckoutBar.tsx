"use client";

import React, { useEffect, useMemo } from "react";
import { ServiceType, useCheckout } from "./checkout/CheckoutStore";
import { selectCheckoutTotals } from "./checkout/selector";

export function MobileCheckoutBar() {
    const { state, setState, setServiceType } = useCheckout();
    const totals = useMemo(() => selectCheckoutTotals(state), [state]);

    useEffect(() => {
        setServiceType("moving");
    }, [setServiceType]);

    return (
        <div className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <div className="text-xs text-slate-600">{totals.title}</div>
                        <div className="truncate text-lg font-medium text-slate-900">
                            {totals.amountText}
                        </div>
                    </div>

                    <button
                        type="button"
                        disabled={!totals.ctaEnabled}
                        onClick={() => {
                            // ✅ keep single-page? just scroll to summary or open modal
                            // Example: scroll to the summary panel if it exists
                            const el = document.getElementById("order-summary");
                            if (el) {
                                el.scrollIntoView({ behavior: "smooth", block: "start" });
                                return;
                            }

                            // Or route if you still want
                            // router.push("/order-summary");
                        }}
                        className="h-11 shrink-0 rounded-xl bg-slate-900 px-5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {totals.ctaLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
