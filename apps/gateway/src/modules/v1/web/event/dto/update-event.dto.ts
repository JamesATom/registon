// update-event.dto.ts
import { IsOptional, IsEnum, IsMongoId, IsString, MaxLength, IsDateString, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEventDto {
    @ApiPropertyOptional({
        description: 'Admin comment for the event',
        maxLength: 250,
        example: 'This event is for advanced students only.',
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    commentAdmin?: string;

    @ApiPropertyOptional({
        description: 'Status of the event',
        enum: ['DRAFT', 'PUBLISHED'],
        example: 'DRAFT',
    })
    @IsOptional()
    @IsEnum(['DRAFT', 'PUBLISHED'])
    status?: 'DRAFT' | 'PUBLISHED';

    @ApiPropertyOptional({
        description: 'Branch ID to which the event belongs',
        example: '60f7c0c2b4d1c72d88f8e8a3',
    })
    @IsOptional()
    @IsMongoId()
    branch?: string;

    @ApiPropertyOptional({
        description: 'Title of the event',
        maxLength: 250,
        example: 'Open Day Event',
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    eventTitle?: string;

    @ApiPropertyOptional({
        description: 'Date of the event',
        example: '2025-06-01',
    })
    @IsOptional()
    @IsDateString()
    date?: string;

    @ApiPropertyOptional({
        description: 'Start time of the event (e.g. 14:00)',
        example: '14:00',
    })
    @IsOptional()
    @IsString()
    startTime?: string;

    @ApiPropertyOptional({
        description: 'End time of the event (e.g. 16:00)',
        example: '16:00',
    })
    @IsOptional()
    @IsString()
    endTime?: string;

    @ApiPropertyOptional({
        description: 'List of course IDs associated with the event',
        type: [String],
        example: ['60f7c0c2b4d1c72d88f8e8a3', '60f7c0c2b4d1c72d88f8e8b4'],
    })
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    course?: string[];

    @ApiPropertyOptional({
        description: 'Minimum age required to attend the event',
        example: 18,
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    age?: number;

    @ApiPropertyOptional({
        description: 'Image URL for the event',
        example: 'https://registon.bucket-name/2398ujfajfj92/event.jpg',
    })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiPropertyOptional({
        description: 'Event description',
        maxLength: 250,
        example: 'An open event for all interested students and teachers.',
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    description?: string;

    @ApiPropertyOptional({
        description: 'Price for attending the event',
        example: 25000,
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    price?: number;

    @ApiPropertyOptional({
        description: 'Target audience for the event',
        enum: ['ALL', 'TEACHER', 'STUDENT'],
        example: 'ALL',
    })
    @IsOptional()
    @IsEnum(['ALL', 'TEACHER', 'STUDENT'])
    targetAudience?: 'ALL' | 'TEACHER' | 'STUDENT';
}
