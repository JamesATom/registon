import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Story, StoryDocument, StoryStatus } from '../../../shared/models/story.schema';
import { StoryItem, StoryItemDocument } from '../../../shared/models/story-item.schema';
import { ServiceResponse } from '../../../common/interfaces/service-response.interface';
import { FileService } from '../../../file/file.service';

@Injectable()
export class StoryRepository {
    private readonly logger = new Logger(StoryRepository.name);

    constructor(
        @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
        @InjectModel(StoryItem.name) private storyItemModel: Model<StoryItemDocument>,
        private readonly fileService: FileService,
    ) {
        this.logger.log('StoryRepository initialized with database connection');
    }

    /**
     * Creates a new story with the given data
     */
    async createStory(storyData: any, userId: string): Promise<ServiceResponse<any>> {
        this.logger.log('Creating new story in database');
        try {
            const newStory = new this.storyModel({
                title: storyData.title,
                description: storyData.description,
                status: storyData.status || StoryStatus.DRAFT,
                mainImage: storyData.mainImage,
                datePublished: storyData.datePublished,
                link: storyData.link,
                buttonText: storyData.buttonText,
                createdBy: userId,
                branches: storyData.branches,
                startDate: storyData.startDate,
                endDate: storyData.endDate,
                commentAdmin: storyData.commentAdmin,
            });

            const savedStory = await newStory.save();

            return {
                status: 'success',
                statusCode: HttpStatus.CREATED,
                data: savedStory,
                message: 'Story created successfully',
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error creating story: ${errorMessage}`);
            return {
                status: 'error',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to create story: ${errorMessage}`,
            };
        }
    }

    async createStoryWithFileInfo(
        file: any,
        fields: any,
        userId: string,
    ): Promise<ServiceResponse<any>> {
        const uploadedFile = await this.fileService.uploadFile(file);
        try {
            const storyData = {
                title: fields.title,
                description: fields.description || '',
                status: fields.status || StoryStatus.DRAFT,
                branches: fields.branches,
                startDate: fields.startDate || null,
                endDate: fields.endDate || null,
                commentAdmin: fields.commentAdmin || '',
                buttonText: fields.buttonText || '',
                link: fields.link || '',
            };

            const newStory = new this.storyModel({
                title: fields.title,
                description: storyData.description,
                status: storyData.status || StoryStatus.DRAFT,
                mainImage: uploadedFile.url,
                link: storyData.link,
                buttonText: storyData.buttonText,
                createdBy: userId,
                branches: storyData.branches,
                startDate: storyData.startDate,
                endDate: storyData.endDate,
                commentAdmin: storyData.commentAdmin,
            });

            const savedStory = await newStory.save();

            return {
                status: 'success',
                statusCode: HttpStatus.CREATED,
                data: savedStory,
                message: 'Story created successfully',
            };
        } catch (error) {
            this.logger.error('Database operation failed, cleaning up the uploaded file');
            await this.fileService.deleteFile(uploadedFile.key);
            return {
                status: 'error',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to create story error`,
            };
        }
    }

    async findAllStories(filter?: any): Promise<ServiceResponse<any[]>> {
        this.logger.log('Finding all stories from database');
        try {
            const query = {};

            if (filter?.status) {
                query['status'] = filter.status;
            }

            const stories = await this.storyModel.find(query).exec();

            return {
                status: 'success',
                statusCode: HttpStatus.OK,
                data: stories,
                message: 'Stories fetched successfully',
            };
        } catch (error) {
            return {
                status: 'error',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to fetch stories error`,
                data: [],
            };
        }
    }

    async findStoryById(id: string): Promise<ServiceResponse<any>> {
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
                                $mergeObjects: ['$root', { items: '$items' }],
                            },
                        },
                    },
                ])
                .exec();

            if (!result || result.length === 0) {
                return {
                    status: 'error',
                    statusCode: 404,
                    message: `Story with ID ${id} not found`,
                    data: null,
                };
            }

            const storyWithItems = result[0];

            return {
                status: 'success',
                data: storyWithItems,
                message: 'Story found successfully',
                statusCode: 200,
            };
        } catch (error: any) {
            this.logger.error(`Error finding story: ${error.message}`);
            return {
                status: 'error',
                statusCode: 500,
                message: `Failed to find story: ${error.message}`,
                data: null,
            };
        }
    }

    async updateStory(id: string, storyData: any, userId: string): Promise<ServiceResponse<any>> {
        this.logger.log(`Updating story with ID: ${id}`);
        try {
            const story = await this.storyModel.findById(id).exec();

            if (!story) {
                return {
                    status: 'error',
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story with ID ${id} not found`,
                };
            }

            const directFields = [
                'title',
                'description',
                'status',
                'mainImage',
                'datePublished',
                'link',
                'buttonText',
                'startDate',
                'endDate',
                'commentAdmin',
            ];

            const updateData: any = {};

            directFields.forEach(field => {
                if (storyData[field] !== undefined) {
                    updateData[field] = storyData[field];
                }
            });

            if (storyData.branches !== undefined) {
                updateData.branches = storyData.branches.map(
                    (branch: string) => new Types.ObjectId(branch),
                );
            }

            if (userId && Types.ObjectId.isValid(userId)) {
                updateData.updatedBy = new Types.ObjectId(userId);
            } else {
                this.logger.warn(`Invalid userId format: ${userId}, using default`);
                updateData.updatedBy = story.createdBy;
            }

            const updatedStory = await this.storyModel
                .findByIdAndUpdate(id, updateData, { new: true })
                .exec();

            return {
                status: 'success',
                statusCode: HttpStatus.OK,
                data: updatedStory,
                message: 'Story updated successfully',
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error updating story: ${errorMessage}`);
            return {
                status: 'error',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to update story: ${errorMessage}`,
            };
        }
    }

    async createStoryItem(
        createStoryItemDto: any,
        userId: string,
    ): Promise<ServiceResponse<any[]>> {
        this.logger.log(`Creating story items for story ID: ${createStoryItemDto.storyId}`);

        try {
            const storyExists = await this.storyModel.findById(createStoryItemDto.storyId).exec();
            if (!storyExists) {
                return {
                    status: 'error',
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story with ID ${createStoryItemDto.storyId} not found`,
                };
            }

            const createdItems = [];

            for (const storyItem of createStoryItemDto.storyItems) {
                const newStoryItem = new this.storyItemModel({
                    storyId: new Types.ObjectId(createStoryItemDto.storyId),
                    title: storyItem.title,
                    description: storyItem.description,
                    image: storyItem.image,
                    orderNumber: storyItem.orderNumber || 0,
                });

                const savedItem = await newStoryItem.save();
                createdItems.push(savedItem);
            }

            return {
                status: 'success',
                statusCode: HttpStatus.CREATED,
                data: createdItems.sort((a, b) => a.orderNumber - b.orderNumber),
                message: 'Story items created successfully',
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error creating story items: ${errorMessage}`);
            return {
                status: 'error',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to create story items: ${errorMessage}`,
            };
        }
    }

    async findStoryItemById(id: string): Promise<ServiceResponse<any>> {
        this.logger.log(`Finding story item with ID: ${id}`);

        try {
            const storyItem = await this.storyItemModel.findById(id).exec();

            if (!storyItem) {
                return {
                    status: 'error',
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story item with ID ${id} not found`,
                };
            }

            return {
                status: 'success',
                statusCode: HttpStatus.OK,
                data: storyItem,
                message: 'Story item found successfully',
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error finding story item: ${errorMessage}`);
            return {
                status: 'error',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to find story item: ${errorMessage}`,
            };
        }
    }

    async updateStoryItem(id: string, updateData: any): Promise<ServiceResponse<any>> {
        this.logger.log(`Updating story item with ID: ${id}`);

        try {
            const currentItem = await this.storyItemModel.findById(id).exec();
            if (!currentItem) {
                return {
                    status: 'error',
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story item with ID ${id} not found`,
                };
            }

            if (!updateData.storyItem) {
                return {
                    status: 'success',
                    statusCode: HttpStatus.OK,
                    data: currentItem,
                    message: 'No updates provided',
                };
            }

            const { title, description, image, orderNumber } = updateData.storyItem;
            const updateObject: any = {};
            if (title !== undefined) updateObject.title = title;
            if (description !== undefined) updateObject.description = description;
            if (image !== undefined) updateObject.image = image;
            if (orderNumber !== undefined) updateObject.orderNumber = orderNumber;

            const updatedStoryItem = await this.storyItemModel
                .findByIdAndUpdate(id, updateObject, { new: true })
                .exec();

            if (!updatedStoryItem) {
                throw new Error(`Story item with ID ${id} could not be updated`);
            }

            return {
                status: 'success',
                statusCode: HttpStatus.OK,
                data: updatedStoryItem,
                message: 'Story item updated successfully',
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error updating story item: ${errorMessage}`);
            return {
                status: 'error',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to update story item: ${errorMessage}`,
            };
        }
    }

    async removeStoryItem(
        id: string,
    ): Promise<ServiceResponse<{ deleted: any; reordered: number }>> {
        this.logger.log(`Removing story item with ID: ${id}`);

        try {
            const storyItem = await this.storyItemModel.findById(id).exec();

            if (!storyItem) {
                return {
                    status: 'error',
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story item with ID ${id} not found`,
                };
            }

            const deletedStoryItem = await this.storyItemModel.findByIdAndDelete(id).exec();

            if (!deletedStoryItem) {
                return {
                    status: 'error',
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `Failed to delete story item with ID ${id}`,
                };
            }

            const itemsToReorder = await this.storyItemModel
                .countDocuments({
                    storyId: storyItem.storyId,
                    orderNumber: { $gt: storyItem.orderNumber },
                })
                .exec();

            await this.reorderAfterDelete(storyItem.storyId.toString(), storyItem.orderNumber);

            return {
                status: 'success',
                statusCode: HttpStatus.OK,
                data: {
                    deleted: deletedStoryItem,
                    reordered: itemsToReorder,
                },
                message: 'Story item removed successfully',
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error removing story item: ${errorMessage}`);
            return {
                status: 'error',
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

    async removeStory(id: string): Promise<ServiceResponse<any>> {
        this.logger.log(`Removing story with ID: ${id}`);

        try {
            const story = await this.storyModel.findById(id).exec();

            if (!story) {
                return {
                    status: 'error',
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story with ID ${id} not found`,
                };
            }

            await this.storyItemModel.deleteMany({ storyId: new Types.ObjectId(id) }).exec();

            const deletedStory = await this.storyModel.findByIdAndDelete(id).exec();

            return {
                status: 'success',
                statusCode: HttpStatus.OK,
                message: 'Story removed successfully',
                data: deletedStory,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error removing story: ${errorMessage}`);
            return {
                status: 'error',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to remove story: ${errorMessage}`,
            };
        }
    }
}
