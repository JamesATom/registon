import {
  IsNotEmpty,
  IsArray,
  IsMongoId,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UpdateStoryItemContent } from './update-story-item.dto';

export class UpdateStoryItemWithId {
  @ApiProperty({ description: 'ID of the story item to update' })
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @ApiProperty({ description: 'Story item content to update' })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateStoryItemContent)
  content: UpdateStoryItemContent;
}

export class UpdateStoryItemsDto {
  @ApiProperty({ description: 'ID of the parent story' })
  @IsNotEmpty()
  @IsMongoId()
  storyId: string;

  @ApiProperty({
    description: 'Array of story items to update',
    type: [UpdateStoryItemWithId],
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateStoryItemWithId)
  storyItems: UpdateStoryItemWithId[];
}
