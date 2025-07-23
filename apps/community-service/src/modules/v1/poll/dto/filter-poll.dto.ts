// filter-poll.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';

export class PollFilterDto {
    @ApiPropertyOptional({
        description: 'User ID of the poll creator',
        example: '60f7c0c2b4d1c72d88f8e8a3',
    })
    @IsOptional()
    @IsMongoId()
    userId?: string;

    @ApiPropertyOptional({
        description: 'Filter by branch ID',
        example: '60f7c0c2b4d1c72d88f8e8a3',
    })
    @IsOptional()
    @IsMongoId()
    branch?: string;

    @ApiPropertyOptional({
        description: 'Search in title and description',
        example: 'satisfaction',
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        description: 'Filter by target audience',
        enum: ['ALL', 'TEACHER', 'STUDENT'],
    })
    @IsOptional()
    @IsEnum(['ALL', 'TEACHER', 'STUDENT'])
    targetAudience?: 'ALL' | 'TEACHER' | 'STUDENT';

    @ApiPropertyOptional({
        description: 'Filter polls from date',
        example: '2025-01-01',
    })
    @IsOptional()
    fromDate?: string;

    @ApiPropertyOptional({
        description: 'Filter polls to date',
        example: '2025-12-31',
    })
    @IsOptional()
    toDate?: string;
}
