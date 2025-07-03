// job-hunting.entity.ts
import { ApiProperty } from '@nestjs/swagger';


export enum WorkExperience {
    EXPERIENCE_1_3 = 'EXPERIENCE_1_3',
    EXPERIENCE_3_6 = 'EXPERIENCE_3_6',
    EXPERIENCE_6_PLUS = 'EXPERIENCE_6_PLUS',
    NO_EXPERIENCE = 'NO_EXPERIENCE',
}

export enum WorkScheduleHours {
    SCHEDULE_6_1 = 'SCHEDULE_6_1',
    SCHEDULE_5_2 = 'SCHEDULE_5_2',
    WEEKENDS = 'WEEKENDS',
    FREE = 'FREE',
    OTHER = 'OTHER',
}

export enum EmploymentType {
    FULL = 'FULL',
    PART = 'PART',
}

export enum WorkMode {
    OFFLINE = 'OFFLINE',
    ONLINE = 'ONLINE',
    HYBRID = 'HYBRID',
}

export class JobHuntingEntity {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ example: 'Senior Frontend Developer' })
    title: string;

    @ApiProperty({ example: 'We are looking for an experienced Frontend Developer to join our team.', required: false })
    description?: string;

    @ApiProperty({ example: 'Bachelor degree in Computer Science or related field', required: false })
    certificateRequirements?: string;

    @ApiProperty({ enum: WorkExperience, example: WorkExperience.EXPERIENCE_3_6 })
    workExperience: WorkExperience;

    @ApiProperty({ enum: WorkScheduleHours, example: WorkScheduleHours.SCHEDULE_5_2, required: false })
    workScheduleHours?: WorkScheduleHours;

    @ApiProperty({ enum: EmploymentType, example: EmploymentType.FULL, required: false })
    employmentType?: EmploymentType;

    @ApiProperty({ enum: WorkMode, example: WorkMode.HYBRID, required: false })
    workMode?: WorkMode;

    @ApiProperty({ example: 5000000, required: false })
    salary?: number;

    @ApiProperty({ example: 'Developing new features, maintaining existing codebase', required: false })
    responsibilities?: string;

    @ApiProperty({ example: '3+ years of experience with React, TypeScript proficiency', required: false })
    requirements?: string;

    @ApiProperty({ example: 'Flexible work hours, health insurance, professional development budget', required: false })
    conditions?: string;

    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    createdAt: Date;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001', required: false })
    createdBy?: string;

    @ApiProperty({ example: '2023-01-02T00:00:00Z' })
    updatedAt: Date;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', required: false })
    updatedBy?: string;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174003', required: false })
    companyId?: string;

    @ApiProperty({ example: 'Tashkent', required: false })
    city?: string;
}

export class CompanyEntity {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ example: 'https://example.com/company-logo.png', required: false })
    companyLogo?: string;

    @ApiProperty({ example: 'Example Tech Solutions' })
    companyTitle: string;

    @ApiProperty({ example: 'A leading technology company specializing in web development.', required: false })
    description?: string;

    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    createdAt: Date;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
    createdBy: string;

    @ApiProperty({ example: '2023-01-02T00:00:00Z' })
    updatedAt: Date;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', required: false })
    updatedBy?: string;
}

export class JobHuntingWithCompanyEntity extends JobHuntingEntity {
    @ApiProperty({ type: CompanyEntity })
    company: CompanyEntity;
}

export class CompanyWithJobsEntity extends CompanyEntity {
    @ApiProperty({ type: [JobHuntingEntity] })
    jobs: JobHuntingEntity[];
}
