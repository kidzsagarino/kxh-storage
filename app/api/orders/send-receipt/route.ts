import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { sendReceipt } from "@/app/lib/order/send-order-receipt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
};

const prisma =
    globalForPrisma.prisma ??
    new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export async function POST(
    req: NextRequest
) {
    try {
        const { paidOrderId } =
            await req.json();

        if (!paidOrderId) {
            return NextResponse.json(
                {
                    ok: false,
                    error: "Missing orderId",
                },
                { status: 400 }
            );
        }

        await sendReceipt(paidOrderId);

    } catch (err: unknown) {
        console.error(
            "[TEST_RECEIPT_ERROR]",
            err
        );

        const message =
            err instanceof Error
                ? err.message
                : String(err);

        return NextResponse.json(
            {
                ok: false,
                error: message,
            },
            { status: 500 }
        );
    }
}