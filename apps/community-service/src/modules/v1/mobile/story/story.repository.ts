import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Story, StoryDocument, StoryStatus } from '../../../../shared/models/story.schema';
import { StoryItem, StoryItemDocument } from '../../../../shared/models/story-item.schema';
import { ServiceResponse } from '../../../../common/interfaces/service-response.interface';
import {
    StoryStudentAction,
    StoryStudentActionDocument,
} from 'src/shared/models/story-student-action.schema';

@Injectable()
export class MobileStoryRepository {
    private readonly logger = new Logger(MobileStoryRepository.name);

    constructor(
        @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
        @InjectModel(StoryItem.name) private storyItemModel: Model<StoryItemDocument>,
        @InjectModel(StoryStudentAction.name)
        private storyStudentActionModel: Model<StoryStudentActionDocument>,
    ) {}

    async findAllStoriesForMobile(userId: string): Promise<ServiceResponse<any[]>> {
        try {
            const result = await this.storyModel
                .aggregate([
                    { $match: { status: StoryStatus.PUBLISHED } },
                    {
                        $lookup: {
                            from: 'storystudentactions',
                            let: { storyId: '$_id' },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ['$storyId', '$$storyId'] },
                                                {
                                                    $eq: ['$studentId', new Types.ObjectId(userId)],
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                            as: 'viewedActions',
                        },
                    },
                    {
                        $addFields: {
                            isViewed: {
                                $cond: {
                                    if: { $gt: [{ $size: '$viewedActions' }, 0] },
                                    then: true,
                                    else: false,
                                },
                            },
                            isButtonPressed: {
                                $cond: {
                                    if: { $anyElementTrue: '$viewedActions.pressButton' },
                                    then: true,
                                    else: false,
                                },
                            },
                        },
                    },
                    {
                        $project: {
                            viewedActions: 0,
                        },
                    },
                ])
                .exec();

            return {
                statusCode: HttpStatus.OK,
                message: 'Stories fetched successfully for mobile',
                data: result,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to fetch stories for mobile: ${errorMessage}`,
            };
        }
    }

    async findStoryWithItemsById(id: string, userId: string): Promise<ServiceResponse<any>> {
        try {
            // First, check if the story exists
            const storyExists = await this.storyModel.findById(id).exec();
            if (!storyExists) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Story with ID ${id} not found`,
                };
            }

            // Get story items with viewed status
            const items = await this.storyItemModel
                .aggregate([
                    // Match items belonging to this story
                    { $match: { storyId: new Types.ObjectId(id) } },

                    // Sort by order number
                    { $sort: { orderNumber: 1 } },

                    // Look up if the student has viewed this item
                    {
                        $lookup: {
                            from: 'storystudentactions',
                            let: { itemId: '$_id', storyId: '$storyId' },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ['$storyId', '$$storyId'] },
                                                { $eq: ['$studentId', new Types.ObjectId(userId)] },

                                                {
                                                    $anyElementTrue: {
                                                        $map: {
                                                            input: {
                                                                $ifNull: ['$storyItemId', []],
                                                            },
                                                            as: 'itemInArray',
                                                            in: {
                                                                $eq: ['$$itemInArray', '$$itemId'],
                                                            },
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                            as: 'viewedActions',
                        },
                    },

                    // Add isViewed field to each item
                    {
                        $addFields: {
                            isViewed: {
                                $cond: {
                                    if: { $gt: [{ $size: '$viewedActions' }, 0] },
                                    then: true,
                                    else: false,
                                },
                            },
                        },
                    },

                    // Clean up - remove temporary fields
                    {
                        $project: {
                            viewedActions: 0,
                        },
                    },
                ])
                .exec();

            // Also get story student action to see if button was pressed
            const storyAction = await this.storyStudentActionModel
                .findOne({
                    storyId: id,
                    studentId: userId,
                })
                .exec();

            return {
                statusCode: HttpStatus.OK,
                message: 'Story items fetched successfully for mobile',
                data: {
                    items: items,
                    isButtonPressed: storyAction?.pressButton || false,
                },
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to fetch story items for mobile: ${errorMessage}`,
            };
        }
    }

    async trackStoryItems(
        storyId: string,
        storyItemId: string,
        userId: string,
    ): Promise<ServiceResponse<any>> {
        //
        let storyStudentActionExists: any = await this.storyStudentActionModel.findOne({
            storyId: storyId,
            studentId: userId,
        });

        if (!storyStudentActionExists) {
            await this.storyStudentActionModel.create({
                storyId: storyId,
                studentId: userId,
                storyItemId: storyItemId,
            });
            return {
                statusCode: HttpStatus.OK,
                message: 'Story items tracked successfully for mobile',
            };
        }

        const itemExists = storyStudentActionExists.storyItemId.some(
            (id: string) => id == storyItemId,
        );

        if (!itemExists) {
            storyStudentActionExists.storyItemId.push(storyItemId);
            await storyStudentActionExists.save();
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Story items tracked successfully for mobile',
        };
    }

    async trackStoryButton(storyId: string, userId: string): Promise<ServiceResponse<any>> {
        let storyStudentActionExists: any = await this.storyStudentActionModel.findOne({
            storyId,
            studentId: userId,
        });

        if (!storyStudentActionExists) {
            await this.storyStudentActionModel.create({
                storyId,
                userId,
                pressButton: true,
            });
        }

        if (storyStudentActionExists.pressButton === true) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Story button tracked successfully for mobile',
            };
        }

        storyStudentActionExists.pressButton = true;
        await storyStudentActionExists.save();

        return {
            statusCode: HttpStatus.OK,
            message: 'Story button tracked successfully for mobile',
        };
    }
}
