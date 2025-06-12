-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "cityId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockRegistration" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "commentUser" VARCHAR(250),
    "commentAdmin" VARCHAR(250),
    "title" VARCHAR(50),
    "date" TIMESTAMP(3) NOT NULL,
    "studentId" VARCHAR(36) NOT NULL,
    "branchId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "MockRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockRegistrationStudent" (
    "id" TEXT NOT NULL,
    "mockRegistrationId" TEXT NOT NULL,
    "studentId" VARCHAR(36) NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MockRegistrationStudent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Branch_cityId_idx" ON "Branch"("cityId");

-- CreateIndex
CREATE INDEX "MockRegistration_studentId_idx" ON "MockRegistration"("studentId");

-- CreateIndex
CREATE INDEX "MockRegistration_branchId_idx" ON "MockRegistration"("branchId");

-- CreateIndex
CREATE INDEX "MockRegistration_date_idx" ON "MockRegistration"("date");

-- CreateIndex
CREATE INDEX "MockRegistration_title_idx" ON "MockRegistration"("title");

-- CreateIndex
CREATE INDEX "MockRegistrationStudent_studentId_idx" ON "MockRegistrationStudent"("studentId");

-- CreateIndex
CREATE INDEX "MockRegistrationStudent_mockRegistrationId_idx" ON "MockRegistrationStudent"("mockRegistrationId");

-- CreateIndex
CREATE UNIQUE INDEX "MockRegistrationStudent_studentId_mockRegistrationId_key" ON "MockRegistrationStudent"("studentId", "mockRegistrationId");

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockRegistration" ADD CONSTRAINT "MockRegistration_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockRegistrationStudent" ADD CONSTRAINT "MockRegistrationStudent_mockRegistrationId_fkey" FOREIGN KEY ("mockRegistrationId") REFERENCES "MockRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
