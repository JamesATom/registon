import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsDate,
    IsNumber,
    IsEnum,
    IsOptional,
    MaxLength,
    IsPositive,
    MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IeltsExamStatus } from '../../../../../../common/enums/roles.enum';

export class UpdateIeltsExamDto {
    @ApiPropertyOptional({
        description: 'Title of the IELTS exam',
        example: 'IELTS Academic Test - June 2025 (Updated)',
        maxLength: 100,
    })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    title?: string;

    @ApiPropertyOptional({
        description: 'Date of the exam',
        example: '2025-06-15T09:00:00.000Z',
        type: Date,
    })
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    examDate?: Date;

    @ApiPropertyOptional({
        description: 'Registration deadline',
        example: '2025-06-01T23:59:59.000Z',
        type: Date,
    })
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    registrationDeadline?: Date;

    @ApiPropertyOptional({
        description: 'Exam fee',
        example: 275,
        minimum: 0,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    fee?: number;

    @ApiPropertyOptional({
        description: 'Exam location',
        example: 'British Council, Tashkent',
        maxLength: 100,
    })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    location?: string;

    @ApiPropertyOptional({
        enum: IeltsExamStatus,
        description: 'Exam status',
        example: 'ACTIVE',
    })
    @IsEnum(IeltsExamStatus)
    @IsOptional()
    status?: IeltsExamStatus;

    @ApiPropertyOptional({
        description: 'Maximum seats available',
        example: 120,
        minimum: 1,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    capacitySeats?: number;

    @ApiPropertyOptional({
        description: 'Description or additional information',
        example: 'Updated: Official IELTS Academic test with British Council',
        maxLength: 500,
    })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;
}
