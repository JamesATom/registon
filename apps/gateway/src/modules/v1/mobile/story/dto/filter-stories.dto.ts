import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterStoriesDto {
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

    @ApiPropertyOptional({ description: 'Filter by branches' })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    branches?: string[];

    @ApiPropertyOptional({ description: 'Search in title and description' })
    @IsOptional()
    @IsString()
    search?: string;
}
