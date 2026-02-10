-- CreateEnum
CREATE TYPE "DiscountScope" AS ENUM ('GLOBAL', 'PER_ITEM');

-- CreateTable
CREATE TABLE "StorageDiscountTier" (
    "id" TEXT NOT NULL,
    "scope" "DiscountScope" NOT NULL DEFAULT 'GLOBAL',
    "serviceItemId" "CatalogItemId",
    "currency" TEXT NOT NULL DEFAULT 'GBP',
    "minMonths" INTEGER NOT NULL,
    "percentOff" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StorageDiscountTier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StorageDiscountTier_scope_serviceItemId_currency_isActive_idx" ON "StorageDiscountTier"("scope", "serviceItemId", "currency", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "StorageDiscountTier_scope_serviceItemId_currency_minMonths_key" ON "StorageDiscountTier"("scope", "serviceItemId", "currency", "minMonths");

-- AddForeignKey
ALTER TABLE "StorageDiscountTier" ADD CONSTRAINT "StorageDiscountTier_serviceItemId_fkey" FOREIGN KEY ("serviceItemId") REFERENCES "ServiceItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
