// filter-story.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FilterStoryDto {
    @ApiPropertyOptional({
        description: 'Filter stories by status',
        enum: ['DRAFT', 'PUBLISHED'],
        example: 'PUBLISHED',
    })
    @IsEnum(['DRAFT', 'PUBLISHED'])
    @IsOptional()
    status?: 'DRAFT' | 'PUBLISHED';

    @ApiPropertyOptional({
        description: 'Search stories by title',
        example: 'Summer',
    })
    @IsString()
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({
        description: 'Filter stories by branch',
        example: 'branch-001',
    })
    @IsString()
    @IsOptional()
    branch?: string;
}