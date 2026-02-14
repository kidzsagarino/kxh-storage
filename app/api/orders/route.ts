import { NextResponse } from 'next/server';
import { PrismaClient, OrderStatus, AddressType } from '@prisma/client';
import { processOrderItems } from '@/app/lib/order-service';
import { validateServiceAvailability } from '@/app/lib/validation-service';
import { validateCapacity } from '@/app/lib/capacity-service';
import { generateOrderNumber } from '@/app/lib/order-utils';

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
            discountTierId, // Updated from generic discountId
            packingAssistance,
            notes 
        } = body;

        const result = await prisma.$transaction(async (tx) => {
            // 1. Availability & Rules Validation
            if (serviceDate) {
                const dateObj = new Date(serviceDate);
                await validateServiceAvailability(tx, serviceType, dateObj);

                // 2. Capacity Validation
                if (timeSlotId) {
                    await validateCapacity(tx, serviceType, dateObj, timeSlotId);
                }
            }

            // 2. Data Fetching (Prices & the specific Tier selected)
            const [dbPrices, discountTiers] = await Promise.all([
                tx.serviceItemPrice.findMany({
                    where: {
                        serviceItemId: { in: items.map((i: any) => i.serviceItemId) },
                        isActive: true
                    },
                }),
                tx.storageDiscountTier.findMany({
                    where: { isActive: true },
                    orderBy: { minMonths: 'desc' },
                }),
            ]);

            // 3. Pricing Logic 
            // processOrderItems should now return the specific Tier used if discountTierId was passed
            const { mappedItems, subtotal, totalDiscount, finalTierId } = processOrderItems(
                items,
                dbPrices,
                discountTiers,
                discountTierId
            );

            // 4. Customer Persistence
            // Logic: Upsert based on email, fallback to a timestamped draft email to avoid constraint collisions
            const customerEmail = customer.email?.toLowerCase().trim();
            const dbCustomer = await tx.customer.upsert({
                where: {
                    email: customerEmail && customerEmail !== "" 
                        ? customerEmail 
                        : `draft-${Date.now()}@placeholder.com`
                },
                update: {
                    fullName: customer.fullName || "Valued Customer",
                    phone: customer.phone || null
                },
                create: {
                    email: customerEmail || `draft-${Date.now()}@placeholder.com`,
                    fullName: customer.fullName || "Valued Customer",
                    phone: customer.phone || null,
                },
            });

            // 5. Order Creation
            return tx.order.create({
                data: {
                    orderNumber: generateOrderNumber(),
                    serviceType,
                    status: OrderStatus.DRAFT,
                    customerId: dbCustomer.id,
                    serviceDate: serviceDate ? new Date(serviceDate) : null,
                    timeSlotId: timeSlotId || null,
                    
                    // Moving Specifics
                    packingAssistance: !!packingAssistance,
                    notes: notes || null,

                    // Pricing
                    subtotalMinor: subtotal,
                    discountMinor: totalDiscount,
                    totalMinor: subtotal - totalDiscount,
                    
                    // Dynamic Tier Linkage
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
                    storageDiscountTier: true // Return tier info to the FE
                }
            });
        }, {
            timeout: 10000 
        });

        return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
        console.error("[ORDER_POST_ERROR]", error);
        return NextResponse.json(
            { error: error.message || 'Failed to process order' },
            { status: 400 }
        );
    }
}