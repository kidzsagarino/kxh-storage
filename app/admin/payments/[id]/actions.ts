"use server";

import { prisma } from "@/src/lib/prisma";
import Stripe from "stripe";

export async function getPaymentById(id: string) {
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: {
      order: {
        include: {
          customer: true,
        },
      },
    },
  });

  if (!payment) return null;

  return {
    id: payment.id,
    orderId: payment.orderId,
    serviceType: payment.order.serviceType.toLowerCase(),
    status: payment.status.toLowerCase(),
    amount: payment.amountMinor / 100,
    currency: "GBP",
    method: payment.provider.toLowerCase(),

    stripeSessionId: payment.providerRef ?? "",
    stripePaymentIntentId: payment.paymentIntentId ?? "",

    customer: {
      name: payment.order.customer?.fullName ?? "—",
      email: payment.order.customer?.email ?? "—",
      phone: payment.order.customer?.phone ?? "",
    },

    createdAt: payment.createdAt.toISOString(),
    updatedAt: payment.updatedAt?.toISOString(),
    notes: "",
  };
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function refundPayment(
  paymentId: string,
  payload: { amount: number; reason: string; note?: string }
) {

  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
  });

  if (!payment) throw new Error("Payment not found");

  if (!payment.paymentIntentId)
    throw new Error("Missing Stripe payment intent");

  await stripe.refunds.create({
    payment_intent: payment.paymentIntentId,
    amount: Math.round(payload.amount * 100), // convert GBP to pence
    reason: payload.reason as Stripe.RefundCreateParams.Reason,
  });

  return { success: true };
}