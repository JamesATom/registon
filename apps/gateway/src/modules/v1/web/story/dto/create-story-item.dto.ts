import { IsNotEmpty, IsString, IsOptional, IsNumber, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStoryItemDto {
    @ApiProperty({ description: 'Title of the story item', maxLength: 100 })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional({
        description: 'Description of the story item',
        maxLength: 250,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Image path/URL for the story item' })
    @IsString()
    image: string;

    @ApiPropertyOptional({
        description: 'Order number for sorting items within a story',
        default: 0,
    })
    @IsOptional()
    @IsNumber()
    orderNumber?: number;

    @ApiProperty({ description: 'ID of the parent story' })
    @IsNotEmpty()
    @IsMongoId()
    storyId: string;
}
