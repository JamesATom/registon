import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateStoryItemDto, StoryItemContent } from './create-story-item.dto';

export class UpdateStoryItemContent extends PartialType(StoryItemContent) {}

export class UpdateStoryItemDto {
  @ApiPropertyOptional({
    description: 'Story item content to update',
    type: UpdateStoryItemContent
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateStoryItemContent)
  storyItem?: UpdateStoryItemContent;
}
