// update-story.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateStoryItemDto {
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

export class UpdateStoryDto {
    @ApiPropertyOptional({
        description: 'Thumbnail image URL for the story',
        example: 'https://registon.bucket-name/stories/summer-event-updated.jpg',
    })
    @IsString()
    @IsOptional()
    thumbnail?: string;

    @ApiPropertyOptional({
        description: 'External link for the story (if applicable)',
        example: 'https://example.com/event-details-updated',
    })
    @IsString()
    @MaxLength(250)
    @IsOptional()
    link?: string;

    @ApiPropertyOptional({
        description: 'Branch ID where the story belongs',
        example: 'branch-002',
    })
    @IsString()
    @IsOptional()
    branch?: string;

    @ApiPropertyOptional({
        description: 'Admin comment for internal use',
        example: 'Updated by marketing team',
        maxLength: 250,
    })
    @IsString()
    @MaxLength(250)
    @IsOptional()
    commentAdmin?: string;

    @ApiPropertyOptional({
        description: 'Title of the story',
        example: 'Updated Summer Coding Bootcamp 2025',
        maxLength: 100,
    })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    title?: string;

    @ApiPropertyOptional({
        description: 'Status of the story',
        enum: ['DRAFT', 'PUBLISHED'],
        example: 'PUBLISHED',
    })
    @IsEnum(['DRAFT', 'PUBLISHED'])
    @IsOptional()
    status?: 'DRAFT' | 'PUBLISHED';

    @ApiPropertyOptional({
        description: 'Date until which the story will be visible (from creation date)',
        type: Date,
        example: '2025-08-15T23:59:59Z',
    })
    @IsOptional()
    publishedAt?: Date;

    @ApiPropertyOptional({
        description: 'Text for the story button (if applicable)',
        example: 'Register now',
        maxLength: 20,
    })
    @IsString()
    @MaxLength(20)
    @IsOptional()
    buttonText?: string;

    @ApiProperty({
        description: 'Story items (slides) that make up the story',
        type: [UpdateStoryItemDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateStoryItemDto)
    @IsOptional()
    items?: UpdateStoryItemDto[];
}
