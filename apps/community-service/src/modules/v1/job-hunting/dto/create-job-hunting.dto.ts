// create-job-hunting.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';
import { WorkExperience, WorkScheduleHours, EmploymentType, WorkMode } from '../enums/job-hunting.enum';

export class CreateJobHuntingDto {
    @ApiProperty({
        description: 'Job title',
        example: 'Senior Software Engineer',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional({
        description: 'Job description',
        example: 'We are looking for a senior software engineer to join our team.',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: 'Required work experience',
        enum: WorkExperience,
        example: WorkExperience.EXPERIENCE_3_6,
    })
    @IsNotEmpty()
    @IsEnum(WorkExperience)
    workExperience: WorkExperience;

    @ApiPropertyOptional({
        description: 'Company ID',
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsOptional()
    @IsUUID()
    company?: string;

    @ApiPropertyOptional({
        description: 'City ID',
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsOptional()
    @IsUUID()
    cityId?: string;

    @ApiPropertyOptional({
        description: 'Certificate requirements',
        example: 'AWS Certified Developer',
    })
    @IsOptional()
    @IsString()
    certificateRequirements?: string;

    @ApiPropertyOptional({
        description: 'Work schedule hours',
        enum: WorkScheduleHours,
        example: WorkScheduleHours.SCHEDULE_5_2,
    })
    @IsOptional()
    @IsEnum(WorkScheduleHours)
    workScheduleHours?: WorkScheduleHours;

    @ApiPropertyOptional({
        description: 'Employment type',
        enum: EmploymentType,
        example: EmploymentType.FULL,
    })
    @IsOptional()
    @IsEnum(EmploymentType)
    employmentType?: EmploymentType;

    @ApiPropertyOptional({
        description: 'Work mode',
        enum: WorkMode,
        example: WorkMode.HYBRID,
    })
    @IsOptional()
    @IsEnum(WorkMode)
    workMode?: WorkMode;

    @ApiPropertyOptional({
        description: 'Salary',
        example: 5000,
    })
    @IsOptional()
    @IsNumber()
    salary?: number;

    @ApiPropertyOptional({
        description: 'Job responsibilities',
        example: 'Develop and maintain high-quality software.',
    })
    @IsOptional()
    @IsString()
    responsibilities?: string;

    @ApiPropertyOptional({
        description: 'Job requirements',
        example: 'At least 3 years of experience in JavaScript.',
    })
    @IsOptional()
    @IsString()
    requirements?: string;

    @ApiPropertyOptional({
        description: 'Job conditions',
        example: 'Remote work available, flexible hours.',
    })
    @IsOptional()
    @IsString()
    conditions?: string;

    @ApiPropertyOptional({
        description: 'Company logo URL',
        example: 'https://example.com/logo.png',
    })
    @IsOptional()
    @IsString()
    companyLogo?: string;

    @ApiPropertyOptional({
        description: 'Company title',
        example: 'Tech Company',
    })
    @IsOptional()
    @IsString()
    companyTitle?: string;

    @ApiPropertyOptional({
        description: 'Company description',
        example: 'A leading tech company specializing in software development.',
    })
    @IsOptional()
    @IsString()
    companyDescription?: string;
    
    @ApiPropertyOptional({
        description: 'ID of the user who created this job posting',
        example: 'user-123',
    })
    @IsOptional()
    @IsString()
    createdBy?: string;
    
    @ApiPropertyOptional({
        description: 'ID of the user who last updated this job posting',
        example: 'user-123',
    })
    @IsOptional()
    @IsString()
    updatedBy?: string;
}