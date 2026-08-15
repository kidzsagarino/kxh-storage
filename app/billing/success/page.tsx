import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";

type Props = {
    searchParams: Promise<{
        billingScheduleId?: string;
    }>;
};

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
    ).format(amountMinor / 100);
}

function formatDate(
    value?: Date | null
) {
    if (!value) {
        return "—";
    }

    return new Intl.DateTimeFormat(
        "en-GB",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    ).format(value);
}

export default async function BillingSuccessPage({
    searchParams,
}: Props) {
    const {
        billingScheduleId,
    } = await searchParams;

    if (!billingScheduleId) {
        redirect("/");
    }

    const billing =
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
                                installmentNumber:
                                    "asc",
                            },
                        },
                    },
                },

                payments: {
                    where: {
                        status: "SUCCEEDED",
                    },

                    orderBy: {
                        createdAt: "desc",
                    },

                    take: 1,
                },
            },
        });

    if (!billing) {
        redirect("/");
    }

    const totalInstallments =
        billing.order.billingSchedule.length;

    const paid =
        billing.status === "PAID";

    const payment =
        billing.payments[0];

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-2xl">

                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-100 px-6 py-7 sm:px-8">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                            KXH Storage & Logistics
                        </p>

                        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                            {paid
                                ? "Payment received"
                                : "Payment processing"}
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Order #
                            {billing.order.orderNumber}
                        </p>
                    </div>


                    <div className="space-y-6 p-6 sm:p-8">

                        {paid ? (
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                                        ✓
                                    </div>

                                    <div>
                                        <p className="font-bold text-emerald-900">
                                            Your storage payment was successful.
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-emerald-700">
                                            A receipt has been sent to{" "}
                                            <strong>
                                                {billing.order.customer.email}
                                            </strong>.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">

                                <p className="font-bold text-amber-900">
                                    Payment is still being confirmed.
                                </p>

                                <p className="mt-1 text-sm text-amber-700">
                                    Please refresh this page shortly.
                                </p>

                            </div>
                        )}


                        <div className="grid gap-3 sm:grid-cols-2">

                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Installment
                                </p>

                                <p className="mt-1 font-bold text-slate-900">
                                    Month{" "}
                                    {billing.installmentNumber}
                                    {" "}of{" "}
                                    {totalInstallments}
                                </p>
                            </div>


                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Amount
                                </p>

                                <p className="mt-1 font-bold text-slate-900">
                                    {formatMoney(
                                        billing.amountMinor,
                                        billing.order.currency
                                    )}
                                </p>
                            </div>


                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Due date
                                </p>

                                <p className="mt-1 font-bold text-slate-900">
                                    {formatDate(
                                        billing.dueDate
                                    )}
                                </p>
                            </div>


                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Paid date
                                </p>

                                <p className="mt-1 font-bold text-slate-900">
                                    {formatDate(
                                        billing.paidAt
                                    )}
                                </p>
                            </div>

                        </div>


                        {payment?.paymentIntentId && (
                            <div className="rounded-2xl border border-slate-200 p-4">

                                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Payment reference
                                </p>

                                <p className="mt-1 break-all font-mono text-xs text-slate-700">
                                    {payment.paymentIntentId}
                                </p>

                            </div>
                        )}


                        <div className="flex flex-col gap-3 sm:flex-row">

                            <Link
                                href="/"
                                className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
                            >
                                Back to KXH
                            </Link>

                            <Link
                                href={`/billing/${billing.id}`}
                                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                            >
                                View payment
                            </Link>

                        </div>

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