-- CreateTable
CREATE TABLE "IeltsExam" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "dateExam" TIMESTAMP(3) NOT NULL,
    "cityId" TEXT NOT NULL,
    "calendarId" TEXT NOT NULL,
    "commentUser" VARCHAR(250),
    "commentAdmin" VARCHAR(250),

    CONSTRAINT "IeltsExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IeltsRegistration" (
    "id" TEXT NOT NULL,
    "studentId" VARCHAR(36) NOT NULL,
    "examId" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IeltsRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IeltsCalendar" (
    "id" TEXT NOT NULL,
    "examDate" TIMESTAMP(3) NOT NULL,
    "maxStudents" INTEGER DEFAULT 250,
    "isAvailable" BOOLEAN DEFAULT true,
    "cityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IeltsCalendar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IeltsExam_cityId_idx" ON "IeltsExam"("cityId");

-- CreateIndex
CREATE INDEX "IeltsExam_calendarId_idx" ON "IeltsExam"("calendarId");

-- CreateIndex
CREATE INDEX "IeltsRegistration_studentId_idx" ON "IeltsRegistration"("studentId");

-- CreateIndex
CREATE INDEX "IeltsRegistration_examId_idx" ON "IeltsRegistration"("examId");

-- CreateIndex
CREATE UNIQUE INDEX "IeltsRegistration_studentId_examId_key" ON "IeltsRegistration"("studentId", "examId");

-- CreateIndex
CREATE INDEX "IeltsCalendar_cityId_idx" ON "IeltsCalendar"("cityId");

-- CreateIndex
CREATE INDEX "IeltsCalendar_examDate_idx" ON "IeltsCalendar"("examDate");

-- CreateIndex
CREATE UNIQUE INDEX "IeltsCalendar_examDate_cityId_key" ON "IeltsCalendar"("examDate", "cityId");

-- AddForeignKey
ALTER TABLE "IeltsExam" ADD CONSTRAINT "IeltsExam_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IeltsExam" ADD CONSTRAINT "IeltsExam_calendarId_fkey" FOREIGN KEY ("calendarId") REFERENCES "IeltsCalendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IeltsRegistration" ADD CONSTRAINT "IeltsRegistration_examId_fkey" FOREIGN KEY ("examId") REFERENCES "IeltsExam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IeltsCalendar" ADD CONSTRAINT "IeltsCalendar_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
