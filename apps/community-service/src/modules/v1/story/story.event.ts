import { Controller, BadRequestException, NotFoundException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { StoryService } from './story.service';

@Controller()
export class StoryEvents {
    constructor(private readonly storyService: StoryService) {}

    @MessagePattern(MessagePatterns.Story.V1.GET_ALL)
    async findAllStories() {
        return this.storyService.findAllStories();
    }

    @MessagePattern(MessagePatterns.Story.V1.FIND_ONE)
    async findStoryById(@Payload() payload: { id: string }) {
        const id = payload.id;
        return this.storyService.findStoryById(id);
    }

    @MessagePattern(MessagePatterns.Story.V1.CREATE)
    async createStory(@Payload() payload: { createStoryDto: any; userId: string }) {
        return this.storyService.createStory(payload.createStoryDto, payload.userId);
    }

    @MessagePattern(MessagePatterns.Story.V1.UPDATE)
    async updateStory(@Payload() payload: { id: string; updateData: any; userId: string }) {
        return this.storyService.updateStory(payload.id, payload.updateData, payload.userId);
    }

    @MessagePattern(MessagePatterns.Story.V1.DELETE)
    async removeStory(@Payload() id: string) {
        return this.storyService.removeStory(id);
    }

    @MessagePattern(MessagePatterns.Story.V1.CREATE_WITH_FILE)
    async createStoryWithFile(@Payload() payload: { data: any; userId: string }) {
        try {
            const { file, fields } = payload.data;
            const userId = payload.userId;

            return await this.storyService.createStoryWithFileInfo(file, fields, userId);
        } catch (error) {
            throw new BadRequestException({
                message: error instanceof Error ? error.message : 'Error processing story data',
                statusCode: 400,
            });
        }
    }

    @MessagePattern(MessagePatterns.Story.V1.UPDATE_WITH_FILE)
    async updateStoryWithFile(@Payload() payload: { id: string; data: any; userId: string }) {
        try {
            const { id, data, userId } = payload;
            const { file, fields } = data;

            return await this.storyService.updateStoryWithFileInfo(id, file, fields, userId);
        } catch (error) {
            throw new BadRequestException({
                message: error instanceof Error ? error.message : 'Error processing story update',
                statusCode: 400,
            });
        }
    }

    @MessagePattern(MessagePatterns.Story.V1.CREATE_ITEM_WITH_FILE)
    async createStoryItemWithFile(@Payload() payload: { data: any; userId: string }) {
        try {
            const { file, fields } = payload.data;
            const userId = payload.userId;

            return await this.storyService.createStoryItemWithFileInfo(file, fields, userId);
        } catch (error) {
            throw new BadRequestException({
                message:
                    error instanceof Error ? error.message : 'Error processing story item data',
                statusCode: 400,
            });
        }
    }

    @MessagePattern(MessagePatterns.Story.V1.FIND_ONE_ITEM)
    async findStoryItemById(@Payload() id: string) {
        return this.storyService.findStoryItemById(id);
    }

    @MessagePattern(MessagePatterns.Story.V1.UPDATE_ITEM)
    async updateStoryItem(@Payload() payload: { id: string; updateData: any }) {
        return this.storyService.updateStoryItem(payload.id, payload.updateData);
    }

    @MessagePattern(MessagePatterns.Story.V1.UPDATE_ITEM_WITH_FILE)
    async updateStoryItemWithFile(@Payload() payload: { id: string; data: any }) {
        try {
            const { id, data } = payload;
            const { file, fields } = data;

            return await this.storyService.updateStoryItemWithFileInfo(id, file, fields);
        } catch (error) {
            throw new BadRequestException({
                message:
                    error instanceof Error ? error.message : 'Error processing story item update',
                statusCode: 400,
            });
        }
    }

    @MessagePattern(MessagePatterns.Story.V1.DELETE_ITEM)
    async removeStoryItem(@Payload() id: string) {
        try {
            return await this.storyService.removeStoryItem(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                const errorMessage =
                    typeof error === 'object' && error !== null
                        ? (error as Error).message || 'Unknown error'
                        : 'Unknown error';
                throw new Error(`Failed to delete story item: ${errorMessage}`);
            }
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to delete story item: ${errorMessage}`);
        }
    }
}
