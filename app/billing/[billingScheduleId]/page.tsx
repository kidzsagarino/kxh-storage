// app/billing/[billingScheduleId]/page.tsx

import { notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import { BillingCheckoutClient } from "./BillingCheckoutClient";

type Props = {
    params: Promise<{
        billingScheduleId: string;
    }>;
};

const DAILY_LATE_FEE_MINOR = 0;

function formatMoney(
    amountMinor: number,
    currency = "GBP"
) {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
    }).format(amountMinor / 100);
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
}

/**
 * Calculates how many calendar days the payment is overdue.
 *
 * Due today = 0 days overdue
 * Due yesterday = 1 day overdue
 * Due 2 days ago = 2 days overdue
 */
function calculateDaysOverdue(
    dueDate: Date,
    now = new Date()
) {
    const due = Date.UTC(
        dueDate.getUTCFullYear(),
        dueDate.getUTCMonth(),
        dueDate.getUTCDate()
    );

    const today = Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate()
    );

    const millisecondsPerDay =
        24 * 60 * 60 * 1000;

    return Math.max(
        0,
        Math.floor(
            (today - due) /
                millisecondsPerDay
        )
    );
}

export default async function BillingPage({
    params,
}: Props) {
    const { billingScheduleId } =
        await params;

    const schedule =
        await prisma.orderBillingSchedule.findUnique({
            where: {
                id: billingScheduleId,
            },

            include: {
                order: {
                    include: {
                        customer: true,

                        billingSchedule: {
                            orderBy: {
                                installmentNumber: "asc",
                            },
                        },
                    },
                },
            },
        });

    if (!schedule) {
        notFound();
    }

    const totalInstallments =
        schedule.order.billingSchedule.length;

    const isPaid =
        schedule.status === "PAID";

    const isCanceled =
        schedule.status === "CANCELED";

    /*
     * Calculate late fee when customer opens payment page.
     *
     * £5 × number of overdue days
     */
    const daysOverdue =
        !isPaid && !isCanceled
            ? calculateDaysOverdue(
                  schedule.dueDate
              )
            : 0;

    const lateFeeMinor =
        daysOverdue *
        DAILY_LATE_FEE_MINOR;

    const totalAmountMinor =
        schedule.amountMinor +
        lateFeeMinor;

    const amount = formatMoney(
        schedule.amountMinor,
        schedule.order.currency
    );

    const lateFee = formatMoney(
        lateFeeMinor,
        schedule.order.currency
    );

    const totalAmount = formatMoney(
        totalAmountMinor,
        schedule.order.currency
    );

    const dueDate =
        formatDate(schedule.dueDate);

        //*TODO: Uncomment this when we want to show overdue message
    const isOverdue = false;
        //daysOverdue > 0;

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
            <div className="mx-auto max-w-2xl">

                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

                    {/* HEADER */}
                    <div className="border-b border-slate-100 px-5 py-6 sm:px-7">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                            KXH Storage & Logistics
                        </p>

                        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                            Storage payment
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Order #
                            {schedule.order.orderNumber}
                        </p>
                    </div>

                    <div className="space-y-6 p-5 sm:p-7">

                        {/* PAYMENT DETAILS */}
                        <div className="grid gap-3 sm:grid-cols-3">

                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Installment
                                </p>

                                <p className="mt-1 font-bold text-slate-900">
                                    Month{" "}
                                    {schedule.installmentNumber}
                                    {" "}of{" "}
                                    {totalInstallments}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Amount
                                </p>

                                <p className="mt-1 font-bold text-slate-900">
                                    {amount}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Due date
                                </p>

                                <p className="mt-1 font-bold text-slate-900">
                                    {dueDate}
                                </p>
                            </div>

                        </div>

                        {/* CUSTOMER */}
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                            <p className="text-sm font-semibold text-slate-900">
                                Customer
                            </p>

                            <p className="mt-1 text-sm text-slate-600">
                                {schedule.order.customer.fullName}
                            </p>

                            {schedule.order.customer.email && (
                                <p className="text-sm text-slate-500">
                                    {schedule.order.customer.email}
                                </p>
                            )}

                        </div>

                        {/* PAID */}
                        {isPaid && (
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

                                <p className="font-bold text-emerald-800">
                                    Payment received ✓
                                </p>

                                <p className="mt-1 text-sm text-emerald-700">
                                    This storage installment has already been paid.
                                </p>

                                {schedule.paidAt && (
                                    <p className="mt-2 text-xs text-emerald-700">
                                        Paid on{" "}
                                        {formatDate(
                                            schedule.paidAt
                                        )}
                                    </p>
                                )}

                            </div>
                        )}

                        {/* CANCELED */}
                        {isCanceled && (
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                <p className="font-bold text-slate-800">
                                    Payment unavailable
                                </p>

                                <p className="mt-1 text-sm text-slate-600">
                                    This billing installment has been canceled.
                                </p>

                            </div>
                        )}

                        {/* ACTIVE PAYMENT */}
                        {!isPaid &&
                            !isCanceled && (
                                <>

                                    {/* OVERDUE */}
                                    {isOverdue && (
                                        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

                                            <p className="font-bold text-red-800">
                                                Payment overdue
                                            </p>

                                            <p className="mt-1 text-sm text-red-700">
                                                This installment was due on{" "}
                                                {dueDate}.
                                            </p>

                                            <p className="mt-1 text-sm text-red-700">
                                                {daysOverdue}{" "}
                                                {daysOverdue === 1
                                                    ? "day"
                                                    : "days"}{" "}
                                                overdue × £2.00 per day
                                            </p>

                                        </div>
                                    )}

                                    {/* TOTAL */}
                                    <div className="overflow-hidden rounded-2xl border border-slate-200">

                                        <div className="flex items-center justify-between px-4 py-3">
                                            <span className="text-sm text-slate-600">
                                                Installment
                                            </span>

                                            <span className="text-sm font-semibold text-slate-900">
                                                {amount}
                                            </span>
                                        </div>

                                        {lateFeeMinor > 0 && (
                                            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                                                <div>
                                                    <p className="text-sm text-red-600">
                                                        Late fee
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {daysOverdue} × £2.00
                                                    </p>
                                                </div>

                                                <span className="text-sm font-semibold text-red-600">
                                                    {lateFee}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-4">
                                            <span className="font-bold text-slate-900">
                                                Total due
                                            </span>

                                            <span className="text-lg font-black text-slate-900">
                                                {totalAmount}
                                            </span>
                                        </div>

                                    </div>

                                    {/* STRIPE CHECKOUT */}
                                    <BillingCheckoutClient
                                        orderId={
                                            schedule.orderId
                                        }
                                        billingScheduleId={
                                            schedule.id
                                        }
                                    />

                                </>
                            )}

                    </div>
                </div>

                <p className="mt-4 text-center text-xs text-slate-500">
                    Payments are securely processed by Stripe.
                    KXH does not store your card details.
                </p>

            </div>
        </main>
    );
}