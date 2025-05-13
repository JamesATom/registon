import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsMongoId,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class StoryItemContent {
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

  // This field will be populated from the uploaded file
  @ApiProperty({ type: 'string', format: 'binary', description: 'Image file to upload' })
  @IsOptional()
  file?: any; // Only used for Swagger documentation - will be processed by the controller
}

export class CreateStoryItemDto {
  @ApiProperty({ description: 'ID of the parent story' })
  @IsNotEmpty()
  @IsMongoId()
  storyId: string;

  @ApiProperty({
    description: 'Story item content',
    type: [StoryItemContent],
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StoryItemContent)
  storyItems: StoryItemContent[];
}
