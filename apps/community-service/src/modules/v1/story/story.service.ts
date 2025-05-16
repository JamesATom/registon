import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { FileService } from '../../../file/file.service';
import { ServiceResponse } from '../../../common/interfaces/service-response.interface';
import { StoryRepository } from './story.repository';

interface CreateStoryItemRequest {
    storyId: string;
    storyItems: {
        title: string;
        description?: string;
        image?: string;
        orderNumber?: number;
    }[];
}

interface UpdateStoryItemRequest {
    storyItem: {
        title?: string;
        description?: string;
        image?: string;
        orderNumber?: number;
    };
}

@Injectable()
export class StoryService {
    private readonly logger = new Logger(StoryService.name);

    constructor(
        private readonly storyRepository: StoryRepository,
        private readonly fileService: FileService,
    ) {
        this.logger.log('StoryService initialized');
    }

    async createStory(storyData: any, userId: string): Promise<ServiceResponse<any>> {
        return this.storyRepository.createStory(storyData, userId);
    }

    async createStoryWithFileInfo(
        file: any,
        fields: any,
        userId: string,
    ): Promise<ServiceResponse<any>> {
        return this.storyRepository.createStoryWithFileInfo(file, fields, userId);
    }

    async updateStoryWithFileInfo(
        id: string,
        file: any,
        fields: any,
        userId: string,
    ): Promise<ServiceResponse<any>> {
        return this.storyRepository.updateStoryWithFileInfo(id, file, fields, userId);
    }

    async findAllStories(filter?: any): Promise<ServiceResponse<any[]>> {
        return this.storyRepository.findAllStories(filter);
    }

    async findStoryById(id: string): Promise<ServiceResponse<any>> {
        return this.storyRepository.findStoryById(id);
    }

    async updateStory(id: string, storyData: any, userId: string): Promise<ServiceResponse<any>> {
        const storyResult = await this.storyRepository.findStoryById(id);
        if (storyResult.status === 'error') {
            return {
                status: 'error',
                statusCode: storyResult.statusCode,
                message: storyResult.message,
            };
        }

        if (
            storyData.mainImage !== undefined &&
            storyData.mainImage !== storyResult.data.mainImage
        ) {
            if (storyResult.data.mainImage) {
                try {
                    const oldImageUrl = new URL(storyResult.data.mainImage);
                    const oldImagePathParts = oldImageUrl.pathname.split('/');
                    oldImagePathParts.shift();
                    const oldImageKey = oldImagePathParts.join('/');

                    this.logger.log(`Deleting old main image file with key: ${oldImageKey}`);
                    await this.fileService.deleteFile(oldImageKey);
                    this.logger.log(`Successfully deleted old main image: ${oldImageKey}`);
                } catch (fileError) {
                    const errorMessage =
                        fileError instanceof Error ? fileError.message : 'Unknown error';
                    this.logger.warn(`Error deleting old main image file: ${errorMessage}`);
                }
            }
        }

        return this.storyRepository.updateStory(id, storyData, userId);
    }

    async createStoryItem(
        createStoryItemDto: CreateStoryItemRequest,
        userId: string,
    ): Promise<ServiceResponse<any[]>> {
        return this.storyRepository.createStoryItem(createStoryItemDto, userId);
    }

    async createStoryItemWithFileInfo(
        file: any,
        fields: any,
        userId: string,
    ): Promise<ServiceResponse<any>> {
        try {
            const uploadedFile = await this.fileService.uploadFile(file);

            const itemData = {
                storyId: fields.storyId,
                storyItems: [
                    {
                        title: fields.title,
                        description: fields.description || '',
                        image: uploadedFile.url,
                        orderNumber: fields.order || 0,
                    },
                ],
            };

            return this.storyRepository.createStoryItem(itemData, userId);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error creating story item with file: ${errorMessage}`);
            return {
                status: 'error',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to create story item with file: ${errorMessage}`,
            };
        }
    }

    async updateStoryItemWithFileInfo(
        id: string,
        file: any,
        fields: any,
    ): Promise<ServiceResponse<any>> {
        try {
            const currentItemResult = await this.storyRepository.findStoryItemById(id);
            if (currentItemResult.status === 'error') {
                return currentItemResult;
            }

            const uploadedFile = await this.fileService.uploadFile(file);

            let oldImageKey = '';
            if (currentItemResult.data.image) {
                try {
                    const oldImageUrl = new URL(currentItemResult.data.image);
                    const oldImagePathParts = oldImageUrl.pathname.split('/');
                    oldImagePathParts.shift();
                    oldImageKey = oldImagePathParts.join('/');
                } catch (urlError) {
                    this.logger.warn(
                        `Failed to parse old image URL: ${currentItemResult.data.image}`,
                    );
                }
            }

            const updateData = {
                storyItem: {
                    title:
                        fields.title !== undefined && fields.title !== ''
                            ? fields.title
                            : undefined,
                    description:
                        fields.description !== undefined && fields.description !== ''
                            ? fields.description
                            : undefined,
                    image: uploadedFile.url,
                    order:
                        fields.order !== undefined && fields.order !== ''
                            ? Number(fields.order)
                            : undefined,
                },
            };

            const updateResult = await this.storyRepository.updateStoryItem(id, updateData);

            if (updateResult.status === 'success' && oldImageKey) {
                try {
                    await this.fileService.deleteFile(oldImageKey);
                } catch (deleteError) {
                    const errorMessage =
                        deleteError instanceof Error ? deleteError.message : 'Unknown error';
                    this.logger.warn(`Failed to delete old image ${oldImageKey}: ${errorMessage}`);
                }
            }

            return updateResult;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error updating story item with file: ${errorMessage}`);
            return {
                status: 'error',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to update story item with file: ${errorMessage}`,
            };
        }
    }

    async findStoryItemById(id: string): Promise<ServiceResponse<any>> {
        return this.storyRepository.findStoryItemById(id);
    }

    async updateStoryItem(
        id: string,
        updateData: UpdateStoryItemRequest,
    ): Promise<ServiceResponse<any>> {
        const currentItemResult = await this.storyRepository.findStoryItemById(id);
        if (currentItemResult.status === 'error') {
            return currentItemResult;
        }

        if (
            updateData.storyItem &&
            updateData.storyItem.image !== undefined &&
            updateData.storyItem.image !== currentItemResult.data.image
        ) {
            if (currentItemResult.data.image) {
                try {
                    const oldImageUrl = new URL(currentItemResult.data.image);
                    const oldImagePathParts = oldImageUrl.pathname.split('/');
                    oldImagePathParts.shift();
                    const oldImageKey = oldImagePathParts.join('/');

                    await this.fileService.deleteFile(oldImageKey);
                } catch (fileError) {
                    const errorMessage =
                        fileError instanceof Error ? fileError.message : 'Unknown error';
                    this.logger.warn(`Error deleting old story item image file: ${errorMessage}`);
                }
            }
        }

        return this.storyRepository.updateStoryItem(id, updateData);
    }

    async removeStoryItem(
        id: string,
    ): Promise<ServiceResponse<{ deleted: any; reordered: number }>> {
        const storyItemResult = await this.storyRepository.findStoryItemById(id);
        if (storyItemResult.status === 'error') {
            return storyItemResult as any;
        }

        if (storyItemResult.data.image) {
            try {
                const imageUrl = new URL(storyItemResult.data.image);
                const pathParts = imageUrl.pathname.split('/');
                pathParts.shift();
                const imageKey = pathParts.join('/');

                this.logger.log(`Deleting image file with key: ${imageKey}`);
                await this.fileService.deleteFile(imageKey);
            } catch (fileError) {
                const errorMessage =
                    fileError instanceof Error ? fileError.message : 'Unknown error';
                this.logger.warn(`Error deleting image file: ${errorMessage}`);
            }
        }

        return this.storyRepository.removeStoryItem(id);
    }

    async removeStory(id: string): Promise<ServiceResponse<any>> {
        const storyResult = await this.storyRepository.findStoryById(id);
        if (storyResult.status === 'error') {
            return {
                status: 'error',
                statusCode: storyResult.statusCode,
                message: storyResult.message,
            };
        }

        if (storyResult.data.mainImage) {
            try {
                const mainImageUrl = new URL(storyResult.data.mainImage);
                const mainImagePathParts = mainImageUrl.pathname.split('/');
                mainImagePathParts.shift();
                const mainImageKey = mainImagePathParts.join('/');

                this.logger.log(`Deleting main image file with key: ${mainImageKey}`);
                await this.fileService.deleteFile(mainImageKey);
            } catch (fileError) {
                const errorMessage =
                    fileError instanceof Error ? fileError.message : 'Unknown error';
                this.logger.warn(`Error deleting main image file: ${errorMessage}`);
            }
        }

        for (const item of storyResult.data.items || []) {
            if (item.image) {
                try {
                    const imageUrl = new URL(item.image);
                    const pathParts = imageUrl.pathname.split('/');
                    pathParts.shift();
                    const imageKey = pathParts.join('/');

                    this.logger.log(`Deleting story item image file with key: ${imageKey}`);
                    await this.fileService.deleteFile(imageKey);
                } catch (fileError) {
                    const errorMessage =
                        fileError instanceof Error ? fileError.message : 'Unknown error';
                    this.logger.warn(`Error deleting story item image file: ${errorMessage}`);
                }
            }
        }

        return this.storyRepository.removeStory(id);
    }
}
