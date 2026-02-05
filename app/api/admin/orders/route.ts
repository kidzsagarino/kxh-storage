import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderStatus, ServiceType } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TimeSlotOption = {
  id: string; // TimeSlot.id from DB
};

type CreateOrderBody = {
  serviceType: "storage" | "moving" | "shredding";

  serviceDate?: string; // YYYY-MM-DD
  timeSlot?: TimeSlotOption | "";

  customerDetails: {
    fullName: string;
    email?: string;
    phone?: string;
  };

  items: Array<{
    name: string;
    quantity?: number;
    unitPriceMinor: number;
  }>;

  totalMinor: number;
  currency?: string;
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as CreateOrderBody;

  // ---- map serviceType (UI → Prisma enum) ----
  const serviceTypeMap: Record<CreateOrderBody["serviceType"], ServiceType> = {
    storage: ServiceType.STORAGE,
    moving: ServiceType.MOVING,
    shredding: ServiceType.SHREDDING,
  };

  const serviceType = serviceTypeMap[body.serviceType];
  if (!serviceType) {
    return NextResponse.json({ message: "Invalid serviceType" }, { status: 400 });
  }

  // ---- normalize timeSlotId ----
  const timeSlotId =
    body.timeSlot? body.timeSlot.id : null;

  // ---- customer (required) ----
  const customer = await prisma.customer.upsert({
    where: { email: body.customerDetails.email ?? undefined },
    create: {
      email: body.customerDetails.email,
      phone: body.customerDetails.phone,
      fullName: body.customerDetails.fullName,
    },
    update: {
      phone: body.customerDetails.phone ?? undefined,
      fullName: body.customerDetails.fullName,
    },
    select: { id: true },
  });

  // ---- create order ----
  const order = await prisma.order.create({
    data: {
      orderNumber: crypto.randomUUID(),

      serviceType,
      status: OrderStatus.PENDING_PAYMENT,

      customerId: customer.id,

      serviceDate: body.serviceDate
        ? new Date(body.serviceDate)
        : null,

      timeSlotId,

      currency: body.currency ?? "GBP",
      totalMinor: body.totalMinor,

      items: {
        create: body.items.map((it) => ({
          name: it.name,
          quantity: it.quantity ?? 1,
          unitPriceMinor: it.unitPriceMinor,
          lineTotalMinor:
            (it.quantity ?? 1) * it.unitPriceMinor,
        })),
      },
    },
    select: {
      id: true,
      orderNumber: true,
      serviceType: true,
      status: true,
      totalMinor: true,
      currency: true,
    },
  });

  return NextResponse.json({ ok: true, order }, { status: 201 });
}
