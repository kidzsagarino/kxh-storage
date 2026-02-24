// actions.ts
"use server";

import { PrismaClient } from "@prisma/client";
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