/*
  Warnings:

  - You are about to drop the column `bookingAndCollectionFeeMinor` on the `AdminSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdminSettings" DROP COLUMN "bookingAndCollectionFeeMinor",
ADD COLUMN     "movingAndCollectionFeeMinor" INTEGER NOT NULL DEFAULT 1495;
