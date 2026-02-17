import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient, OrderStatus, AddressType, CatalogItemId, MovingPackageId } from "@prisma/client";
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
            items = [],
            addresses = [],
            serviceDate,
            timeSlotId,
            discountTierId,
            notes,
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
            let mappedItems: any[] = [];
            let finalTierId: string | null = null;

            if (serviceType === "MOVING") {
                // Find the Move Item (e.g., two-bedroom-flat)
                const moveItemId = items[0]?.serviceItemId as CatalogItemId;
                
                const [movingItem, packagePrice, settings] = await Promise.all([
                    tx.serviceItem.findUnique({
                        where: { id: moveItemId },
                        include: { prices: { where: { currency: "GBP", isActive: true } } }
                    }),
                    movingPackageId ? tx.movingPackagePrice.findUnique({
                        where: { packageId_currency: { packageId: movingPackageId as MovingPackageId, currency: "GBP" } }
                    }) : null,
                    tx.adminSettings.findFirst()
                ]);

                const itemBase = movingItem?.prices[0]?.unitPriceMinor || 0;
                const packBase = packagePrice?.priceMinor || 0;
                const mileRate = settings?.movingPricePerMileMinor || 0;
                const mileageTotal = Math.round((Number(distanceMiles) || 0) * mileRate);

                subtotalMinor = itemBase + packBase + mileageTotal;
                totalMinor = subtotalMinor;

                mappedItems = [{
                    serviceItemId: moveItemId,
                    name: movingItem?.name || "Moving Service",
                    sku: movingItem?.sku || "MOVE-GENERIC",
                    quantity: 1,
                    unitPriceMinor: itemBase,
                    lineTotalMinor: itemBase, 
                }];
            } else if(serviceType === "STORAGE") {
                // --- STORAGE CALCULATION ---
                const [dbPrices, discountTiers] = await Promise.all([
                    tx.serviceItemPrice.findMany({
                        where: {
                            serviceItemId: { in: items.map((i: any) => i.serviceItemId as CatalogItemId) },
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

            } else if(serviceType === "SHREDDING") {
                
                const [dbPrices, settings] = await Promise.all([
                     tx.serviceItemPrice.findMany({
                        where: {
                            serviceItemId: { in: items.map((i: any) => i.serviceItemId as CatalogItemId) },
                            isActive: true,
                        },
                        include: { serviceItem: true },
                    }),
                   
                    tx.adminSettings.findFirst()
                ]);


                const storageCalc = processOrderItems(items, dbPrices as any, null, discountTierId);
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
            
            console.log(addresses);
            // 3) Order Creation
            return tx.order.create({
                data: {
                    orderNumber: generateOrderNumber(),
                    serviceType,
                    status: OrderStatus.QUOTED,
                    customerId: dbCustomer.id, // Direct ID assignment
                    serviceDate: serviceDate ? new Date(serviceDate) : null,
                    timeSlotId: timeSlotId || null,
                    notes: notes || null,
                    
                    // Logic for required Enum field movingPackageId
                    movingPackageId: (movingPackageId as MovingPackageId) || MovingPackageId.basic_package,
                    distanceMiles: Number(distanceMiles) || 0,

                    subtotalMinor: Math.floor(subtotalMinor),
                    discountMinor: Math.floor(discountMinor),
                    totalMinor: Math.floor(totalMinor),
                    discountTierId: finalTierId,

                    items: {
                        create: mappedItems.map(item => ({
                            serviceItemId: item.serviceItemId,
                            sku: item.sku,
                            name: item.name,
                            quantity: item.quantity,
                            unitPriceMinor: item.unitPriceMinor,
                            lineTotalMinor: item.lineTotalMinor,
                            months: item.months || null
                        }))
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