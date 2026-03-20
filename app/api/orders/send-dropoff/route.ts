import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/src/lib/prisma";
import { sendEmail } from "@/app/lib/mail";
import { OrderStatus } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function fmtDateTime(value: any) {
    if (!value) return "—";
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

function fmtAddr(a?: any) {
    if (!a) return "—";
    return [a.line1, a.line2, a.city, a.postalCode, a.country].filter(Boolean).join(", ");
}

export async function POST(req: NextRequest) {
    let messageId: string | undefined;

    try {
        const { orderId } = await req.json();
        if (!orderId) return NextResponse.json({ error: "Missing orderId" }, { status: 400 });

        const order = await prisma.order.update({
            where: { id: orderId },
            data: {
                status: "DROPPED_OFF" as OrderStatus,
            },
            include: {
                customer: true,
                addresses: true,
                timeSlot: true,
                items: true
            },
        });

        if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

        const email = order.customer?.email;
        if (!email) return NextResponse.json({ error: "Customer email missing" }, { status: 400 });

        const pickup = order.addresses?.find((a: any) => a.type === "PICKUP");
        const serviceDate = order.serviceDate ? new Date(order.serviceDate) : null;

        const subject = `Drop-off confirmed — Order #${order.orderNumber}`;

        const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #0f172a;">
        <h2 style="margin:0 0 8px;">Items dropped off at our warehouse ✅</h2>
        <p style="margin:0 0 16px;">
          Hi ${order.customer?.fullName ?? ""},<br/>
          Just confirming your items have been successfully dropped off at our warehouse.
        </p>

        <div style="border:1px solid #e2e8f0; border-radius:12px; padding:12px; background:#f8fafc; margin-bottom:16px;">
          <div><strong>Order #:</strong> ${order.orderNumber}</div>
          <div><strong>Service:</strong> ${order.serviceType ?? "—"}</div>
          <div><strong>Scheduled:</strong> ${fmtDateTime(serviceDate)}</div>
          <div><strong>Time slot:</strong> ${order.timeSlot ? `${order.timeSlot.startTime} – ${order.timeSlot.endTime} (${order.timeSlot.name})` : "—"
            }</div>
          <div><strong>Collection address:</strong> ${fmtAddr(pickup)}</div>
          <div style="margin-top:16px;">
      <strong>Items:</strong>
      <ul style="padding-left:16px; margin:8px 0;">
        ${order.items
                .map((item: any) => `
                    <li>
                        ${item.name || item.title || "Item"} 
                        ${item.quantity ? `× ${item.quantity}` : ""}
                    </li>`
                )
                .join("")}
      </ul>
    </div>
        </div>

        <p style="margin:0 0 16px;">
          If you have any questions or need to update anything, just reply to help.kxhlogistics@gmail.com.
        </p>

        <p style="margin:0; color:#64748b; font-size:12px;">
         KXH Logistics Ltd<br/>
        </p>
      </div>
    `;

        try {

            await sendEmail({
                to: order.customer.email || "help.kxhlogistics@gmail.com",
                subject: subject,
                html: html
            });

            await prisma.emailLog.create({
                data: {
                    orderId: order.id,
                    type: "DROPOFF",
                    to: email,
                    subject,
                    status: "SENT",
                    provider: "SENDGRID",
                    providerRef: messageId,
                },
            });
        }
        catch (err: any) {
            console.error("send-dropoff error:", err);

            await prisma.emailLog.create({
                data: {
                    orderId: order.id,
                    type: "DROPOFF",
                    to: email,
                    subject,
                    status: "FAILED",
                    provider: "SENDGRID",
                    error: String(err?.message ?? err),
                },
            });
        }

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        console.error("send-dropoff error:", err);

        return NextResponse.json({ error: "Failed to send dropoff email" }, { status: 500 });
    }
}