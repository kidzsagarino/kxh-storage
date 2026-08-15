import {
    PDFDocument,
    StandardFonts,
    rgb,
} from "pdf-lib";

import { prisma } from "@/src/lib/prisma";
import { money } from "@/app/utils/utils";


function formatDate(
    date?: Date | null
) {
    if (!date) {
        return "—";
    }

    return new Intl.DateTimeFormat(
        "en-GB",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    ).format(date);
}


export async function generateBillingReceipt(
    billingScheduleId: string
) {
    const billing =
        await prisma.orderBillingSchedule.findUnique({
            where: {
                id: billingScheduleId,
            },

            include: {
                order: {
                    include: {
                        customer: true,

                        billingSchedule: true,
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
        throw new Error(
            "Billing schedule not found"
        );
    }

    if (
        billing.status !== "PAID"
    ) {
        throw new Error(
            "Billing schedule is not paid"
        );
    }


    const totalInstallments =
        billing.order.billingSchedule.length;

    const payment =
        billing.payments[0];


    const pdf =
        await PDFDocument.create();

    const page =
        pdf.addPage([
            595,
            842,
        ]);

    const font =
        await pdf.embedFont(
            StandardFonts.Helvetica
        );

    const bold =
        await pdf.embedFont(
            StandardFonts.HelveticaBold
        );


    let y = 780;


    page.drawText(
        "KXH Storage & Logistics",
        {
            x: 50,
            y,
            size: 20,
            font: bold,
            color:
                rgb(
                    0.02,
                    0.47,
                    0.34
                ),
        }
    );

    y -= 36;

    page.drawText(
        "Storage Payment Receipt",
        {
            x: 50,
            y,
            size: 16,
            font: bold,
        }
    );

    y -= 40;


    const drawRow = (
        label: string,
        value: string
    ) => {
        page.drawText(
            label,
            {
                x: 50,
                y,
                size: 10,
                font: bold,
                color:
                    rgb(
                        0.35,
                        0.4,
                        0.45
                    ),
            }
        );

        page.drawText(
            value,
            {
                x: 200,
                y,
                size: 10,
                font,
            }
        );

        y -= 24;
    };


    drawRow(
        "Order",
        `#${billing.order.orderNumber}`
    );

    drawRow(
        "Customer",
        billing.order.customer.fullName
    );

    drawRow(
        "Email",
        billing.order.customer.email ??
            "—"
    );

    drawRow(
        "Installment",
        `Month ${billing.installmentNumber} of ${totalInstallments}`
    );

    drawRow(
        "Amount paid",
        money(
            billing.amountMinor,
            billing.order.currency
        )
    );

    drawRow(
        "Due date",
        formatDate(
            billing.dueDate
        )
    );

    drawRow(
        "Paid date",
        formatDate(
            billing.paidAt
        )
    );


    if (
        payment?.paymentIntentId
    ) {
        drawRow(
            "Payment reference",
            payment.paymentIntentId
        );
    }


    y -= 20;

    page.drawText(
        "Payment received successfully.",
        {
            x: 50,
            y,
            size: 11,
            font: bold,
        }
    );


    y -= 40;

    page.drawText(
        "Thank you for choosing KXH Storage & Logistics.",
        {
            x: 50,
            y,
            size: 10,
            font,
            color:
                rgb(
                    0.35,
                    0.4,
                    0.45
                ),
        }
    );


    const pdfBytes =
        await pdf.save();


    return {
        pdfBytes,
        billing,
    };
}