// app/admin/billings/SendBillingLinkButton.tsx

"use client";

import {
    useState,
    useTransition,
} from "react";

import {
    sendBillingPaymentLink,
} from "./actions";

type Props = {
    billingScheduleId: string;
    alreadySent?: boolean;
};

export function SendBillingLinkButton({
    billingScheduleId,
    alreadySent = false,
}: Props) {
    const [
        isPending,
        startTransition,
    ] = useTransition();

    const [sent, setSent] =
        useState(alreadySent);

    const [error, setError] =
        useState<string | null>(
            null
        );

    function handleSend() {
        setError(null);

        startTransition(async () => {
            const result =
                await sendBillingPaymentLink(
                    billingScheduleId
                );

            if (!result.success) {
                setError(
                    result.error ??
                        "Failed to send payment link."
                );

                return;
            }

            setSent(true);
        });
    }

    return (
        <div className="flex flex-col items-end gap-1">
            <button
                type="button"
                onClick={handleSend}
                disabled={isPending}
                className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isPending
                    ? "Sending..."
                    : sent
                    ? "Resend payment link"
                    : "Send payment link"}
            </button>

            {sent && !error && (
                <span className="text-[11px] font-medium text-emerald-700">
                    Email sent ✓
                </span>
            )}

            {error && (
                <span className="max-w-48 text-right text-[11px] text-red-600">
                    {error}
                </span>
            )}
        </div>
    );
}