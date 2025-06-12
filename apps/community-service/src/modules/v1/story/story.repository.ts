import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, PaginateModel } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Story, StoryDocument, StoryStatus } from '../../../shared/models/story.schema';
import { StoryItem, StoryItemDocument } from '../../../shared/models/story-item.schema';
import { ServiceResponse } from '../../../common/interfaces/service-response.interface';
import { FileService } from '../../../file/file.service';

@Injectable()
export class StoryRepository {
    private readonly logger = new Logger(StoryRepository.name);

    constructor(
        @InjectModel(Story.name) private readonly storyModel: PaginateModel<StoryDocument>,
        @InjectModel(StoryItem.name) private readonly storyItemModel: Model<StoryItemDocument>,
        private readonly fileService: FileService,
    ) {}

    private extractFileKeyFromUrl(fileUrl: string): string | null {
        try {
            const url = new URL(fileUrl);
            const pathParts = url.pathname.split('/');
            pathParts.shift(); // Remove empty first element
            return pathParts.join('/');
        } catch (error) {
            this.logger.warn(`Failed to extract file key from URL: ${fileUrl}`);
            return null;
        }
    }

    async createStory(storyData: any, userId: string): Promise<ServiceResponse<any>> {
        this.logger.log('Creating new story in database');
        try {
            console.log('storyData', storyData);
            const newStory = new this.storyModel({
                ...storyData,
                createdBy: userId,
            });

            const savedStory = await newStory.save();

            return {
                statusCode: HttpStatus.CREATED,
                data: savedStory,
                message: 'Story created successfully',
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error creating story: ${errorMessage}`);
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to create story: ${errorMessage}`,
            };
        }
    }

    async findStoryById(id: string): Promise<any> {
        try {
            const result = await this.storyModel
                .aggregate([
                    { $match: { _id: new Types.ObjectId(id) } },
                    {
                        $lookup: {
                            from: 'storyitems',
                            localField: '_id',
                            foreignField: 'storyId',
                            as: 'items',
                        },
                    },
                    {
                        $unwind: {
                            path: '$items',
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $sort: { 'items.orderNumber': 1 },
                    },
                    {
                        $group: {
                            _id: '$_id',
                            root: { $first: '$$ROOT' },
                            items: { $push: '$items' },
                        },
                    },
                    {
                        $replaceRoot: {
                            newRoot: {
                                $mergeObjects: ['$root', { storyItems: '$items' }],
                            },
                        },
                    },
                ])
                .exec();

            if (!result || result.length === 0) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story with ID ${id} not found`,
                    data: null,
                };
            }

            const storyWithItems = result[0];

            return {
                data: storyWithItems,
                message: 'Story found successfully',
                statusCode: HttpStatus.OK,
            };
        } catch (error: any) {
            this.logger.error(`Error finding story: ${error.message}`);
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to find story: ${error.message}`,
                data: null,
            };
        }
    }

    async updateStory(id: string, storyData: any, userId: string): Promise<ServiceResponse<any>> {
        try {
            const story = await this.storyModel.findById(id);

            if (!story) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story with ID ${id} not found`,
                };
            }

            const updatedStory = await this.storyModel
                .findByIdAndUpdate(id, { ...storyData, updatedBy: userId }, { new: true })
                .exec();

            return {
                statusCode: HttpStatus.OK,
                data: updatedStory,
                message: 'Story updated successfully',
            };
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to update story: ${error.message}`,
            };
        }
    }

    async removeStory(id: string): Promise<ServiceResponse<any>> {
        try {
            await this.storyItemModel.deleteMany({ storyId: new Types.ObjectId(id) }).exec();

            const deletedStory = await this.storyModel.findByIdAndDelete(id).exec();

            return {
                statusCode: HttpStatus.OK,
                message: 'Story removed successfully',
                data: !!deletedStory,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to remove story: ${errorMessage}`,
            };
        }
    }

    async findAllStories(filter?: any): Promise<ServiceResponse<any>> {
        try {
            const query = {};

            if (filter?.status) {
                query['status'] = filter.status;
            }

            if (filter?.branches) {
                query['branches'] = { $in: filter.branches };
            }

            if (filter?.startDateFrom) {
                query['startDate'] = { $gte: filter.startDateFrom };
            }

            if (filter?.startDateTo) {
                query['startDate'] = query['startDate'] || {};
                query['startDate']['$lte'] = filter.startDateTo;
            }

            if (filter?.endDateFrom) {
                query['endDate'] = { $gte: filter.endDateFrom };
            }

            if (filter?.endDateTo) {
                query['endDate'] = query['endDate'] || {};
                query['endDate']['$lte'] = filter.endDateTo;
            }

            const options = {
                page: filter?.page || 1,
                limit: filter?.limit || 10,
                sort: { createdAt: -1 },
            };

            const storiesResult = await this.storyModel.paginate(query, options);
            const { docs, ...pagination } = storiesResult;

            return {
                statusCode: HttpStatus.OK,
                data: {
                    stories: docs,
                    pagination,
                },
                message: 'Stories fetched successfully',
            };
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to fetch stories error`,
                data: [],
            };
        }
    }

    async createStoryItem(createStoryItemDto: any, userId: string): Promise<ServiceResponse<any[]>> {
        try {
            const storyExists = await this.storyModel.findById(createStoryItemDto.storyId).exec();

            if (!storyExists) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story with ID ${createStoryItemDto.storyId} not found`,
                };
            }

            // Handle both single object and array inputs for createStoryItemDto
            const result = await this.storyItemModel.create(createStoryItemDto);

            // Ensure we always return an array (even if only one item was created)
            const createdItems = Array.isArray(result) ? result : [result];

            return {
                statusCode: HttpStatus.CREATED,
                data: createdItems,
                message: 'Story items created successfully',
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error creating story items: ${errorMessage}`);
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to create story items: ${errorMessage}`,
            };
        }
    }

    async findStoryItemById(id: string): Promise<ServiceResponse<any>> {
        try {
            if (!Types.ObjectId.isValid(id)) {
                return {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: `Invalid story item ID format: ${id}`,
                    data: null,
                };
            }

            const storyItem = await this.storyItemModel.findById(new Types.ObjectId(id)).exec();

            if (!storyItem) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story item with ID ${id} not found`,
                };
            }

            return {
                statusCode: HttpStatus.OK,
                data: storyItem,
                message: 'Story item found successfully',
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error finding story item: ${errorMessage}`);
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to find story item: ${errorMessage}`,
            };
        }
    }

    async updateStoryItem(id: string, updateData: any): Promise<ServiceResponse<any>> {
        try {
            const currentItem = await this.storyItemModel.findById(id).exec();
            if (!currentItem) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story item with ID ${id} not found`,
                };
            }

            const updatedStoryItem = await this.storyItemModel.findByIdAndUpdate(id, updateData, { new: true }).exec();

            return {
                statusCode: HttpStatus.OK,
                message: 'Story item updated successfully',
                data: updatedStoryItem,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to update story item: ${errorMessage}`,
            };
        }
    }

    async removeStoryItem(id: string): Promise<ServiceResponse<any>> {
        try {
            const storyItem = await this.storyItemModel.findById(id).exec();

            if (!storyItem) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story item with ID ${id} not found`,
                };
            }

            const deletedStoryItem = await this.storyItemModel.findByIdAndDelete(id).exec();

            if (!deletedStoryItem) {
                return {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `Failed to delete story item with ID ${id}`,
                };
            }

            await this.reorderAfterDelete(storyItem.storyId.toString(), storyItem.orderNumber);

            return {
                statusCode: HttpStatus.OK,
                message: 'Story item removed successfully',
                data: !!deletedStoryItem,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to remove story item: ${errorMessage}`,
            };
        }
    }

    private async reorderAfterDelete(storyId: string, deletedOrderNumber: number): Promise<void> {
        await this.storyItemModel
            .updateMany(
                {
                    storyId: new Types.ObjectId(storyId),
                    orderNumber: { $gt: deletedOrderNumber },
                },
                { $inc: { orderNumber: -1 } },
            )
            .exec();
    }
}
