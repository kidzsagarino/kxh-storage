import React from "react";
import { render } from "@react-email/render";

import { prisma } from "@/src/lib/prisma";
import { sendEmail } from "@/app/lib/resend";

import {
    generateBillingReceipt,
} from "./billing-receipt";

import StorageBillingReceiptEmail from "@/app/components/email/StorageBillingReceiptEmail";
import StorageBillingAdminNotificationEmail
    from "@/app/components/email/StorageBillingReceiptEmail";

export async function sendBillingReceipt(
    billingScheduleId: string
) {
    const {
        pdfBytes,
        billing,
    } =
        await generateBillingReceipt(
            billingScheduleId
        );

    const customer =
        billing.order.customer;

    if (!customer.email) {
        throw new Error(
            "Customer has no email address"
        );
    }

    const totalInstallments =
        billing.order.billingSchedule.length;

    const billingReference =
        `${billing.order.orderNumber}-M${String(
            billing.installmentNumber
        ).padStart(2, "0")}`;

    const amount =
        new Intl.NumberFormat(
            "en-GB",
            {
                style: "currency",
                currency:
                    billing.order.currency ??
                    "GBP",
            }
        ).format(
            billing.amountMinor / 100
        );

    const paidDate =
        billing.paidAt
            ? billing.paidAt.toLocaleString(
                "en-GB",
                {
                    timeZone:
                        "Europe/London",

                    day:
                        "numeric",

                    month:
                        "long",

                    year:
                        "numeric",

                    hour:
                        "2-digit",

                    minute:
                        "2-digit",
                }
            )
            : "—";


    /*
     * React Email template
     *
     * Because this is a .ts file,
     * use React.createElement instead of JSX.
     */
    const customerHtml =
        await render(
            React.createElement(
                StorageBillingReceiptEmail,
                {
                    customerName:
                        customer.fullName ||
                        "Valued Customer",

                    orderNumber:
                        billing.order.orderNumber,

                    billingReference,

                    installmentNumber:
                        billing.installmentNumber,

                    totalInstallments,

                    amount,

                    paidDate,
                }
            )
        );


    const customerSubject =
        `Receipt for KXH Storage Payment - ${billingReference}`;


    try {
        /*
         * CUSTOMER RECEIPT
         */
        await sendEmail({
            to:
                customer.email,

            subject:
                customerSubject,

            html:
                customerHtml,

            attachments: [
                {
                    filename:
                        `KXH-storage-receipt-${billingReference}.pdf`,

                    content:
                        Buffer.from(
                            pdfBytes
                        ),

                    contentType:
                        "application/pdf",
                },
            ],
        });



        await prisma.emailLog.create({
            data: {
                orderId:
                    billing.orderId,

                type:
                    "RECEIPT",

                to:
                    customer.email,

                subject:
                    customerSubject,

                status:
                    "SENT",

                provider:
                    "RESEND",
            },
        });


        /*
         * ADMIN NOTIFICATION
         */
        const adminEmail =
            process.env.RECEIPT_TO_ADMIN;

        if (adminEmail) {

            const adminHtml =
                await render(
                    React.createElement(
                        StorageBillingAdminNotificationEmail,
                        {
                            customerName:
                                customer.fullName ||
                                "Unknown Customer",

                            orderNumber:
                                billing.order.orderNumber,

                            billingReference,

                            installmentNumber:
                                billing.installmentNumber,

                            totalInstallments,

                            amount,

                            paidDate,

                        }
                    )
                );

            const adminSubject =
                `Storage Payment Received: ${billingReference} - ${amount}`;
            
                await sendEmail({
                to:
                    adminEmail,

                subject:
                    adminSubject,

                html:
                    adminHtml,

                attachments: [
                    {
                        filename:
                            `KXH-storage-receipt-${billingReference}.pdf`,

                        content:
                            Buffer.from(
                                pdfBytes
                            ),

                        contentType:
                            "application/pdf",
                    },
                ],
            });


            await prisma.emailLog.create({
                data: {
                    orderId:
                        billing.orderId,

                    type:
                        "RECEIPT",

                    to:
                        adminEmail,

                    subject:
                        adminSubject,

                    status:
                        "SENT",

                    provider:
                        "RESEND",
                },
            });
        }

    } catch (error: any) {

        await prisma.emailLog.create({
            data: {
                orderId:
                    billing.orderId,

                type:
                    "RECEIPT",

                to:
                    customer.email,

                subject:
                    customerSubject,

                status:
                    "FAILED",

                provider:
                    "RESEND",

                error:
                    String(
                        error?.message ??
                        error
                    ),
            },
        });

        throw error;
    }
}