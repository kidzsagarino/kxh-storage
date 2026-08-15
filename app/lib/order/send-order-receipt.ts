import React from "react";
import { render } from "@react-email/render";

import OrderReceiptEmail from "@/app/components/email/OrderReceiptEmail";
import NewOrderAdminNotificationEmail from "@/app/components/email/NewOrderAdminNotificationEmail";
import { generateOrderReceipt } from "@/app/api/orders/generateReceipt";
import { sendEmail } from "@/app/lib/resend";

import { prisma } from "@/src/lib/prisma";

export async function sendReceipt(
    paidOrderId: string
) {
    try {
        const {
            pdfBytes,
            order,
            hasContainer,
        } =
            await generateOrderReceipt(
                prisma,
                paidOrderId
            );

        const orderNumber =
            order.orderNumber ||
            order.id.slice(0, 8);

        const customerEmail =
            order.customer.email ||
            "operations@kxhlogistics.co.uk";

        const customerName =
            order.customer.fullName ||
            "Valued Customer";

        const customerSubject =
            `Receipt for Order #${orderNumber}`;

        const customerHtml =
            await render(
                React.createElement(
                    OrderReceiptEmail,
                    {
                        customerName,
                        orderNumber,
                        hasContainer,
                    }
                )
            );

        /*
         * Customer receipt
         */
        try {
            await sendEmail({
                to:
                    customerEmail,

                subject:
                    customerSubject,

                html:
                    customerHtml,

                attachments: [
                    {
                        filename:
                            `receipt-${orderNumber}.pdf`,

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
                        order.id,

                    type:
                        "RECEIPT",

                    to:
                        customerEmail,

                    subject:
                        customerSubject,

                    status:
                        "SENT",

                    provider:
                        "RESEND",
                },
            });
        } catch (error: any) {
            await prisma.emailLog.create({
                data: {
                    orderId:
                        order.id,

                    type:
                        "RECEIPT",

                    to:
                        customerEmail,

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


        /*
         * Admin notification
         */
        const adminEmail =
            process.env.RECEIPT_TO_ADMIN;

        if (adminEmail) {
            const adminSubject =
                `New Order Received: #${orderNumber}`;

            const adminHtml =
                await render(
                    React.createElement(
                        NewOrderAdminNotificationEmail,
                        {
                            customerName,
                            customerEmail:
                                order.customer.email ||
                                "Not provided",

                            orderNumber,
                            hasContainer,
                        }
                    )
                );

            try {
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
                                `receipt-${orderNumber}.pdf`,

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
                            order.id,

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
            } catch (error: any) {
                await prisma.emailLog.create({
                    data: {
                        orderId:
                            order.id,

                        type:
                            "RECEIPT",

                        to:
                            adminEmail,

                        subject:
                            adminSubject,

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

                console.error(
                    "[ADMIN_ORDER_EMAIL_FAILED]",
                    error
                );

                /*
                 * Admin email failure should not
                 * invalidate the customer's successful
                 * payment/receipt.
                 */
            }
        }

    } catch (error: any) {
        console.error(
            "[ORDER_RECEIPT_ERROR]",
            error
        );

        throw error;
    }
}