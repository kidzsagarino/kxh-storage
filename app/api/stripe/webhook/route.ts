import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { PaymentStatus, OrderStatus } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // apiVersion: "2025-01-27.acacia",
});

export async function POST(req: Request) {
    const sig = (await headers()).get("stripe-signature");
    if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

    const rawBody = await req.text();

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        return NextResponse.json({ error: err?.message ?? "Bad signature" }, { status: 400 });
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;

                // Map to your Payment using session.id saved in providerRef
                const payment = await prisma.payment.findFirst({
                    where: { providerRef: session.id },
                    select: { id: true, orderId: true, order: { select: {customerId: true}} },
                });

                const email = session.customer_details?.email ?? null;
                const fullName = session.customer_details?.name ?? null;

                if (!payment) break;

                await prisma.payment.update({
                    where: { id: payment.id },
                    data: { status: PaymentStatus.SUCCEEDED },
                });

                await prisma.order.update({
                    where: { id: payment.orderId },
                    data: { status: OrderStatus.PAID },
                });

                if (email || fullName) {
                    await prisma.customer.update({
                        where: { id: payment.order.customerId },
                        data: {
                            ...(email ? { email } : {}),
                            ...(fullName ? { fullName } : {}),
                        },
                    });
                }
                break;
            }
            case "checkout.session.async_payment_failed": {
                const session = event.data.object as Stripe.Checkout.Session;

                const payment = await prisma.payment.findFirst({
                    where: { providerRef: session.id },
                    select: { id: true },
                });

                if (payment) {
                    await prisma.payment.update({
                        where: { id: payment.id },
                        data: { status: PaymentStatus.FAILED },
                    });
                }
                break;
            }
            case "checkout.session.async_payment_succeeded": {
                const session = event.data.object as Stripe.Checkout.Session;

                const payment = await prisma.payment.findFirst({
                    where: { providerRef: session.id },
                    select: { id: true, orderId: true },
                });

                if (payment) {
                    await prisma.payment.update({
                        where: { id: payment.id },
                        data: { status: PaymentStatus.SUCCEEDED },
                    });

                    await prisma.order.update({
                        where: { id: payment.orderId },
                        data: { status: OrderStatus.PAID },
                    });
                }
                break;
            }

            default:
                break;
        }

        return NextResponse.json({ received: true });
    } catch (err: any) {
        // Stripe retries on non-2xx
        return NextResponse.json({ error: err?.message ?? "Webhook error" }, { status: 500 });
    }
}
