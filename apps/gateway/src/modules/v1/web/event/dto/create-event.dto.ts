// create-event.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsDateString,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateEventDto {
    @ApiPropertyOptional({
        description: 'Event publication status',
        enum: ['DRAFT', 'PUBLISHED'],
        default: 'DRAFT',
        example: 'DRAFT',
    })
    @IsEnum(['DRAFT', 'PUBLISHED'])
    @IsOptional()
    status?: 'DRAFT' | 'PUBLISHED';

    @ApiProperty({
        description: 'Branch ID where event will be held',
        example: '60f7c0c2b4d1c72d88f8e8a3',
    })
    @IsMongoId()
    @IsNotEmpty()
    branch: string;

    @ApiProperty({
        description: 'Title of the event',
        maxLength: 250,
        example: 'Summer Coding Bootcamp 2025',
    })
    @IsString()
    @MaxLength(250)
    @IsNotEmpty()
    eventTitle: string;

    @ApiProperty({
        description: 'Date of the event',
        type: String,
        format: 'date-time',
        example: '2025-07-15T09:00:00.000Z',
    })
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @ApiProperty({
        description: 'Start time of the event (HH:MM format)',
        example: '09:00',
    })
    @IsString()
    @IsNotEmpty()
    startTime: string;

    @ApiPropertyOptional({
        description: 'End time of the event (HH:MM format)',
        example: '17:00',
    })
    @IsString()
    @IsOptional()
    endTime?: string;

    @ApiProperty({
        description: 'Course IDs associated with the event',
        example: ['60f7c0c2b4d1c72d88f8e8b4'],
        type: [String],
    })
    @IsArray()
    @IsMongoId({ each: true })
    @IsNotEmpty()
    course: string[];

    @ApiPropertyOptional({
        description: 'Recommended age for participants',
        example: 12,
    })
    @IsNumber()
    @IsOptional()
    age?: number;

    @ApiProperty({
        description: 'Event image URL or path',
        example: 'https://registon.bucket-name/events/coding-bootcamp.jpg',
    })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiPropertyOptional({
        description: 'Detailed description of the event',
        maxLength: 250,
        example:
            'A two-week intensive bootcamp focusing on web development for beginners. No prior experience required.',
    })
    @IsString()
    @MaxLength(250)
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({
        description: 'Price of the event in local currency',
        example: 50000,
    })
    @IsNumber()
    @IsOptional()
    price?: number;

    @ApiProperty({
        description: 'Target audience for this event',
        enum: ['ALL', 'TEACHER', 'STUDENT'],
        example: 'STUDENT',
    })
    @IsEnum(['ALL', 'TEACHER', 'STUDENT'])
    @IsNotEmpty()
    targetAudience: 'ALL' | 'TEACHER' | 'STUDENT';
}
