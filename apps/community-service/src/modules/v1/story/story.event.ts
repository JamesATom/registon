// story.event.ts
import { Controller, Logger, NotFoundException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { StoryService } from './story.service';
import { Types } from 'mongoose';

@Controller()
export class StoryEvents {
    private readonly logger = new Logger(StoryEvents.name);

    constructor(private readonly storyService: StoryService) {
        this.logger.log('StoryEvents initialized');
    }

    @MessagePattern(MessagePatterns.Story.V1.GET_ALL)
    async findAllStories() {
        this.logger.log(`Received message: ${MessagePatterns.Story.V1.GET_ALL}`);
        return this.storyService.findAllStories();
    }

    @MessagePattern(MessagePatterns.Story.V1.FIND_ONE)
    async findStoryById(@Payload() id: string) {
        this.logger.log(`Received message: ${MessagePatterns.Story.V1.FIND_ONE} with ID: ${id}`);
        return this.storyService.findStoryById(id);
    }

    @MessagePattern(MessagePatterns.Story.V1.CREATE)
    async createStory(@Payload() payload: { createStoryDto: any; userId: string }) {
        this.logger.log(`Received message: ${MessagePatterns.Story.V1.CREATE}`);
        return this.storyService.createStory(payload.createStoryDto, payload.userId);
    }

    @MessagePattern(MessagePatterns.Story.V1.UPDATE)
    async updateStory(
        @Payload() payload: { id: string; updateData: any; userId: string },
    ) {
        this.logger.log(
            `Received message: ${MessagePatterns.Story.V1.UPDATE} for ID: ${payload.id}`,
        );
        return this.storyService.updateStory(payload.id, payload.updateData, payload.userId);
    }

    @MessagePattern(MessagePatterns.Story.V1.DELETE)
    async removeStory(@Payload() id: string) {
        this.logger.log(`Received message: ${MessagePatterns.Story.V1.DELETE} for ID: ${id}`);
        return this.storyService.removeStory(id);
    }

    // Story Item message patterns
    @MessagePattern(MessagePatterns.Story.V1.CREATE_ITEM)
    async createStoryItem(@Payload() createStoryItemDto: any) {
        this.logger.log(`Received message: ${MessagePatterns.Story.V1.CREATE_ITEM}`);
        return this.storyService.createStoryItem(createStoryItemDto);
    }

    @MessagePattern(MessagePatterns.Story.V1.FIND_ONE_ITEM)
    async findStoryItemById(@Payload() id: string) {
        this.logger.log(`Received message: ${MessagePatterns.Story.V1.FIND_ONE_ITEM} with ID: ${id}`);
        return this.storyService.findStoryItemById(id);
    }

    @MessagePattern(MessagePatterns.Story.V1.UPDATE_ITEM)
    async updateStoryItem(@Payload() payload: { id: string; updateData: any }) {
        this.logger.log(`Received message: ${MessagePatterns.Story.V1.UPDATE_ITEM} for ID: ${payload.id}`);
        return this.storyService.updateStoryItem(payload.id, payload.updateData);
    }

    @MessagePattern(MessagePatterns.Story.V1.DELETE_ITEM)
    async removeStoryItem(@Payload() id: string) {
        this.logger.log(`Received message: ${MessagePatterns.Story.V1.DELETE_ITEM} for ID: ${id}`);
        try {
            return await this.storyService.removeStoryItem(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                const errorMessage = typeof error === 'object' && error !== null
                    ? (error as Error).message || 'Unknown error'
                    : 'Unknown error';
                throw new Error(`Failed to delete story item: ${errorMessage}`);
            }
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to delete story item: ${errorMessage}`);
        }
    }
}
