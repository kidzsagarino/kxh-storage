"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getOrderById(id: string) {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      items: true,
      addresses: true,
      timeSlot: true,
      payments: true,
    },
  });
}

export async function updateOrderStatus(id: string, status: any) {
  return await prisma.order.update({
    where: { id },
    data: { status },
  });
}