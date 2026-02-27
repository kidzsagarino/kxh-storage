"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCheckout } from "../checkout/CheckoutStore";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function EmbeddedCheckout({ orderId, onDone }: { orderId: string, onDone: (orderId: string) => void; }) {
    const checkoutRef = useRef<any>(null);
    const initingRef = useRef(false);

    const { resetAll } = useCheckout();

    const [isResetting, setIsResetting] = useState(false);

    const fetchClientSecret = useCallback(async () => {
        const res = await fetch("/api/stripe/create-embedded-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, mode: "DEPOSIT" }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error ?? "Failed to create embedded session");
        return data.clientSecret as string;
    }, [orderId]);

    useEffect(() => {
        let alive = true;

        (async () => {
            const stripe = await stripePromise;
            if (!stripe || !alive) return;

            if (checkoutRef.current) return;
            if (initingRef.current) return;
            initingRef.current = true;

            try {
                const checkout = await stripe.initEmbeddedCheckout({
                    fetchClientSecret,
                    onComplete: () => {

                        setIsResetting(true);
                        checkoutRef.current?.destroy?.();
                        checkoutRef.current = null;

                        resetAll();
                        onDone(orderId);

                    },
                });

                if (!alive) {
                    checkout.destroy?.();
                    return;
                }

                checkoutRef.current = checkout;
                checkout.mount("#embedded-checkout");
            } finally {
                initingRef.current = false;
            }
        })();

        return () => {
            alive = false;
            checkoutRef.current?.destroy?.();
            checkoutRef.current = null;
            initingRef.current = false;
        };
    }, [fetchClientSecret, resetAll, orderId, onDone]);

    return <div className="space-y-4">
        <div id="embedded-checkout" />

        {isResetting && (
            <div className="text-sm text-slate-500 animate-pulse text-center">
                Payment successful ✓ Clearing your order form.
            </div>
        )}
    </div>;
}
