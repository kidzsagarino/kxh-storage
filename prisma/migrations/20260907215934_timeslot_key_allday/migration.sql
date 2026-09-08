/*
  Warnings:

  - The values [ALL_DAY] on the enum `TimeSlotKey` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TimeSlotKey_new" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING', 'ALLDAY');
ALTER TABLE "TimeSlotSetting" ALTER COLUMN "key" TYPE "TimeSlotKey_new" USING ("key"::text::"TimeSlotKey_new");
ALTER TABLE "CapacitySetting" ALTER COLUMN "slotKey" TYPE "TimeSlotKey_new" USING ("slotKey"::text::"TimeSlotKey_new");
ALTER TYPE "TimeSlotKey" RENAME TO "TimeSlotKey_old";
ALTER TYPE "TimeSlotKey_new" RENAME TO "TimeSlotKey";
DROP TYPE "public"."TimeSlotKey_old";
COMMIT;
