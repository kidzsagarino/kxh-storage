"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import crypto from "crypto";
import { sendEmail } from "@/app/lib/resend";
import InventoryAccessEmail
    from "@/app/components/email/InventoryAccessEmail";
import {
    render,
} from "@react-email/render";


type InventoryInput = {
    name: string;
    quantity: number;
    description?: string | null;
    condition?: string | null;
    location?: string | null;
    notes?: string | null;
    imageUrl?: string | null;
};


function cleanOptional(
    value?: string | null
) {
    const cleaned =
        value?.trim();

    return cleaned || null;
}


export async function createInventoryItem(
    orderId: string,
    input: InventoryInput
) {
    const name =
        input.name.trim();

    if (!orderId) {
        return {
            success: false,
            error: "Order ID is required.",
        };
    }

    if (!name) {
        return {
            success: false,
            error: "Item name is required.",
        };
    }

    if (
        !Number.isInteger(
            input.quantity
        ) ||
        input.quantity < 1
    ) {
        return {
            success: false,
            error:
                "Quantity must be at least 1.",
        };
    }


    const order =
        await prisma.order.findUnique({
            where: {
                id: orderId,
            },

            select: {
                id: true,
                serviceType: true,
            },
        });


    if (!order) {
        return {
            success: false,
            error: "Order not found.",
        };
    }


    if (
        order.serviceType !==
        "STORAGE"
    ) {
        return {
            success: false,
            error:
                "Inventory can only be added to storage orders.",
        };
    }


    const item =
        await prisma
            .orderInventoryItem
            .create({
                data: {
                    orderId,

                    name,

                    quantity:
                        input.quantity,

                    description:
                        cleanOptional(
                            input.description
                        ),

                    condition:
                        cleanOptional(
                            input.condition
                        ),

                    location:
                        cleanOptional(
                            input.location
                        ),

                    notes:
                        cleanOptional(
                            input.notes
                        ),

                    imageUrl:
                        cleanOptional(
                            input.imageUrl
                        ),
                },
            });


    revalidatePath(
        `/admin/orders/${orderId}`
    );


    return {
        success: true,
        item,
    };
}


export async function updateInventoryItem(
    itemId: string,
    input: InventoryInput
) {
    const name =
        input.name.trim();

    if (!itemId) {
        return {
            success: false,
            error:
                "Inventory item ID is required.",
        };
    }


    if (!name) {
        return {
            success: false,
            error:
                "Item name is required.",
        };
    }


    if (
        !Number.isInteger(
            input.quantity
        ) ||
        input.quantity < 1
    ) {
        return {
            success: false,
            error:
                "Quantity must be at least 1.",
        };
    }


    const existing =
        await prisma
            .orderInventoryItem
            .findUnique({
                where: {
                    id: itemId,
                },

                select: {
                    id: true,
                    orderId: true,
                },
            });


    if (!existing) {
        return {
            success: false,
            error:
                "Inventory item not found.",
        };
    }


    const item =
        await prisma
            .orderInventoryItem
            .update({
                where: {
                    id: itemId,
                },

                data: {
                    name,

                    quantity:
                        input.quantity,

                    description:
                        cleanOptional(
                            input.description
                        ),

                    condition:
                        cleanOptional(
                            input.condition
                        ),

                    location:
                        cleanOptional(
                            input.location
                        ),

                    notes:
                        cleanOptional(
                            input.notes
                        ),

                    imageUrl:
                        cleanOptional(
                            input.imageUrl
                        ),
                },
            });


    revalidatePath(
        `/admin/orders/${existing.orderId}`
    );


    return {
        success: true,
        item,
    };
}


export async function deleteInventoryItem(
    itemId: string
) {
    if (!itemId) {
        return {
            success: false,
            error:
                "Inventory item ID is required.",
        };
    }


    const existing =
        await prisma
            .orderInventoryItem
            .findUnique({
                where: {
                    id: itemId,
                },

                select: {
                    id: true,
                    orderId: true,
                },
            });


    if (!existing) {
        return {
            success: false,
            error:
                "Inventory item not found.",
        };
    }


    await prisma
        .orderInventoryItem
        .delete({
            where: {
                id: itemId,
            },
        });


    revalidatePath(
        `/admin/orders/${existing.orderId}`
    );


    return {
        success: true,
    };
}

export async function sendInventoryAccessLink(
    orderId: string
) {
    try {
        const order =
            await prisma.order.findUnique({
                where: {
                    id: orderId,
                },

                include: {
                    customer: true,

                    inventoryItems: {
                        orderBy: {
                            createdAt: "asc",
                        },
                    },
                },
            });


        if (!order) {
            return {
                success: false,
                error: "Order not found.",
            };
        }


        if (
            order.serviceType !== "STORAGE"
        ) {
            return {
                success: false,
                error:
                    "Inventory access is only available for storage orders.",
            };
        }


        if (!order.customer?.email) {
            return {
                success: false,
                error:
                    "Customer does not have an email address.",
            };
        }


        if (
            order.inventoryItems.length === 0
        ) {
            return {
                success: false,
                error:
                    "Add at least one inventory item before sending the link.",
            };
        }




        /*
         * Revoke any existing active links
         * for this order.
         */
        await prisma.orderInventoryAccessToken.updateMany({
            where: {
                orderId:
                    order.id,

                revokedAt:
                    null,
            },

            data: {
                revokedAt:
                    new Date(),
            },
        });


        /*
         * Generate a new secure token.
         */
        const token =
            crypto
                .randomBytes(32)
                .toString("hex");



        let access =
            await prisma.orderInventoryAccessToken.findFirst({
                where: {
                    orderId:
                        order.id,

                    revokedAt:
                        null,
                },

                orderBy: {
                    createdAt:
                        "desc",
                },
            });


        if (!access) {
            const token =
                crypto
                    .randomBytes(32)
                    .toString("hex");


            access =
                await prisma.orderInventoryAccessToken.create({
                    data: {
                        orderId:
                            order.id,

                        token,
                    },
                });
        }


        const baseUrl =
            process.env.NEXT_PUBLIC_APP_URL;


        if (!baseUrl) {
            throw new Error(
                "NEXT_PUBLIC_APP_URL is missing."
            );
        }


        const inventoryUrl =
            `${baseUrl.replace(
                /\/$/,
                ""
            )}/client-inventory/${access.token}`;


        const subject =
            `Your KXH Storage Inventory - Order #${order.orderNumber}`;



        const html =
            await render(
                InventoryAccessEmail({
                    customerName:
                        order.customer.fullName ||
                        "there",

                    orderNumber:
                        order.orderNumber,

                    inventoryCount:
                        order.inventoryItems.length,

                    inventoryUrl,
                })
            );

        await sendEmail({
            to:
                order.customer.email,

            subject,

            html,
        });

        revalidatePath(
            `/admin/orders/${order.id}`
        );


        return {
            success: true,
            inventoryUrl,
        };

    } catch (error: unknown) {
        console.error(
            "[SEND_INVENTORY_ACCESS_LINK]",
            error
        );


        return {
            success: false,

            error:
                error instanceof Error
                    ? error.message
                    : "Failed to send inventory access link.",
        };
    }
}