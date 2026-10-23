"use client";

import Link from "next/link";
import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    BillingScheduleStatus,
} from "@prisma/client";

import { toast } from "sonner";

import {
    getAdminBillings,
} from "./actions";

import {
    SendBillingLinkButton,
} from "./SendBillingLinkButton";


type BillingRow = any;


function startOfDay(d: Date) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);

    return x;
}


function startOfWeekMonday(d: Date) {
    const x = startOfDay(d);

    const day = x.getDay();

    const diff =
        (day === 0 ? -6 : 1) - day;

    x.setDate(
        x.getDate() + diff
    );

    return x;
}


function monthLabel(d: Date) {
    return d.toLocaleString(
        undefined,
        {
            month: "long",
            year: "numeric",
        }
    );
}


function buildWeekOptions(
    weeksBack = 10
) {
    const now = new Date();

    const thisWeekStart =
        startOfWeekMonday(now);

    const out = [];

    for (
        let i = 0;
        i < weeksBack;
        i++
    ) {
        const from =
            new Date(thisWeekStart);

        from.setDate(
            from.getDate() -
            i * 7
        );

        const toExclusive =
            new Date(from);

        toExclusive.setDate(
            toExclusive.getDate() + 7
        );

        const label =
            i === 0
                ? "This week"
                : i === 1
                ? "Last week"
                : `${i} weeks ago`;

        out.push({
            key: `w-${i}`,
            label,
            from,
            toExclusive,
        });
    }

    return out;
}


function buildMonthOptions(
    monthsBack = 18
) {
    const now = new Date();

    const out = [];

    for (
        let i = 0;
        i < monthsBack;
        i++
    ) {
        const from =
            new Date(
                now.getFullYear(),
                now.getMonth() - i,
                1
            );

        const toExclusive =
            new Date(
                now.getFullYear(),
                now.getMonth() - i + 1,
                1
            );

        out.push({
            key:
                `m-${from.getFullYear()}-${from.getMonth() + 1}`,

            label:
                monthLabel(from),

            from,
            toExclusive,
        });
    }

    return out;
}


function buildYearOptions(
    yearsBack = 6
) {
    const now = new Date();

    const out = [];

    for (
        let i = 0;
        i < yearsBack;
        i++
    ) {
        const year =
            now.getFullYear() - i;

        out.push({
            key:
                `y-${year}`,

            label:
                String(year),

            from:
                new Date(
                    year,
                    0,
                    1
                ),

            toExclusive:
                new Date(
                    year + 1,
                    0,
                    1
                ),
        });
    }

    return out;
}


function formatDate(
    value?: Date | string | null
) {
    if (!value) {
        return "—";
    }

    const date =
        value instanceof Date
            ? value
            : new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "—";
    }

    return date.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
}


function formatMoney(
    amountMinor: number,
    currency = "GBP"
) {
    return new Intl.NumberFormat(
        "en-GB",
        {
            style: "currency",
            currency,
        }
    ).format(
        amountMinor / 100
    );
}


function getStatusClasses(
    status: BillingScheduleStatus
) {
    switch (status) {
        case BillingScheduleStatus.PAID:
            return "bg-emerald-50 text-emerald-700 border-emerald-200";

        case BillingScheduleStatus.PAYMENT_PENDING:
            return "bg-amber-50 text-amber-700 border-amber-200";

        case BillingScheduleStatus.OVERDUE:
            return "bg-red-50 text-red-700 border-red-200";

        case BillingScheduleStatus.CANCELED:
            return "bg-slate-100 text-slate-600 border-slate-200";

        default:
            return "bg-blue-50 text-blue-700 border-blue-200";
    }
}


export default function AdminBillingsClient() {
    const [
        billings,
        setBillings,
    ] =
        useState<BillingRow[]>([]);

    const [
        loading,
        setLoading,
    ] =
        useState(true);

    const [
        q,
        setQ,
    ] =
        useState("");

    const [
        status,
        setStatus,
    ] =
        useState("");

    const [
        mode,
        setMode,
    ] =
        useState<
            "all" |
            "week" |
            "month" |
            "year"
        >("all");

    const [
        rangeKey,
        setRangeKey,
    ] =
        useState("");


    const options =
        useMemo(() => {
            if (
                mode === "week"
            ) {
                return buildWeekOptions(
                    10
                );
            }

            if (
                mode === "month"
            ) {
                return buildMonthOptions(
                    18
                );
            }

            if (
                mode === "year"
            ) {
                return buildYearOptions(
                    6
                );
            }

            return [];
        }, [mode]);


    useEffect(() => {
        const fetchData =
            async () => {
                setLoading(true);

                try {
                    const selectedRange =
                        options.find(
                            (x) =>
                                x.key ===
                                rangeKey
                        );

                    const data =
                        await getAdminBillings({
                            q,

                            status:
                                status ||
                                undefined,

                            from:
                                selectedRange
                                    ?.from,

                            to:
                                selectedRange
                                    ?.toExclusive,
                        });

                    setBillings(
                        data
                    );
                } catch (error) {
                    console.error(
                        "Failed to fetch billings",
                        error
                    );

                    toast.error(
                        "Failed to fetch billings"
                    );
                } finally {
                    setLoading(false);
                }
            };


        const timer =
            setTimeout(
                fetchData,
                300
            );

        return () =>
            clearTimeout(
                timer
            );
    }, [
        q,
        status,
        rangeKey,
        options,
    ]);


    return (
        <main className="space-y-4">

            {/* Header / Filters */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <h1 className="text-lg font-bold text-slate-900">
                        Storage Billings
                    </h1>


                    <div className="flex flex-wrap items-center gap-2">

                        {/* Status */}
                        <select
                            value={
                                status
                            }
                            onChange={(
                                e
                            ) =>
                                setStatus(
                                    e
                                        .target
                                        .value
                                )
                            }
                            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20"
                        >
                            <option value="">
                                All statuses
                            </option>

                            <option value="SCHEDULED">
                                Scheduled
                            </option>

                            <option value="PAYMENT_PENDING">
                                Payment pending
                            </option>

                            <option value="OVERDUE">
                                Overdue
                            </option>

                            <option value="PAID">
                                Paid
                            </option>

                            <option value="CANCELED">
                                Canceled
                            </option>
                        </select>


                        {/* Date Mode */}
                        <select
                            value={mode}
                            onChange={(
                                e
                            ) => {
                                setMode(
                                    e
                                        .target
                                        .value as any
                                );

                                setRangeKey(
                                    ""
                                );
                            }}
                            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20"
                        >
                            <option value="all">
                                All time
                            </option>

                            <option value="week">
                                By Week
                            </option>

                            <option value="month">
                                By Month
                            </option>

                            <option value="year">
                                By Year
                            </option>
                        </select>


                        {mode !==
                            "all" && (
                            <select
                                value={
                                    rangeKey
                                }
                                onChange={(
                                    e
                                ) =>
                                    setRangeKey(
                                        e
                                            .target
                                            .value
                                    )
                                }
                                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="">
                                    Select
                                    range...
                                </option>

                                {options.map(
                                    (
                                        option
                                    ) => (
                                        <option
                                            key={
                                                option.key
                                            }
                                            value={
                                                option.key
                                            }
                                        >
                                            {
                                                option.label
                                            }
                                        </option>
                                    )
                                )}
                            </select>
                        )}

                    </div>
                </div>


                {/* Search */}
                <div className="relative">
                    <input
                        value={q}
                        onChange={(
                            e
                        ) =>
                            setQ(
                                e
                                    .target
                                    .value
                            )
                        }
                        placeholder="Search customer, email, or order #..."
                        className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>

            </div>


            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="overflow-auto">

                    {loading ? (
                        <div className="p-20 text-center font-medium text-slate-500">
                            Loading
                            billings...
                        </div>
                    ) : (
                        <table className="w-full text-left text-sm border-collapse">

                            <thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                <tr>
                                    <th className="px-4 py-4">
                                        Order #
                                    </th>

                                    <th className="px-4 py-4">
                                        Customer
                                    </th>

                                    <th className="px-4 py-4">
                                        Installment
                                    </th>

                                    <th className="px-4 py-4">
                                        Due Date
                                    </th>

                                    <th className="px-4 py-4">
                                        Status
                                    </th>

                                    <th className="px-4 py-4">
                                        Email Sent
                                    </th>

                                    <th className="px-4 py-4">
                                        Paid Date
                                    </th>

                                    <th className="px-4 py-4 text-right">
                                        Amount
                                    </th>

                                    <th className="px-4 py-4 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>


                            <tbody className="divide-y divide-slate-100">

                                {billings.map(
                                    (
                                        billing
                                    ) => {
                                        const isPaid =
                                            billing.status ===
                                            BillingScheduleStatus.PAID;

                                        const canSend =
                                            billing.status !==
                                                BillingScheduleStatus.PAID &&
                                            billing.status !==
                                                BillingScheduleStatus.CANCELED;

                                        return (
                                            <tr
                                                key={
                                                    billing.id
                                                }
                                                className="transition-colors hover:bg-slate-50/50"
                                            >

                                                {/* Order */}
                                                <td className="px-4 py-4">
                                                    <Link
                                                        href={`/admin/orders/${billing.orderId}`}
                                                        className="font-mono text-sm font-bold text-emerald-700 hover:underline"
                                                    >
                                                        #
                                                        {
                                                            billing
                                                                .order
                                                                .orderNumber
                                                        }
                                                    </Link>

                                                    <div className="mt-0.5 text-[10px] text-slate-400">
                                                        Billing
                                                        ID:{" "}
                                                        {billing.id.slice(
                                                            0,
                                                            8
                                                        )}
                                                    </div>
                                                </td>


                                                {/* Customer */}
                                                <td className="px-4 py-4">
                                                    <div className="font-semibold text-slate-900">
                                                        {
                                                            billing
                                                                .order
                                                                .customer
                                                                .fullName
                                                        }
                                                    </div>

                                                    <div className="text-sm text-slate-500">
                                                        {billing
                                                            .order
                                                            .customer
                                                            .email ??
                                                            "—"}
                                                    </div>
                                                </td>


                                                {/* Installment */}
                                                <td className="px-4 py-4">
                                                    <div className="font-semibold text-slate-900">
                                                        Month{" "}
                                                        {
                                                            billing.installmentNumber
                                                        }
                                                    </div>
                                                </td>


                                                {/* Due */}
                                                <td className="px-4 py-4">
                                                    <div className="font-medium text-slate-900">
                                                        {formatDate(
                                                            billing.dueDate
                                                        )}
                                                    </div>
                                                </td>


                                                {/* Status */}
                                                <td className="px-4 py-4">
                                                    <span
                                                        className={[
                                                            "inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-center",
                                                            getStatusClasses(
                                                                billing.status
                                                            ),
                                                        ].join(
                                                            " "
                                                        )}
                                                    >
                                                        {billing.status.replaceAll(
                                                            "_",
                                                            " "
                                                        )}
                                                    </span>
                                                </td>


                                                {/* Email */}
                                                <td className="px-4 py-4">
                                                    {billing.reminderSentAt ? (
                                                        <>
                                                            <div className="font-medium text-emerald-700">
                                                                Sent
                                                            </div>

                                                            <div className="text-[10px] text-slate-500">
                                                                {formatDate(
                                                                    billing.reminderSentAt
                                                                )}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <span className="text-slate-400">
                                                            —
                                                        </span>
                                                    )}
                                                </td>


                                                {/* Paid */}
                                                <td className="px-4 py-4">
                                                    {billing.paidAt ? (
                                                        <div className="font-medium text-slate-900">
                                                            {formatDate(
                                                                billing.paidAt
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-400">
                                                            —
                                                        </span>
                                                    )}
                                                </td>


                                                {/* Amount */}
                                                <td className="px-4 py-4 text-right">
                                                    <div className="font-bold text-slate-900">
                                                        {formatMoney(
                                                            billing.amountMinor,
                                                            billing
                                                                .order
                                                                .currency
                                                        )}
                                                    </div>
                                                </td>


                                                {/* Actions */}
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center justify-end gap-2">

                                                        <Link
                                                            href={`/admin/billings/${billing.id}`}
                                                            className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                                                        >
                                                            View
                                                        </Link>


                                                        {canSend && (
                                                            <SendBillingLinkButton
                                                                billingScheduleId={
                                                                    billing.id
                                                                }
                                                                alreadySent={
                                                                    !!billing.reminderSentAt
                                                                }
                                                            />
                                                        )}


                                                        {isPaid && (
                                                            <span className="text-[11px] font-semibold text-emerald-700">
                                                                Paid ✓
                                                            </span>
                                                        )}

                                                    </div>
                                                </td>

                                            </tr>
                                        );
                                    }
                                )}

                            </tbody>
                        </table>
                    )}


                    {!loading &&
                        billings.length ===
                            0 && (
                            <div className="p-20 text-center text-slate-400">
                                No billing
                                records found
                                for this
                                criteria.
                            </div>
                        )}

                </div>
            </div>

        </main>
    );
}