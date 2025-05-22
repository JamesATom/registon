// /apps/gateway/src/modules/v1/services/ielts/dto/filter-ielts-exams.dto.ts

import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEnum,
    IsOptional,
    IsString,
    IsDate,
    IsNumber,
    Min,
    Max,
    IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IeltsExamStatus } from '../../../../../../../community-service/src/shared/models/ielts-exam.schema';

/**
 * DTO for filtering IELTS exams
 */
export class FilterIeltsExamsDto {
    @ApiPropertyOptional({
        description: 'Page number',
        example: 1,
        minimum: 1,
    })
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @IsOptional()
    page?: number;

    @ApiPropertyOptional({
        description: 'Number of items per page',
        example: 10,
        minimum: 1,
        maximum: 100,
    })
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Max(100)
    @IsOptional()
    limit?: number;

    @ApiPropertyOptional({
        description: 'Filter by exam status',
        enum: IeltsExamStatus,
        example: 'ACTIVE',
    })
    @IsEnum(IeltsExamStatus)
    @IsOptional()
    status?: IeltsExamStatus;

    @ApiPropertyOptional({
        description: 'Search by title or location',
        example: 'British Council',
    })
    @IsString()
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({
        description: 'Filter exams by city',
        example: 'Tashkent',
    })
    @IsString()
    @IsOptional()
    city?: string;

    @ApiPropertyOptional({
        description: 'Filter exams after this date',
        example: '2025-05-01T00:00:00Z',
        type: Date,
    })
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    fromDate?: Date;

    @ApiPropertyOptional({
        description: 'Filter exams before this date',
        example: '2025-06-30T23:59:59Z',
        type: Date,
    })
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    toDate?: Date;

    @ApiPropertyOptional({
        description: 'Filter exams with available seats',
        example: true,
    })
    @Type(() => Boolean)
    @IsOptional()
    hasAvailableSeats?: boolean;
}
