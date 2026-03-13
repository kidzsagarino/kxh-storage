const { PrismaClient, ServiceType, BillingUnit, Weekday, TimeSlotKey } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
const GBP = "GBP";
const SETTINGS_ID = "global_settings"; // Standardized singleton ID

async function seedTimeSlots() {
  console.log("🧹 Seeding TimeSlots (canonical) ...");

  const canonical = [
    { name: "morning", startTime: "07:00", endTime: "10:00", isActive: true },
    { name: "afternoon", startTime: "10:00", endTime: "15:00", isActive: true },
    { name: "evening", startTime: "15:00", endTime: "18:00", isActive: true },
  ];

  // helper to convert "10am" -> "10:00" (only if needed)
  function to24(time) {
    if (!time) return null;
    const s = String(time).trim().toLowerCase();

    if (/^\d{2}:\d{2}$/.test(s)) return s;

    const m = s.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/);
    if (!m) return null;

    let h = Number(m[1]);
    const min = m[2] ? Number(m[2]) : 0;
    const mer = m[3];

    if (mer === "am") {
      if (h === 12) h = 0;
    } else {
      if (h !== 12) h += 12;
    }

    return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
  }

  const existing = await prisma.timeSlot.findMany();
  for (const s of existing) {
    const start = to24(s.startTime) ?? s.startTime;
    const end = to24(s.endTime) ?? s.endTime;

    if (start !== s.startTime || end !== s.endTime) {
      await prisma.timeSlot.update({
        where: { id: s.id },
        data: { startTime: start, endTime: end },
      });
    }
  }
  const titleToCanon = {
    Morning: "morning",
    Afternoon: "afternoon",
    Evening: "evening",
  };

  for (const [title, canonName] of Object.entries(titleToCanon)) {
    const oldSlot = await prisma.timeSlot.findUnique({ where: { name: title } });
    if (!oldSlot) continue;

    const canonSlot =
      (await prisma.timeSlot.findUnique({ where: { name: canonName } })) ||
      (await prisma.timeSlot.create({
        data: canonical.find((x) => x.name === canonName),
      }));

    await prisma.order.updateMany({
      where: { timeSlotId: oldSlot.id },
      data: { timeSlotId: canonSlot.id },
    });
  }

  await prisma.timeSlot.deleteMany({
    where: { name: { in: ["Morning", "Afternoon", "Evening"] } },
  });

  await prisma.timeSlot.deleteMany({
    where: {
      AND: [
        { name: { in: ["MORNING", "AFTERNOON", "EVENING"] } },
      ],
    },
  });

  for (const s of canonical) {
    await prisma.timeSlot.upsert({
      where: { name: s.name },
      create: s,
      update: { startTime: s.startTime, endTime: s.endTime, isActive: s.isActive },
    });
  }

  console.log("✅ TimeSlots seeded & normalized");
}


async function seedServiceItemsAndPrices() {
  const items = [
    { id: "small_box", serviceType: ServiceType.STORAGE, sku: "small-box", name: "Small Box (36 x 36 x 36 cm)", unit: BillingUnit.PER_MONTH, price: 500 },
    { id: "medium_box", serviceType: ServiceType.STORAGE, sku: "medium-box", name: "Medium Box (46 x 46 x 31 cm)", unit: BillingUnit.PER_MONTH, price: 800 },
    { id: "large_box", serviceType: ServiceType.STORAGE, sku: "large-box", name: "Large Box (46 x 46x 61 cm)", unit: BillingUnit.PER_MONTH, price: 1200 },
    { id: "xl_box", serviceType: ServiceType.STORAGE, sku: "xl-box", name: "XL Box (45 x 45 x 75cm)", unit: BillingUnit.PER_MONTH, price: 1500 },
    { id: "suitcase", serviceType: ServiceType.STORAGE, sku: "suitcase", name: "Suitcase: Hard shelled suitcase", unit: BillingUnit.PER_MONTH, price: 1000 },
    { id: "half_container", serviceType: ServiceType.STORAGE, sku: "half-container", name: "Half Container (25sqft)", unit: BillingUnit.PER_MONTH, price: 7500 },
    { id: "full_container", serviceType: ServiceType.STORAGE, sku: "full-container", name: "Full Container (50sqft)", unit: BillingUnit.PER_MONTH, price: 15000 },

    { id: "small_move", serviceType: ServiceType.MOVING, sku: "small-move", name: "Small Move", unit: BillingUnit.FLAT, price: 29500 },
    { id: "one_bedroom_flat", serviceType: ServiceType.MOVING, sku: "1-bedroom-flat", name: "1 Bedroom Flat", unit: BillingUnit.FLAT, price: 44900 },
    { id: "two_bedroom_flat", serviceType: ServiceType.MOVING, sku: "2-bedroom-flat", name: "2 Bedroom Flat", unit: BillingUnit.FLAT, price: 79000 },
    { id: "three_bedroom_flat", serviceType: ServiceType.MOVING, sku: "3-bedroom-flat", name: "3 Bedroom Flat", unit: BillingUnit.FLAT, price: 113100 },
    { id: "four_bedroom_flat", serviceType: ServiceType.MOVING, sku: "4-bedroom-flat", name: "4 Bedroom Flat", unit: BillingUnit.FLAT, price: 135800 },
    { id: "office_move", serviceType: ServiceType.MOVING, sku: "office-move", name: "Office Move", unit: BillingUnit.FLAT, price: 175000 },

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
  const settings = await prisma.adminSettings.upsert({
    where: { id: SETTINGS_ID },
    update: {},
    create: { id: SETTINGS_ID },
  });

  const slotDefaults = [
    { key: "MORNING", label: "Morning (7am – 10am)", enabled: true },
    { key: "AFTERNOON", label: "Afternoon (10am – 3pm)", enabled: true },
    { key: "EVENING", label: "Evening (3pm – 6pm)", enabled: true },
  ];

  for (const s of slotDefaults) {
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
}

async function seedCapacityAndRules() {
  console.log("🧹 Initializing Capacity and Rules...");

  const globalSettings = await prisma.adminSettings.upsert({
    where: { id: SETTINGS_ID },
    update: {
      storageEnabled: true,
      movingEnabled: true,
      shreddingEnabled: true,
      movingPricePerMileMinor: 58
    },
    create: {
      id: SETTINGS_ID,
      storageEnabled: true,
      movingEnabled: true,
      shreddingEnabled: true,
      movingPricePerMileMinor: 58
    },
  });

  await prisma.weekdayRule.deleteMany({ where: { settingsId: globalSettings.id } });
  await prisma.capacitySetting.deleteMany({ where: { settingsId: globalSettings.id } });

  const days = Object.values(Weekday);
  const services = [ServiceType.STORAGE, ServiceType.MOVING, ServiceType.SHREDDING];

  for (const service of services) {
    for (const day of days) {
      const isWeekend = day === Weekday.SAT || day === Weekday.SUN;

      await prisma.weekdayRule.create({
        data: {
          settingsId: globalSettings.id,
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
          capacity: 100,
        },
      });
    }
  }
}

async function seedMovingPackage() {
  console.log('🌱 Seeding Moving Packages and Prices...');

  const basic = await prisma.movingPackage.upsert({
    where: { id: 'basic_package' },
    update: { name: 'Basic Package', isActive: true },
    create: {
      id: 'basic_package',
      sku: 'MOV-BASIC',
      name: 'Basic Package',
      description: 'Standard moving service.',
      isActive: true,
    },
  });

  await prisma.movingPackagePrice.upsert({
    where: {
      packageId_currency: { packageId: basic.id, currency: 'GBP' }
    },
    update: { priceMinor: 0 },
    create: {
      packageId: basic.id,
      currency: 'GBP',
      priceMinor: 0,
      isActive: true,
    },
  });
  const pack = await prisma.movingPackage.upsert({
    where: { id: 'move_and_pack' },
    update: { name: 'Move and Pack', isActive: true },
    create: {
      id: 'move_and_pack',
      sku: 'MOV-PACK',
      name: 'Move and Pack',
      description: 'Professional packing service included.',
      isActive: true,
    },
  });

  await prisma.movingPackagePrice.upsert({
    where: {
      packageId_currency: { packageId: pack.id, currency: 'GBP' }
    },
    update: { priceMinor: 29500 },
    create: {
      packageId: pack.id,
      currency: 'GBP',
      priceMinor: 29500,
      isActive: true,
    },
  });

  console.log('✅ Seeding completed successfully.');
}

async function seedAdminUser() {
  const passwordHash = await bcrypt.hash("KHciHM690", 12);

  await prisma.adminUser.upsert({
    where: { email: "admin@kxhlogistics.co.uk" },
    update: {},
    create: {
      email: "admin@kxhlogistics.co.uk",
      name: "Main Admin",
      passwordHash,
      role: "ADMIN",
    },
  });
  
  console.log('✅ User Admin Seeding completed successfully.');
}

async function main() {
  console.log("🌱 Seeding Database...");
  await seedTimeSlots();
  await seedServiceItemsAndPrices();
  await seedStorageDiscountTiers();
  await seedAdminSettings();
  await seedCapacityAndRules();
  await seedMovingPackage();
  await seedAdminUser();
  console.log("✅ Seed Complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());