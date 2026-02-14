import { prisma } from "@/src/lib/prisma";
import { BillingUnit, DiscountScope, ServiceType } from "@prisma/client";
import type { Prisma } from "@prisma/client";

function toSkuMap<T extends { sku: string }>(arr: T[]) {
  return Object.fromEntries(arr.map((x) => [x.sku, x]));
}

function minorToMoney(minor: number | null | undefined): number | null {
  if (minor == null) return null;
  return Number((minor / 100).toFixed(2));
}

function effectiveServiceItemPriceWhere(currency: string): Prisma.ServiceItemPriceWhereInput {
  const now = new Date();
  return {
    currency,
    isActive: true,
    OR: [
      { effectiveFrom: null, effectiveTo: null },
      { effectiveFrom: { lte: now }, effectiveTo: null },
      { effectiveFrom: null, effectiveTo: { gte: now } },
      { effectiveFrom: { lte: now }, effectiveTo: { gte: now } },
    ],
  };
}

function effectiveMovingPackagePriceWhere(currency: string): Prisma.MovingPackagePriceWhereInput {
  const now = new Date();
  return {
    currency,
    isActive: true,
    OR: [
      { effectiveFrom: null, effectiveTo: null },
      { effectiveFrom: { lte: now }, effectiveTo: null },
      { effectiveFrom: null, effectiveTo: { gte: now } },
      { effectiveFrom: { lte: now }, effectiveTo: { gte: now } },
    ],
  };
}

export async function loadOrderFlow(currency = "GBP") {
  currency = currency.toUpperCase();

  const [serviceItems, movingPackages, timeSlots, storageDiscountTiers, adminSettings] =
    await Promise.all([
      prisma.serviceItem.findMany({
        where: { isActive: true },
        select: {
          id: true,
          sku: true,
          name: true,
          description: true,
          serviceType: true,
          prices: {
            where: effectiveServiceItemPriceWhere(currency),
            orderBy: [{ effectiveFrom: "desc" }],
            take: 1,
            select: { unitPriceMinor: true, billingUnit: true, currency: true },
          },
        },
        orderBy: [{ serviceType: "asc" }, { name: "asc" }],
      }),

      prisma.movingPackage.findMany({
        where: { isActive: true },
        select: {
          id: true,
          sku: true,
          name: true,
          description: true,
          prices: {
            where: effectiveMovingPackagePriceWhere(currency),
            orderBy: [{ effectiveFrom: "desc" }],
            take: 1,
            select: { priceMinor: true, currency: true },
          },
        },
        orderBy: [{ name: "asc" }],
      }),

      prisma.timeSlot.findMany({
        where: { isActive: true },
        select: { id: true, name: true, startTime: true, endTime: true, isActive: true },
        orderBy: [{ startTime: "asc" }, { name: "asc" }],
      }),

      prisma.storageDiscountTier.findMany({
        where: {
          isActive: true,
          currency,
          scope: DiscountScope.GLOBAL,
          serviceItemId: null,
        },
        select: { id: true, minMonths: true, percentOff: true, currency: true },
        orderBy: [{ minMonths: "asc" }],
      }),

      prisma.adminSettings.findFirst({
        select: {
          storageEnabled: true,
          movingEnabled: true,
          shreddingEnabled: true,
          movingPricePerMileMinor: true,
          packingAssistanceMinor: true,
          disableAutoBlockSchedule: true,
          capacityEnabled: true,
          timeSlotSettings: { select: { key: true, label: true, range: true, enabled: true }, orderBy: { key: "asc" } },
          capacities: { select: { serviceType: true, slotKey: true, capacity: true } },
          weekdayRules: { select: { serviceType: true, weekday: true, enabled: true } },
          blackoutDates: { select: { date: true }, orderBy: { date: "asc" } },
        },
      }),
    ]);

  // normalize service items price array -> single price
  const normalizedItems = serviceItems.map((it) => {
    const p = it.prices[0] ?? null;
    return {
      id: it.id,
      sku: it.sku,
      name: it.name,
      description: it.description,
      serviceType: it.serviceType,
      price: p
        ? { currency: p.currency, price: minorToMoney(p.unitPriceMinor), billingUnit: p.billingUnit }
        : null,
    };
  });

  const storageItems = normalizedItems.filter((x) => x.serviceType === ServiceType.STORAGE);
  const movingItems = normalizedItems.filter((x) => x.serviceType === ServiceType.MOVING);
  const shreddingItems = normalizedItems.filter((x) => x.serviceType === ServiceType.SHREDDING);

  const normalizedPackages = movingPackages.map((p) => {
    const price = p.prices[0] ?? null;
    return {
      id: p.id,
      sku: p.sku,
      name: p.name,
      description: p.description,
      price: price ? { currency: price.currency, price: minorToMoney(price.priceMinor) } : null,
    };
  });

  const blackoutDates =
    adminSettings?.blackoutDates?.map((b) => {
      const d = b.date;
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, "0");
      const day = String(d.getUTCDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }) ?? [];

  return {
    ok: true,
    currency,

    timeSlots,

    settings: adminSettings
      ? {
          serviceEnabled: {
            storage: adminSettings.storageEnabled,
            moving: adminSettings.movingEnabled,
            shredding: adminSettings.shreddingEnabled,
          },
          moving: {
            pricePerMile: minorToMoney(adminSettings.movingPricePerMileMinor),
            packingAssistancePrice: minorToMoney(adminSettings.packingAssistanceMinor),
          },
          scheduling: {
            disableAutoBlockSchedule: adminSettings.disableAutoBlockSchedule,
            capacityEnabled: adminSettings.capacityEnabled,
            capacities: adminSettings.capacities,
            weekdayRules: adminSettings.weekdayRules,
            blackoutDates,
          },
          timeSlotSettings: adminSettings.timeSlotSettings,
        }
      : null,

    catalog: {
      storage: {
        items: storageItems,
        itemsBySku: toSkuMap(storageItems),
        billingUnit: BillingUnit.PER_MONTH,
        discountTiers: storageDiscountTiers,
      },
      moving: {
        items: movingItems,
        itemsBySku: toSkuMap(movingItems),
        packages: normalizedPackages,
        packagesBySku: toSkuMap(normalizedPackages),
      },
      shredding: {
        items: shreddingItems,
        itemsBySku: toSkuMap(shreddingItems),
      },
    },
  };
}
