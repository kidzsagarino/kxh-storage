-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "movingDistanceCostMinor" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "movingPricePerMileMinor" INTEGER NOT NULL DEFAULT 0;
