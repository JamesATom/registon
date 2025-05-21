// /apps/gateway/src/modules/v1/services/ielts/dto/create-ielts-exam.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsDate,
    IsNumber,
    IsOptional,
    MinLength,
    MaxLength,
    IsPositive,
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO for creating a new IELTS exam
 */
export class CreateIeltsExamDto {
    @ApiProperty({
        description: 'Title of the IELTS exam',
        example: 'IELTS Academic Test - May 2025',
        maxLength: 100,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @ApiProperty({
        description: 'Date of the exam',
        example: '2025-05-15T09:00:00.000Z',
        type: Date,
    })
    @Type(() => Date)
    @IsDate()
    examDate: Date;

    @ApiProperty({
        description: 'Registration deadline',
        example: '2025-05-01T23:59:59.000Z',
        type: Date,
    })
    @Type(() => Date)
    @IsDate()
    registrationDeadline: Date;

    @ApiProperty({
        description: 'Exam fee',
        example: 250,
        minimum: 0,
    })
    @IsNumber()
    @IsPositive()
    fee: number;

    @ApiProperty({
        description: 'Exam location',
        example: 'British Council, Tashkent',
        maxLength: 100,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    location: string;

    @ApiProperty({
        description: 'Exam city',
        example: 'Tashkent',
        maxLength: 100,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    city: string;

    @ApiProperty({
        description: 'Maximum seats available',
        example: 100,
        minimum: 1,
    })
    @IsNumber()
    @IsPositive()
    capacitySeats: number;

    @ApiPropertyOptional({
        description: 'Description or additional information',
        example: 'Official IELTS Academic test with British Council',
        maxLength: 500,
    })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;
}
