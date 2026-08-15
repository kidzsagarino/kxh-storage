// app/lib/billing/billing-webhook.ts

import Stripe from "stripe";

import {
    BillingScheduleStatus,
    PaymentProvider,
    PaymentStatus,
} from "@prisma/client";

import {
    sendBillingReceipt,
} from "@/app/lib/billing/send-billing-receipt";

import { prisma } from "@/src/lib/prisma";


/**
 * Handles a successfully paid storage billing installment.
 */
async function handleBillingPaid(
    stripeEventId: string,
    session: Stripe.Checkout.Session
) {
    const billingScheduleId =
        session.metadata?.billingScheduleId;

    const orderId =
        session.metadata?.orderId;

    if (!billingScheduleId) {
        throw new Error(
            "Missing billingScheduleId in Stripe metadata"
        );
    }

    const paymentIntentId =
        typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id ?? null;

    const newlyPaid =
        await prisma.$transaction(
            async (tx) => {
                /*
                 * Prevent the exact same Stripe event
                 * from being processed twice.
                 */
                const existingEvent =
                    await tx.stripeEvent.findUnique({
                        where: {
                            id: stripeEventId,
                        },
                    });

                if (existingEvent) {
                    return false;
                }

                /*
                 * Load the exact billing installment.
                 */
                const schedule =
                    await tx.orderBillingSchedule.findUnique({
                        where: {
                            id: billingScheduleId,
                        },
                    });

                if (!schedule) {
                    throw new Error(
                        `Billing schedule not found: ${billingScheduleId}`
                    );
                }

                /*
                 * Validate that Stripe metadata points
                 * to the correct order.
                 */
                if (
                    orderId &&
                    schedule.orderId !== orderId
                ) {
                    throw new Error(
                        `Billing schedule/order mismatch. ` +
                        `Schedule ${schedule.id} belongs to ` +
                        `${schedule.orderId}, received ${orderId}`
                    );
                }

                /*
                 * The installment was already paid.
                 *
                 * Record this Stripe event, but do not
                 * send another receipt.
                 */
                if (
                    schedule.status ===
                    BillingScheduleStatus.PAID
                ) {
                    await tx.stripeEvent.create({
                        data: {
                            id: stripeEventId,
                        },
                    });

                    return false;
                }

                /*
                 * Never accept payment against
                 * a cancelled installment.
                 */
                if (
                    schedule.status ===
                    BillingScheduleStatus.CANCELED
                ) {
                    throw new Error(
                        `Cannot pay canceled billing schedule: ${schedule.id}`
                    );
                }

                /*
                 * Save/update the Stripe payment.
                 */
                await tx.payment.upsert({
                    where: {
                        providerRef: session.id,
                    },

                    create: {
                        orderId:
                            schedule.orderId,

                        billingScheduleId:
                            schedule.id,

                        provider:
                            PaymentProvider.STRIPE,

                        status:
                            PaymentStatus.SUCCEEDED,

                        amountMinor:
                            schedule.amountMinor,

                        providerRef:
                            session.id,

                        paymentIntentId,
                    },

                    update: {
                        billingScheduleId:
                            schedule.id,

                        status:
                            PaymentStatus.SUCCEEDED,

                        paymentIntentId,
                    },
                });

                /*
                 * Mark ONLY this installment as paid.
                 */
                await tx.orderBillingSchedule.update({
                    where: {
                        id: schedule.id,
                    },

                    data: {
                        status:
                            BillingScheduleStatus.PAID,

                        paidAt:
                            new Date(),

                        stripeCheckoutSessionId:
                            session.id,

                        stripePaymentIntentId:
                            paymentIntentId,
                    },
                });

                /*
                 * Record the Stripe event last.
                 */
                await tx.stripeEvent.create({
                    data: {
                        id: stripeEventId,
                    },
                });

                /*
                 * This invocation actually changed
                 * the billing installment to PAID.
                 */
                return true;
            }
        );

    /*
     * Only send the receipt the first time
     * the installment becomes PAID.
     */
    if (!newlyPaid) {
        return;
    }

    try {
        await sendBillingReceipt(
            billingScheduleId
        );
    } catch (error) {
        /*
         * Do not throw.
         *
         * The payment has already been recorded
         * successfully. A receipt-email failure
         * must not cause Stripe to retry the
         * successful payment processing.
         */
        console.error(
            "[STORAGE_BILLING_RECEIPT_FAILED]",
            {
                billingScheduleId,
                stripeEventId,
                error,
            }
        );
    }
}

/**
 * Handles an asynchronous payment failure.
 */
async function handleBillingFailed(
    stripeEventId: string,
    session: Stripe.Checkout.Session
) {
    const billingScheduleId =
        session.metadata?.billingScheduleId;

    const orderId =
        session.metadata?.orderId;

    if (!billingScheduleId) {
        console.error(
            "[STORAGE_BILLING] Missing billingScheduleId on failed payment",
            session.id
        );

        return;
    }

    await prisma.$transaction(async (tx) => {
        /*
         * Idempotency check.
         */
        const existingEvent =
            await tx.stripeEvent.findUnique({
                where: {
                    id: stripeEventId,
                },
            });

        if (existingEvent) {
            return;
        }

        const schedule =
            await tx.orderBillingSchedule.findUnique({
                where: {
                    id: billingScheduleId,
                },
            });

        if (!schedule) {
            throw new Error(
                `Billing schedule not found: ${billingScheduleId}`
            );
        }

        /*
         * Validate order association.
         */
        if (
            orderId &&
            schedule.orderId !== orderId
        ) {
            throw new Error(
                "Billing schedule/order mismatch"
            );
        }

        /*
         * Never overwrite a successful payment.
         */
        if (
            schedule.status !==
            BillingScheduleStatus.PAID
        ) {
            await tx.orderBillingSchedule.update({
                where: {
                    id: schedule.id,
                },

                data: {
                    status:
                        BillingScheduleStatus.OVERDUE,
                },
            });
        }

        await tx.stripeEvent.create({
            data: {
                id: stripeEventId,
            },
        });
    });
}


/**
 * Handles expired Stripe Checkout Sessions.
 *
 * The installment itself is NOT cancelled.
 * We simply clear the old Stripe session so
 * another payment session can be generated.
 */
async function handleBillingExpired(
    stripeEventId: string,
    session: Stripe.Checkout.Session
) {
    const billingScheduleId =
        session.metadata?.billingScheduleId;

    const orderId =
        session.metadata?.orderId;

    if (!billingScheduleId) {
        console.error(
            "[STORAGE_BILLING] Missing billingScheduleId on expired Checkout Session",
            session.id
        );

        return;
    }

    await prisma.$transaction(async (tx) => {
        /*
         * Idempotency.
         */
        const existingEvent =
            await tx.stripeEvent.findUnique({
                where: {
                    id: stripeEventId,
                },
            });

        if (existingEvent) {
            return;
        }

        const schedule =
            await tx.orderBillingSchedule.findUnique({
                where: {
                    id: billingScheduleId,
                },
            });

        if (!schedule) {
            /*
             * Still record the Stripe event.
             *
             * We don't want Stripe retrying forever
             * for a schedule that no longer exists.
             */
            await tx.stripeEvent.create({
                data: {
                    id: stripeEventId,
                },
            });

            return;
        }

        /*
         * Validate order association.
         */
        if (
            orderId &&
            schedule.orderId !== orderId
        ) {
            throw new Error(
                "Billing schedule/order mismatch"
            );
        }

        /*
         * Don't change an installment
         * that has already been paid.
         */
        if (
            schedule.status !==
            BillingScheduleStatus.PAID
        ) {
            const now =
                new Date();

            const isOverdue =
                schedule.dueDate < now;

            await tx.orderBillingSchedule.update({
                where: {
                    id: schedule.id,
                },

                data: {
                    status:
                        isOverdue
                            ? BillingScheduleStatus.OVERDUE
                            : BillingScheduleStatus.SCHEDULED,

                    /*
                     * Remove the expired Stripe references.
                     *
                     * Admin/customer can now create
                     * a brand-new Checkout Session.
                     */
                    stripeCheckoutSessionId:
                        null,

                    stripePaymentIntentId:
                        null,
                },
            });
        }

        await tx.stripeEvent.create({
            data: {
                id: stripeEventId,
            },
        });
    });
}


/**
 * Main entry point used by the primary Stripe webhook.
 *
 * Only STORAGE_BILLING Stripe events should be
 * delegated to this function.
 */
export async function handleStorageBillingWebhook(
    event: Stripe.Event
) {
    switch (event.type) {
        /*
         * Standard successful Stripe Checkout.
         */
        case "checkout.session.completed": {
            const session =
                event.data.object as Stripe.Checkout.Session;

            /*
             * Checkout completion does not always
             * mean payment is complete.
             */
            if (
                session.payment_status !== "paid"
            ) {
                console.log(
                    "[STORAGE_BILLING] Checkout completed but payment is not yet paid:",
                    session.id,
                    session.payment_status
                );

                return;
            }

            await handleBillingPaid(
                event.id,
                session
            );

            return;
        }


        /*
         * Used by asynchronous payment methods.
         */
        case "checkout.session.async_payment_succeeded": {
            const session =
                event.data.object as Stripe.Checkout.Session;

            await handleBillingPaid(
                event.id,
                session
            );

            return;
        }


        /*
         * Asynchronous payment failed.
         */
        case "checkout.session.async_payment_failed": {
            const session =
                event.data.object as Stripe.Checkout.Session;

            await handleBillingFailed(
                event.id,
                session
            );

            return;
        }


        /*
         * Customer never completed payment and
         * Stripe Checkout Session expired.
         */
        case "checkout.session.expired": {
            const session =
                event.data.object as Stripe.Checkout.Session;

            await handleBillingExpired(
                event.id,
                session
            );

            return;
        }


        default: {
            console.log(
                `[STORAGE_BILLING] Unhandled event: ${event.type}`
            );

            return;
        }
    }
}