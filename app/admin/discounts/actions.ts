"use server";

import { prisma } from "@/src/lib/prisma";

export async function getDiscountCodes() {
  return prisma.discountCode.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createDiscountCode(data: {
  code: string;
  type: "percentage" | "fixed";
  valueMinor: number;
  maxUses?: number;
  startDate?: string;
  endDate?: string;
}) {
  return prisma.discountCode.create({
    data: {
      code: data.code.toUpperCase(),
      type: data.type,
      valueMinor:
        data.type === "fixed"
          ? Math.round(data.valueMinor * 100)
          : Math.round(data.valueMinor), // % stored as 10 = 10%
      maxUses: data.maxUses ?? null,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  });
}

export async function updateDiscountCode(
  id: string,
  data: {
    code?: string; // optional because we don't want to update code in edit mode
    type: "percentage" | "fixed";
    valueMinor: number;
    maxUses?: number;
    startDate?: string;
    endDate?: string;
  }
) {
  return prisma.discountCode.update({
    where: { id },
    data: {
      code: data.code?.toUpperCase(), // only update if code is provided (shouldn't be in edit mode)
      type: data.type,
      valueMinor:
        data.type === "fixed"
          ? Math.round(data.valueMinor * 100)
          : Math.round(data.valueMinor), // % stored as 10 = 10%

      maxUses: data.maxUses ?? null,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  });
}


export async function toggleDiscount(id: string, active: boolean) {
  return prisma.discountCode.update({
    where: { id },
    data: { active },
  });
}