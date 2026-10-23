import {
    BillingScheduleStatus,
} from "@prisma/client";

import { prisma } from "@/src/lib/prisma";


function addMonthsSafe(
    input: Date,
    months: number
) {
    const original =
        new Date(input);

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

    const lastDay =
        new Date(
            result.getFullYear(),
            result.getMonth() + 1,
            0
        ).getDate();

    result.setDate(
        Math.min(
            day,
            lastDay
        )
    );

    return result;
}


export async function extendStorageBilling(
    orderId: string,
    extensionMonths: number
) {
    if (
        !Number.isInteger(extensionMonths) ||
        extensionMonths <= 0
    ) {
        throw new Error(
            "Extension months must be greater than 0."
        );
    }

    return prisma.$transaction(
        async (tx) => {

            const order =
                await tx.order.findUnique({
                    where: {
                        id: orderId,
                    },

                    include: {
                        billingSchedule: {
                            orderBy: {
                                installmentNumber:
                                    "asc",
                            },
                        },
                    },
                });


            if (!order) {
                throw new Error(
                    "Order not found."
                );
            }


            if (
                order.serviceType !==
                "STORAGE"
            ) {
                throw new Error(
                    "Only storage orders can be extended."
                );
            }


            const schedules =
                order.billingSchedule;


            if (
                schedules.length === 0
            ) {
                throw new Error(
                    "Order does not have a billing schedule."
                );
            }

            const lastSchedule =
                schedules[
                schedules.length - 1
                ];

            const monthlyAmountMinor =
                lastSchedule.amountMinor;

            const newSchedules =
                Array.from(
                    {
                        length:
                            extensionMonths,
                    },

                    (_, index) => {

                        const installmentNumber =
                            lastSchedule
                                .installmentNumber +
                            index +
                            1;


                        const dueDate =
                            addMonthsSafe(
                                lastSchedule.dueDate,
                                index + 1
                            );


                        return {
                            orderId:
                                order.id,

                            installmentNumber,

                            dueDate,

                            amountMinor:
                                monthlyAmountMinor,

                            status:
                                BillingScheduleStatus
                                    .SCHEDULED,
                        };
                    }
                );


            await tx
                .orderBillingSchedule
                .createMany({
                    data:
                        newSchedules,
                });


            return {
                success:
                    true,

                addedMonths:
                    extensionMonths,

                previousInstallments:
                    schedules.length,

                totalInstallments:
                    schedules.length +
                    extensionMonths,

                monthlyAmountMinor,

                newSchedules,
            };
        }
    );
}