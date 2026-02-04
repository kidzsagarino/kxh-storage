import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "@/src/lib/prisma";

type ServiceType = "storage" | "moving" | "shredding";
type TimeSlot = "morning" | "afternoon" | "evening" | ""; // allow "" from UI

type CreateOrderBody = {
  serviceType: ServiceType;

  collectionDate?: string; // YYYY-MM-DD
  timeSlot?: TimeSlot;

  customerDetails?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    postalCode?: string;
  };

  storage?: any;
  moving?: any;
  shredding?: any;

  items: Array<{
    key: string;
    label: string;
    subLabel?: string;
    qty?: number;
    price?: number; // GBP
  }>;

  totalDueNow: number;
  currency?: string;
};

function isISODate(s?: string) {
  return !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

export async function POST(req: NextRequest) {
  let body: CreateOrderBody;

  try {
    body = (await req.json()) as CreateOrderBody;
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  if (!body?.serviceType || !["storage", "moving", "shredding"].includes(body.serviceType)) {
    return NextResponse.json({ message: "Invalid serviceType" }, { status: 400 });
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ message: "items is required" }, { status: 400 });
  }

  if (typeof body.totalDueNow !== "number" || !Number.isFinite(body.totalDueNow) || body.totalDueNow < 0) {
    return NextResponse.json({ message: "Invalid totalDueNow" }, { status: 400 });
  }

  if (body.collectionDate && !isISODate(body.collectionDate)) {
    return NextResponse.json({ message: "collectionDate must be YYYY-MM-DD" }, { status: 400 });
  }

  const slot = body.timeSlot?? null;
  const customer = body.customerDetails ?? {};

  const created = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const order = await tx.order.create({
      data: {
        serviceType: body.serviceType,
        status: "new",

        collectionDate: body.collectionDate ?? null,
        timeSlot: slot as any, // ok if your prisma enum is TimeSlot

        customerName: customer.name?.trim() || null,
        customerEmail: customer.email?.trim() || null,
        customerPhone: customer.phone?.trim() || null,
        customerAddress: customer.address?.trim() || null,
        customerPostalCode: customer.postalCode?.trim() || null,

        currency: body.currency || "GBP",
        totalDueNow: new Decimal(body.totalDueNow.toFixed(2)),

        storageData: body.serviceType === "storage" ? (body.storage ?? {}) : {},
        movingData: body.serviceType === "moving" ? (body.moving ?? {}) : {},
        shreddingData: body.serviceType === "shredding" ? (body.shredding ?? {}) : {},

        items: {
          create: body.items.map((it) => ({
            key: it.key,
            label: it.label,
            subLabel: it.subLabel ?? null,
            qty: typeof it.qty === "number" ? it.qty : null,
            price: typeof it.price === "number" ? new Decimal(it.price.toFixed(2)) : null,
          })),
        },
      },
      select: { id: true, serviceType: true, totalDueNow: true, currency: true },
    });

    return order;
  });

  return NextResponse.json(
    {
      ok: true,
      orderId: created.id,
      serviceType: created.serviceType,
      totalDueNow: created.totalDueNow,
      currency: created.currency,
    },
    { status: 201 }
  );
}
