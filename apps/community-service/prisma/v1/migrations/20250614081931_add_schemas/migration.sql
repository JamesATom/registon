-- CreateEnum
CREATE TYPE "WorkExperience" AS ENUM ('Experience13', 'Experience36', 'Experience6Plus', 'NoExperience');

-- CreateEnum
CREATE TYPE "WorkScheduleHours" AS ENUM ('Schedule61', 'Schedule52', 'Weekends', 'Free', 'Other');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('Full', 'Part');

-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('Offline', 'Online', 'Hybrid');

-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('Bachelor', 'Master', 'Doctorate', 'Associate', 'Phd');

-- CreateEnum
CREATE TYPE "UniType" AS ENUM ('Local', 'International', 'Foreign');

-- CreateEnum
CREATE TYPE "StudyLanguage" AS ENUM ('Uzbek', 'Russian', 'English');

-- CreateEnum
CREATE TYPE "StudyType" AS ENUM ('FullTime', 'PartTime', 'Remote', 'Hybrid');

-- CreateTable
CREATE TABLE "IeltsExam" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "dateExam" TIMESTAMP(3) NOT NULL,
    "cityId" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "commentUser" VARCHAR(250),
    "commentAdmin" VARCHAR(250),

    CONSTRAINT "IeltsExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IeltsRegistrationStudent" (
    "id" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "studentId" VARCHAR(36) NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IeltsRegistrationStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
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
    "branchId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "MockRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockRegistrationStudent" (
    "id" TEXT NOT NULL,
    "studentId" VARCHAR(36) NOT NULL,
    "mockRegistrationId" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MockRegistrationStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobHunting" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(250),
    "workExperience" "WorkExperience" NOT NULL,
    "companyId" TEXT,
    "cityId" TEXT,
    "certificateRequirements" TEXT,
    "workScheduleHours" "WorkScheduleHours",
    "employmentType" "EmploymentType",
    "workMode" "WorkMode",
    "salary" INTEGER,
    "responsibilities" VARCHAR(500),
    "requirements" VARCHAR(500),
    "conditions" VARCHAR(500),

    CONSTRAINT "JobHunting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "companyTitle" VARCHAR(50) NOT NULL,
    "description" VARCHAR(250),
    "companyLogo" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CV" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "description" VARCHAR(250),
    "cityId" TEXT NOT NULL,
    "degree" "Degree",
    "universityTitle" VARCHAR(50),
    "universityMajor" TEXT,
    "graduationYear" INTEGER,
    "companyName" VARCHAR(50),
    "position" VARCHAR(50),
    "responsibilities" VARCHAR(50),
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),

    CONSTRAINT "CV_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CvSkill" (
    "cvId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "CvSkill_pkey" PRIMARY KEY ("cvId","skillId")
);

-- CreateTable
CREATE TABLE "CvTool" (
    "cvId" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,

    CONSTRAINT "CvTool_pkey" PRIMARY KEY ("cvId","toolId")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "universities" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500),
    "registrationDate" TIMESTAMP(3) NOT NULL,
    "type" "UniType",
    "status" BOOLEAN,
    "contract" VARCHAR(100) NOT NULL,
    "contacts" INTEGER,
    "website" VARCHAR(50),
    "email" VARCHAR(50),
    "address" VARCHAR(100),
    "cityId" TEXT,
    "logo" TEXT,
    "license" TEXT,
    "certificateRequirementId" TEXT,

    CONSTRAINT "universities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "title" VARCHAR(100) NOT NULL,
    "studyLanguage" "StudyLanguage" NOT NULL,
    "contract" INTEGER NOT NULL,
    "degree" "Degree" NOT NULL,
    "certificateRequirementId" TEXT,
    "studyType" "StudyType",
    "universityId" TEXT NOT NULL,
    "facultyId" TEXT,

    CONSTRAINT "programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faculties" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "facultyTitle" VARCHAR(50) NOT NULL,
    "description" VARCHAR(250),
    "universityId" TEXT NOT NULL,

    CONSTRAINT "faculties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificateRequirements" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "certificateRequirementsTitle" VARCHAR(50) NOT NULL,
    "description" VARCHAR(250),

    CONSTRAINT "certificateRequirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IeltsExam_cityId_idx" ON "IeltsExam"("cityId");

-- CreateIndex
CREATE INDEX "IeltsExam_dateExam_idx" ON "IeltsExam"("dateExam");

-- CreateIndex
CREATE INDEX "IeltsExam_isActive_idx" ON "IeltsExam"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "IeltsRegistrationStudent_examId_key" ON "IeltsRegistrationStudent"("examId");

-- CreateIndex
CREATE INDEX "IeltsRegistrationStudent_studentId_idx" ON "IeltsRegistrationStudent"("studentId");

-- CreateIndex
CREATE INDEX "IeltsRegistrationStudent_examId_idx" ON "IeltsRegistrationStudent"("examId");

-- CreateIndex
CREATE UNIQUE INDEX "IeltsRegistrationStudent_studentId_examId_key" ON "IeltsRegistrationStudent"("studentId", "examId");

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE INDEX "MockRegistration_date_idx" ON "MockRegistration"("date");

-- CreateIndex
CREATE INDEX "MockRegistration_title_idx" ON "MockRegistration"("title");

-- CreateIndex
CREATE UNIQUE INDEX "MockRegistrationStudent_mockRegistrationId_key" ON "MockRegistrationStudent"("mockRegistrationId");

-- CreateIndex
CREATE INDEX "MockRegistrationStudent_studentId_idx" ON "MockRegistrationStudent"("studentId");

-- CreateIndex
CREATE INDEX "MockRegistrationStudent_mockRegistrationId_idx" ON "MockRegistrationStudent"("mockRegistrationId");

-- CreateIndex
CREATE UNIQUE INDEX "MockRegistrationStudent_studentId_mockRegistrationId_key" ON "MockRegistrationStudent"("studentId", "mockRegistrationId");

-- CreateIndex
CREATE INDEX "JobHunting_companyId_idx" ON "JobHunting"("companyId");

-- CreateIndex
CREATE INDEX "JobHunting_cityId_idx" ON "JobHunting"("cityId");

-- CreateIndex
CREATE INDEX "JobHunting_title_idx" ON "JobHunting"("title");

-- CreateIndex
CREATE INDEX "JobHunting_workExperience_idx" ON "JobHunting"("workExperience");

-- CreateIndex
CREATE INDEX "Company_companyTitle_idx" ON "Company"("companyTitle");

-- CreateIndex
CREATE INDEX "CV_studentId_idx" ON "CV"("studentId");

-- CreateIndex
CREATE INDEX "CV_cityId_idx" ON "CV"("cityId");

-- CreateIndex
CREATE INDEX "CV_universityTitle_idx" ON "CV"("universityTitle");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_name_key" ON "Tool"("name");

-- CreateIndex
CREATE INDEX "CvSkill_cvId_idx" ON "CvSkill"("cvId");

-- CreateIndex
CREATE INDEX "CvSkill_skillId_idx" ON "CvSkill"("skillId");

-- CreateIndex
CREATE INDEX "CvTool_cvId_idx" ON "CvTool"("cvId");

-- CreateIndex
CREATE INDEX "CvTool_toolId_idx" ON "CvTool"("toolId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_name_key" ON "Certificate"("name");

-- AddForeignKey
ALTER TABLE "IeltsExam" ADD CONSTRAINT "IeltsExam_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IeltsRegistrationStudent" ADD CONSTRAINT "IeltsRegistrationStudent_examId_fkey" FOREIGN KEY ("examId") REFERENCES "IeltsExam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockRegistrationStudent" ADD CONSTRAINT "MockRegistrationStudent_mockRegistrationId_fkey" FOREIGN KEY ("mockRegistrationId") REFERENCES "MockRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobHunting" ADD CONSTRAINT "JobHunting_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobHunting" ADD CONSTRAINT "JobHunting_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CV" ADD CONSTRAINT "CV_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CvSkill" ADD CONSTRAINT "CvSkill_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "CV"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CvSkill" ADD CONSTRAINT "CvSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CvTool" ADD CONSTRAINT "CvTool_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "CV"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CvTool" ADD CONSTRAINT "CvTool_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "universities" ADD CONSTRAINT "universities_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "universities" ADD CONSTRAINT "universities_certificateRequirementId_fkey" FOREIGN KEY ("certificateRequirementId") REFERENCES "certificateRequirements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "universities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_certificateRequirementId_fkey" FOREIGN KEY ("certificateRequirementId") REFERENCES "certificateRequirements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faculties" ADD CONSTRAINT "faculties_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "universities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
