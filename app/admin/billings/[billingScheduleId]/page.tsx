import { notFound } from "next/navigation";

import { prisma } from "@/src/lib/prisma";

import { StorageBillingCheckoutClient } from "./StorageBillingCheckoutClient";

type PageProps = {
    params: Promise<{
        billingScheduleId: string;
    }>;
};

export default async function StorageBillingPage({
    params,
}: PageProps) {
    const {
        billingScheduleId,
    } = await params;

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
                                installmentNumber:
                                    "asc",
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

    const amount =
        new Intl.NumberFormat(
            "en-GB",
            {
                style: "currency",
                currency:
                    schedule.order.currency,
            }
        ).format(
            schedule.amountMinor / 100
        );

    const dueDate =
        new Intl.DateTimeFormat(
            "en-GB",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        ).format(
            schedule.dueDate
        );

    const isPaid =
        schedule.status === "PAID";

    const isCancelled =
        schedule.status === "CANCELED";

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-2xl">
                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-100 px-5 py-6 sm:px-7">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700">
                            KXH Storage & Logistics
                        </p>

                        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                            Storage payment
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Order #
                            {schedule.order.orderNumber}
                        </p>
                    </div>

                    <div className="space-y-5 p-5 sm:p-7">

                        <div className="grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
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
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Amount
                                </p>

                                <p className="mt-1 font-bold text-slate-900">
                                    {amount}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Due date
                                </p>

                                <p className="mt-1 font-bold text-slate-900">
                                    {dueDate}
                                </p>
                            </div>
                        </div>

                        {isPaid ? (
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                                <p className="font-bold text-emerald-800">
                                    Payment already received ✓
                                </p>

                                <p className="mt-1 text-sm text-emerald-700">
                                    This storage installment has already been paid.
                                </p>
                            </div>
                        ) : isCancelled ? (
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <p className="font-bold text-slate-800">
                                    Payment unavailable
                                </p>

                                <p className="mt-1 text-sm text-slate-600">
                                    This billing installment has been cancelled.
                                </p>
                            </div>
                        ) : (
                            <StorageBillingCheckoutClient
                                orderId={
                                    schedule.orderId
                                }
                                billingScheduleId={
                                    schedule.id
                                }
                            />
                        )}

                    </div>
                </div>
            </div>
        </main>
    );
}