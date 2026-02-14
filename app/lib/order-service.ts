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
  let subtotal = 0;
  let totalDiscount = 0;
  let finalTierId: string | null = null;

  // 1. Map items to their DB prices and calculate line totals
  const mappedItems = items.map((inputItem) => {
    const priceRecord = dbPrices.find(
      (p) => p.serviceItemId === inputItem.serviceItemId
    );

    if (!priceRecord) {
      throw new Error(`Price not found for item: ${inputItem.serviceItemId}`);
    }

    const quantity = inputItem.quantity || 1;
    const months = inputItem.months || 1;
    
    // Line Total = Price * Qty * Months (if applicable)
    const lineTotal = priceRecord.unitPriceMinor * quantity * months;
    subtotal += lineTotal;

    return {
      serviceItemId: inputItem.serviceItemId,
      name: (priceRecord as any).serviceItem?.name || "Service Item", // Ensuring name carries over
      sku: (priceRecord as any).serviceItem?.sku || "",
      quantity,
      months,
      unitPriceMinor: priceRecord.unitPriceMinor,
      lineTotalMinor: lineTotal,
    };
  });

  // 2. Determine the Discount Tier
  // We prioritize the Tier selected by the user/admin in the UI (requestedTierId)
  let activeTier = discountTiers.find((t) => t.id === requestedTierId);

  // Fallback: If no ID was sent, find the best matching tier based on the maximum months found in items
  if (!activeTier) {
    const maxMonths = Math.max(...items.map((i) => i.months || 0));
    activeTier = discountTiers
      .filter((t) => maxMonths >= t.minMonths)
      .sort((a, b) => b.minMonths - a.minMonths)[0];
  }

  // 3. Apply Discount
  if (activeTier) {
    totalDiscount = Math.round((subtotal * activeTier.percentOff) / 100);
    finalTierId = activeTier.id;
  }

  return {
    mappedItems,
    subtotal,
    totalDiscount,
    finalTierId,
  };
}