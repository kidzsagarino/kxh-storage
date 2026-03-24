"use client";

import { useRouter } from "next/navigation";
import { EmbeddedCheckout } from "@/app/components/stripe/EmbeddedCheckout";
import { useEffect } from "react";
import { createEmbeddedSession } from "../services/stripe";

export function CheckoutClient({ orderId }: { orderId: string }) {
    const router = useRouter();
    useEffect(() => {

        createEmbeddedSession(orderId);

    }, [orderId])

    const handleDone = () => {
        router.push(`/success?orderId=${orderId}`);
    };

    return (
        <EmbeddedCheckout
            onDone={handleDone}
            orderId={orderId}
        />
    );
}