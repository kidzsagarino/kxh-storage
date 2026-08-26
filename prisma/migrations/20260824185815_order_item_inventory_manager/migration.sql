-- CreateTable
CREATE TABLE "OrderInventoryAccessToken" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderInventoryAccessToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderInventoryItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT,
    "condition" TEXT,
    "location" TEXT,
    "notes" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderInventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderInventoryAccessToken_token_key" ON "OrderInventoryAccessToken"("token");

-- CreateIndex
CREATE INDEX "OrderInventoryAccessToken_orderId_idx" ON "OrderInventoryAccessToken"("orderId");

-- CreateIndex
CREATE INDEX "OrderInventoryAccessToken_expiresAt_idx" ON "OrderInventoryAccessToken"("expiresAt");

-- CreateIndex
CREATE INDEX "OrderInventoryItem_orderId_idx" ON "OrderInventoryItem"("orderId");

-- AddForeignKey
ALTER TABLE "OrderInventoryAccessToken" ADD CONSTRAINT "OrderInventoryAccessToken_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderInventoryItem" ADD CONSTRAINT "OrderInventoryItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
