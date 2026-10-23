/*
  Warnings:

  - A unique constraint covering the columns `[minMonths]` on the table `StorageDiscountTier` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "StorageDiscountTier_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "StorageDiscountTier_minMonths_key" ON "StorageDiscountTier"("minMonths");
