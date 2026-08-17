"use client";

import {
    useState,
} from "react";

import {
    toast,
} from "sonner";

import {
    extendBillingAction,
} from "./actions";


type Props = {
    orderId: string;
    currentInstallments: number;
    monthlyAmountMinor: number;
    currency: string;
    onExtended?: () => void;
};


export function StorageBillingExtension({
    orderId,
    currentInstallments,
    monthlyAmountMinor,
    currency,
    onExtended,
}: Props) {
    const [months, setMonths] =
        useState(1);

    const [extending, setExtending] =
        useState(false);


    const money = (
        amountMinor: number
    ) =>
        new Intl.NumberFormat(
            "en-GB",
            {
                style: "currency",
                currency,
            }
        ).format(
            amountMinor / 100
        );


    async function handleExtend() {
        if (
            months < 1 ||
            months > 12
        ) {
            toast.error(
                "Extension must be between 1 and 12 months."
            );

            return;
        }

        setExtending(true);

        try {
            const result =
                await extendBillingAction(
                    orderId,
                    months
                );

            if (!result.success) {
                toast.error(
                    "Failed to extend billing."
                );

                return;
            }

            toast.success(
                `Storage extended by ${months} ${months === 1
                    ? "month"
                    : "months"
                }.`
            );

            setMonths(1);

            onExtended?.();
        } catch (error: unknown) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to extend billing."
            );
        } finally {
            setExtending(false);
        }
    }


    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>
                    <div className="text-sm font-semibold text-slate-900">
                        Extend Storage
                    </div>

                    <div className="mt-1 text-sm text-slate-500">
                        Currently{" "}
                        {currentInstallments}{" "}
                        {currentInstallments === 1
                            ? "month"
                            : "months"}
                        {" • "}
                        {money(
                            monthlyAmountMinor
                        )}{" "}
                        per month
                    </div>
                </div>


                <div className="flex items-end gap-3">
                    <div>
                        <label
                            htmlFor="extensionMonths"
                            className="mb-1 block text-xs font-medium text-slate-600"
                        >
                            Add months
                        </label>

                        <input
                            id="extensionMonths"
                            type="number"
                            min={1}
                            max={12}
                            step={1}
                            value={months}
                            onChange={(e) => {
                                const value =
                                    Number(
                                        e.target.value
                                    );

                                setMonths(
                                    Math.min(
                                        12,
                                        Math.max(
                                            1,
                                            value || 1
                                        )
                                    )
                                );
                            }}
                            className="h-10 w-20 rounded-xl border border-slate-300 bg-white px-3 text-center text-sm font-semibold text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        />
                    </div>


                    <button
                        type="button"
                        onClick={
                            handleExtend
                        }
                        disabled={
                            extending
                        }
                        className="h-10 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {extending
                            ? "Extending..."
                            : "Extend"}
                    </button>
                </div>
            </div>
        </div>
    );
}