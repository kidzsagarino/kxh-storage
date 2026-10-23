/*
  Warnings:

  - Added the required column `line2` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "line2" TEXT NOT NULL;
