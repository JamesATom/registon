import { HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, ObjectId } from 'mongoose';
import { Story, StoryDocument, StoryStatus } from '../../../shared/models/story.schema';
import { StoryItem, StoryItemDocument } from '../../../shared/models/story-item.schema';
import { FileService } from '../../../file/file.service';
import { ServiceResponse } from '../../../common/interfaces/service-response.interface';

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
        @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
        @InjectModel(StoryItem.name) private storyItemModel: Model<StoryItemDocument>,
        private readonly fileService: FileService,
    ) {
        this.logger.log('StoryService initialized with database connection');
    }

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
                branches: storyData.branches?.map((branch: any) => branch),
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
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Error fetching stories: ${errorMessage}`);
            return {
                status: 'error',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to fetch stories: ${errorMessage}`,
                data: [],
            };
        }
    }

    async findStoryById(
        id: string,
    ): Promise<{ status: string; data?: any; message: string; statusCode: number }> {
        try {
            // Use aggregation with $lookup to get story and its items in one query
            const result = await this.storyModel.aggregate([
                { $match: { _id: new Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: 'storyitems', // The collection name (lowercase and pluralized)
                        localField: '_id',
                        foreignField: 'storyId',
                        as: 'items'
                    }
                },
                {
                    $unwind: {
                        path: '$items',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $sort: { 'items.orderNumber': 1 }
                },
                {
                    $group: {
                        _id: '$_id',
                        root: { $first: '$$ROOT' },
                        items: { $push: '$items' }
                    }
                },
                {
                    $replaceRoot: {
                        newRoot: {
                            $mergeObjects: [
                                '$root',
                                { items: '$items' }
                            ]
                        }
                    }
                }
            ]).exec();

            // Check if story was found
            if (!result || result.length === 0) {
                return {
                    status: 'error',
                    statusCode: 404,
                    message: `Story with ID ${id} not found`,
                    data: null,
                };
            }

            // The first item in the result array is our story with items
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
            // Find the story first
            const story = await this.storyModel.findById(id).exec();

            if (!story) {
                return {
                    status: 'error',
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story with ID ${id} not found`,
                };
            }

            // Handle image replacement if a new mainImage is provided
            if (storyData.mainImage !== undefined && storyData.mainImage !== story.mainImage) {
                // If a story already has a mainImage, we should delete the old file
                if (story.mainImage) {
                    try {
                        // Extract the key from the URL
                        const oldImageUrl = new URL(story.mainImage);
                        const oldImagePathParts = oldImageUrl.pathname.split('/');
                        // Remove the first empty string
                        oldImagePathParts.shift();
                        const oldImageKey = oldImagePathParts.join('/');

                        // Delete the old image file
                        this.logger.log(`Deleting old main image file with key: ${oldImageKey}`);
                        await this.fileService.deleteFile(oldImageKey);
                        this.logger.log(`Successfully deleted old main image: ${oldImageKey}`);
                    } catch (fileError) {
                        // Log the error but continue with update
                        const errorMessage =
                            fileError instanceof Error ? fileError.message : 'Unknown error';
                        this.logger.warn(`Error deleting old main image file: ${errorMessage}`);
                    }
                }
            }

            const updateData: any = {};

            if (storyData.title !== undefined) updateData.title = storyData.title;

            if (storyData.description !== undefined) updateData.description = storyData.description;

            if (storyData.status !== undefined) updateData.status = storyData.status;

            if (storyData.mainImage !== undefined) updateData.mainImage = storyData.mainImage;

            if (storyData.datePublished !== undefined)
                updateData.datePublished = storyData.datePublished;

            if (storyData.link !== undefined) updateData.link = storyData.link;

            if (storyData.buttonText !== undefined) updateData.buttonText = storyData.buttonText;

            if (storyData.branches !== undefined) {
                updateData.branches = storyData.branches.map(
                    (branch: string) => new Types.ObjectId(branch),
                );
            }

            if (storyData.startDate !== undefined) updateData.startDate = storyData.startDate;

            if (storyData.endDate !== undefined) updateData.endDate = storyData.endDate;

            if (storyData.commentAdmin !== undefined)
                updateData.commentAdmin = storyData.commentAdmin;

            if (userId && Types.ObjectId.isValid(userId)) {
                updateData.updatedBy = new Types.ObjectId(userId);
            } else {
                this.logger.warn(`Invalid userId format: ${userId}, using default`);
                // Use a default value or the existing createdBy value
                updateData.updatedBy =
                    story.createdBy || new Types.ObjectId('000000000000000000000000');
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

    // Story Item methods
    async createStoryItem(
        createStoryItemDto: CreateStoryItemRequest,
        userId: string,
    ): Promise<ServiceResponse<any[]>> {
        this.logger.log(`Creating story items for story ID: ${createStoryItemDto.storyId}`);

        try {
            console.log('createStoryItemDto', createStoryItemDto);
            console.log('userId', userId);
            const storyExists = await this.storyModel.findById(createStoryItemDto.storyId).exec();
            console.log('storyExists', storyExists);
            if (!storyExists) {
                throw new NotFoundException(
                    `Story with ID ${createStoryItemDto.storyId} not found`,
                );
            }

            const createdItems = [];

            // Create each story item
            for (const storyItem of createStoryItemDto.storyItems) {
                const newStoryItem = new this.storyItemModel({
                    storyId: new Types.ObjectId(createStoryItemDto.storyId),
                    title: storyItem.title,
                    description: storyItem.description,
                    image: storyItem.image,
                    orderNumber: storyItem.orderNumber || 0, // Use provided orderNumber or default to 0
                });

                const savedItem = await newStoryItem.save();
                createdItems.push(savedItem);
            }

            // Return created items sorted by orderNumber for consistency
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

    async updateStoryItem(
        id: string,
        updateData: UpdateStoryItemRequest,
    ): Promise<ServiceResponse<any>> {
        this.logger.log(`Updating story item with ID: ${id}`);

        try {
            // Find the current item
            const currentItem = await this.storyItemModel.findById(id).exec();
            if (!currentItem) {
                return {
                    status: 'error',
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story item with ID ${id} not found`,
                };
            }

            // Check if we have storyItem data to update
            if (!updateData.storyItem) {
                return {
                    status: 'success',
                    statusCode: HttpStatus.OK,
                    data: currentItem,
                    message: 'No updates provided',
                };
            }

            // Extract values from the nested DTO
            const { title, description, image, orderNumber } = updateData.storyItem;

            // Create update object with only the properties that are defined
            const updateObject: any = {};
            if (title !== undefined) updateObject.title = title;
            if (description !== undefined) updateObject.description = description;

            // Handle image replacement if a new image is provided
            if (image !== undefined && image !== currentItem.image) {
                updateObject.image = image;

                // If a story item already has an image, we should delete the old file
                if (currentItem.image) {
                    try {
                        // Extract the key from the URL
                        const oldImageUrl = new URL(currentItem.image);
                        const oldImagePathParts = oldImageUrl.pathname.split('/');
                        // Remove the first empty string
                        oldImagePathParts.shift();
                        const oldImageKey = oldImagePathParts.join('/');

                        // Delete the old image file
                        this.logger.log(
                            `Deleting old story item image file with key: ${oldImageKey}`,
                        );
                        await this.fileService.deleteFile(oldImageKey);
                        this.logger.log(
                            `Successfully deleted old story item image: ${oldImageKey}`,
                        );
                    } catch (fileError) {
                        // Log the error but continue with update
                        const errorMessage =
                            fileError instanceof Error ? fileError.message : 'Unknown error';
                        this.logger.warn(
                            `Error deleting old story item image file: ${errorMessage}`,
                        );
                    }
                }
            } else if (image !== undefined) {
                updateObject.image = image;
            }

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
            // Find the item first to get its storyId and orderNumber
            const storyItem = await this.storyItemModel.findById(id).exec();

            if (!storyItem) {
                return {
                    status: 'error',
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story item with ID ${id} not found`,
                };
            }

            // If the story item has an image URL, extract the image key and delete it
            if (storyItem.image) {
                try {
                    // Extract the key from the URL
                    // Example URL: https://registon-edu.fra1.digitaloceanspaces.com/story-items/image.jpg
                    // Key would be: story-items/image.jpg
                    const imageUrl = new URL(storyItem.image);
                    const pathParts = imageUrl.pathname.split('/');
                    // Remove the first empty string (pathname starts with /)
                    pathParts.shift();
                    // Join the remaining parts to get the key
                    const imageKey = pathParts.join('/');

                    // Delete the image file from storage
                    this.logger.log(`Deleting image file with key: ${imageKey}`);
                    await this.fileService.deleteFile(imageKey);
                } catch (fileError) {
                    // Log the error but continue with the item deletion
                    const errorMessage =
                        fileError instanceof Error ? fileError.message : 'Unknown error';
                    this.logger.warn(`Error deleting image file: ${errorMessage}`);
                }
            }

            // Delete the item
            const deletedStoryItem = await this.storyItemModel.findByIdAndDelete(id).exec();

            if (!deletedStoryItem) {
                return {
                    status: 'error',
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `Failed to delete story item with ID ${id}`,
                };
            }

            // Count how many items will be reordered
            const itemsToReorder = await this.storyItemModel
                .countDocuments({
                    storyId: storyItem.storyId,
                    orderNumber: { $gt: storyItem.orderNumber },
                })
                .exec();

            // Reorder remaining items to close the gap
            await this.reorderAfterDelete(storyItem.storyId.toString(), storyItem.orderNumber);

            // Return both the deleted item and count of reordered items
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

    // Helper method to reorder items after deletion
    private async reorderAfterDelete(storyId: string, deletedOrderNumber: number): Promise<void> {
        // Decrease orderNumber of all items that had a higher order
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
            // First find the story to get its mainImage URL
            const story = await this.storyModel.findById(id).exec();

            if (!story) {
                return {
                    status: 'error',
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story with ID ${id} not found`,
                };
            }

            // Delete the story's main image if it exists
            if (story.mainImage) {
                try {
                    // Extract the key from the URL
                    const mainImageUrl = new URL(story.mainImage);
                    const mainImagePathParts = mainImageUrl.pathname.split('/');
                    // Remove the first empty string
                    mainImagePathParts.shift();
                    const mainImageKey = mainImagePathParts.join('/');

                    // Delete the main image file
                    this.logger.log(`Deleting main image file with key: ${mainImageKey}`);
                    await this.fileService.deleteFile(mainImageKey);
                } catch (fileError) {
                    // Log the error but continue with the deletion process
                    const errorMessage =
                        fileError instanceof Error ? fileError.message : 'Unknown error';
                    this.logger.warn(`Error deleting main image file: ${errorMessage}`);
                }
            }

            // Find all associated story items to delete their images
            const storyItems = await this.storyItemModel
                .find({ storyId: new Types.ObjectId(id) })
                .exec();

            // Delete associated image files for each story item
            for (const item of storyItems) {
                if (item.image) {
                    try {
                        // Extract the key from the URL
                        const imageUrl = new URL(item.image);
                        const pathParts = imageUrl.pathname.split('/');
                        // Remove the first empty string
                        pathParts.shift();
                        const imageKey = pathParts.join('/');

                        // Delete the image file
                        this.logger.log(`Deleting story item image file with key: ${imageKey}`);
                        await this.fileService.deleteFile(imageKey);
                    } catch (fileError) {
                        // Log the error but continue with next item
                        const errorMessage =
                            fileError instanceof Error ? fileError.message : 'Unknown error';
                        this.logger.warn(`Error deleting story item image file: ${errorMessage}`);
                    }
                }
            }

            // Delete all story items
            await this.storyItemModel.deleteMany({ storyId: new Types.ObjectId(id) }).exec();

            // Then remove the story itself
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
