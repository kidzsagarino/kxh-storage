import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { sendEmail } from "@/app/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function fmtDate(value: any) {
    if (!value) return "—";
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-GB", { dateStyle: "medium" });
}

function fmtAddr(a?: any) {
    if (!a) return "—";
    return [a.line1, a.line2, a.city, a.postalCode, a.country].filter(Boolean).join(", ");
}

export async function POST(req: NextRequest) {
    try {
        const { orderId } = await req.json();
        if (!orderId) return NextResponse.json({ error: "Missing orderId" }, { status: 400 });

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                customer: true,
                addresses: true,
                timeSlot: true,
            },
        });

        if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

        const email = order.customer?.email;
        if (!email) return NextResponse.json({ error: "Customer email missing" }, { status: 400 });

        const updated = await prisma.order.update({
            where: { id: order.id },
            data: { status: "COMPLETED" },
            include: { customer: true }, // keep minimal
        });

        const pickup = order.addresses?.find((a: any) => a.type === "PICKUP");

        const subject = `Service completed — Order #${order.orderNumber}`;

        const html = `
      <div style="font-family: Arial, sans-serif; line-height:1.5; color:#0f172a;">
        <h2 style="margin:0 0 8px;">Your service is completed ✅</h2>
        <p style="margin:0 0 16px;">
          Hi ${order.customer?.fullName ?? ""},<br/>
          We’re confirming that your service has been completed successfully.
        </p>

        <div style="border:1px solid #e2e8f0; border-radius:12px; padding:12px; background:#f8fafc; margin-bottom:16px;">
          <div><strong>Order #:</strong> ${order.orderNumber}</div>
          <div><strong>Service:</strong> ${order.serviceType ?? "—"}</div>
          <div><strong>Date:</strong> ${fmtDate(order.serviceDate)}</div>
          <div><strong>Time slot:</strong> ${order.timeSlot ? `${order.timeSlot.startTime} – ${order.timeSlot.endTime} (${order.timeSlot.name})` : "—"
            }</div>
          <div><strong>Address:</strong> ${fmtAddr(pickup)}</div>
          <div><strong>Status:</strong> COMPLETED</div>
        </div>
        <div style="margin-top:20px; padding:16px; border:1px solid #e2e8f0; border-radius:12px; background:#f8fafc; text-align:center;">
            <p style="margin:0 0 8px; font-size:14px; font-weight:600;">
            ⭐ Enjoyed our service?
            </p>
            <p style="margin:0 0 12px; font-size:13px; color:#475569;">
            We'd really appreciate your feedback on Trustpilot.
            </p>

            <a 
                href="https://uk.trustpilot.com/review/kxhlogistics.co.uk"
                target="_blank"
                style="
                    display:inline-block;
                    padding:10px 16px;
                    background:#00b67a;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:8px;
                    font-size:13px;
                    font-weight:600;
                "
            >
            Leave a review →
            </a>
        </div>

          <p style="margin:0 0 16px;">
          If you have any questions or need to update anything, just reply to help@kxhlogistics.co.uk.
        </p>

        <p style="margin:0; color:#64748b; font-size:12px;">
         KXH Logistics Ltd<br/>
        </p>
      </div>
    `;



        try {
            await sendEmail({
                to: order.customer.email || "help@kxhlogistics.co.uk",
                subject: subject,
                html: html
            });
            await prisma.emailLog.create({
                data: {
                    orderId: order.id,
                    type: "COMPLETED", // or add enum SERVICE_DONE / COMPLETED if you want
                    to: email,
                    subject,
                    status: "SENT",
                    provider: "SENDGRID",
                },
            });
        } catch (err: any) {
            // log failure (still keep order status as completed)
            await prisma.emailLog.create({
                data: {
                    orderId: order.id,
                    type: "COMPLETED",
                    to: email,
                    subject,
                    status: "FAILED",
                    provider: "SENDGRID",
                    error: String(err?.message ?? err),
                },
            });

            return NextResponse.json(
                { error: "Order marked completed, but email failed to send." },
                { status: 500 }
            );
        }

        return NextResponse.json({ ok: true, status: updated.status });
    } catch (err: any) {
        console.error("mark-completed error:", err);
        return NextResponse.json({ error: "Failed to mark completed" }, { status: 500 });
    }
}