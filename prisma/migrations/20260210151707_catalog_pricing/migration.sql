/*
  Warnings:

  - The `serviceItemId` column on the `OrderItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ServiceItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `ServiceItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `serviceItemId` on the `ServiceItemPrice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CatalogItemId" AS ENUM ('small_box', 'medium_box', 'large_box', 'xl_box', 'suitcase', 'half_container', 'full_container', 'small_move', 'one_bedroom_flat', 'two_bedroom_flat', 'three_bedroom_flat', 'four_bedroom_flat', 'office_move', 'bag', 'archive_box');

-- CreateEnum
CREATE TYPE "MovingPackageId" AS ENUM ('basic_package', 'move_and_pack');

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_serviceItemId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceItemPrice" DROP CONSTRAINT "ServiceItemPrice_serviceItemId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "serviceItemId",
ADD COLUMN     "serviceItemId" "CatalogItemId";

-- AlterTable
ALTER TABLE "ServiceItem" DROP CONSTRAINT "ServiceItem_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" "CatalogItemId" NOT NULL,
ADD CONSTRAINT "ServiceItem_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ServiceItemPrice" DROP COLUMN "serviceItemId",
ADD COLUMN     "serviceItemId" "CatalogItemId" NOT NULL;

-- CreateTable
CREATE TABLE "MovingPackage" (
    "id" "MovingPackageId" NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovingPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovingPackagePrice" (
    "id" TEXT NOT NULL,
    "packageId" "MovingPackageId" NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'GBP',
    "priceMinor" INTEGER NOT NULL,
    "effectiveFrom" TIMESTAMP(3),
    "effectiveTo" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovingPackagePrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MovingPackage_sku_key" ON "MovingPackage"("sku");

-- CreateIndex
CREATE INDEX "MovingPackage_isActive_idx" ON "MovingPackage"("isActive");

-- CreateIndex
CREATE INDEX "MovingPackagePrice_currency_idx" ON "MovingPackagePrice"("currency");

-- CreateIndex
CREATE INDEX "MovingPackagePrice_isActive_idx" ON "MovingPackagePrice"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "MovingPackagePrice_packageId_currency_key" ON "MovingPackagePrice"("packageId", "currency");

-- CreateIndex
CREATE INDEX "OrderItem_serviceItemId_idx" ON "OrderItem"("serviceItemId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceItemPrice_serviceItemId_currency_key" ON "ServiceItemPrice"("serviceItemId", "currency");

-- AddForeignKey
ALTER TABLE "ServiceItemPrice" ADD CONSTRAINT "ServiceItemPrice_serviceItemId_fkey" FOREIGN KEY ("serviceItemId") REFERENCES "ServiceItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovingPackagePrice" ADD CONSTRAINT "MovingPackagePrice_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "MovingPackage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_serviceItemId_fkey" FOREIGN KEY ("serviceItemId") REFERENCES "ServiceItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
