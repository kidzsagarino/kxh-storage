import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { PaymentStatus, OrderStatus } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // apiVersion: "2025-01-27.acacia",
});

export async function POST(req: NextRequest) {
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
                const email = session.customer_details?.email?.trim().toLowerCase();

                const payment = await prisma.payment.findFirst({
                    where: { providerRef: session.id },
                    include: { order: true },
                });

                if (!payment || !email) break;

                const temporaryCustomerId = payment.order.customerId;

                await prisma.$transaction(async (tx) => {
                    // 1. Find the REAL owner of this email
                    const existingCustomer = await tx.customer.findUnique({
                        where: { email },
                        select: { id: true }
                    });

                    let finalCustomerId = temporaryCustomerId;

                    if (existingCustomer) {
                        // 2. The customer exists! Assign the ID to the order
                        finalCustomerId = existingCustomer.id;

                        await tx.order.update({
                            where: { id: payment.orderId },
                            data: { customerId: finalCustomerId },
                        });

                        // 3. Cleanup the temporary guest record if it's no longer used
                        // We do this safely by checking for other orders first
                        const otherOrders = await tx.order.count({
                            where: { customerId: temporaryCustomerId }
                        });

                        if (otherOrders === 0 && temporaryCustomerId !== existingCustomer.id) {
                            await tx.customer.delete({ where: { id: temporaryCustomerId } }).catch(() => { });
                        }
                    } else {
                        // 4. No one owns this email yet. Attach it to the guest we created earlier.
                        await tx.customer.update({
                            where: { id: temporaryCustomerId },
                            data: {
                                email,
                                fullName: session.customer_details?.name || undefined
                            },
                        });
                    }

                    // 5. Finalize payment/order status
                    await tx.payment.update({
                        where: { id: payment.id },
                        data: { status: PaymentStatus.SUCCEEDED },
                    });

                    await tx.order.update({
                        where: { id: payment.orderId },
                        data: { status: OrderStatus.SCHEDULED },
                    });
                });

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
                        data: { status: OrderStatus.SCHEDULED },
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
