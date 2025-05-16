import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Story, StoryDocument, StoryStatus } from '../../../shared/models/story.schema';
import { StoryItem, StoryItemDocument } from '../../../shared/models/story-item.schema';
import { ServiceResponse } from '../../../common/interfaces/service-response.interface';

@Injectable()
export class MobileRepository {
    private readonly logger = new Logger(MobileRepository.name);

    constructor(
        @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
        @InjectModel(StoryItem.name) private storyItemModel: Model<StoryItemDocument>,
    ) {}

    async findAllStoriesForMobile(filter?: any): Promise<ServiceResponse<any[]>> {
        try {
            const query = {};

            // For mobile, only return published stories by default if not specified
            if (!filter?.status) {
                query['status'] = StoryStatus.PUBLISHED;
            }

            const stories = await this.storyModel
                .find(query)
                .sort({ createdAt: -1 }) // Latest first
                .exec();

            return {
                status: 'success',
                statusCode: HttpStatus.OK,
                data: stories,
                message: 'Stories fetched successfully for mobile',
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error fetching stories for mobile: ${errorMessage}`);
            return {
                status: 'error',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to fetch stories for mobile: ${errorMessage}`,
                data: [],
            };
        }
    }

    async findStoryWithItemsById(id: string): Promise<ServiceResponse<any>> {
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
                        $addFields: {
                            items: {
                                $sortArray: {
                                    input: '$items',
                                    sortBy: { orderNumber: 1 }, // Sort by ascending order number
                                },
                            },
                        },
                    },
                ])
                .exec();

            if (!result || result.length === 0) {
                return {
                    status: 'error',
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story with ID ${id} not found`,
                };
            }

            // Return the story with its items
            return {
                status: 'success',
                statusCode: HttpStatus.OK,
                data: result[0],
                message: 'Story with items fetched successfully for mobile',
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error fetching story with items for mobile: ${errorMessage}`);
            return {
                status: 'error',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to fetch story with items for mobile: ${errorMessage}`,
            };
        }
    }
}
