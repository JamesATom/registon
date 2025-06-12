/*
  Warnings:

  - You are about to drop the column `studentId` on the `MockRegistration` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "MockRegistration_studentId_idx";

-- AlterTable
ALTER TABLE "MockRegistration" DROP COLUMN "studentId";
