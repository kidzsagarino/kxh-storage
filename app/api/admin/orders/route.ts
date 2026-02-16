import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient, OrderStatus, AddressType } from "@prisma/client";
import { processOrderItems } from "@/app/lib/order-service";
import { validateServiceAvailability } from "@/app/lib/validation-service";
import { validateCapacity } from "@/app/lib/capacity-service";
import { generateOrderNumber } from "@/app/lib/order-utils";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customer,
      serviceType,
      items,
      addresses,
      serviceDate,
      timeSlotId,
      discountTierId,
      notes,
      // Moving specific fields
      movingPackageId,
      distanceMiles = 0
    } = body;

    const result = await prisma.$transaction(async (tx) => {
      // 1) Validation
      if (serviceDate) {
        const dateObj = new Date(serviceDate);
        await validateServiceAvailability(tx, serviceType, dateObj);
        if (timeSlotId) {
          await validateCapacity(tx, serviceType, dateObj, timeSlotId);
        }
      }

      let subtotalMinor = 0;
      let discountMinor = 0;
      let totalMinor = 0;
      let mappedItems = [];
      let finalTierId = null;

      if (serviceType === "MOVING") {
        // --- MOVING CALCULATION LOGIC ---

        // Fetch: Item Price + Package Price + Admin Settings for Mileage
        const [movingItemPrice, packagePrice, settings] = await Promise.all([
          tx.movingPackage.findFirst({
            where: { id: items[0].serviceItemId, isActive: true }
          }),
          movingPackageId ? tx.movingPackagePrice.findFirst({
            where: { packageId: movingPackageId, currency: "GBP", isActive: true }
          }) : null,
          tx.adminSettings.findFirst()
        ]);

        const basePrice = 0;
        const packPrice = packagePrice?.priceMinor || 0;
        const mileageRate = settings?.movingPricePerMileMinor || 0;
        const mileageTotal = Math.round(distanceMiles * mileageRate);

        subtotalMinor = basePrice + packPrice + mileageTotal;
        totalMinor = subtotalMinor; // No tiers for moving yet

        mappedItems = [{
          serviceItemId: items[0].serviceItemId,
          name: movingItemPrice?.name || "Moving Service", // Required by schema
          sku: movingItemPrice?.sku || "MOVING-GENERIC",   // Required by schema
          quantity: 1,
          unitPriceMinor: basePrice, // Make sure field name matches schema (unitPriceMinor vs priceAtBookingMinor)
          lineTotalMinor: subtotalMinor,
        }];

      } else {
        // --- STORAGE CALCULATION LOGIC (Existing) ---
        const [dbPrices, discountTiers] = await Promise.all([
          tx.serviceItemPrice.findMany({
            where: {
              serviceItemId: { in: items.map((i: any) => i.serviceItemId) },
              isActive: true,
            },
            include: { serviceItem: true },
          }),
          tx.storageDiscountTier.findMany({
            where: { isActive: true },
            orderBy: { minMonths: "desc" },
          }),
        ]);

        const storageCalc = processOrderItems(items, dbPrices as any, discountTiers, discountTierId);
        mappedItems = storageCalc.mappedItems;
        subtotalMinor = storageCalc.subtotalMonthlyMinor;
        discountMinor = storageCalc.discountMonthlyMinor;
        totalMinor = storageCalc.dueNowMinor;
        finalTierId = storageCalc.finalTierId;
      }

      // 2) Customer Persistence
      const customerEmail = customer.email?.toLowerCase().trim();
      const safeEmail = customerEmail || `draft-${Date.now()}@placeholder.com`;

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

      // 3) Order Creation
      return tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          serviceType,
          status: OrderStatus.QUOTED,

          // Use the Relation API
          customer: {
            connect: { id: dbCustomer.id }
          },

          // Ensure these are Date | null or string | null
          serviceDate: serviceDate ? new Date(serviceDate) : null,
          timeSlotId: timeSlotId || null,
          notes: notes || null,

          // Moving specific
          movingPackageId: movingPackageId || null,
          distanceMiles: distanceMiles || 0,

          // Pricing
          subtotalMinor,
          discountMinor,
          totalMinor,

          // If finalTierId is null, Prisma might prefer 'undefined' 
          // for optional RELATIONS. Let's handle it safely:
          ...(finalTierId ? { storageDiscountTier: { connect: { id: finalTierId } } } : {}),

          items: {
            create: mappedItems,
          },
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
        },
      });
    }, { timeout: 15000 });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("[ORDER_POST_ERROR]", error);
    return NextResponse.json(
      { error: error.message || "Failed to process order" },
      { status: 400 }
    );
  }
}