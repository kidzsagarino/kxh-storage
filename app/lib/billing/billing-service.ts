// lib/billing/billing-service.ts

import {
    BillingScheduleStatus,
} from "@prisma/client";

import { prisma } from "@/src/lib/prisma";

function addMonthsSafe(
    input: Date,
    months: number
) {
    const original = new Date(input);

    const day =
        original.getDate();

    const result =
        new Date(
            original.getFullYear(),
            original.getMonth() + months,
            1,
            original.getHours(),
            original.getMinutes(),
            original.getSeconds(),
            original.getMilliseconds()
        );

    const lastDayOfTargetMonth =
        new Date(
            result.getFullYear(),
            result.getMonth() + 1,
            0
        ).getDate();

    result.setDate(
        Math.min(day, lastDayOfTargetMonth)
    );

    return result;
}


export async function createBillingScheduleForOrder(
    orderId: string
) {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },

        include: {
            items: true,
        },
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.serviceType !== "STORAGE") {
        return;
    }

    const durationMonths = Math.max(
        ...order.items.map(
            (item) => Number(item.months) || 0
        )
    );

    if (!durationMonths) {
        return;
    }

    const existing =
        await prisma.orderBillingSchedule.count({
            where: {
                orderId,
            },
        });

    if (existing > 0) {
        return;
    }

    const monthlyAmount =
        Math.max(
            0,
            order.subtotalMinor -
            order.discountMinor
        );

    const startDate =
        order.serviceDate ??
        new Date();

    const schedules =
        Array.from(
            {
                length: durationMonths,
            },
            (_, index) => ({
                orderId,

                installmentNumber:
                    index + 1,

                dueDate:
                    addMonthsSafe(
                        startDate,
                        index
                    ),

                amountMinor:
                    index === 0
                        ? order.totalMinor
                        : monthlyAmount,

                status:
                    index === 0
                        ? BillingScheduleStatus.PAYMENT_PENDING
                        : BillingScheduleStatus.SCHEDULED,
            })
        );

    await prisma.orderBillingSchedule.createMany({
        data: schedules,
    });
}