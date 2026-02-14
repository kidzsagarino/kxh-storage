import { Prisma, CatalogItemId, StorageDiscountTier } from '@prisma/client';

/**
 * Calculates the best discount for an item based on duration.
 * Priority: Item-specific discount > Global discount
 */
export function calculateBestDiscount(
  itemId: CatalogItemId,
  months: number,
  tiers: StorageDiscountTier[],
  baseLineTotal: number,
  discountId?: string
) {
  const applicableTier = tiers.find(
    (tier) =>
      (tier.id === discountId || tier.scope === 'GLOBAL') &&
      months >= tier.minMonths
  );

  if (!applicableTier) return { discountMinor: 0, rate: 0 };

  const discountMinor = Math.floor((baseLineTotal * applicableTier.percentOff) / 100);
  return { discountMinor, rate: applicableTier.percentOff };
}

/**
 * Validates prices and maps items with correct currency math.
 */
export function processOrderItems(
  requestedItems: any[],
  dbPrices: any[],
  discountTiers: StorageDiscountTier[],
  discountId?: string
) {
  let subtotal = 0;
  let totalDiscount = 0;

  const mappedItems = requestedItems.map((item) => {
    const priceRecord = dbPrices.find((p) => p.serviceItemId === item.serviceItemId);
    if (!priceRecord) throw new Error(`Price not found for ${item.serviceItemId}`);

    const quantity = item.quantity || 1;
    const months = item.months || 1;
    const unitPrice = priceRecord.unitPriceMinor;
    const baseLineTotal = unitPrice * quantity * months;

    const { discountMinor, rate } = calculateBestDiscount(
      item.serviceItemId,
      months,
      discountTiers,
      baseLineTotal,
      discountId
    );

    subtotal += baseLineTotal;
    totalDiscount += discountMinor;

    return {
      serviceItemId: item.serviceItemId as CatalogItemId,
      sku: priceRecord.serviceItem.sku,
      name: priceRecord.serviceItem.name,
      quantity,
      unitPriceMinor: unitPrice,
      lineTotalMinor: baseLineTotal - discountMinor,
      months: item.months || null,
      details: rate > 0 ? { discountRate: `${rate}%` } : {},
    };
  });

  return { mappedItems, subtotal, totalDiscount };
}