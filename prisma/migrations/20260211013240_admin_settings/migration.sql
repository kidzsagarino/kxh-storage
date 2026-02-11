-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');

-- CreateEnum
CREATE TYPE "TimeSlotKey" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING');

-- CreateTable
CREATE TABLE "TimeSlotSetting" (
    "id" TEXT NOT NULL,
    "settingsId" TEXT NOT NULL,
    "key" "TimeSlotKey" NOT NULL,
    "label" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeSlotSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CapacitySetting" (
    "id" TEXT NOT NULL,
    "settingsId" TEXT NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "slotKey" "TimeSlotKey" NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CapacitySetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeekdayRule" (
    "id" TEXT NOT NULL,
    "settingsId" TEXT NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "weekday" "Weekday" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "WeekdayRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlackoutDate" (
    "id" TEXT NOT NULL,
    "settingsId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,

    CONSTRAINT "BlackoutDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminSettings" (
    "id" TEXT NOT NULL,
    "storageEnabled" BOOLEAN NOT NULL DEFAULT true,
    "movingEnabled" BOOLEAN NOT NULL DEFAULT true,
    "shreddingEnabled" BOOLEAN NOT NULL DEFAULT true,
    "movingPricePerMileMinor" INTEGER NOT NULL DEFAULT 58,
    "packingAssistanceMinor" INTEGER NOT NULL DEFAULT 29500,
    "disableAutoBlockSchedule" BOOLEAN NOT NULL DEFAULT false,
    "capacityEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TimeSlotSetting_key_key" ON "TimeSlotSetting"("key");

-- CreateIndex
CREATE INDEX "CapacitySetting_serviceType_idx" ON "CapacitySetting"("serviceType");

-- CreateIndex
CREATE UNIQUE INDEX "CapacitySetting_settingsId_serviceType_slotKey_key" ON "CapacitySetting"("settingsId", "serviceType", "slotKey");

-- CreateIndex
CREATE INDEX "WeekdayRule_serviceType_idx" ON "WeekdayRule"("serviceType");

-- CreateIndex
CREATE UNIQUE INDEX "WeekdayRule_settingsId_serviceType_weekday_key" ON "WeekdayRule"("settingsId", "serviceType", "weekday");

-- CreateIndex
CREATE INDEX "BlackoutDate_date_idx" ON "BlackoutDate"("date");

-- CreateIndex
CREATE UNIQUE INDEX "BlackoutDate_settingsId_date_key" ON "BlackoutDate"("settingsId", "date");

-- AddForeignKey
ALTER TABLE "TimeSlotSetting" ADD CONSTRAINT "TimeSlotSetting_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "AdminSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CapacitySetting" ADD CONSTRAINT "CapacitySetting_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "AdminSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekdayRule" ADD CONSTRAINT "WeekdayRule_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "AdminSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlackoutDate" ADD CONSTRAINT "BlackoutDate_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "AdminSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
