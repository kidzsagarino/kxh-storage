import Stripe from "stripe";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { PaymentProvider, PaymentStatus, OrderStatus } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  //apiVersion: "2026-01-28.clover",
});

type Body = {
  orderId?: string;
  billingScheduleId?: string;

  mode?:
  | "DEPOSIT"
  | "FULL"
  | "STORAGE_BILLING";
}

function getBaseUrl() {
  const url = process.env.NEXT_PUBLIC_APP_URL;
  if (!url) throw new Error("NEXT_PUBLIC_APP_URL is missing");
  return url.replace(/\/$/, "");
}

// ✅ Dynamic recurring monthly price (simple version; consider caching later)
async function getOrCreateStorageMonthlyPriceId(params: {
  currency: string; // "gbp"
  unitAmountMinor: number;
}) {
  const productId = process.env.STRIPE_STORAGE_PRODUCT_ID;
  if (!productId) throw new Error("STRIPE_STORAGE_PRODUCT_ID is missing");

  const price = await stripe.prices.create({
    currency: params.currency,
    unit_amount: params.unitAmountMinor,
    recurring: { interval: "month" },
    product: productId,
    nickname: `Storage ${(params.unitAmountMinor / 100).toFixed(2)}/mo`,
  });

  return price.id;
}

async function createStorageBillingSession(
  billingScheduleId: string
) {
  const schedule =
    await prisma.orderBillingSchedule.findUnique({
      where: {
        id: billingScheduleId,
      },

      include: {
        order: {
          include: {
            customer: true,
          },
        },
      },
    });

  if (!schedule) {
    return NextResponse.json(
      {
        error:
          "Billing schedule not found",
      },
      {
        status: 404,
      }
    );
  }

  if (schedule.status === "PAID") {
    return NextResponse.json(
      {
        error:
          "This installment has already been paid",
      },
      {
        status: 400,
      }
    );
  }

  if (schedule.status === "CANCELED") {
    return NextResponse.json(
      {
        error:
          "This installment has been canceled",
      },
      {
        status: 400,
      }
    );
  }

  const order =
    schedule.order;

  const currency =
    (
      order.currency ??
      "GBP"
    ).toLowerCase();

  const baseUrl =
    getBaseUrl();

  /*
   * Reuse an existing open Checkout Session,
   * but ONLY for this billing schedule.
   */
  if (
    schedule.stripeCheckoutSessionId
  ) {
    try {
      const existingSession =
        await stripe.checkout.sessions.retrieve(
          schedule
            .stripeCheckoutSessionId
        );

      if (
        existingSession.status ===
        "open" &&
        existingSession.client_secret
      ) {
        return NextResponse.json({
          clientSecret:
            existingSession.client_secret,

          sessionId:
            existingSession.id,

          billingScheduleId:
            schedule.id,

          orderId:
            schedule.orderId,

          currency,
        });
      }
    } catch {
      /*
       * Old or invalid Stripe session.
       * Create a fresh one below.
       */
    }
  }

  const session =
    await stripe.checkout.sessions.create({
      ui_mode: "embedded",

      mode: "payment",

      redirect_on_completion:
        "if_required",

      return_url:
        `${baseUrl}/billing/success` +
        `?billingScheduleId=${schedule.id}`,

      customer_email:
        order.customer.email ??
        undefined,

      line_items: [
        {
          price_data: {
            currency,

            unit_amount:
              schedule.amountMinor,

            product_data: {
              name:
                `KXH Storage - Month ${schedule.installmentNumber}`,

              description:
                `Storage installment ${schedule.installmentNumber}`,
            },
          },

          quantity: 1,
        },
      ],

      client_reference_id:
        schedule.id,

      metadata: {
        paymentType:
          "STORAGE_BILLING",

        billingScheduleId:
          schedule.id,

        orderId:
          schedule.orderId,

        installmentNumber:
          String(
            schedule
              .installmentNumber
          ),
      },

      payment_intent_data: {
        metadata: {
          paymentType:
            "STORAGE_BILLING",

          billingScheduleId:
            schedule.id,

          orderId:
            schedule.orderId,
        },
      },
    });

  if (!session.client_secret) {
    return NextResponse.json(
      {
        error:
          "Missing session client secret",
      },
      {
        status: 500,
      }
    );
  }

  await prisma.orderBillingSchedule.update({
    where: {
      id: schedule.id,
    },

    data: {
      status:
        "PAYMENT_PENDING",

      stripeCheckoutSessionId:
        session.id,
    },
  });

  return NextResponse.json({
    clientSecret:
      session.client_secret,

    sessionId:
      session.id,

    billingScheduleId:
      schedule.id,

    orderId:
      schedule.orderId,

    currency,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;

    if (body.mode === "STORAGE_BILLING") {
      if (!body.billingScheduleId) {
        return NextResponse.json(
          {
            error:
              "Missing billingScheduleId",
          },
          {
            status: 400,
          }
        );
      }

      return createStorageBillingSession(
        body.billingScheduleId
      );
    }

    if (!body.orderId) {
      return NextResponse.json(
        {
          error: "Missing orderId",
        },
        {
          status: 400,
        }
      );
    }

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
        totalMinor: true,
        serviceType: true,
        customer: {
          select: {
            id: true,
            email: true,
            fullName: true,
            stripeCustomerId: true, // ✅ add this field in Prisma
          },
        },
        storageDiscountTier: true, // has minMonths
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
    const baseUrl = getBaseUrl();
    const mode = body.mode ?? "DEPOSIT";

    // ✅ Reuse existing PROCESSING payment/session if available
    const existing = await prisma.payment.findFirst({
      where: {
        orderId: order.id,
        provider: PaymentProvider.STRIPE,
        status: PaymentStatus.PROCESSING,
        providerRef: { not: null },
      },
      orderBy: { createdAt: "desc" },
    });

    if (existing?.providerRef) {
      const s = await stripe.checkout.sessions.retrieve(existing.providerRef);
      if (s.client_secret) {
        return NextResponse.json({
          clientSecret: s.client_secret,
          sessionId: s.id,
          paymentId: existing.id,
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

    let session: Stripe.Checkout.Session;

    const amountMinor = order.totalMinor;

    if (!Number.isInteger(amountMinor) || amountMinor < 0) {
      return NextResponse.json({ error: "Invalid order total" }, { status: 400 });
    }

    session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      redirect_on_completion: "if_required",
      customer_creation: "if_required",
      return_url: `${baseUrl}/payment/success?orderId=${order.id}`,

      line_items: [
        {
          price_data: {
            currency,
            unit_amount: amountMinor,
            product_data: {
              name: `Order ${order.orderNumber}`,
              description:
                order.serviceType === "MOVING"
                  ? "Moving service payment"
                  : order.serviceType === "STORAGE"
                    ? "Storage service payment"
                    : "Shredding service payment",
            },
          },
          quantity: 1,
        },
      ],

      client_reference_id: order.id,
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        serviceType: order.serviceType,
        mode,
      },
    });

    if (!session.client_secret) {
      return NextResponse.json({ error: "Missing session client secret" }, { status: 500 });
    }

    const payment = await prisma.payment.create({
      data: {
        orderId: order.id,
        provider: PaymentProvider.STRIPE,
        status: PaymentStatus.PROCESSING,
        amountMinor: order.totalMinor,
        providerRef: session.id,
      },
      select: { id: true },
    });

    return NextResponse.json({
      clientSecret: session.client_secret,
      sessionId: session.id,
      paymentId: payment.id,
      currency,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Server error" }, { status: 500 });
  }
}