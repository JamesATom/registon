-- CreateEnum
CREATE TYPE "WorkExperience" AS ENUM ('EXPERIENCE_1_3', 'EXPERIENCE_3_6', 'EXPERIENCE_6_PLUS', 'NO_EXPERIENCE');

-- CreateEnum
CREATE TYPE "WorkScheduleHours" AS ENUM ('SCHEDULE_6_1', 'SCHEDULE_5_2', 'WEEKENDS', 'FREE', 'OTHER');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL', 'PART');

-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('OFFLINE', 'ONLINE', 'HYBRID');

-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('BACHELOR', 'MASTER', 'DOCTORATE', 'ASSOCIATE', 'PHD');

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
