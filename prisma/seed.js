const { PrismaClient, ServiceType, BillingUnit, Weekday, TimeSlotKey } = require("@prisma/client");

const prisma = new PrismaClient();
const GBP = "GBP";
const SETTINGS_ID = "global_settings"; // Standardized singleton ID

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
      update: { name: it.name, isActive: true },
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
      update: { unitPriceMinor: it.price, billingUnit: it.unit },
    });
  }
}

async function seedStorageDiscountTiers() {
  const tiers = [
    { name: "Pay Monthly", minMonths: 1, percentOff: 0 },
    { name: "3 Month Saver", minMonths: 3, percentOff: 5 },
    { name: "6 Month Saver", minMonths: 6, percentOff: 10 },
    { name: "Annual Deal", minMonths: 12, percentOff: 15 },
  ];

  for (const t of tiers) {
    await prisma.storageDiscountTier.upsert({
      where: { minMonths: t.minMonths },
      create: {
        name: t.name,
        minMonths: t.minMonths,
        percentOff: t.percentOff,
        isActive: true,
      },
      update: {
        name: t.name,
        percentOff: t.percentOff,
        isActive: true,
      },
    });
  }
}

async function seedAdminSettings() {
  // 1. Ensure the global settings row exists
  const settings = await prisma.adminSettings.upsert({
    where: { id: SETTINGS_ID },
    update: {},
    create: { id: SETTINGS_ID },
  });

  // 2. Time slot settings
  const slotDefaults = [
    { key: "MORNING", label: "Morning (7am – 10am)", enabled: true },
    { key: "AFTERNOON", label: "Afternoon (10am – 3pm)", enabled: true },
    { key: "EVENING", label: "Evening (3pm – 6pm)", enabled: true },
  ];

  for (const s of slotDefaults) {
    // Check for existing record manually since 'key' isn't @unique
    const existing = await prisma.timeSlotSetting.findFirst({
      where: { key: s.key, settingsId: settings.id }
    });

    if (existing) {
      await prisma.timeSlotSetting.update({
        where: { id: existing.id },
        data: {
          label: s.label,
          enabled: s.enabled,
        }
      });
    } else {
      await prisma.timeSlotSetting.create({
        data: {
          settingsId: settings.id,
          key: s.key,
          label: s.label,
          enabled: s.enabled,
        }
      });
    }
  }
  
  // ... rest of your capacity and weekday rule seeding
}

async function seedCapacityAndRules() {
  console.log("🧹 Initializing Capacity and Rules...");

  // 1. Force the parent record to exist and capture the result
  // Using 'upsert' ensures we don't crash if it exists, 
  // and 'update' ensures we have the latest fields.
  const globalSettings = await prisma.adminSettings.upsert({
    where: { id: SETTINGS_ID },
    update: {
      storageEnabled: true,
      movingEnabled: true,
      shreddingEnabled: true,
    },
    create: {
      id: SETTINGS_ID,
      storageEnabled: true,
      movingEnabled: true,
      shreddingEnabled: true,
    },
  });

  // 2. Clear old rules to avoid constraint conflicts during seed
  await prisma.weekdayRule.deleteMany({ where: { settingsId: globalSettings.id } });
  await prisma.capacitySetting.deleteMany({ where: { settingsId: globalSettings.id } });

  const days = Object.values(Weekday); // Use Prisma's enum values directly
  const services = [ServiceType.STORAGE, ServiceType.MOVING, ServiceType.SHREDDING];

  // 3. Seed Weekday Rules
  for (const service of services) {
    for (const day of days) {
      const isWeekend = day === Weekday.SAT || day === Weekday.SUN;
      
      await prisma.weekdayRule.create({
        data: {
          settingsId: globalSettings.id, // Reference the object we just upserted
          serviceType: service,
          weekday: day,
          enabled: !isWeekend,
        },
      });
    }
  }

  const slots = [TimeSlotKey.MORNING, TimeSlotKey.AFTERNOON, TimeSlotKey.EVENING];
  
  for (const service of services) {
    for (const slot of slots) {
      await prisma.capacitySetting.create({
        data: {
          settingsId: globalSettings.id,
          serviceType: service,
          slotKey: slot,
          capacity: 5, // Defaulting to 5 for all slots
        },
      });
    }
  }
}

async function main() {
  console.log("🌱 Seeding Database...");
  await seedTimeSlots();
  await seedServiceItemsAndPrices();
  await seedStorageDiscountTiers();
  await seedAdminSettings();
  await seedCapacityAndRules();
  console.log("✅ Seed Complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());