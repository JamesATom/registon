// filter-event.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class EventFilterDto {
    @ApiPropertyOptional({
        description: 'Filter by branch ID',
        example: '60f7c0c2b4d1c72d88f8e8a3',
    })
    @IsOptional()
    @IsMongoId()
    branch?: string;

    @ApiPropertyOptional({
        description: 'Search in title and description',
        example: 'coding',
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        description: 'Filter events from date',
        example: '2025-01-01',
    })
    @IsOptional()
    fromDate?: string;

    @ApiPropertyOptional({
        description: 'Filter events to date',
        example: '2025-12-31',
    })
    @IsOptional()
    toDate?: string;
}
