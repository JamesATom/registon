// create-story.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStoryItemDto } from './create-story-item.dto';

export class CreateStoryDto {
    @ApiProperty({
        description: 'Thumbnail image URL for the story',
        example: 'https://registon.bucket-name/stories/summer-event.jpg',
    })
    @IsString()
    @IsNotEmpty()
    thumbnail: string;

    @ApiPropertyOptional({
        description: 'External link for the story (if applicable)',
        example: 'https://example.com/event-details',
    })
    @IsString()
    @MaxLength(250)
    @IsOptional()
    link?: string;

    @ApiProperty({
        description: 'Branch ID where the story belongs',
        example: 'branch-001',
    })
    @IsString()
    @IsNotEmpty()
    branch: string;

    @ApiPropertyOptional({
        description: 'Admin comment for internal use',
        example: 'Approved by marketing team',
        maxLength: 250,
    })
    @IsString()
    @MaxLength(250)
    @IsOptional()
    commentAdmin?: string;

    @ApiProperty({
        description: 'Title of the story',
        example: 'Summer Coding Bootcamp 2025',
        maxLength: 100,
    })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'Status of the story',
        enum: ['DRAFT', 'PUBLISHED'],
        example: 'DRAFT',
    })
    @IsEnum(['DRAFT', 'PUBLISHED'])
    @IsNotEmpty()
    status: 'DRAFT' | 'PUBLISHED';

    @ApiPropertyOptional({
        description: 'Date until which the story will be visible (from creation date)',
        type: Date,
        example: '2025-07-30T23:59:59Z',
    })
    @IsOptional()
    publishedAt?: Date;

    @ApiPropertyOptional({
        description: 'Text for the story button (if applicable)',
        example: 'Learn more',
        maxLength: 20,
    })
    @IsString()
    @MaxLength(20)
    @IsOptional()
    buttonText?: string;

    @ApiProperty({
        description: 'User ID who created the story',
        example: 'user-123',
    })
    @IsString()
    @IsNotEmpty()
    createdBy: string;

    @ApiProperty({
        description: 'Story items (slides) that make up the story',
        type: [CreateStoryItemDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateStoryItemDto)
    @IsOptional()
    items?: CreateStoryItemDto[];
}
