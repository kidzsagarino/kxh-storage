"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";

import { useRouter } from "next/navigation";


const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type Props = {
    clientSecret: string;
    returnUrl: string; // used if redirect is required (3DS)
    onSuccess?: (paymentIntentId: string) => void;
    className?: string;
};

export function OnPageCheckout({
    clientSecret,
    returnUrl,
    onSuccess,
    className
}: Props) {
    return (
        <div className={className}>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
                <StripePayForm returnUrl={returnUrl} onSuccess={onSuccess} />
            </Elements>
        </div>
    );
}

function StripePayForm({
    returnUrl,
    onSuccess,
}: {
    returnUrl: string;
    onSuccess?: (paymentIntentId: string) => void;
}) {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();

    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);

    async function pay(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);

        if (!stripe || !elements) return;

        setBusy(true);

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setMsg(submitError.message ?? "Please check your payment details.");
            setBusy(false);
            return;
        }

        const successPath = returnUrl ?? "/payment/success";
        const successUrl = successPath.startsWith("http")
            ? successPath
            : `${window.location.origin}${successPath}`;


        const res = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
            confirmParams: {
                return_url: successUrl
            },
        });

        if (res.error) {
            setMsg(res.error.message ?? "Payment failed.");
            setBusy(false);
            return;
        }

        const pi = res.paymentIntent;
        if (pi?.status === "succeeded") {
            onSuccess?.(pi.id);
            router.push(successPath);
        }

        setMsg(`Payment status: ${pi?.status ?? "unknown"}`);
        setBusy(false);
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
            <div className="text-sm font-semibold text-slate-900">Secure payment</div>

            <div className="rounded-xl border p-3">
                <PaymentElement />
            </div>

            {msg && <div className="text-sm text-slate-700">{msg}</div>}

            <button
                type="button"
                onClick={pay}
                disabled={!stripe || !elements || busy}
                className="h-11 w-full rounded-xl bg-slate-900 px-5 text-sm font-medium text-white disabled:opacity-40"
            >
                {busy ? "Processing…" : "Pay now"}
            </button>

            <div className="text-[11px] text-slate-500">
                Card details are handled by Stripe.
            </div>
        </div>
    );
}
