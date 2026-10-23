/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `OrderInventoryAccessToken` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "OrderInventoryAccessToken_expiresAt_idx";

-- AlterTable
ALTER TABLE "OrderInventoryAccessToken" DROP COLUMN "expiresAt";
