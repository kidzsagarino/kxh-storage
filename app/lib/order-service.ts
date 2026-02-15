import { ServiceItemPrice, StorageDiscountTier } from "@prisma/client";

interface InputItem {
    serviceItemId: string;
    quantity: number;
    months?: number;
}

export function processOrderItems(
  items: InputItem[],
  dbPrices: ServiceItemPrice[],
  discountTiers: StorageDiscountTier[],
  requestedTierId?: string
) {
  let subtotalMonthlyMinor = 0;
  let discountMonthlyMinor = 0;
  let finalTierId: string | null = null;

  // 1) Map items to DB prices and calculate MONTHLY line totals (no months multiplication)
  const mappedItems = items.map((inputItem) => {
    const priceRecord = dbPrices.find(
      (p) => p.serviceItemId === inputItem.serviceItemId
    );
    if (!priceRecord) {
      throw new Error(`Price not found for item: ${inputItem.serviceItemId}`);
    }

    const quantity = inputItem.quantity || 1;
    const months = inputItem.months || 1;

    const unitPriceMinor = priceRecord.unitPriceMinor; // monthly
    const lineTotalMinor = unitPriceMinor * quantity;  // monthly line total

    subtotalMonthlyMinor += lineTotalMinor;

    return {
      serviceItemId: inputItem.serviceItemId,
      sku: (priceRecord as any).serviceItem?.sku ?? null,
      name: (priceRecord as any).serviceItem?.name ?? "Service Item",
      quantity,
      months,            // kept for audit/discount tier selection
      unitPriceMinor,    // monthly
      lineTotalMinor,    // monthly
    };
  });

  // 2) Determine the active discount tier
  let activeTier = requestedTierId
    ? discountTiers.find((t) => t.id === requestedTierId)
    : undefined;

  if (!activeTier) {
    const maxMonths = Math.max(...items.map((i) => i.months ?? 0));
    activeTier = discountTiers
      .filter((t) => maxMonths >= t.minMonths)
      .sort((a, b) => b.minMonths - a.minMonths)[0];
  }

  // 3) Apply MONTHLY discount (first month only)
  if (activeTier) {
    discountMonthlyMinor = Math.round(
      subtotalMonthlyMinor * (activeTier.percentOff / 100)
    );
    finalTierId = activeTier.id;
  }

  const dueNowMinor = Math.max(0, subtotalMonthlyMinor - discountMonthlyMinor);

  return {
    mappedItems,
    subtotalMonthlyMinor,   // store into Order.subtotalMinor
    discountMonthlyMinor,   // store into Order.discountMinor
    dueNowMinor,            // store into Order.totalMinor (Stripe charge)
    finalTierId,
    activeTier,
  };
}
