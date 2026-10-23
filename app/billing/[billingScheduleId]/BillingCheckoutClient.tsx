"use client";

import { useRouter } from "next/navigation";

import { EmbeddedCheckout } from "@/app/components/stripe/EmbeddedCheckout";

import {
    CheckoutProvider,
} from "@/app/components/checkout/CheckoutStore";

type BillingCheckoutClientProps = {
    orderId: string;
    billingScheduleId: string;
    successUrl?: string;
};

export function BillingCheckoutClient({
    orderId,
    billingScheduleId,
    successUrl,
}: BillingCheckoutClientProps) {
    const router = useRouter();

    const handleDone = () => {
        const url =
            successUrl ??
            `/billing/success?billingScheduleId=${billingScheduleId}`;

        router.push(url);
    };

    return (
        <CheckoutProvider>
            <EmbeddedCheckout
                orderId={orderId}
                mode="STORAGE_BILLING"
                billingScheduleId={
                    billingScheduleId
                }
                onDone={handleDone}
                resetCheckoutAfterPayment={
                    false
                }
            />
        </CheckoutProvider>
    );
}