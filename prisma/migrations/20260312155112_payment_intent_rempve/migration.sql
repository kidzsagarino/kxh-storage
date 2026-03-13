/*
  Warnings:

  - You are about to drop the column `paymentIntentId` on the `Payment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Payment_paymentIntentId_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "paymentIntentId";
