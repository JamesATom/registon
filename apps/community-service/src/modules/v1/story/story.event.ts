// story.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { StoryService } from './story.service';

@Controller()
export class StoryEvents {
    constructor(private readonly storyService: StoryService) {}

    @MessagePattern(MessagePatterns.Story.V1.CREATE)
    async createStory(@Payload() payload: { createStoryDto: any; userId: string }) {
        const storyData = payload.createStoryDto;
        const userId = payload.userId;

        return this.storyService.createStory(storyData, userId);
    }

    @MessagePattern(MessagePatterns.Story.V1.GET_ONE)
    async findStoryById(@Payload() payload: { id: string }) {
        const id = payload.id;
        return this.storyService.findStoryById(id);
    }

    @MessagePattern(MessagePatterns.Story.V1.UPDATE)
    async updateStory(@Payload() payload: { id: string; updateData: any; userId: string }) {
        const { id, updateData, userId } = payload;
        return this.storyService.updateStory(id, updateData, userId);
    }

    @MessagePattern(MessagePatterns.Story.V1.DELETE)
    async removeStory(@Payload() id: string) {
        return this.storyService.removeStory(id);
    }

    @MessagePattern(MessagePatterns.Story.V1.GET_ALL)
    async findAllStories(@Payload() payload: { filters: any }) {
        return this.storyService.findAllStories(payload.filters);
    }

    @MessagePattern(MessagePatterns.Story.V1.GET_ONE_ITEM)
    async findStoryItemById(@Payload() id: string) {
        return this.storyService.findStoryItemById(id);
    }

    @MessagePattern(MessagePatterns.Story.V1.CREATE_ITEM)
    async createStoryItem(@Payload() payload: { createStoryItemDto: any; userId: string }) {
        return this.storyService.createStoryItem(payload.createStoryItemDto, payload.userId);
    }

    @MessagePattern(MessagePatterns.Story.V1.UPDATE_ITEM)
    async updateStoryItem(@Payload() payload: { id: string; updateData: any }) {
        return this.storyService.updateStoryItem(payload.id, payload.updateData);
    }

    @MessagePattern(MessagePatterns.Story.V1.DELETE_ITEM)
    async removeStoryItem(@Payload() id: string) {
        return await this.storyService.removeStoryItem(id);
    }
}
