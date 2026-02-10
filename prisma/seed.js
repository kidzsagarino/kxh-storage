const { PrismaClient, ServiceType } = require("@prisma/client");

const prisma = new PrismaClient();

const GBP = "GBP";

function item(id, serviceType, sku, name, unitPriceMinor) {
  return { id, serviceType, sku, name, unitPriceMinor };
}

async function main() {
  console.log("🌱 Seeding catalog + defaults...");

  // ---- Time slots ----
  const slots = [
    { name: "Morning", startTime: "09:00", endTime: "12:00" },
    { name: "Afternoon", startTime: "12:00", endTime: "17:00" },
    { name: "Evening", startTime: "17:00", endTime: "20:00" },
  ];

  for (const s of slots) {
    await prisma.timeSlot.upsert({
      where: { name: s.name },
      create: s,
      update: {},
    });
  }

  // ---- Service items (your IDs) ----
  const items = [
    // STORAGE
    item("small_box", ServiceType.STORAGE, "small-box", "Small Box", 500),
    item("medium_box", ServiceType.STORAGE, "medium-box", "Medium Box", 800),
    item("large_box", ServiceType.STORAGE, "large-box", "Large Box", 1200),
    item("xl_box", ServiceType.STORAGE, "xl-box", "XL Box", 1500),
    item("suitcase", ServiceType.STORAGE, "suitcase", "Suitcase", 1000),
    item("half_container", ServiceType.STORAGE, "half-container", "Half Container", 7500),
    item("full_container", ServiceType.STORAGE, "full-container", "Full Container", 15000),

    // MOVING
    item("small_move", ServiceType.MOVING, "small-move", "Small Move", 15000),
    item("one_bedroom_flat", ServiceType.MOVING, "1-bedroom-flat", "1 Bedroom Flat", 25000),
    item("two_bedroom_flat", ServiceType.MOVING, "2-bedroom-flat", "2 Bedroom Flat", 35000),
    item("three_bedroom_flat", ServiceType.MOVING, "3-bedroom-flat", "3 Bedroom Flat", 45000),
    item("four_bedroom_flat", ServiceType.MOVING, "4-bedroom-flat", "4 Bedroom Flat", 60000),
    item("office_move", ServiceType.MOVING, "office-move", "Office Move", 90000),

    // SHREDDING
    item("bag", ServiceType.SHREDDING, "bag", "Shredding Bag", 1000),
    item("archive_box", ServiceType.SHREDDING, "archive-box", "Archive Box", 1500),
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
        unitPriceMinor: it.unitPriceMinor,
        isActive: true,
      },
      update: {
        unitPriceMinor: it.unitPriceMinor,
        isActive: true,
      },
    });
  }

  // ---- Moving packages ----
  const packages = [
    { id: "basic_package", sku: "basic-package", name: "Basic Package", priceMinor: 0 },
    { id: "move_and_pack", sku: "move-and-pack", name: "Move & Pack", priceMinor: 25000 },
  ];

  for (const p of packages) {
    await prisma.movingPackage.upsert({
      where: { sku: p.sku },
      create: {
        id: p.id,
        sku: p.sku,
        name: p.name,
        isActive: true,
      },
      update: {
        name: p.name,
        isActive: true,
      },
    });

    await prisma.movingPackagePrice.upsert({
      where: {
        packageId_currency: {
          packageId: p.id,
          currency: GBP,
        },
      },
      create: {
        packageId: p.id,
        currency: GBP,
        priceMinor: p.priceMinor,
        isActive: true,
      },
      update: {
        priceMinor: p.priceMinor,
        isActive: true,
      },
    });
  }

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
