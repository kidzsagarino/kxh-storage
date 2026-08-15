"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

import {
    createStorageBillingSession,
} from "@/app/services/stripe";

const stripePromise =
    loadStripe(
        process.env
            .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );

type Props = {
    orderId: string;
    billingScheduleId: string;
};

export function StorageBillingCheckoutClient({
    orderId,
    billingScheduleId,
}: Props) {
    const router =
        useRouter();

    const checkoutRef =
        useRef<any>(null);

    const initializingRef =
        useRef(false);

    const [loading, setLoading] =
        useState(false);

    const [mounted, setMounted] =
        useState(false);

    const [error, setError] =
        useState<string | null>(
            null
        );

    const handlePay =
        useCallback(async () => {
            if (
                loading ||
                initializingRef.current ||
                checkoutRef.current
            ) {
                return;
            }

            initializingRef.current =
                true;

            setLoading(true);
            setError(null);

            try {
                const stripe =
                    await stripePromise;

                if (!stripe) {
                    throw new Error(
                        "Stripe failed to initialize."
                    );
                }

                const {
                    clientSecret,
                } =
                    await createStorageBillingSession(
                        billingScheduleId
                    );

                if (!clientSecret) {
                    throw new Error(
                        "Unable to create payment session."
                    );
                }

                const checkout =
                    await stripe.initEmbeddedCheckout({
                        clientSecret,

                        onComplete:
                            () => {
                                checkoutRef.current
                                    ?.destroy?.();

                                checkoutRef.current =
                                    null;

                                router.push(
                                    `/billing/success?orderId=${orderId}&billingScheduleId=${billingScheduleId}`
                                );
                            },
                    });

                checkoutRef.current =
                    checkout;

                checkout.mount(
                    "#storage-billing-checkout"
                );

                setMounted(true);
            } catch (err: any) {
                console.error(
                    "[STORAGE_BILLING_CHECKOUT]",
                    err
                );

                setError(
                    err?.message ??
                        "Unable to start payment."
                );

                checkoutRef.current
                    ?.destroy?.();

                checkoutRef.current =
                    null;
            } finally {
                initializingRef.current =
                    false;

                setLoading(false);
            }
        }, [
            orderId,
            billingScheduleId,
            loading,
            router,
        ]);

    useEffect(() => {
        return () => {
            checkoutRef.current
                ?.destroy?.();

            checkoutRef.current =
                null;

            initializingRef.current =
                false;
        };
    }, []);

    return (
        <div className="space-y-5">
            {!mounted && (
                <div className="rounded-2xl border border-slate-200 p-5">
                    <h2 className="font-bold text-slate-900">
                        Secure payment
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                        Your payment will be
                        securely processed by
                        Stripe. KXH does not store
                        your card details.
                    </p>

                    {error && (
                        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={
                            handlePay
                        }
                        disabled={
                            loading
                        }
                        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Preparing secure payment..."
                            : "Pay now"}
                    </button>
                </div>
            )}

            <div
                id="storage-billing-checkout"
                className={
                    mounted
                        ? "overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 sm:p-6"
                        : ""
                }
            />
        </div>
    );
}