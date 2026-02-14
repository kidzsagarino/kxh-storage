import { prisma } from "@/src/lib/prisma";
import { BillingUnit, ServiceType } from "@prisma/client";
import type { Prisma } from "@prisma/client";

function toSkuMap<T extends { sku: string }>(arr: T[]) {
  return Object.fromEntries(arr.map((x) => [x.sku, x]));
}

function minorToMoney(minor: number | null | undefined): number | null {
  if (minor == null) return null;
  return Number((minor / 100).toFixed(2));
}

function effectiveServiceItemPriceWhere(currency: string): Prisma.ServiceItemPriceWhereInput {
  return {
    currency,
    isActive: true,
    // Note: effectiveFrom/To were removed in the revised schema for simplicity, 
    // but I've kept the logic here if you decide to keep them in the DB.
  };
}

function effectiveMovingPackagePriceWhere(currency: string): Prisma.MovingPackagePriceWhereInput {
  return {
    currency,
    isActive: true,
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
            where: { currency, isActive: true },
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
            where: { currency, isActive: true },
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

      // Simplified Tier query: Removed currency/scope/serviceItemId as per new schema
      prisma.storageDiscountTier.findMany({
        where: { isActive: true },
        select: { id: true, name: true, minMonths: true, percentOff: true },
        orderBy: [{ minMonths: "asc" }],
      }),

      // Using the singleton ID for better performance
      prisma.adminSettings.findUnique({
        where: { id: "global_settings" },
        select: {
          storageEnabled: true,
          movingEnabled: true,
          shreddingEnabled: true,
          movingPricePerMileMinor: true,
          packingAssistanceMinor: true,
          timeSlotSettings: { select: { key: true, label: true, enabled: true }, orderBy: { key: "asc" } },
          capacities: { select: { serviceType: true, slotKey: true, capacity: true } },
          weekdayRules: { select: { serviceType: true, weekday: true, enabled: true } },
          blackoutDates: { select: { date: true }, orderBy: { date: "asc" } },
        },
      }),
    ]);

  // Normalize Service Items
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

  // Normalize Moving Packages
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
      const d = new Date(b.date);
      return d.toISOString().split("T")[0]; // Cleaner YYYY-MM-DD conversion
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
        discountTiers: storageDiscountTiers, // Now a global list of duration tiers
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