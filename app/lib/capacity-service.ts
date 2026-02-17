import { ServiceType, TimeSlotKey, Prisma } from '@prisma/client';

export async function validateCapacity(
    tx: Prisma.TransactionClient,
    serviceType: ServiceType,
    serviceDate: Date,
    timeSlotId: string
) {
    // 1. Fetch the slot key (e.g., MORNING) for the given slot ID
    const slot = await tx.timeSlot.findUnique({
        where: { id: timeSlotId }
    });

    if (!slot) throw new Error("Invalid time slot selected.");
    const slotKey = slot.name.toUpperCase() as TimeSlotKey;

    // 2. Fetch capacity settings and current order count
    const [settings, currentOrderCount] = await Promise.all([
        tx.adminSettings.findFirst({
            include: {
                capacities: {
                    where: { serviceType, slotKey }
                }
            }
        }),
        tx.order.count({
            where: {
                serviceDate,
                timeSlotId,
                serviceType,
                status: { notIn: ['CANCELED', 'REFUNDED'] } // Don't count canceled orders
            }
        })
    ]);

    const capacityLimit = settings?.capacities[0]?.capacity ?? 0;

    if (currentOrderCount >= capacityLimit) {
        throw new Error(
            `We are fully booked for ${serviceType} during the ${slot.name} slot on this date.`
        );
    }
}