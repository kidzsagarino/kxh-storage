-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "collectionFeeMinor" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "movingPackageAmountMinor" INTEGER NOT NULL DEFAULT 0;
