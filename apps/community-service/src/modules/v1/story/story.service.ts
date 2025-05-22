import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { FileService } from '../../../file/file.service';
import { ServiceResponse } from '../../../common/interfaces/service-response.interface';
import { StoryRepository } from './story.repository';

@Injectable()
export class StoryService {
    constructor(
        private readonly storyRepository: StoryRepository,
        private readonly fileService: FileService,
    ) {}

    async createStory(storyData: any, userId: string): Promise<ServiceResponse<any>> {
        return this.storyRepository.createStory(storyData, userId);
    }

    async findStoryById(id: string): Promise<ServiceResponse<any>> {
        return this.storyRepository.findStoryById(id);
    }

    async updateStory(id: string, storyData: any, userId: string): Promise<ServiceResponse<any>> {
        return this.storyRepository.updateStory(id, storyData, userId);
    }

    async removeStory(id: string): Promise<ServiceResponse<any>> {
        const storyResult = await this.storyRepository.findStoryById(id);

        if (storyResult.data.mainImage) {
            try {
                const mainImageUrl = new URL(storyResult.data.mainImage);
                const mainImagePathParts = mainImageUrl.pathname.split('/');
                mainImagePathParts.shift();

                const mainImageKey = mainImagePathParts.join('/');

                if (mainImageKey) {
                    await this.fileService.deleteFile(mainImageKey);
                }
            } catch (fileError) {
                const errorMessage =
                    fileError instanceof Error ? fileError.message : 'Unknown error';
            }
        }

        for (const item of storyResult.data.items || []) {
            if (item.image) {
                try {
                    const imageUrl = new URL(item.image);
                    const pathParts = imageUrl.pathname.split('/');
                    pathParts.shift();
                    const imageKey = pathParts.join('/');

                    await this.fileService.deleteFile(imageKey);
                } catch (fileError) {
                    const errorMessage =
                        fileError instanceof Error ? fileError.message : 'Unknown error';
                }
            }
        }

        return this.storyRepository.removeStory(id);
    }

    async findAllStories(filter?: any): Promise<ServiceResponse<any[]>> {
        return this.storyRepository.findAllStories(filter);
    }

    async createStoryItem(
        createStoryItemDto: any,
        userId: string,
    ): Promise<ServiceResponse<any[]>> {
        return this.storyRepository.createStoryItem(createStoryItemDto, userId);
    }

    async findStoryItemById(id: string): Promise<ServiceResponse<any>> {
        return this.storyRepository.findStoryItemById(id);
    }

    async updateStoryItem(id: string, updateData: any): Promise<ServiceResponse<any>> {
        const currentItemResult = await this.storyRepository.findStoryItemById(id);
        if (currentItemResult.statusCode === 404) {
            return currentItemResult;
        }

        return this.storyRepository.updateStoryItem(id, updateData);
    }

    async removeStoryItem(id: string): Promise<ServiceResponse<any>> {
        return this.storyRepository.removeStoryItem(id);
    }
}
