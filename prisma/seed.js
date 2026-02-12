const { PrismaClient, ServiceType, BillingUnit, DiscountScope } = require("@prisma/client");

const prisma = new PrismaClient();
const GBP = "GBP";

async function seedTimeSlots() {
  const slots = [
    { name: "Morning", startTime: "07:00", endTime: "10:00" },
    { name: "Afternoon", startTime: "10:00", endTime: "15:00" },
    { name: "Evening", startTime: "15:00", endTime: "18:00" },
  ];

  for (const s of slots) {
    await prisma.timeSlot.upsert({
      where: { name: s.name },
      create: s,
      update: {},
    });
  }
}

async function seedServiceItemsAndPrices() {
  const items = [
    // STORAGE (monthly)
    { id: "small_box", serviceType: ServiceType.STORAGE, sku: "small-box", name: "Small Box", unit: BillingUnit.PER_MONTH, price: 500 },
    { id: "medium_box", serviceType: ServiceType.STORAGE, sku: "medium-box", name: "Medium Box", unit: BillingUnit.PER_MONTH, price: 800 },
    { id: "large_box", serviceType: ServiceType.STORAGE, sku: "large-box", name: "Large Box", unit: BillingUnit.PER_MONTH, price: 1200 },
    { id: "xl_box", serviceType: ServiceType.STORAGE, sku: "xl-box", name: "XL Box", unit: BillingUnit.PER_MONTH, price: 1500 },
    { id: "suitcase", serviceType: ServiceType.STORAGE, sku: "suitcase", name: "Suitcase", unit: BillingUnit.PER_MONTH, price: 1000 },
    { id: "half_container", serviceType: ServiceType.STORAGE, sku: "half-container", name: "Half Container", unit: BillingUnit.PER_MONTH, price: 7500 },
    { id: "full_container", serviceType: ServiceType.STORAGE, sku: "full-container", name: "Full Container", unit: BillingUnit.PER_MONTH, price: 15000 },

    // MOVING (flat)
    { id: "small_move", serviceType: ServiceType.MOVING, sku: "small-move", name: "Small Move", unit: BillingUnit.FLAT, price: 15000 },
    { id: "one_bedroom_flat", serviceType: ServiceType.MOVING, sku: "1-bedroom-flat", name: "1 Bedroom Flat", unit: BillingUnit.FLAT, price: 25000 },
    { id: "two_bedroom_flat", serviceType: ServiceType.MOVING, sku: "2-bedroom-flat", name: "2 Bedroom Flat", unit: BillingUnit.FLAT, price: 35000 },
    { id: "three_bedroom_flat", serviceType: ServiceType.MOVING, sku: "3-bedroom-flat", name: "3 Bedroom Flat", unit: BillingUnit.FLAT, price: 45000 },
    { id: "four_bedroom_flat", serviceType: ServiceType.MOVING, sku: "4-bedroom-flat", name: "4 Bedroom Flat", unit: BillingUnit.FLAT, price: 60000 },
    { id: "office_move", serviceType: ServiceType.MOVING, sku: "office-move", name: "Office Move", unit: BillingUnit.FLAT, price: 90000 },

    // SHREDDING (per item)
    { id: "bag", serviceType: ServiceType.SHREDDING, sku: "bag", name: "Bag", unit: BillingUnit.PER_ITEM, price: 1000 },
    { id: "archive_box", serviceType: ServiceType.SHREDDING, sku: "archive-box", name: "Archive Box", unit: BillingUnit.PER_ITEM, price: 1500 },
  ];

  for (const it of items) {
    await prisma.serviceItem.upsert({
      where: { sku: it.sku },
      create: {
        id: it.id,
        serviceType: it.serviceType,
        sku: it.sku,
        name: it.name,
        isActive: true,
      },
      update: {
        serviceType: it.serviceType,
        name: it.name,
        isActive: true,
      },
    });

    await prisma.serviceItemPrice.upsert({
      where: {
        serviceItemId_currency: {
          serviceItemId: it.id,
          currency: GBP,
        },
      },
      create: {
        serviceItemId: it.id,
        currency: GBP,
        unitPriceMinor: it.price,
        billingUnit: it.unit,
        isActive: true,
      },
      update: {
        unitPriceMinor: it.price,
        billingUnit: it.unit,
        isActive: true,
      },
    });
  }
}

async function seedMovingPackages() {
  const packages = [
    { id: "basic_package", sku: "basic-package", name: "Basic Package", priceMinor: 0 },
    { id: "move_and_pack", sku: "move-and-pack", name: "Move & Pack", priceMinor: 25000 },
  ];

  for (const p of packages) {
    await prisma.movingPackage.upsert({
      where: { sku: p.sku },
      create: { id: p.id, sku: p.sku, name: p.name, isActive: true },
      update: { name: p.name, isActive: true },
    });

    await prisma.movingPackagePrice.upsert({
      where: {
        packageId_currency: {
          packageId: p.id,
          currency: GBP,
        },
      },
      create: { packageId: p.id, currency: GBP, priceMinor: p.priceMinor, isActive: true },
      update: { priceMinor: p.priceMinor, isActive: true },
    });
  }
}

async function seedStorageDiscountTiers() {
  // Your rules:
  // 1 month: 0%
  // 3 months: 5%
  // 6 months: 10%
  // 12 months: 15%
  const tiers = [
    { minMonths: 1, percentOff: 0 },
    { minMonths: 3, percentOff: 5 },
    { minMonths: 6, percentOff: 10 },
    { minMonths: 12, percentOff: 15 },
  ];

  for (const t of tiers) {
    await prisma.storageDiscountTier.upsert({
      where: {
        global_storage_discount_tier: {
          currency: "GBP",
          minMonths: t.minMonths,
        },
      },
      create: {
        scope: "GLOBAL",
        currency: "GBP",
        minMonths: t.minMonths,
        percentOff: t.percentOff,
        isActive: true,
      },
      update: {
        percentOff: t.percentOff,
        isActive: true,
      },
    });

  }
}

async function seedWeekdayRule() {
  
}

async function seedAdminSettings() {
  // Create or find the single settings row
  const settings = await prisma.adminSettings.findFirst() ??
    await prisma.adminSettings.create({ data: {} });

  // Time slot settings
  const slotDefaults = [
    { key: "MORNING", label: "Morning", range: "7am – 10am", enabled: true },
    { key: "AFTERNOON", label: "Afternoon", range: "10am – 3pm", enabled: true },
    { key: "EVENING", label: "Evening", range: "3pm – 6pm", enabled: true },
  ];

  for (const s of slotDefaults) {
    await prisma.timeSlotSetting.upsert({
      where: { key: s.key },
      create: { settingsId: settings.id, ...s },
      update: { label: s.label, range: s.range, enabled: s.enabled },
    });
  }

  // Capacity defaults (same as your UI)
  const caps = [
    ["STORAGE", "MORNING", 6],
    ["STORAGE", "AFTERNOON", 8],
    ["STORAGE", "EVENING", 6],
    ["MOVING", "MORNING", 3],
    ["MOVING", "AFTERNOON", 3],
    ["MOVING", "EVENING", 2],
    ["SHREDDING", "MORNING", 10],
    ["SHREDDING", "AFTERNOON", 12],
    ["SHREDDING", "EVENING", 10],
  ];

  for (const [serviceType, slotKey, capacity] of caps) {
    await prisma.capacitySetting.upsert({
      where: {
        settingsId_serviceType_slotKey: {
          settingsId: settings.id,
          serviceType,
          slotKey,
        },
      },
      create: { settingsId: settings.id, serviceType, slotKey, capacity },
      update: { capacity },
    });
  }

  const weekdayKeys = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  function isWeekend(day) {
    return day === "SAT" || day === "SUN";
  }

  const services = ["STORAGE", "MOVING", "SHREDDING"];

  for (const serviceType of services) {
    for (const weekday of weekdayKeys) {
      const enabled =
        serviceType === "MOVING"
          ? true // ✅ moving open all week (including weekends)
          : !isWeekend(weekday); // ✅ storage/shredding closed weekends

      await prisma.weekdayRule.upsert({
        where: {
          settingsId_serviceType_weekday: {
            settingsId: settings.id,
            serviceType,
            weekday,
          },
        },
        create: {
          settingsId: settings.id,
          serviceType,
          weekday,
          enabled,
        },
        update: { enabled },
      });
    }
  }
}

async function main() {
  console.log("🌱 Seeding...");
  await seedTimeSlots();
  await seedServiceItemsAndPrices();
  await seedMovingPackages();
  await seedStorageDiscountTiers();
  await seedAdminSettings();

  console.log("✅ Done");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
