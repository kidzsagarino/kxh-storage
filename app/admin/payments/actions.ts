"use server";

import { prisma } from "@/src/lib/prisma";

export type AdminPaymentStatus =
  | "paid"
  | "unpaid"
  | "refunded"
  | "failed"
  | "processing";

export type AdminPayment = {
  id: string;
  orderId: string;
  orderNumber: string;
  serviceType: "storage" | "moving" | "shredding";
  status: string;
  amount: number; // GBP major units
  currency: "GBP";
  method: "stripe" | "cash" | "bank_transfer";
  stripeSessionId?: string;
  paymentIntentId?: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
};

function mapServiceType(v: unknown): "storage" | "moving" | "shredding" {
  const x = String(v ?? "").toLowerCase();
  if (x === "storage" || x === "moving" || x === "shredding") return x;
  return "storage";
}

function mapPaymentStatus(v: unknown): AdminPaymentStatus {
  const x = String(v ?? "").toLowerCase();

  if (x === "paid" || x === "refunded" || x === "failed" || x === "processing") {
    return x;
  }

  // treat pending/unrecognized non-paid states as unpaid for UI
  if (x === "unpaid" || x === "pending" || x === "requires_payment_method") {
    return "unpaid";
  }

  return "processing";
}

function mapMethod(v: unknown): "stripe" | "cash" | "bank_transfer" {
  const x = String(v ?? "").toLowerCase();

  if (x === "stripe") return "stripe";
  if (x === "cash") return "cash";
  if (x === "bank_transfer" || x === "banktransfer") return "bank_transfer";

  return "stripe";
}

export async function getAdminPayments(): Promise<AdminPayment[]> {
  const payments = await prisma.payment.findMany({
    orderBy: [{ createdAt: "desc" }],
    include: {
      order: {
        include: {
          customer: true,
        },
      },
    },
  });

  return payments.map((p) => {
    const customer = p.order?.customer;

    const customerName = customer?.fullName;

    return {
      id: p.id,
      orderId: p.orderId,
      orderNumber: p.order.orderNumber,
      serviceType: mapServiceType(p.order?.serviceType),
      status: p.status,
      amount: Number((p.amountMinor ?? 0) / 100),
      currency: "GBP",
      method: mapMethod(p.provider),
      stripeSessionId: p.providerRef ?? undefined,
      paymentIntentId: p.paymentIntentId ?? undefined,
      customerName,
      customerEmail: customer?.email ?? "—",
      createdAt: p.createdAt.toISOString(),
    };
  });
}