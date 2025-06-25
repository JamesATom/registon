// create-story-item.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateStoryItemDto {
    @ApiPropertyOptional({
        description: 'Title of the story item',
        example: 'First Day of Bootcamp',
        maxLength: 100,
    })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    title?: string;

    @ApiPropertyOptional({
        description: 'Description of the story item',
        example: 'Students getting introduced to the program and instructors',
        maxLength: 250,
    })
    @IsString()
    @MaxLength(250)
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'Image URL for the story item',
        example: 'https://registon.bucket-name/stories/bootcamp-day1.jpg',
    })
    @IsString()
    @IsNotEmpty()
    image: string;
}