import { NextResponse } from "next/server";
import { PrismaClient, ServiceType, TimeSlotKey, Weekday, BillingUnit, CatalogItemId } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

type WeekdayKey = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
type WeekdayMap = Record<WeekdayKey, boolean>;
type ServiceWeekdays = Record<"storage" | "moving" | "shredding", WeekdayMap>;

type TimeSlotUi = {
  id: "morning" | "afternoon" | "evening";
  label: string;
  range: string;
  enabled: boolean;
};

type PricingSettings = {
  pricePerMile: number;
  movingHomeTypePrice: {
    "small-move": number;
    "1-bedroom-flat": number;
    "2-bedroom-flat": number;
    "3-bedroom-flat": number;
    "4-bedroom-flat": number;
    "office-move": number;
  };
  packingAssistancePrice: number;

  storagePricePerMonth: {
    "small-box": number;
    "medium-box": number;
    "large-box": number;
    "xl-box": number;
    suitcase: number;
    "half-container": number;
    "full-container": number;
  };
  storageDiscounts: { months: 1 | 3 | 6 | 12; percentOff: number }[];

  shredding: {
    bagPrice: number;
    archiveBoxPrice: number;
  };

  timeSlots: TimeSlotUi[];
  serviceEnabled: { storage: boolean; moving: boolean; shredding: boolean };

  scheduling: {
    disableAutoBlockSchedule: boolean;
    capacityEnabled: boolean;
    capacityPerService: {
      storage: { morning: number; afternoon: number; evening: number };
      moving: { morning: number; afternoon: number; evening: number };
      shredding: { morning: number; afternoon: number; evening: number };
    };
    weekdaysByService: ServiceWeekdays;
    blackoutDates: string[]; // YYYY-MM-DD
  };
};

const SETTINGS_ID = "global_settings";
const CURRENCY = "GBP";

function toMinor(amountMajor: number) {
  // pounds -> pence
  return Math.round((Number(amountMajor) || 0) * 100);
}
function fromMinor(amountMinor: number) {
  return (amountMinor || 0) / 100;
}

function uiSlotToEnum(id: TimeSlotUi["id"]): TimeSlotKey {
  if (id === "morning") return TimeSlotKey.MORNING;
  if (id === "afternoon") return TimeSlotKey.AFTERNOON;
  return TimeSlotKey.EVENING;
}
function enumSlotToUi(id: TimeSlotKey): TimeSlotUi["id"] {
  if (id === TimeSlotKey.MORNING) return "morning";
  if (id === TimeSlotKey.AFTERNOON) return "afternoon";
  return "evening";
}

function uiSvcToEnum(svc: "storage" | "moving" | "shredding"): ServiceType {
  if (svc === "storage") return ServiceType.STORAGE;
  if (svc === "moving") return ServiceType.MOVING;
  return ServiceType.SHREDDING;
}
function enumSvcToUi(svc: ServiceType): "storage" | "moving" | "shredding" {
  if (svc === ServiceType.STORAGE) return "storage";
  if (svc === ServiceType.MOVING) return "moving";
  return "shredding";
}

const weekdayKeyToEnum: Record<WeekdayKey, Weekday> = {
  sun: Weekday.SUN,
  mon: Weekday.MON,
  tue: Weekday.TUE,
  wed: Weekday.WED,
  thu: Weekday.THU,
  fri: Weekday.FRI,
  sat: Weekday.SAT,
};
const weekdayEnumToKey: Record<Weekday, WeekdayKey> = {
  [Weekday.SUN]: "sun",
  [Weekday.MON]: "mon",
  [Weekday.TUE]: "tue",
  [Weekday.WED]: "wed",
  [Weekday.THU]: "thu",
  [Weekday.FRI]: "fri",
  [Weekday.SAT]: "sat",
};

// UI keys -> CatalogItemId
const storageItemMap: Record<keyof PricingSettings["storagePricePerMonth"], CatalogItemId> = {
  "small-box": CatalogItemId.small_box,
  "medium-box": CatalogItemId.medium_box,
  "large-box": CatalogItemId.large_box,
  "xl-box": CatalogItemId.xl_box,
  suitcase: CatalogItemId.suitcase,
  "half-container": CatalogItemId.half_container,
  "full-container": CatalogItemId.full_container,
};

const movingHomeTypeMap: Record<keyof PricingSettings["movingHomeTypePrice"], CatalogItemId> = {
  "small-move": CatalogItemId.small_move,
  "1-bedroom-flat": CatalogItemId.one_bedroom_flat,
  "2-bedroom-flat": CatalogItemId.two_bedroom_flat,
  "3-bedroom-flat": CatalogItemId.three_bedroom_flat,
  "4-bedroom-flat": CatalogItemId.four_bedroom_flat,
  "office-move": CatalogItemId.office_move,
};

const shreddingItemMap: Record<"bagPrice" | "archiveBoxPrice", CatalogItemId> = {
  bagPrice: CatalogItemId.bag,
  archiveBoxPrice: CatalogItemId.archive_box,
};

function parseRangeToStartEnd(range: string): { startTime: string | null; endTime: string | null } {
  const m = range.replace("—", "-").replace("–", "-").split("-").map(s => s.trim());
  if (m.length !== 2) return { startTime: null, endTime: null };
  return { startTime: m[0] || null, endTime: m[1] || null };
}

export async function GET() {
  const settingsRow = await prisma.adminSettings.upsert({
    where: { id: SETTINGS_ID },
    update: {},
    create: { id: SETTINGS_ID },
    include: {
      timeSlotSettings: true,
      capacities: true,
      weekdayRules: true,
      blackoutDates: true,
    },
  });

  const [prices, tiers] = await Promise.all([
    prisma.serviceItemPrice.findMany({
      where: { currency: CURRENCY, isActive: true },
    }),
    prisma.storageDiscountTier.findMany({
      where: { isActive: true },
      orderBy: { minMonths: "asc" },
    }),
  ]);

  const priceByItem = new Map<CatalogItemId, number>();
  for (const p of prices) priceByItem.set(p.serviceItemId, fromMinor(p.unitPriceMinor));

  const timeSlots: TimeSlotUi[] = [TimeSlotKey.MORNING, TimeSlotKey.AFTERNOON, TimeSlotKey.EVENING].map((k) => {
    const row = settingsRow.timeSlotSettings.find((x) => x.key === k);
    return {
      id: enumSlotToUi(k),
      label: row?.label ?? (k === TimeSlotKey.MORNING ? "Morning" : k === TimeSlotKey.AFTERNOON ? "Afternoon" : "Evening"),
      range: k === TimeSlotKey.MORNING ? "7am – 10am" : k === TimeSlotKey.AFTERNOON ? "10am – 3pm" : "3pm – 6pm",
      enabled: row?.enabled ?? true,
    };
  });

  const capacityPerService: PricingSettings["scheduling"]["capacityPerService"] = {
    storage: { morning: 0, afternoon: 0, evening: 0 },
    moving: { morning: 0, afternoon: 0, evening: 0 },
    shredding: { morning: 0, afternoon: 0, evening: 0 },
  };
  for (const cap of settingsRow.capacities) {
    const svc = enumSvcToUi(cap.serviceType);
    const slot = enumSlotToUi(cap.slotKey);
    capacityPerService[svc][slot] = cap.capacity;
  }

  const weekdaysByService: ServiceWeekdays = {
    storage: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
    moving: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
    shredding: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
  };
  for (const rule of settingsRow.weekdayRules) {
    const svc = enumSvcToUi(rule.serviceType);
    const dayKey = weekdayEnumToKey[rule.weekday];
    weekdaysByService[svc][dayKey] = rule.enabled;
  }

  const blackoutDates = settingsRow.blackoutDates
    .map((b) => b.date.toISOString().slice(0, 10))
    .sort();

  const out: PricingSettings = {
    pricePerMile: fromMinor(settingsRow.movingPricePerMileMinor),
    packingAssistancePrice: fromMinor(settingsRow.packingAssistanceMinor),
    serviceEnabled: {
      storage: settingsRow.storageEnabled,
      moving: settingsRow.movingEnabled,
      shredding: settingsRow.shreddingEnabled,
    },

    movingHomeTypePrice: {
      "small-move": priceByItem.get(CatalogItemId.small_move) ?? 0,
      "1-bedroom-flat": priceByItem.get(CatalogItemId.one_bedroom_flat) ?? 0,
      "2-bedroom-flat": priceByItem.get(CatalogItemId.two_bedroom_flat) ?? 0,
      "3-bedroom-flat": priceByItem.get(CatalogItemId.three_bedroom_flat) ?? 0,
      "4-bedroom-flat": priceByItem.get(CatalogItemId.four_bedroom_flat) ?? 0,
      "office-move": priceByItem.get(CatalogItemId.office_move) ?? 0,
    },
    storagePricePerMonth: {
      "small-box": priceByItem.get(CatalogItemId.small_box) ?? 0,
      "medium-box": priceByItem.get(CatalogItemId.medium_box) ?? 0,
      "large-box": priceByItem.get(CatalogItemId.large_box) ?? 0,
      "xl-box": priceByItem.get(CatalogItemId.xl_box) ?? 0,
      suitcase: priceByItem.get(CatalogItemId.suitcase) ?? 0,
      "half-container": priceByItem.get(CatalogItemId.half_container) ?? 0,
      "full-container": priceByItem.get(CatalogItemId.full_container) ?? 0,
    },
    shredding: {
      bagPrice: priceByItem.get(CatalogItemId.bag) ?? 0,
      archiveBoxPrice: priceByItem.get(CatalogItemId.archive_box) ?? 0,
    },

    storageDiscounts: (tiers.length
      ? tiers
      : [{ minMonths: 1, percentOff: 0 } as any]
    )
      .filter((t) => [1, 3, 6, 12].includes(t.minMonths))
      .map((t) => ({ months: t.minMonths as 1 | 3 | 6 | 12, percentOff: t.percentOff })),

    timeSlots,

    scheduling: {
      disableAutoBlockSchedule: false,
      capacityEnabled: true,
      capacityPerService,
      weekdaysByService,
      blackoutDates,
    },
  };

  return NextResponse.json(out);
}

export async function PUT(req: Request) {
  const body = (await req.json()) as PricingSettings;

  const tx = await prisma.$transaction(async (db) => {
    await db.adminSettings.upsert({
      where: { id: SETTINGS_ID },
      update: {
        storageEnabled: !!body.serviceEnabled.storage,
        movingEnabled: !!body.serviceEnabled.moving,
        shreddingEnabled: !!body.serviceEnabled.shredding,
        movingPricePerMileMinor: toMinor(body.pricePerMile),
        packingAssistanceMinor: toMinor(body.packingAssistancePrice),
      },
      create: {
        id: SETTINGS_ID,
        storageEnabled: !!body.serviceEnabled.storage,
        movingEnabled: !!body.serviceEnabled.moving,
        shreddingEnabled: !!body.serviceEnabled.shredding,
        movingPricePerMileMinor: toMinor(body.pricePerMile),
        packingAssistanceMinor: toMinor(body.packingAssistancePrice),
      },
    });

    for (const t of body.timeSlots) {
      const key = uiSlotToEnum(t.id);
      await db.timeSlotSetting.upsert({
        where: { key },
        update: { settingsId: SETTINGS_ID, key, label: t.label, enabled: !!t.enabled },
        create: { settingsId: SETTINGS_ID, key, label: t.label, enabled: !!t.enabled },
      });

      const { startTime, endTime } = parseRangeToStartEnd(t.range);
      await db.timeSlot.upsert({
        where: { name: t.id },
        update: { startTime, endTime, isActive: !!t.enabled },
        create: { name: t.id, startTime, endTime, isActive: !!t.enabled },
      });
    }

    for (const svc of ["storage", "moving", "shredding"] as const) {
      for (const slot of ["morning", "afternoon", "evening"] as const) {
        const capacity = Math.max(0, Number(body.scheduling.capacityPerService[svc][slot]) || 0);
        await db.capacitySetting.upsert({
          where: {
            settingsId_serviceType_slotKey: {
              settingsId: SETTINGS_ID,
              serviceType: uiSvcToEnum(svc),
              slotKey: uiSlotToEnum(slot),
            },
          },
          update: { capacity },
          create: {
            settingsId: SETTINGS_ID,
            serviceType: uiSvcToEnum(svc),
            slotKey: uiSlotToEnum(slot),
            capacity,
          },
        });
      }
    }
    for (const svc of ["storage", "moving", "shredding"] as const) {
      const map = body.scheduling.weekdaysByService[svc];
      for (const dayKey of Object.keys(map) as WeekdayKey[]) {
        await db.weekdayRule.upsert({
          where: {
            settingsId_serviceType_weekday: {
              settingsId: SETTINGS_ID,
              serviceType: uiSvcToEnum(svc),
              weekday: weekdayKeyToEnum[dayKey],
            },
          },
          update: { enabled: !!map[dayKey] },
          create: {
            settingsId: SETTINGS_ID,
            serviceType: uiSvcToEnum(svc),
            weekday: weekdayKeyToEnum[dayKey],
            enabled: !!map[dayKey],
          },
        });
      }
    }

    await db.blackoutDate.deleteMany({ where: { settingsId: SETTINGS_ID } });
    const dates = Array.from(new Set(body.scheduling.blackoutDates))
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort();

    if (dates.length) {
      await db.blackoutDate.createMany({
        data: dates.map((d) => ({
          settingsId: SETTINGS_ID,
          date: new Date(`${d}T00:00:00.000Z`),
        })),
        skipDuplicates: true,
      });
    }

    for (const tier of body.storageDiscounts) {
      await db.storageDiscountTier.upsert({
        where: { minMonths: tier.months },
        update: { percentOff: Math.max(0, Math.min(100, Number(tier.percentOff) || 0)), isActive: true },
        create: {
          minMonths: tier.months,
          percentOff: Math.max(0, Math.min(100, Number(tier.percentOff) || 0)),
          name: `${tier.months} months`,
          isActive: true,
        },
      });
    }
    async function upsertPrice(itemId: CatalogItemId, unitPriceMajor: number, billingUnit: BillingUnit) {
      await db.serviceItemPrice.upsert({
        where: { serviceItemId_currency: { serviceItemId: itemId, currency: CURRENCY } },
        update: { unitPriceMinor: toMinor(unitPriceMajor), billingUnit, isActive: true },
        create: { serviceItemId: itemId, currency: CURRENCY, unitPriceMinor: toMinor(unitPriceMajor), billingUnit, isActive: true },
      });
    }

    for (const [uiKey, itemId] of Object.entries(storageItemMap) as [keyof PricingSettings["storagePricePerMonth"], CatalogItemId][]) {
      await upsertPrice(itemId, body.storagePricePerMonth[uiKey], BillingUnit.PER_MONTH);
    }
    for (const [uiKey, itemId] of Object.entries(movingHomeTypeMap) as [keyof PricingSettings["movingHomeTypePrice"], CatalogItemId][]) {
      await upsertPrice(itemId, body.movingHomeTypePrice[uiKey], BillingUnit.FLAT);
    }

    await upsertPrice(shreddingItemMap.bagPrice, body.shredding.bagPrice, BillingUnit.PER_ITEM);
    await upsertPrice(shreddingItemMap.archiveBoxPrice, body.shredding.archiveBoxPrice, BillingUnit.PER_ITEM);

    return true;
  });

  return NextResponse.json({ ok: tx });
}