"use client";

import { EmbeddedCheckout } from "@/app/components/stripe/EmbeddedCheckout";
import { useRouter } from "next/navigation";


type CheckoutClientProps = {
    orderId: string;
    mode?: "DEPOSIT" | "STORAGE_BILLING";
    billingScheduleId?: string;
    successUrl?: string;
};

export function CheckoutClient({
    orderId,
    mode = "DEPOSIT",
    billingScheduleId,
}: CheckoutClientProps) {
    const router = useRouter();

    return (
        <EmbeddedCheckout
            orderId={orderId}
            mode={mode}
            billingScheduleId={billingScheduleId}
            onDone={() =>
                router.push(
                    `/success?orderId=${orderId}`
                )
            }
            resetCheckoutAfterPayment={
                mode === "DEPOSIT"
            }
        />
    );
}