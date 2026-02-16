"use client";

import React from "react";
import { useCheckout, type ServiceType } from "./checkout/CheckoutStore";

import { StorageForm } from "./ServicesForm/StorageServiceFlow";
import { MovingForm } from "./ServicesForm/MovingServiceFlow";
import { ShreddingForm } from "./ServicesForm/ShreddingServiceFlow";

import { StorageOrderSummary } from "../order-summary/OrderSummaryLive";
import { MovingOrderSummary } from "../order-summary/MovingOrderSummaryLive";
import { ShreddingOrderSummary } from "../order-summary/ShreddingOrderSummaryLive";

import { MobileCheckoutBar } from "./MobileCheckoutBar";
import { proceedToPayment } from "@/app/lib/proceed-to-payment";
import { createEmbeddedSession } from "@/app/services/stripe";
import { submitOrderAction } from "@/app/services/order";
import { EmbeddedCheckout } from "./stripe/EmbeddedCheckout";


function ServiceSelect({
    value,
    onChange,
    className,
}: {
    value: ServiceType;
    onChange: (v: ServiceType) => void;
    className?: string;
}) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as ServiceType)}
            className={className}
        >
            <option value="storage">Storage</option>
            <option value="moving">Packing and Moving</option>
            <option value="shredding">Shredding</option>
        </select>
    );
}

export default function HomeClientControls({
    variant,
}: {
    variant: "hero" | "pricing";
}) {
    const { state, setServiceType, setState } = useCheckout();

    const [orderId, setOrderId] = React.useState<string | null>(null);
    const [clientSecret, setClientSecret] = React.useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isPaying, setIsPaying] = React.useState(false); // ✅ add
    const [error, setError] = React.useState<string | null>(null);
    const checkoutRef = React.useRef<HTMLDivElement | null>(null);

    // Call this when embedded checkout is done (success/cancel)
    const handlePaymentDone = React.useCallback(() => {
        setOrderId(null);
        setClientSecret(null);
        setIsPaying(false);
    }, []);

    const handleProceedToPayment = React.useCallback(async () => {
        // ✅ don’t allow duplicates while paying/submitting
        if (isSubmitting || isPaying || orderId) return;

        setIsSubmitting(true);
        setIsPaying(true);
        setError(null);

        try {
            await proceedToPayment({
                state,
                submitOrder: submitOrderAction,
                createEmbeddedSession,
                setOrderId,        // ✅ pass setter directly
                setClientSecret,   // ✅ pass setter directly
                setEnableButton: (enabled) =>
                    setState((st: any) => ({ ...st, enableProceedButton: enabled })),
            });
            // ✅ keep isPaying true while embedded is shown
        } catch (e: any) {
            setIsPaying(false); // ✅ stop loader if it failed to start
            setError(e?.message ?? "Failed to proceed to payment");
        } finally {
            setIsSubmitting(false);
        }
    }, [isSubmitting, isPaying, orderId, state, setState]);

    const handleChange = (v: ServiceType) => {
        setServiceType(v);

        // optional: when hero dropdown changes, jump to pricing
        if (variant === "hero") {
            document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (variant === "hero") {
        // ✅ Use this inside your hero CTA card
        return (
            <ServiceSelect
                value={state.serviceType}
                onChange={handleChange}
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-11 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-200"
            />
        );
    }
    React.useEffect(() => {
        if (orderId && checkoutRef.current) {
            checkoutRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [orderId]);

    // variant === "pricing"
    return (
        <div>
            <div className="space-y-4">
                {/* Dropdown trigger */}
                <div>
                    <div className="text-sm font-medium text-slate-900">Service</div>
                    <div className="text-xs text-slate-500">Choose a service to continue</div>
                </div>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-3">
                    {[
                        {
                            id: "storage",
                            title: "Storage",
                            desc: "Collection + monthly storage",
                        },
                        {
                            id: "moving",
                            title: "Packing and Moving",
                            desc: "Same-day moves within London",
                        },
                        {
                            id: "shredding",
                            title: "Shredding",
                            desc: "Secure document disposal",
                        },
                    ].map((item) => {
                        const selected = state.serviceType === item.id;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setServiceType(item.id as any)}
                                className={`
                                            flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition
                                            ${selected
                                        ? "border-slate-200 bg-emerald-50"
                                        : "border-slate-200 bg-white hover:bg-slate-50"
                                    }
                                        `}
                            >
                                <div>
                                    <div className="text-sm font-semibold text-slate-900">
                                        {item.title}
                                    </div>
                                    <div className="text-xs text-slate-600">{item.desc}</div>
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${selected
                                        ? "bg-emerald-600 text-white"
                                        : "bg-slate-100 text-slate-600"
                                        }`}
                                >
                                    {selected ? "Selected" : "Select"}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="grid gap-6 items-start lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
                    <div className="min-w-0">
                        {state.serviceType === "storage" && <StorageForm
                            busy={isPaying || isSubmitting}
                            error={error}
                            onProceed={handleProceedToPayment} />}
                        {state.serviceType === "moving" && <MovingForm  busy={isPaying || isSubmitting}
                            error={error}
                            onProceed={handleProceedToPayment}/>}
                        {state.serviceType === "shredding" && <ShreddingForm />}
                    </div>

                    <div className="min-w-0 lg:sticky lg:top-6">
                        {state.serviceType === "storage" && <StorageOrderSummary onProceed={handleProceedToPayment} busy={isPaying || isSubmitting || !!orderId} error={error} />}
                        {state.serviceType === "moving" && <MovingOrderSummary onProceed={handleProceedToPayment} busy={isPaying || isSubmitting || !!orderId} error={error}/>}
                        {state.serviceType === "shredding" && <ShreddingOrderSummary />}
                    </div>
                    {orderId && (
                        <div ref={checkoutRef} className="mt-8 animate-fadeIn">
                            <EmbeddedCheckout
                                orderId={orderId}
                                onDone={handlePaymentDone}
                            />
                        </div>
                    )}
                </div>

                {/* <div className="pb-24 md:pb-0">
                    <MobileCheckoutBar />
                </div> */}
            </div>
        </div>
    );
}
