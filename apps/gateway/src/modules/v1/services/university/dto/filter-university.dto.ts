import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { UniversityStatus } from '../../../../../common/enum/common.enum';

export class FilterUniversitiesDto {
    @ApiPropertyOptional({ description: 'Page number (0-based)' })
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    page?: number;

    @ApiPropertyOptional({ description: 'Items per page' })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    @Type(() => Number)
    limit?: number;

    @ApiPropertyOptional({
        description: 'Filter by status',
        enum: UniversityStatus,
    })
    @IsOptional()
    @IsEnum(UniversityStatus)
    status?: UniversityStatus;

    @ApiPropertyOptional({ description: 'Filter by created by user ID' })
    @IsOptional()
    @IsString()
    createdBy?: string;

    @ApiPropertyOptional({ description: 'Search in name and about university' })
    @IsOptional()
    @IsString()
    search?: string;
}
