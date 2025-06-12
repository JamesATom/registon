import { PartialType } from '@nestjs/swagger';
import { CreateStoryItemDto } from './create-story-item.dto';

export class UpdateStoryItemDto extends PartialType(CreateStoryItemDto) {}
