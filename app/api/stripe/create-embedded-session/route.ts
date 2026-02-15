import Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { PaymentProvider, PaymentStatus, OrderStatus } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion: "2025-01-27.acacia",
});

type Body = {
  orderId: string;
  mode?: "DEPOSIT" | "FULL"; // keep for now, but DEPOSIT = first month due now
};

function getBaseUrl() {
  const url = process.env.NEXT_PUBLIC_APP_URL;
  if (!url) throw new Error("NEXT_PUBLIC_APP_URL is missing");
  return url.replace(/\/$/, "");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    if (!body.orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const mode = body.mode ?? "DEPOSIT";

    const payableStatuses: OrderStatus[] = [
      OrderStatus.DRAFT,
      OrderStatus.QUOTED,
      OrderStatus.PENDING_PAYMENT,
    ];

    const order = await prisma.order.findUnique({
      where: { id: body.orderId },
      select: {
        id: true,
        orderNumber: true,
        status: true,
        currency: true,
        totalMinor: true, // ✅ should already be "due now (first month)" from your new order logic
      },
    });

    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    if (!payableStatuses.includes(order.status)) {
      return NextResponse.json(
        { error: `Order not payable in status: ${order.status}` },
        { status: 400 }
      );
    }

    const currency = (order.currency ?? "GBP").toLowerCase();

    // ✅ charge first month only (due now)
    // If you later support FULL upfront, you need a separate termTotalMinor value.
    const amountMinor = order.totalMinor;

    if (!Number.isInteger(amountMinor) || amountMinor <= 0) {
      return NextResponse.json({ error: "Invalid order total" }, { status: 400 });
    }

    // ✅ Reuse existing PROCESSING payment (and session) if available
    const existing = await prisma.payment.findFirst({
      where: {
        orderId: order.id,
        provider: PaymentProvider.STRIPE,
        status: PaymentStatus.PROCESSING,
        amountMinor, // ✅ now equals order.totalMinor
        providerRef: { not: null }, // session.id
      },
      orderBy: { createdAt: "desc" },
    });

    if (existing?.providerRef) {
      const session = await stripe.checkout.sessions.retrieve(existing.providerRef);
      if (session.client_secret) {
        return NextResponse.json({
          clientSecret: session.client_secret,
          sessionId: session.id,
          paymentId: existing.id,
          amountMinor,
          currency,
        });
      }
    }

    // Move order to pending payment once a session is created
    if (order.status === OrderStatus.DRAFT || order.status === OrderStatus.QUOTED) {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: OrderStatus.PENDING_PAYMENT },
      });
    }

    const baseUrl = getBaseUrl();

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      redirect_on_completion: "if_required",
      customer_creation: "if_required",
      return_url: `${baseUrl}/payment/success?orderId=${order.id}`,

      line_items: [
        {
          price_data: {
            currency,
            unit_amount: amountMinor, // ✅ first month due now
            product_data: {
              name: `Order ${order.orderNumber}`,
              description: "First month payment", // ✅
            },
          },
          quantity: 1,
        },
      ],

      client_reference_id: order.id,
      metadata: { orderId: order.id, orderNumber: order.orderNumber, mode },
    });

    if (!session.client_secret) {
      return NextResponse.json({ error: "Missing session client secret" }, { status: 500 });
    }

    const payment = await prisma.payment.create({
      data: {
        orderId: order.id,
        provider: PaymentProvider.STRIPE,
        status: PaymentStatus.PROCESSING,
        amountMinor,
        providerRef: session.id,
      },
      select: { id: true },
    });

    return NextResponse.json({
      clientSecret: session.client_secret,
      sessionId: session.id,
      paymentId: payment.id,
      amountMinor,
      currency,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Server error" }, { status: 500 });
  }
}
