// update-story-item.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateStoryItemDto {
    @ApiPropertyOptional({
        description: 'Title of the story item',
        example: 'Updated First Day of Bootcamp',
        maxLength: 100,
    })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    title?: string;

    @ApiPropertyOptional({
        description: 'Description of the story item',
        example: 'Updated description of students getting introduced to the program',
        maxLength: 250,
    })
    @IsString()
    @MaxLength(250)
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({
        description: 'Image URL for the story item',
        example: 'https://registon.bucket-name/stories/bootcamp-day1-updated.jpg',
    })
    @IsString()
    @IsOptional()
    image?: string;
}