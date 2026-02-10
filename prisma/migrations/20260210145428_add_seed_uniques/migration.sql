-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "serviceItemId" TEXT;

-- CreateTable
CREATE TABLE "ServiceItem" (
    "id" TEXT NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceItemPrice" (
    "id" TEXT NOT NULL,
    "serviceItemId" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'GBP',
    "unitPriceMinor" INTEGER NOT NULL,
    "effectiveFrom" TIMESTAMP(3),
    "effectiveTo" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceItemPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceItem_sku_key" ON "ServiceItem"("sku");

-- CreateIndex
CREATE INDEX "ServiceItem_serviceType_idx" ON "ServiceItem"("serviceType");

-- CreateIndex
CREATE INDEX "ServiceItem_isActive_idx" ON "ServiceItem"("isActive");

-- CreateIndex
CREATE INDEX "ServiceItemPrice_currency_idx" ON "ServiceItemPrice"("currency");

-- CreateIndex
CREATE INDEX "ServiceItemPrice_isActive_idx" ON "ServiceItemPrice"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceItemPrice_serviceItemId_currency_key" ON "ServiceItemPrice"("serviceItemId", "currency");

-- CreateIndex
CREATE INDEX "OrderItem_serviceItemId_idx" ON "OrderItem"("serviceItemId");

-- AddForeignKey
ALTER TABLE "ServiceItemPrice" ADD CONSTRAINT "ServiceItemPrice_serviceItemId_fkey" FOREIGN KEY ("serviceItemId") REFERENCES "ServiceItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_serviceItemId_fkey" FOREIGN KEY ("serviceItemId") REFERENCES "ServiceItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
