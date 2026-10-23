-- CreateEnum
CREATE TYPE "BillingScheduleStatus" AS ENUM ('SCHEDULED', 'PAYMENT_PENDING', 'PAID', 'OVERDUE', 'CANCELED');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "billingScheduleId" TEXT;

-- CreateTable
CREATE TABLE "OrderBillingSchedule" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "installmentNumber" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "amountMinor" INTEGER NOT NULL,
    "status" "BillingScheduleStatus" NOT NULL DEFAULT 'SCHEDULED',
    "paidAt" TIMESTAMP(3),
    "reminderSentAt" TIMESTAMP(3),
    "stripeCheckoutSessionId" TEXT,
    "stripePaymentIntentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderBillingSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderBillingSchedule_stripeCheckoutSessionId_key" ON "OrderBillingSchedule"("stripeCheckoutSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderBillingSchedule_stripePaymentIntentId_key" ON "OrderBillingSchedule"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "OrderBillingSchedule_orderId_idx" ON "OrderBillingSchedule"("orderId");

-- CreateIndex
CREATE INDEX "OrderBillingSchedule_status_idx" ON "OrderBillingSchedule"("status");

-- CreateIndex
CREATE INDEX "OrderBillingSchedule_dueDate_idx" ON "OrderBillingSchedule"("dueDate");

-- CreateIndex
CREATE UNIQUE INDEX "OrderBillingSchedule_orderId_installmentNumber_key" ON "OrderBillingSchedule"("orderId", "installmentNumber");

-- CreateIndex
CREATE INDEX "Payment_billingScheduleId_idx" ON "Payment"("billingScheduleId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_billingScheduleId_fkey" FOREIGN KEY ("billingScheduleId") REFERENCES "OrderBillingSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderBillingSchedule" ADD CONSTRAINT "OrderBillingSchedule_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
