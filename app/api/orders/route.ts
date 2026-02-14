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
        const { customer, serviceType, items, addresses, serviceDate, timeSlotId, discountId } = body;

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

            // 2. Data Fetching
            const [dbPrices, discountTiers] = await Promise.all([
                tx.serviceItemPrice.findMany({
                    where: {
                        serviceItemId: { in: items.map((i: any) => i.serviceItemId) },
                        isActive: true
                    },
                    include: { serviceItem: true },
                }),
                tx.storageDiscountTier.findMany({
                    where: { isActive: true, currency: 'GBP' },
                    orderBy: { minMonths: 'desc' },
                }),
            ]);

            // 3. Pricing Logic
            const { mappedItems, subtotal, totalDiscount } = processOrderItems(
                items,
                dbPrices,
                discountTiers,
                discountId
            );

            // 4. Customer & Order Persistence
            const dbCustomer = await tx.customer.upsert({
                where: {
                    // If email is empty, we use a temporary placeholder to avoid unique constraint errors
                    email: customer.email && customer.email !== ""
                        ? customer.email.toLowerCase()
                        : `draft-${Date.now()}@temp.com`
                },
                update: {
                    // If FE sends "", we don't overwrite existing data with empty strings
                    fullName: customer.fullName || "Valued Customer",
                    phone: customer.phone || null
                },
                create: {
                    email: customer.email || `draft-${Date.now()}@temp.com`,
                    fullName: customer.fullName || "Valued Customer",
                    phone: customer.phone || null,
                },
            });

            return tx.order.create({
                data: {
                    orderNumber: generateOrderNumber(),
                    serviceType,
                    status: OrderStatus.DRAFT,
                    customerId: dbCustomer.id,
                    serviceDate: serviceDate ? new Date(serviceDate) : null,
                    timeSlotId: timeSlotId || null,
                    subtotalMinor: subtotal,
                    discountMinor: totalDiscount,
                    totalMinor: subtotal - totalDiscount,
                    items: { create: mappedItems },
                    addresses: {
                        create: addresses.map((addr: any) => ({
                            type: addr.type as AddressType,
                            // Use fallback empty strings if the FE hasn't provided them yet
                            line1: addr.line1 || "",
                            line2: addr.line2 || null, // Optional in schema, so null is fine
                            city: addr.city || "",
                            postalCode: addr.postalCode || "",
                            country: addr.country || "GB",
                        })),
                    },
                },
            });
        }, {
            timeout: 10000 // Extended timeout for multi-step transaction
        });

        return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to process order' },
            { status: 400 } // Using 400 for validation/business logic errors
        );
    }
}