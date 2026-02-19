"use client";

import { useCheckout, type ServiceType } from "./checkout/CheckoutStore";
import { StorageForm } from "./ServicesForm/StorageServiceFlow";
import { MovingForm } from "./ServicesForm/MovingServiceFlow";
import { ShreddingForm } from "./ServicesForm/ShreddingServiceFlow";
import { StorageOrderSummary } from "../order-summary/OrderSummaryLive";
import { MovingOrderSummary } from "../order-summary/MovingOrderSummaryLive";
import { ShreddingOrderSummary } from "../order-summary/ShreddingOrderSummaryLive";
import { useEffect } from "react";

export default function PricingSwitcher({
    initialServiceType,
}: {
    initialServiceType?: ServiceType;
}) {
    const { state, setServiceType } = useCheckout();
    useEffect(() => {
        if (state.serviceType !== initialServiceType) {
            setServiceType(initialServiceType || "storage");
        }
    }, [initialServiceType, state.serviceType, setServiceType]);
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-[1fr_auto]
                    items-center gap-3
                    rounded-2xl border border-slate-200 bg-white
                    p-3 sm:p-4">
                <div>
                    <div className="text-sm font-medium text-slate-900">Service</div>
                    <div className="text-xs text-slate-500">Choose a service to continue</div>
                </div>

                <select
                    value={state.serviceType}
                    onChange={(e) => setServiceType(e.target.value as ServiceType)}
                    className="h-11 w-[190px] rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none"
                >
                    <option value="storage">Storage</option>
                    <option value="moving">Moving</option>
                    <option value="shredding">Shredding</option>
                </select>
            </div>

            <div className="grid gap-6 items-start lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">
                <div>
                    {state.serviceType === "storage" && <StorageForm onProceed={async()=>{}} error={''} busy={false} />}
                    {state.serviceType === "moving" && <MovingForm onProceed={async()=>{}} error={''} busy={false}/>}
                    {state.serviceType === "shredding" && <ShreddingForm onProceed={()=>{}} error={''} busy={false}/>}
                </div>

                <div className="lg:sticky lg:top-6">
                    {state.serviceType === "storage" && <StorageOrderSummary onProceed={()=>{}} error={''} busy={false}/>}
                    {state.serviceType === "moving" && <MovingOrderSummary onProceed={()=>{}} error={''} busy={false}/>}
                    {state.serviceType === "shredding" && <ShreddingOrderSummary onProceed={()=>{}} error={''} busy={false}/>}
                </div>
            </div>
        </div>
    );
}
