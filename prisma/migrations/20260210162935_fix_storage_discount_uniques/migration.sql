/*
  Warnings:

  - A unique constraint covering the columns `[currency,minMonths]` on the table `StorageDiscountTier` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serviceItemId,currency,minMonths]` on the table `StorageDiscountTier` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "StorageDiscountTier_scope_serviceItemId_currency_isActive_idx";

-- DropIndex
DROP INDEX "StorageDiscountTier_scope_serviceItemId_currency_minMonths_key";

-- CreateIndex
CREATE INDEX "StorageDiscountTier_serviceItemId_currency_isActive_idx" ON "StorageDiscountTier"("serviceItemId", "currency", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "StorageDiscountTier_currency_minMonths_key" ON "StorageDiscountTier"("currency", "minMonths");

-- CreateIndex
CREATE UNIQUE INDEX "StorageDiscountTier_serviceItemId_currency_minMonths_key" ON "StorageDiscountTier"("serviceItemId", "currency", "minMonths");
