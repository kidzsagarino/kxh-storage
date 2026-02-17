"use server";

import { PrismaClient, OrderStatus, ServiceType } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAdminOrders(filters: {
  q?: string;
  from?: Date;
  to?: Date;
}) {
  const { q, from, to } = filters;

  return await prisma.order.findMany({
    where: {
      // 1. Date Range Filter
      createdAt: {
        gte: from,
        lt: to,
      },
      // 2. Search Filter (Search name, email, or order number)
      OR: q ? [
        { orderNumber: { contains: q, mode: 'insensitive' } },
        { customer: { fullName: { contains: q, mode: 'insensitive' } } },
        { customer: { email: { contains: q, mode: 'insensitive' } } },
      ] : undefined,
    },
    include: {
      customer: true,
      timeSlot: true,
      addresses: true,
      payments: {
        orderBy: [{ status: "desc"}, {createdAt: "desc" }],
        take: 1
      }
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateOrderStatus(id: string, status: string) {
  return await prisma.order.update({
    where: { id },
    data: { status: status as OrderStatus },
  });
}