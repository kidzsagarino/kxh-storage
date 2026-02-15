import { NextResponse } from "next/server";
import { PrismaClient, OrderStatus, AddressType } from "@prisma/client";
import { processOrderItems } from "@/app/lib/order-service";
import { validateServiceAvailability } from "@/app/lib/validation-service";
import { validateCapacity } from "@/app/lib/capacity-service";
import { generateOrderNumber } from "@/app/lib/order-utils";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customer,
      serviceType,
      items,
      addresses,
      serviceDate,
      timeSlotId,
      discountTierId, // selected tier id from UI (optional)
      packingAssistance,
      notes,
    } = body;

    const result = await prisma.$transaction(
      async (tx) => {
        // 1) Availability & Rules Validation
        if (serviceDate) {
          const dateObj = new Date(serviceDate);
          await validateServiceAvailability(tx, serviceType, dateObj);

          // 2) Capacity Validation
          if (timeSlotId) {
            await validateCapacity(tx, serviceType, dateObj, timeSlotId);
          }
        }

        // 3) Data Fetching (Prices & active tiers)
        const [dbPrices, discountTiers] = await Promise.all([
          tx.serviceItemPrice.findMany({
            where: {
              serviceItemId: { in: items.map((i: any) => i.serviceItemId) },
              isActive: true,
            },
            // If you need sku/name from ServiceItem:
            include: { serviceItem: true } as any,
          }),
          tx.storageDiscountTier.findMany({
            where: { isActive: true },
            orderBy: { minMonths: "desc" },
          }),
        ]);

        // 4) Pricing Logic (FIRST MONTH ONLY)
        const {
          mappedItems,
          subtotalMonthlyMinor,
          discountMonthlyMinor,
          dueNowMinor,
          finalTierId,
        } = processOrderItems(items, dbPrices as any, discountTiers, discountTierId);

        // 5) Customer Persistence (upsert)
        const customerEmail = customer.email?.toLowerCase().trim();
        const safeEmail =
          customerEmail && customerEmail !== ""
            ? customerEmail
            : `draft-${Date.now()}@placeholder.com`;

        const dbCustomer = await tx.customer.upsert({
          where: { email: safeEmail },
          update: {
            fullName: customer.fullName || "Valued Customer",
            phone: customer.phone || null,
          },
          create: {
            email: safeEmail,
            fullName: customer.fullName || "Valued Customer",
            phone: customer.phone || null,
          },
        });

        // 6) Order Creation
        return tx.order.create({
          data: {
            orderNumber: generateOrderNumber(),
            serviceType,
            status: OrderStatus.QUOTED,
            customerId: dbCustomer.id,
            serviceDate: serviceDate ? new Date(serviceDate) : null,
            timeSlotId: timeSlotId || null,

            packingAssistance: !!packingAssistance,
            notes: notes || null,

            // ✅ Pricing = first month only
            subtotalMinor: subtotalMonthlyMinor,
            discountMinor: discountMonthlyMinor,
            totalMinor: dueNowMinor,

            discountTierId: finalTierId || null,

            items: { create: mappedItems },
            addresses: {
              create: addresses.map((addr: any) => ({
                type: addr.type as AddressType,
                line1: addr.line1 || "",
                line2: addr.line2 || "",
                city: addr.city || "",
                postalCode: addr.postalCode || "",
                country: addr.country || "GB",
              })),
            },
          },
          include: {
            items: true,
            addresses: true,
            customer: true,
            storageDiscountTier: true,
          },
        });
      },
      { timeout: 10000 }
    );

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("[ORDER_POST_ERROR]", error);
    return NextResponse.json(
      { error: error.message || "Failed to process order" },
      { status: 400 }
    );
  }
}
