import Stripe from "stripe";
import { prisma } from "@/src/lib/prisma";
import { PaymentStatus, OrderStatus, ServiceType } from "@prisma/client";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
});

function addMonthsUTC(date: Date, months: number) {
    const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    d.setUTCMonth(d.getUTCMonth() + months);
    return d;
}

type InvoiceWithSubscription = Stripe.Invoice & {
    subscription?: string | { id: string } | Stripe.Subscription | null;
};

function getInvoiceSubscriptionId(invoice: Stripe.Invoice): string | null {
    const sub = (invoice as InvoiceWithSubscription).subscription;
    if (!sub) return null;
    return typeof sub === "string" ? sub : sub.id ?? null;
}

function unixToDateOrNull(ts?: number | null) {
    return ts ? new Date(ts * 1000) : null;
}

async function upsertSubscriptionInvoice(invoice: Stripe.Invoice) {
    const stripeInvoiceId = invoice.id;
    const stripeSubscriptionId = getInvoiceSubscriptionId(invoice);

    let customer = null as null | { id: string };

    if (stripeSubscriptionId) {
        customer = await prisma.customer.findFirst({
            where: { stripeSubscriptionId },
            select: { id: true },
        });
    }

    if (!customer) {
        const email =
            invoice.customer_email?.trim().toLowerCase() ||
            (invoice as any).customer_details?.email?.trim().toLowerCase() ||
            null;

        if (email) {
            customer = await prisma.customer.findFirst({
                where: { email },
                select: { id: true },
            });
        }
    }

    if (!customer) return;

    const firstLine = invoice.lines?.data?.[0];
    const periodStart = unixToDateOrNull(firstLine?.period?.start ?? null);
    const periodEnd = unixToDateOrNull(firstLine?.period?.end ?? null);

    await prisma.subscriptionInvoice.upsert({
        where: { stripeInvoiceId },
        create: {
            customerId: customer.id,
            stripeInvoiceId,
            stripeSubscriptionId: stripeSubscriptionId ?? undefined,
            status: invoice.status ?? "unknown",
            currency: (invoice.currency ?? "gbp").toUpperCase(),

            amountDueMinor: invoice.amount_due ?? 0,
            amountPaidMinor: invoice.amount_paid ?? 0,
            amountRemainingMinor: invoice.amount_remaining ?? 0,

            hostedInvoiceUrl: invoice.hosted_invoice_url ?? undefined,
            invoicePdf: invoice.invoice_pdf ?? undefined,
            number: invoice.number ?? undefined,
            billingReason: invoice.billing_reason ?? undefined,

            periodStart: periodStart ?? undefined,
            periodEnd: periodEnd ?? undefined,
        },
        update: {
            stripeSubscriptionId: stripeSubscriptionId ?? undefined,
            status: invoice.status ?? "unknown",
            currency: (invoice.currency ?? "gbp").toUpperCase(),

            amountDueMinor: invoice.amount_due ?? 0,
            amountPaidMinor: invoice.amount_paid ?? 0,
            amountRemainingMinor: invoice.amount_remaining ?? 0,

            hostedInvoiceUrl: invoice.hosted_invoice_url ?? undefined,
            invoicePdf: invoice.invoice_pdf ?? undefined,
            number: invoice.number ?? undefined,
            billingReason: invoice.billing_reason ?? undefined,

            periodStart: periodStart ?? undefined,
            periodEnd: periodEnd ?? undefined,
        },
    });
}
async function updateOrderBillingFromSubscription(subscriptionId: string) {
    const sub = await stripe.subscriptions.retrieve(subscriptionId);

    const item = sub.items.data[0];
    const nextBillingAt = new Date(item.current_period_end * 1000);

    await prisma.order.updateMany({
        where: { stripeSubscriptionId: subscriptionId },
        data: {
            subscriptionStatus: sub.status,
            nextBillingAt: nextBillingAt,
            cancelAt: sub.cancel_at ? new Date(sub.cancel_at * 1000) : null,
        },
    });
}

export async function POST(req: Request) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) return new Response("Missing stripe-signature", { status: 400 });

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch {
        return new Response("Webhook Error", { status: 400 });
    }

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;

            const stripeCustomerId =
                typeof session.customer === "string"
                    ? session.customer
                    : session.customer?.id ?? null;

            const email =
                session.customer_details?.email?.trim().toLowerCase() ||
                session.customer_email?.trim().toLowerCase() ||
                null;

            const payment = await prisma.payment.findFirst({
                where: { providerRef: session.id },
                include: { order: true },
            });

            if (!payment) break;
            if (payment.status === PaymentStatus.SUCCEEDED) break;

            const serviceType = (session.metadata?.serviceType ||
                payment.order.serviceType) as ServiceType;

            const stripeSubscriptionId =
                typeof session.subscription === "string"
                    ? session.subscription
                    : session.subscription?.id ?? null;

            const months = Number(session.metadata?.months || "0");
            const temporaryCustomerId = payment.order.customerId;

            const { finalCustomerId } = await prisma.$transaction(async (tx) => {
                let finalCustomerId = temporaryCustomerId;

                if (email) {
                    const existingCustomer = await tx.customer.findUnique({
                        where: { email },
                        select: { id: true },
                    });

                    if (existingCustomer) {
                        finalCustomerId = existingCustomer.id;

                        await tx.order.update({
                            where: { id: payment.orderId },
                            data: { customerId: finalCustomerId },
                        });

                        await tx.customer.update({
                            where: { id: finalCustomerId },
                            data: {
                                email,
                                fullName: session.customer_details?.name || undefined,
                            },
                        });

                        const otherOrders = await tx.order.count({
                            where: { customerId: temporaryCustomerId },
                        });

                        if (otherOrders === 0 && temporaryCustomerId !== existingCustomer.id) {
                            await tx.customer.delete({ where: { id: temporaryCustomerId } }).catch(() => { });
                        }
                    } else {
                        await tx.customer.update({
                            where: { id: temporaryCustomerId },
                            data: {
                                email,
                                fullName: session.customer_details?.name || undefined,
                            },
                        });
                    }
                } else {
                    const name = session.customer_details?.name;
                    if (name) {
                        await tx.customer
                            .update({
                                where: { id: temporaryCustomerId },
                                data: { fullName: name },
                            })
                            .catch(() => { });
                    }
                }

                if (stripeCustomerId) {
                    await tx.customer.update({
                        where: { id: finalCustomerId },
                        data: { stripeCustomerId },
                    });
                }

                await tx.payment.update({
                    where: { id: payment.id },
                    data: { status: PaymentStatus.SUCCEEDED },
                });

                await tx.order.update({
                    where: { id: payment.orderId },
                    data: { status: OrderStatus.SCHEDULED },
                });

                if (serviceType === "STORAGE" && stripeSubscriptionId) {
                    await tx.customer.update({
                        where: { id: finalCustomerId },
                        data: {
                            stripeSubscriptionId,
                            subscriptionStatus: "active",
                        },
                    });

                    await tx.order.update({
                        where: { id: payment.orderId },
                        data: {
                            stripeSubscriptionId,
                            subscriptionStatus: "active",
                        },
                    });
                }

                return { finalCustomerId };
            });
            if (serviceType === "STORAGE" && stripeSubscriptionId) {
                if (Number.isInteger(months) && months > 0) {
                    const cancelAtTs = Math.floor(addMonthsUTC(new Date(), months).getTime() / 1000);
                    const sub0 = await stripe.subscriptions.retrieve(stripeSubscriptionId);
                    if (!sub0.cancel_at) {
                        await stripe.subscriptions.update(stripeSubscriptionId, { cancel_at: cancelAtTs });
                    }
                }

                const sub = await stripe.subscriptions.retrieve(stripeSubscriptionId);

                const item = sub.items.data[0];
                const nextBillingAt = new Date(item.current_period_end * 1000);

                await prisma.order.update({
                    where: { id: payment.orderId },
                    data: {
                        subscriptionStatus: sub.status,
                        nextBillingAt: nextBillingAt,
                        cancelAt: sub.cancel_at ? new Date(sub.cancel_at * 1000) : null,
                    },
                });

                if (stripeCustomerId && email) {
                    await stripe.customers
                        .update(stripeCustomerId, {
                            email,
                            name: session.customer_details?.name || undefined,
                        })
                        .catch(() => { });
                }
            }

            break;
        }
        case "invoice.finalized":
        case "invoice.paid":
        case "invoice.payment_failed":
        case "invoice.voided": {
            const invoice = event.data.object as Stripe.Invoice;

            await upsertSubscriptionInvoice(invoice);

            const subscriptionId = getInvoiceSubscriptionId(invoice);
            if (subscriptionId) {
                await updateOrderBillingFromSubscription(subscriptionId);
            }

            if (event.type === "invoice.payment_failed" && subscriptionId) {
                await prisma.order.updateMany({
                    where: { stripeSubscriptionId: subscriptionId },
                    data: { subscriptionStatus: "past_due" },
                });
            }

            break;
        }

        case "customer.subscription.deleted": {
            const sub = event.data.object as Stripe.Subscription;

            await prisma.customer.updateMany({
                where: { stripeSubscriptionId: sub.id },
                data: { subscriptionStatus: "canceled" },
            });
            await prisma.order.updateMany({
                where: { stripeSubscriptionId: sub.id },
                data: {
                    subscriptionStatus: "canceled",
                    nextBillingAt: null,
                    cancelAt: sub.ended_at ? new Date(sub.ended_at * 1000) : new Date(),
                },
            });

            break;
        }
    }

    return new Response("ok", { status: 200 });
}