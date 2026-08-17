// app/admin/billings/actions.ts

"use server";


import React from "react";
import { render } from "@react-email/render";
import { revalidatePath } from "next/cache";

import { prisma } from "@/src/lib/prisma";
import { sendEmail } from "@/app/lib/resend";
import { BillingScheduleStatus, Prisma } from "@prisma/client";
import { money } from "@/app/utils/utils";

import {
    extendStorageBilling,
} from "@/app/lib/billing/billing-extension"

import StorageBillingPaymentLinkEmail
    from "@/app/components/email/StorageBillingPaymentLinkEmail";

function getBaseUrl() {
    const url = process.env.NEXT_PUBLIC_APP_URL;

    if (!url) {
        throw new Error(
            "NEXT_PUBLIC_APP_URL is missing"
        );
    }

    return url.replace(/\/$/, "");
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat(
        "en-GB",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    ).format(date);
}

type GetAdminBillingsParams = {
    q?: string;

    status?: string;

    from?: Date;

    to?: Date;
};


export async function getAdminBillings({
    q,
    status,
    from,
    to,
}: GetAdminBillingsParams = {}) {

    const where:
        Prisma.OrderBillingScheduleWhereInput =
        {};


    if (
        status &&
        Object.values(
            BillingScheduleStatus
        ).includes(
            status as BillingScheduleStatus
        )
    ) {
        where.status =
            status as BillingScheduleStatus;
    }


    if (from || to) {
        where.dueDate = {
            ...(from
                ? {
                    gte:
                        new Date(
                            from
                        ),
                }
                : {}),

            ...(to
                ? {
                    lt:
                        new Date(
                            to
                        ),
                }
                : {}),
        };
    }


    const search =
        q?.trim();

    if (search) {
        where.OR = [
            {
                order: {
                    orderNumber: {
                        contains:
                            search,

                        mode:
                            "insensitive",
                    },
                },
            },

            {
                order: {
                    customer: {
                        fullName: {
                            contains:
                                search,

                            mode:
                                "insensitive",
                        },
                    },
                },
            },

            {
                order: {
                    customer: {
                        email: {
                            contains:
                                search,

                            mode:
                                "insensitive",
                        },
                    },
                },
            },
        ];
    }


    return prisma.orderBillingSchedule.findMany({
        where,

        include: {
            order: {
                include: {
                    customer:
                        true,
                },
            },

            payments: {
                orderBy: {
                    createdAt:
                        "desc",
                },

                take: 1,
            },
        },

        orderBy: [
            {
                order: {
                    orderNumber: "asc",
                },
            },
            {
                installmentNumber: "asc",
            },
        ],
    });
}

export async function sendBillingPaymentLink(
    billingScheduleId: string
) {
    try {
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
                                select: {
                                    id: true,
                                },
                            },
                        },
                    },
                },
            });

        if (!billing) {
            return {
                success: false,
                error: "Billing record not found.",
            };
        }

        if (billing.status === "PAID") {
            return {
                success: false,
                error:
                    "This installment has already been paid.",
            };
        }

        if (billing.status === "CANCELED") {
            return {
                success: false,
                error:
                    "This installment has been canceled.",
            };
        }

        const customer =
            billing.order.customer;

        if (!customer.email) {
            return {
                success: false,
                error:
                    "Customer does not have an email address.",
            };
        }

        const paymentUrl =
            `${getBaseUrl()}/billing/${billing.id}`;

        const installmentCount =
            billing.order.billingSchedule.length;

        const amount =
            money(
                billing.amountMinor,
                billing.order.currency
            );

        const dueDate =
            formatDate(
                billing.dueDate
            );

        const subject =
            `KXH Storage Payment - Month ${billing.installmentNumber} of ${installmentCount}`;

        const html =
            await render(
                React.createElement(
                    StorageBillingPaymentLinkEmail,
                    {
                        customerName:
                            customer.fullName ||
                            "Valued Customer",

                        orderNumber:
                            billing.order.orderNumber,

                        installmentNumber:
                            billing.installmentNumber.toString(),

                        installmentCount: 
                        installmentCount.toString(),

                        amount,

                        dueDate,

                        paymentUrl,
                    }
                )
            );

        await sendEmail({
            to:
                customer.email,

            subject,

            html,
        });

        await prisma.orderBillingSchedule.update({
            where: {
                id: billing.id,
            },

            data: {
                reminderSentAt:
                    new Date(),
            },
        });

        await prisma.emailLog.create({
            data: {
                orderId:
                    billing.orderId,

                type:
                    "BILLING_PAYMENT_LINK",

                to:
                    customer.email,

                subject,

                status:
                    "SENT",

                provider:
                    "RESEND",
            },
        });

        revalidatePath(
            "/admin/billings"
        );

        return {
            success: true,
            paymentUrl,
        };

    } catch (error: any) {

        console.error(
            "[SEND_BILLING_PAYMENT_LINK]",
            error
        );

        return {
            success: false,

            error:
                error?.message ??
                "Failed to send payment link.",
        };
    }
}


