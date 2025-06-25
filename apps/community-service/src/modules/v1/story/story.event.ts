// story.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { StoryService } from './service/story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { FilterStoryDto } from './dto/filter-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';

@Controller()
export class StoryEvent {
    constructor(private readonly storyService: StoryService) {}

    @MessagePattern(MessagePatterns.Story.V1.CREATE)
    async create(@Payload() createStoryDto: CreateStoryDto) {
        return this.storyService.create(createStoryDto);
    }

    @MessagePattern(MessagePatterns.Story.V1.GET_ALL)
    async getAll(@Payload() filter: FilterStoryDto) {
        return this.storyService.getAll(filter);
    }

    @MessagePattern(MessagePatterns.Story.V1.GET_ONE)
    async getOne(@Payload() id: string) {
        return this.storyService.getOne(id);
    }

    @MessagePattern(MessagePatterns.Story.V1.UPDATE)
    async update(@Payload() { id, updateStoryDto }: { id: string; updateStoryDto: UpdateStoryDto }) {
        return this.storyService.update(id, updateStoryDto);
    }

    @MessagePattern(MessagePatterns.Story.V1.DELETE)
    async delete(@Payload() id: string) {
        return this.storyService.delete(id);
    }
}