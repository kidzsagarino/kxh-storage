import { NextResponse } from "next/server";
import {
  BillingUnit,
  DiscountScope,
  Prisma,
  ServiceType,
  TimeSlotKey,
  Weekday,
} from "@prisma/client";
import { prisma } from "@/src/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toSkuMap<T extends { sku: string }>(arr: T[]) {
  return Object.fromEntries(arr.map((x) => [x.sku, x]));
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

/** -----------------------------
 * Load: Catalog Items + Prices
 * ------------------------------ */
async function loadServiceItems(currency: string) {
  const rows = await prisma.serviceItem.findMany({
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
  });

  // normalize single-price array -> price|null
  return rows.map((it) => {
    const price = it.prices[0] ?? null;
    return {
      id: it.id,
      sku: it.sku,
      name: it.name,
      description: it.description,
      serviceType: it.serviceType,
      price: price
        ? {
            currency: price.currency,
            unitPriceMinor: price.unitPriceMinor,
            billingUnit: price.billingUnit,
          }
        : null,
    };
  });
}

/** -----------------------------
 * Load: Moving packages + Price
 * ------------------------------ */
async function loadMovingPackages(currency: string) {
  const rows = await prisma.movingPackage.findMany({
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
  });

  return rows.map((p) => {
    const price = p.prices[0] ?? null;
    return {
      id: p.id,
      sku: p.sku,
      name: p.name,
      description: p.description,
      price: price ? { currency: price.currency, priceMinor: price.priceMinor } : null,
    };
  });
}

/** -----------------------------
 * Load: Storage discount tiers
 * ------------------------------ */
async function loadStorageDiscountTiers(currency: string) {
  return prisma.storageDiscountTier.findMany({
    where: {
      isActive: true,
      currency,
      scope: DiscountScope.GLOBAL,
      serviceItemId: null,
    },
    select: { minMonths: true, percentOff: true, currency: true },
    orderBy: [{ minMonths: "asc" }],
  });
}

/** -----------------------------
 * Load: Admin settings bundle
 * ------------------------------ */
async function loadAdminSettingsBundle() {
  // If you guarantee a single row, findFirst is ok.
  // If none exists, return null (client can fallback to defaults).
  const settings = await prisma.adminSettings.findFirst({
    select: {
      id: true,
      storageEnabled: true,
      movingEnabled: true,
      shreddingEnabled: true,

      movingPricePerMileMinor: true,
      packingAssistanceMinor: true,

      disableAutoBlockSchedule: true,
      capacityEnabled: true,

      // Time slot settings (morning/afternoon/evening UI controls)
      timeSlotSettings: {
        select: { key: true, label: true, range: true, enabled: true },
        orderBy: { key: "asc" },
      },

      // Capacity rules
      capacities: {
        select: { serviceType: true, slotKey: true, capacity: true },
      },

      // Weekday rules
      weekdayRules: {
        select: { serviceType: true, weekday: true, enabled: true },
      },

      // Blackout dates
      blackoutDates: {
        select: { date: true, reason: true },
        orderBy: { date: "asc" },
      },
    },
  });

  return settings;
}

/** -----------------------------
 * Shape helpers for UI
 * ------------------------------ */
function mapWeekdayEnumToKey(d: Weekday) {
  // UI uses "sun|mon|tue|wed|thu|fri|sat"
  switch (d) {
    case "SUN":
      return "sun";
    case "MON":
      return "mon";
    case "TUE":
      return "tue";
    case "WED":
      return "wed";
    case "THU":
      return "thu";
    case "FRI":
      return "fri";
    case "SAT":
      return "sat";
  }
}

function mapSlotKeyEnumToKey(k: TimeSlotKey) {
  switch (k) {
    case "MORNING":
      return "morning";
    case "AFTERNOON":
      return "afternoon";
    case "EVENING":
      return "evening";
  }
}

function isoDateOnly(d: Date) {
  // YYYY-MM-DD
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function buildSettingsForClient(settings: Awaited<ReturnType<typeof loadAdminSettingsBundle>>) {
  if (!settings) return null;

  // time slots (UI expects id/label/range/enabled)
  const timeSlots = settings.timeSlotSettings.map((t) => ({
    id: mapSlotKeyEnumToKey(t.key),
    label: t.label,
    range: t.range,
    enabled: t.enabled,
  }));

  // capacityPerService: { storage: {morning..}, moving: {...}, shredding: {...} }
  const emptyCaps = {
    storage: { morning: 0, afternoon: 0, evening: 0 },
    moving: { morning: 0, afternoon: 0, evening: 0 },
    shredding: { morning: 0, afternoon: 0, evening: 0 },
  };

  const capacityPerService = settings.capacities.reduce((acc, row) => {
    const svc =
      row.serviceType === "STORAGE"
        ? "storage"
        : row.serviceType === "MOVING"
        ? "moving"
        : "shredding";
    const slot = mapSlotKeyEnumToKey(row.slotKey);
    acc[svc][slot] = row.capacity;
    return acc;
  }, structuredClone(emptyCaps));

  // weekdaysByService: { storage: {mon:true..}, ... }
  const emptyWeekdays = {
    storage: { sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
    moving: { sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
    shredding: { sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
  };

  const weekdaysByService = settings.weekdayRules.reduce((acc, row) => {
    const svc =
      row.serviceType === "STORAGE"
        ? "storage"
        : row.serviceType === "MOVING"
        ? "moving"
        : "shredding";
    const dayKey = mapWeekdayEnumToKey(row.weekday);
    acc[svc][dayKey] = row.enabled;
    return acc;
  }, structuredClone(emptyWeekdays));

  const blackoutDates = settings.blackoutDates.map((b) => isoDateOnly(b.date));

  return {
    serviceEnabled: {
      storage: settings.storageEnabled,
      moving: settings.movingEnabled,
      shredding: settings.shreddingEnabled,
    },

    // store in minor units, frontend can display GBP
    moving: {
      pricePerMileMinor: settings.movingPricePerMileMinor,
      packingAssistanceMinor: settings.packingAssistanceMinor,
    },

    scheduling: {
      disableAutoBlockSchedule: settings.disableAutoBlockSchedule,
      capacityEnabled: settings.capacityEnabled,
      capacityPerService,
      weekdaysByService,
      blackoutDates,
    },

    timeSlots, // UI config for slot label/range/enabled
  };
}

/** -----------------------------
 * GET /api/order-flow?currency=GBP
 * ------------------------------ */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const currency = (searchParams.get("currency") || "GBP").toUpperCase();

  const [normalizedItems, normalizedPackages, storageDiscountTiers, adminSettings] =
    await Promise.all([
      loadServiceItems(currency),
      loadMovingPackages(currency),
      loadStorageDiscountTiers(currency),
      loadAdminSettingsBundle(),
    ]);

  // Split catalog by service
  const storageItems = normalizedItems.filter((x) => x.serviceType === ServiceType.STORAGE);
  const movingItems = normalizedItems.filter((x) => x.serviceType === ServiceType.MOVING);
  const shreddingItems = normalizedItems.filter((x) => x.serviceType === ServiceType.SHREDDING);

  // Build settings payload for UI
  const settings = buildSettingsForClient(adminSettings);

  return NextResponse.json(
    {
      ok: true,
      currency,

      // Settings bundle for order flow + admin UI
      settings,

      // Catalog bundle
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
    },
    { status: 200 }
  );
}
