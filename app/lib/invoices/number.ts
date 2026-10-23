import type { Prisma } from "@prisma/client";

export async function generateInvoiceNumber(
  tx: Prisma.TransactionClient
): Promise<string> {
  const counter = await tx.invoiceCounter.upsert({
    where: {
      id: "default",
    },
    create: {
      id: "default",
      lastValue: 1,
    },
    update: {
      lastValue: {
        increment: 1,
      },
    },
  });

  return `INV-${String(counter.lastValue).padStart(6, "0")}`;
}