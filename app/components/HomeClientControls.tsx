"use client";

import React from "react";
import { useCheckout, type ServiceType } from "./checkout/CheckoutStore";

import { StorageForm } from "./StorageServiceFlow";
import { MovingForm } from "./MovingServiceFlow";
import { ShreddingForm } from "./ShreddingServiceFlow";

import { StorageOrderSummary } from "../order-summary/OrderSummaryLive";
import { MovingOrderSummary } from "../order-summary/MovingOrderSummaryLive";
import { ShreddingOrderSummary } from "../order-summary/ShreddingOrderSummaryLive";

import { MobileCheckoutBar } from "./MobileCheckoutBar";

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
    const { state, setServiceType } = useCheckout();

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

    // variant === "pricing"
    return (
        <div>
            <div className="space-y-4">
                {/* Dropdown trigger */}
                <div className=" grid grid-cols-1 sm:grid-cols-[1fr_1fr] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
                    <div>
                        <div className="text-sm font-medium text-slate-900">Service</div>
                        <div className="text-xs text-slate-500">Choose a service to continue</div>
                    </div>

                    <ServiceSelect
                        value={state.serviceType}
                        onChange={handleChange}
                        className="h-11 w-[190px] rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none"
                    />
                </div>

                {/* Switchable form + summary */}
                <div className="grid gap-6 items-start lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">
                    <div>
                        {state.serviceType === "storage" && <StorageForm />}
                        {state.serviceType === "moving" && <MovingForm />}
                        {state.serviceType === "shredding" && <ShreddingForm />}
                    </div>

                    <div className="lg:sticky lg:top-6">
                        {state.serviceType === "storage" && <StorageOrderSummary />}
                        {state.serviceType === "moving" && <MovingOrderSummary />}
                        {state.serviceType === "shredding" && <ShreddingOrderSummary />}
                    </div>
                </div>

                {/* <div className="pb-24 md:pb-0">
                    <MobileCheckoutBar />
                </div> */}
            </div>
        </div>
    );
}
