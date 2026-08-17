// actions.ts
"use server";

import {
  OrderStatus,
} from "@prisma/client";

import { revalidatePath } from "next/cache";

import { prisma } from "@/src/lib/prisma";

import {
    extendStorageBilling,
} from "@/app/lib/billing/billing-extension";


export async function getOrderById(
  id: string
) {
  return prisma.order.findUnique({
    where: {
      id,
    },

    include: {
      customer: true,
      addresses: true,
      items: true,
      payments: true,
      timeSlot: true,

      movingPackage: {
        include: {
          prices: {
            where: {
              isActive: true,
              currency: "GBP",
            },
          },
        },
      },

      storageDiscountTier: true,

      emailLogs: {
        orderBy: {
          createdAt: "desc",
        },
      },

      discountCode: true,

      billingSchedule: {
        orderBy: {
          installmentNumber: "asc",
        },
      },
    },
  });
}


export type AdminOrder =
  NonNullable<
    Awaited<
      ReturnType<
        typeof getOrderById
      >
    >
  >;


type CancelOrderInput = {
  orderId: string;
  cancelReason?: string;
  refund?: boolean;
};


export async function cancelOrderAction({
  orderId,
  cancelReason,
  refund = false,
}: CancelOrderInput) {

  if (!orderId) {
    throw new Error(
      "Missing orderId"
    );
  }

  const order =
    await prisma.order.findUnique({
      where: {
        id: orderId,
      },

      include: {
        payments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });


  if (!order) {
    throw new Error(
      "Order not found"
    );
  }


  if (
    order.status ===
    OrderStatus.CANCELED
  ) {
    throw new Error(
      "Order is already cancelled"
    );
  }


  if (
    order.status ===
    OrderStatus.COMPLETED
  ) {
    throw new Error(
      "Completed orders cannot be cancelled"
    );
  }


  const updatedOrder =
    await prisma.order.update({
      where: {
        id: orderId,
      },

      data: {
        status:
          OrderStatus.CANCELED,

        cancelReason:
          cancelReason?.trim() ||
          "Cancelled by admin",

        cancelAt:
          new Date(),
      },

      include: {
        customer: true,
        addresses: true,
        items: true,
        payments: true,
        timeSlot: true,

        movingPackage: {
          include: {
            prices: {
              where: {
                isActive: true,
                currency: "GBP",
              },
            },
          },
        },

        storageDiscountTier:
          true,

        emailLogs: {
          orderBy: {
            createdAt:
              "desc",
          },
        },

        discountCode:
          true,

        billingSchedule: {
          orderBy: {
            installmentNumber:
              "asc",
          },
        },
      },
    });


  revalidatePath(
    `/admin/orders/${orderId}`
  );

  revalidatePath(
    "/admin/orders"
  );


  return {
    ok: true,
    message:
      "Order cancelled.",
    order:
      updatedOrder,
  };
}


export async function extendBillingAction(
    orderId: string,
    months: number
) {
    try {
        const result =
            await extendStorageBilling(
                orderId,
                months
            );

        revalidatePath(
            "/admin/billings"
        );

        revalidatePath(
            `/admin/orders/${orderId}`
        );

        return result;
        
    } catch (error: unknown) {
        return {
            success:
                false,

            error:
                error instanceof Error
                    ? error.message
                    : "Failed to extend billing.",
        };
    }
}