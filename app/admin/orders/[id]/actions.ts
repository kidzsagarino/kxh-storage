// actions.ts
"use server";

import { OrderStatus, PaymentStatus, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getOrderById(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      addresses: true,
      items: true,
      payments: true,
      timeSlot: true,
      movingPackage: { include: { prices: { where: { isActive: true, currency: "GBP" } } } },
      storageDiscountTier: true,
      emailLogs: { orderBy: { createdAt: "desc" } },
    },
  });

  const settings = await prisma.adminSettings.findUnique({
    where: { id: "global_settings" },
    select: { movingPricePerMileMinor: true },
  });

  return {
    ...order,
    pricing: {
      movingPricePerMileMinor: settings?.movingPricePerMileMinor ?? 58,
    },
  };
}

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
    throw new Error("Missing orderId");
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      payments: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status === OrderStatus.CANCELED) {
    throw new Error("Order is already cancelled");
  }

  if (order.status === OrderStatus.COMPLETED) {
    throw new Error("Completed orders cannot be cancelled");
  }


  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: OrderStatus.CANCELED,
      cancelReason: cancelReason?.trim() || "Cancelled by admin",
      cancelAt: new Date(),
    },
    include: {
      customer: true,
      addresses: true,
      items: true,
      payments: true,
      timeSlot: true,
      movingPackage: { include: { prices: { where: { isActive: true, currency: "GBP" } } } },
      storageDiscountTier: true,
      emailLogs: { orderBy: { createdAt: "desc" } },
    },
  });

  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");

  return {
    ok: true,
    message: "Order cancelled.",
    order: updatedOrder,
  };
}