/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `StorageDiscountTier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StorageDiscountTier_name_key" ON "StorageDiscountTier"("name");
