import Stripe from "stripe";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/src/lib/prisma"; // adjust path
import { PaymentProvider, PaymentStatus, OrderStatus } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // apiVersion: "2025-01-27.acacia",
});

type Body = {
    orderId: string;
    mode?: "DEPOSIT" | "FULL";
};

function calcAmountMinor(totalMinor: number, mode: "DEPOSIT" | "FULL") {
    if (!Number.isInteger(totalMinor) || totalMinor <= 0) return 0;
    if (mode === "FULL") return totalMinor;

    // Example deposit rule (edit to your needs):
    // 20% deposit, min £10, max £200
    const raw = Math.round(totalMinor * 0.2);
    return Math.min(20000, Math.max(1000, raw));
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as Body;

        if (!body.orderId) {
            return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
        }

        const mode = body.mode ?? "FULL";

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
            },
        });

        if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

        if (!payableStatuses.includes(order.status as OrderStatus)) {
            return NextResponse.json(
                { error: `Order not payable in status: ${order.status}` },
                { status: 400 }
            );
        }

        const currency = (order.currency ?? "GBP").toLowerCase();
        const amountMinor = calcAmountMinor(order.totalMinor, mode);

        if (amountMinor <= 0) {
            return NextResponse.json({ error: "Invalid order total" }, { status: 400 });
        }

        const existing = await prisma.payment.findFirst({
            where: {
                orderId: order.id,
                provider: PaymentProvider.STRIPE,
                status: PaymentStatus.PROCESSING,
                amountMinor,
                providerRef: { not: null },
            },
            orderBy: { createdAt: "desc" },
        });

        if (existing?.providerRef) {
            const pi = await stripe.paymentIntents.retrieve(existing.providerRef);
            if (pi.client_secret) {
                return NextResponse.json({
                    clientSecret: pi.client_secret,
                    paymentIntentId: pi.id,
                    paymentId: existing.id,
                    amountMinor,
                    currency,
                });
            }
        }

        // ✅ Create new PI
        const pi = await stripe.paymentIntents.create({
            amount: amountMinor,
            currency,
            automatic_payment_methods: { enabled: true },
            metadata: {
                orderId: order.id,
                orderNumber: order.orderNumber,
                mode,
            },
        });

        if (!pi.client_secret) {
            return NextResponse.json({ error: "Missing client secret" }, { status: 500 });
        }

        const payment = await prisma.payment.create({
            data: {
                orderId: order.id,
                provider: PaymentProvider.STRIPE,
                status: PaymentStatus.PROCESSING,
                amountMinor,
                providerRef: pi.id, // ✅ store PI id here
            },
            select: { id: true },
        });

        return NextResponse.json({
            clientSecret: pi.client_secret,
            paymentIntentId: pi.id,
            paymentId: payment.id,
            amountMinor,
            currency,
        });
    } catch (err: any) {
        return NextResponse.json(
            { error: err?.message ?? "Server error" },
            { status: 500 }
        );
    }
}
