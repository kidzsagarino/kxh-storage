-- CreateEnum
CREATE TYPE "BillingUnit" AS ENUM ('PER_MONTH', 'PER_ITEM', 'FLAT');

-- DropIndex
DROP INDEX "OrderItem_orderId_idx";

-- DropIndex
DROP INDEX "OrderItem_serviceItemId_idx";

-- DropIndex
DROP INDEX "ServiceItemPrice_currency_idx";

-- DropIndex
DROP INDEX "ServiceItemPrice_isActive_idx";

-- AlterTable
ALTER TABLE "ServiceItemPrice" ADD COLUMN     "billingUnit" "BillingUnit" NOT NULL DEFAULT 'PER_ITEM';
