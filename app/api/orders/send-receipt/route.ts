import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { PrismaClient, AddressType, ServiceType } from "@prisma/client";
import { sendEmail } from "@/app/lib/mail";
import { generateOrderReceipt, getOrderEmailHtml } from "../generateReceipt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(req: NextRequest) {
    try {
        const { paidOrderId } = await req.json();
        if (!paidOrderId) return NextResponse.json({ ok: false, error: "Missing orderId" }, { status: 400 });

        const { pdfBytes, order, hasContainer } =
            await generateOrderReceipt(prisma, paidOrderId);

        try {
            await sendEmail({
                to: order.customer.email || "help.kxhlogistics@gmail.com",
                subject: `Receipt for Order #${order.orderNumber || order.id.slice(0, 8)}`,
                html: getOrderEmailHtml(hasContainer),
                attachments: [{
                    filename: `receipt-${order.orderNumber || 'order'}.pdf`,
                    content: Buffer.from(pdfBytes),
                    contentType: "application/pdf",
                }],
            });

            await sendEmail({
                to: "help.kxhlogistics@gmail.com",
                subject: `New Order Received: #${order.orderNumber || order.id.slice(0, 8)}`,
                html: `
                        <p>A new order has been placed by ${order.customer.fullName || "Unknown Customer"}.</p>
                        <p>Order Number: <strong>${order.orderNumber || order.id.slice(0, 8)}</strong></p>
                        <p>Customer Email: ${order.customer.email || "Not provided"}</p>
                        ${hasContainer ? "<p><strong>Note:</strong> This order includes a container.</p>" : ""}
                        <p>See attached receipt for details.</p>
                    `,
                attachments: [
                    {
                        filename: `receipt-${order.orderNumber || "order"}.pdf`,
                        content: Buffer.from(pdfBytes),
                        contentType: "application/pdf",
                    },
                ],
            });

            await prisma.emailLog.create({
                data: {
                    orderId: order.id,
                    type: "RECEIPT",
                    to: order.customer.email || "help.kxhlogistics@gmail.com",
                    subject: `Receipt for Order #${order.orderNumber || order.id.slice(0, 8)}`,
                    status: "SENT",
                    provider: "SEND GRID"
                },
            });

        }
        catch (err: any) {
            await prisma.emailLog.create({
                data: {
                    orderId: order.id,
                    type: "RECEIPT",
                    to: order.customer.email || "help.kxhlogistics@gmail.com",
                    subject: `Receipt for Order #${order.orderNumber || order.id.slice(0, 8)}`,
                    status: "FAILED",
                    provider: "SENDGRID",
                    error: String(err?.message ?? err),
                },
            });
            console.error("Email sending failed:", err);
        }

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        console.error(err);

        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}