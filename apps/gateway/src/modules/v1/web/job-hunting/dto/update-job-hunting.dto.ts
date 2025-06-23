import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { WorkExperience, WorkScheduleHours, EmploymentType, WorkMode } from '../enums/job-hunting.enum';

export class UpdateJobHuntingDto {
    @ApiPropertyOptional({
        description: 'Job title',
        example: 'Senior Software Engineer',
        maxLength: 50,
    })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    title?: string;

    @ApiPropertyOptional({
        description: 'Job description',
        example: 'We are looking for a senior software engineer to join our team.',
        maxLength: 250,
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    description?: string;

    @ApiPropertyOptional({
        description: 'Required work experience',
        enum: WorkExperience,
        example: WorkExperience.EXPERIENCE_3_6,
    })
    @IsOptional()
    @IsEnum(WorkExperience)
    workExperience?: WorkExperience;

    @ApiPropertyOptional({
        description: 'Company ID',
        example: 'ea8c547c-2f1e-4329-a1a9-6c9611ba5812',
    })
    @IsOptional()
    @IsUUID()
    company?: string;

    @ApiPropertyOptional({
        description: 'City ID',
        example: '0e252b3a-cc49-41ce-8906-c670e4efa5de',
    })
    @IsOptional()
    @IsUUID()
    city?: string;

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
        maxLength: 500,
    })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    responsibilities?: string;

    @ApiPropertyOptional({
        description: 'Job requirements',
        example: 'At least 3 years of experience in JavaScript.',
        maxLength: 500,
    })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    requirements?: string;

    @ApiPropertyOptional({
        description: 'Job conditions',
        example: 'Remote work available, flexible hours.',
        maxLength: 500,
    })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    conditions?: string;
}
