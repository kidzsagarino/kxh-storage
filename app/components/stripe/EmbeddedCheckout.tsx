"use client";

import { useCallback, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function EmbeddedCheckout({ orderId }: { orderId: string }) {
  const mountedRef = useRef(false);

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
    let checkout: any;

    (async () => {
      const stripe = await stripePromise;
      if (!stripe) return;

      // avoid double-mount in React strict mode
      if (mountedRef.current) return;
      mountedRef.current = true;

      checkout = await stripe.initEmbeddedCheckout({ fetchClientSecret });
      checkout.mount("#embedded-checkout");
    })();

    return () => {
      mountedRef.current = false;
      checkout?.destroy?.();
    };
  }, [fetchClientSecret]);

  return <div id="embedded-checkout" />;
}
