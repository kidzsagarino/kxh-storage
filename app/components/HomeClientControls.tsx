"use client";

import React from "react";
import { useCheckout, type ServiceType } from "./checkout/CheckoutStore";
import { useRouter, useSearchParams } from "next/navigation";

import { StorageForm } from "./ServicesForm/StorageServiceFlow";
import { MovingForm } from "./ServicesForm/MovingServiceFlow";
import { ShreddingForm } from "./ServicesForm/ShreddingServiceFlow";

import { StorageOrderSummary } from "../order-summary/StorageOrderSummaryLive";
import { MovingOrderSummary } from "../order-summary/MovingOrderSummaryLive";
import { ShreddingOrderSummary } from "../order-summary/ShreddingOrderSummaryLive";

import { MobileCheckoutBar } from "./MobileCheckoutBar";
import { proceedToPayment } from "@/app/lib/proceed-to-payment";
import { createEmbeddedSession } from "@/app/services/stripe";
import { submitOrderAction } from "@/app/services/order";
import { EmbeddedCheckout } from "./stripe/EmbeddedCheckout";
import { ReturnForm } from "./ServicesForm/ReturnServiceFlow";
import { ReturnOrderSummary } from "../order-summary/ReturnOrderSummaryLive";


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
            <option value="return">Return</option>
        </select>
    );
}

export default function HomeClientControls({
    variant,
}: {
    variant: "hero" | "pricing";
}) {
    const { state, setServiceType, setState } = useCheckout();
    const router = useRouter();

    const [orderId, setOrderId] = React.useState<string | null>(null);
    const [clientSecret, setClientSecret] = React.useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isPaying, setIsPaying] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const checkoutRef = React.useRef<HTMLDivElement | null>(null);

    const searchParams = useSearchParams();

    const handlePaymentDone = React.useCallback(async (paidOrderId?: string) => {
        if (paidOrderId) {
            router.push(`/success?orderId=${paidOrderId}`);
        } else {
            router.push(`/success`);
        }
        setOrderId(null);
        setClientSecret(null);
        setIsPaying(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [router]);

    const handleProceedToPayment = React.useCallback(async () => {
        if (isSubmitting || isPaying || orderId) return;

        setIsSubmitting(true);
        setIsPaying(true);
        setError(null);

        try {
            await proceedToPayment({
                state,
                submitOrder: submitOrderAction,
                createEmbeddedSession,
                setOrderId,
                setClientSecret,
                setEnableButton: (enabled) =>
                    setState((st: any) => ({ ...st, enableProceedButton: enabled })),
            });
        } catch (e: any) {
            setIsPaying(false);
            setError(e?.message ?? "Failed to proceed to payment");
        } finally {
            setIsSubmitting(false);
        }
    }, [isSubmitting, isPaying, orderId, state, setState]);

    const handleChange = (v: ServiceType) => {
        setServiceType(v);

        if (variant === "hero") {
            document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
        }
    };



    if (variant === "hero") {
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

    React.useEffect(() => {
        const serviceFromUrl = searchParams.get("service") as ServiceType | null;
        if (serviceFromUrl) {
            setServiceType(serviceFromUrl);
        }
    }, [searchParams, setServiceType]);
    
    return (
        <div className="mx-auto max-w-screen-xl">
            <div className="space-y-5 lg:space-y-6">
                {/* service row */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                    {[
                        {
                            id: "storage",
                            title: "Storage",
                            desc: "Collection + monthly storage",
                        },
                        {
                            id: "moving",
                            title: "Moving",
                            desc: "Same-day moves across London",
                        },
                        {
                            id: "shredding",
                            title: "Shredding",
                            desc: "Secure document disposal",
                        },
                        {
                            id: "return",
                            title: "Return",
                            desc: "Return items from storage to you",
                        },
                    ].map((item) => {
                        const selected = state.serviceType === item.id;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setServiceType(item.id as any)}
                                className={[
                                    "group relative flex min-h-[82px] w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all duration-200",
                                    selected
                                        ? "border-emerald-700/30 bg-[linear-gradient(135deg,#2e7d57_0%,#3f8f66_100%)] text-white"
                                        : "border-slate-200 bg-white text-slate-900 hover:border-slate-300",
                                ].join(" ")}
                            >
                                <div className="pr-4">
                                    <div
                                        className={[
                                            "text-[1.05rem] font-extrabold leading-tight",
                                            selected ? "text-white" : "text-slate-900",
                                        ].join(" ")}
                                    >
                                        {item.title}
                                    </div>

                                    <div
                                        className={[
                                            "mt-1 text-sm leading-5",
                                            selected ? "text-white/80" : "text-slate-500",
                                        ].join(" ")}
                                    >
                                        {item.desc}
                                    </div>
                                </div>

                                <div
                                    className={[
                                        "inline-flex h-11 min-w-[96px] items-center justify-center rounded-full px-4 text-sm font-bold transition",
                                        selected
                                            ? "bg-white/12 text-white"
                                            : "bg-slate-100 text-slate-800",
                                    ].join(" ")}
                                >
                                    {selected ? (
                                        <span className="flex items-center gap-2">
                                            <span>✓</span>
                                        </span>
                                    ) : (
                                        "Select"
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* main widget shell */}
                <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_370px]">
                    {/* left flow */}
                    <div className="min-w-0 rounded-[28px] border border-slate-200 bg-white">
                        <div className="p-4 sm:p-5 lg:p-5">
                            {state.serviceType === "storage" && (
                                <StorageForm
                                    busy={isPaying || isSubmitting}
                                    error={error}
                                    onProceed={handleProceedToPayment}
                                />
                            )}

                            {state.serviceType === "moving" && (
                                <MovingForm
                                    busy={isPaying || isSubmitting}
                                    error={error}
                                    onProceed={handleProceedToPayment}
                                />
                            )}

                            {state.serviceType === "shredding" && (
                                <ShreddingForm
                                    busy={isPaying || isSubmitting}
                                    error={error}
                                    onProceed={handleProceedToPayment}
                                />
                            )}
                            {state.serviceType === "return" && (
                                <ReturnForm
                                    busy={isPaying || isSubmitting}
                                    error={error}
                                    onProceed={handleProceedToPayment}
                                />
                            )}
                        </div>
                    </div>

                    {/* right summary */}
                    <div className="min-w-0 lg:sticky lg:top-6">
                        <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                            <div className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                                {state.serviceType === "storage" && (
                                    <StorageOrderSummary
                                        onProceed={handleProceedToPayment}
                                        busy={isPaying || isSubmitting || !!orderId}
                                        error={error}
                                    />
                                )}

                                {state.serviceType === "moving" && (
                                    <MovingOrderSummary
                                        onProceed={handleProceedToPayment}
                                        busy={isPaying || isSubmitting || !!orderId}
                                        error={error}
                                    />
                                )}

                                {state.serviceType === "shredding" && (
                                    <ShreddingOrderSummary
                                        onProceed={handleProceedToPayment}
                                        busy={isPaying || isSubmitting || !!orderId}
                                        error={error}
                                    />
                                )}
                                {state.serviceType === "return" && (
                                    <ReturnOrderSummary
                                        onProceed={handleProceedToPayment}
                                        busy={isPaying || isSubmitting || !!orderId}
                                        error={error}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* embedded checkout */}
                {orderId && (
                    <div
                        ref={checkoutRef}
                        className="overflow-hidden rounded-[28px] border border-slate-200 bg-white animate-fadeIn"
                    >
                        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-600">
                                Secure payment
                            </p>
                            <h3 className="mt-1 text-lg font-black tracking-tight text-slate-900">
                                Complete your booking
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Your order has been prepared. Finish payment below to confirm it.
                            </p>
                        </div>

                        <div className="p-4 sm:p-6">
                            <EmbeddedCheckout orderId={orderId} onDone={handlePaymentDone} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
