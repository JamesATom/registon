/*
  Warnings:

  - You are about to drop the column `cityId` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Branch` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_cityId_fkey";

-- DropIndex
DROP INDEX "Branch_cityId_idx";

-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "cityId",
DROP COLUMN "name";
