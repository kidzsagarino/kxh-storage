/*
  Warnings:

  - You are about to drop the column `label` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `line2` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `capacityEnabled` on the `AdminSettings` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `AdminSettings` table. All the data in the column will be lost.
  - You are about to drop the column `disableAutoBlockSchedule` on the `AdminSettings` table. All the data in the column will be lost.
  - You are about to drop the column `effectiveFrom` on the `MovingPackagePrice` table. All the data in the column will be lost.
  - You are about to drop the column `effectiveTo` on the `MovingPackagePrice` table. All the data in the column will be lost.
  - You are about to drop the column `externalRef` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `raw` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `receiptUrl` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `effectiveFrom` on the `ServiceItemPrice` table. All the data in the column will be lost.
  - You are about to drop the column `effectiveTo` on the `ServiceItemPrice` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `StorageDiscountTier` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `StorageDiscountTier` table. All the data in the column will be lost.
  - You are about to drop the column `serviceItemId` on the `StorageDiscountTier` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TimeSlotSetting` table. All the data in the column will be lost.
  - You are about to drop the column `range` on the `TimeSlotSetting` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TimeSlotSetting` table. All the data in the column will be lost.
  - You are about to drop the `Setting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StorageDiscountTier" DROP CONSTRAINT "StorageDiscountTier_serviceItemId_fkey";

-- DropIndex
DROP INDEX "BlackoutDate_date_idx";

-- DropIndex
DROP INDEX "CapacitySetting_serviceType_idx";

-- DropIndex
DROP INDEX "MovingPackage_isActive_idx";

-- DropIndex
DROP INDEX "MovingPackagePrice_currency_idx";

-- DropIndex
DROP INDEX "MovingPackagePrice_isActive_idx";

-- DropIndex
DROP INDEX "Order_serviceType_idx";

-- DropIndex
DROP INDEX "OrderItem_serviceItemId_idx";

-- DropIndex
DROP INDEX "Payment_orderId_idx";

-- DropIndex
DROP INDEX "Payment_provider_idx";

-- DropIndex
DROP INDEX "Payment_status_idx";

-- DropIndex
DROP INDEX "StorageDiscountTier_currency_minMonths_key";

-- DropIndex
DROP INDEX "StorageDiscountTier_serviceItemId_currency_isActive_idx";

-- DropIndex
DROP INDEX "StorageDiscountTier_serviceItemId_currency_minMonths_key";

-- DropIndex
DROP INDEX "WeekdayRule_serviceType_idx";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "label",
DROP COLUMN "line2",
DROP COLUMN "region";

-- AlterTable
ALTER TABLE "AdminSettings" DROP COLUMN "capacityEnabled",
DROP COLUMN "createdAt",
DROP COLUMN "disableAutoBlockSchedule",
ALTER COLUMN "id" SET DEFAULT 'global_settings';

-- AlterTable
ALTER TABLE "CapacitySetting" ALTER COLUMN "capacity" SET DEFAULT 5;

-- AlterTable
ALTER TABLE "MovingPackagePrice" DROP COLUMN "effectiveFrom",
DROP COLUMN "effectiveTo";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "externalRef",
DROP COLUMN "metadata",
ADD COLUMN     "discountTierId" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "details";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "currency",
DROP COLUMN "raw",
DROP COLUMN "receiptUrl",
ALTER COLUMN "status" SET DEFAULT 'PROCESSING';

-- AlterTable
ALTER TABLE "ServiceItemPrice" DROP COLUMN "effectiveFrom",
DROP COLUMN "effectiveTo";

-- AlterTable
ALTER TABLE "StorageDiscountTier" DROP COLUMN "currency",
DROP COLUMN "scope",
DROP COLUMN "serviceItemId",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "TimeSlotSetting" DROP COLUMN "createdAt",
DROP COLUMN "range",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "Setting";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_discountTierId_fkey" FOREIGN KEY ("discountTierId") REFERENCES "StorageDiscountTier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
