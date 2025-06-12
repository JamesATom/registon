-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "branchName" TEXT NOT NULL DEFAULT 'Registon';

-- AlterTable
ALTER TABLE "MockRegistrationStudent" ADD COLUMN     "studentName" VARCHAR(250),
ADD COLUMN     "studentPhoneNumber" VARCHAR(50);
