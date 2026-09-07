import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "@/app/lib/resend";
import {
    generateOrderReceipt,
    getOrderEmailHtml,
} from "../generateReceipt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
};

const prisma =
    globalForPrisma.prisma ??
    new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

const TEST_EMAIL = "kennedysagarino@gmail.com";

export async function POST(
    req: NextRequest
) {
    try {
        const { paidOrderId } =
            await req.json();

        if (!paidOrderId) {
            return NextResponse.json(
                {
                    ok: false,
                    error: "Missing orderId",
                },
                { status: 400 }
            );
        }

        const {
            pdfBytes,
            order,
            hasContainer,
        } = await generateOrderReceipt(
            prisma,
            paidOrderId
        );

        const subject =
            `[TEST] Receipt for Order #${
                order.orderNumber ||
                order.id.slice(0, 8)
            }`;

        try {
            await sendEmail({
                // TEST ONLY — do not send to customer
                to: TEST_EMAIL,

                subject,

                html: `
                    <p>
                        <strong>
                            Production receipt test
                        </strong>
                    </p>

                    <p>
                        Original customer:
                        ${order.customer.email || "-"}
                    </p>

                    ${getOrderEmailHtml(
                        hasContainer
                    )}
                `,

                attachments: [
                    {
                        filename:
                            `receipt-${
                                order.orderNumber ||
                                "order"
                            }.pdf`,

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
                    orderId: order.id,
                    type: "RECEIPT",
                    to: TEST_EMAIL,
                    subject,
                    status: "SENT",
                    provider: "RESEND",
                },
            });

            console.log(
                "[TEST_RECEIPT_EMAIL_SENT]",
                {
                    orderId: order.id,
                    to: TEST_EMAIL,
                }
            );
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : String(err);

            await prisma.emailLog.create({
                data: {
                    orderId: order.id,
                    type: "RECEIPT",
                    to: TEST_EMAIL,
                    subject,
                    status: "FAILED",
                    provider: "RESEND",
                    error: message,
                },
            });

            console.error(
                "[TEST_RECEIPT_EMAIL_FAILED]",
                err
            );

            return NextResponse.json(
                {
                    ok: false,
                    error: message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            ok: true,
            sentTo: TEST_EMAIL,
            orderId: order.id,
            orderNumber:
                order.orderNumber,
        });
    } catch (err: unknown) {
        console.error(
            "[TEST_RECEIPT_ERROR]",
            err
        );

        const message =
            err instanceof Error
                ? err.message
                : String(err);

        return NextResponse.json(
            {
                ok: false,
                error: message,
            },
            { status: 500 }
        );
    }
}