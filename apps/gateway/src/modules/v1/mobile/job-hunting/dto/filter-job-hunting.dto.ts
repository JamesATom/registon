import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { WorkExperience, WorkScheduleHours, EmploymentType, WorkMode } from '../enums/job-hunting.enum';

export class FilterJobHuntingDto {
    @ApiProperty({
        description: 'Search term for job title',
        required: false,
        example: 'developer',
    })
    @IsOptional()
    @IsString()
    searchTerm?: string;

    @ApiProperty({
        description: 'Filter by work experience',
        required: false,
        enum: WorkExperience,
        example: WorkExperience.EXPERIENCE_3_6,
    })
    @IsOptional()
    @IsEnum(WorkExperience)
    workExperience?: WorkExperience;

    @ApiProperty({
        description: 'Filter by city ID',
        required: false,
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsOptional()
    @IsUUID()
    city?: string;

    @ApiProperty({
        description: 'Filter by company ID',
        required: false,
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsOptional()
    @IsUUID()
    companyId?: string;

    @ApiProperty({
        description: 'Filter by work schedule hours',
        required: false,
        enum: WorkScheduleHours,
        example: WorkScheduleHours.SCHEDULE_5_2,
    })
    @IsOptional()
    @IsEnum(WorkScheduleHours)
    workScheduleHours?: WorkScheduleHours;

    @ApiProperty({
        description: 'Filter by employment type',
        required: false,
        enum: EmploymentType,
        example: EmploymentType.FULL,
    })
    @IsOptional()
    @IsEnum(EmploymentType)
    employmentType?: EmploymentType;

    @ApiProperty({
        description: 'Filter by work mode',
        required: false,
        enum: WorkMode,
        example: WorkMode.HYBRID,
    })
    @IsOptional()
    @IsEnum(WorkMode)
    workMode?: WorkMode;

    @ApiProperty({
        description: 'Filter by minimum salary',
        required: false,
        example: 3000,
    })
    @IsOptional()
    @IsNumber()
    minSalary?: number;

    @ApiProperty({
        description: 'Filter by maximum salary',
        required: false,
        example: 7000,
    })
    @IsOptional()
    @IsNumber()
    maxSalary?: number;
}
