// import { Injectable, NotFoundException, Logger } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model, Types } from 'mongoose';
// import { Story, StoryDocument, StoryStatus } from '../../shared/models/story.schema';
// import { StoryItem, StoryItemDocument } from '../../shared/models/story-item.schema';
// import { FilterStoriesDto } from './dto/filter-stories.dto';

// // Define the shape of paginate result from mongoose-paginate-v2
// export interface PaginateResult<T> {
//     docs: T[];
//     totalDocs: number;
//     limit: number;
//     hasPrevPage: boolean;
//     hasNextPage: boolean;
//     page: number;
//     totalPages: number;
//     offset: number;
//     prevPage: number | null;
//     nextPage: number | null;
//     pagingCounter: number;
// }
// import { CreateStoryDto } from './dto/create-story.dto';
// import { UpdateStoryDto } from './dto/update-story.dto';
// import { CreateStoryItemDto } from './dto/create-story-item.dto';
// import { UpdateStoryItemDto } from './dto/update-story-item.dto';
// import { UpdateStoryItemsDto } from './dto/update-story-items.dto';

// // Define interface for Story with items
// interface StoryWithItems extends Omit<Story, keyof Document> {
//     _id: string;
//     items: StoryItem[];
//     [key: string]: any; // To accommodate additional fields from Mongoose document
// }

// @Injectable()
// export class StoriesService {
//     constructor(
//         @InjectModel(Story.name)
//         private storyModel: Model<StoryDocument> & { paginate: any },
//         @InjectModel(StoryItem.name)
//         private storyItemModel: Model<StoryItemDocument> & { paginate: any },
//     ) {}

//     async createStory(createStoryDto: CreateStoryDto, userId: string): Promise<Story> {
//         const newStory = new this.storyModel({
//             ...createStoryDto,
//             createdBy: new Types.ObjectId(userId),
//             branches: createStoryDto.branches.map(branch => new Types.ObjectId(branch)),
//         });
//         return newStory.save();
//     }

//     async findAllStories(status?: StoryStatus): Promise<PaginateResult<Story>> {
//         const filters: FilterStoriesDto = {};
//         if (status) {
//             filters.status = status;
//         }
//         const result = await this.findAll(filters);
//         return result;
//     }

//     async findAll(filters: FilterStoriesDto): Promise<PaginateResult<Story>> {
//         const { page, limit, branches, status, startDateFrom, startDateTo, createdBy, search } =
//             filters;

//         const query: any = {};

//         if (branches && branches.length > 0) {
//             query.branches = {
//                 $in: branches.map(id => new Types.ObjectId(id)),
//             };
//         }

//         if (status) {
//             query.status = status;
//         }

//         if (startDateFrom || startDateTo) {
//             query.datePublished = {};
//             if (startDateFrom) {
//                 query.datePublished.$gte = startDateFrom;
//             }
//             if (startDateTo) {
//                 query.datePublished.$lte = startDateTo;
//             }
//         }

//         if (createdBy) {
//             query.createdBy = new Types.ObjectId(createdBy);
//         }

//         if (search) {
//             query.$or = [
//                 { title: { $regex: search, $options: 'i' } },
//                 { description: { $regex: search, $options: 'i' } },
//             ];
//         }

//         const options = {
//             page,
//             limit,
//             sort: { createdAt: -1 },
//         };

//         return this.storyModel.paginate(query, options);
//     }

//     async findStoryById(id: string): Promise<StoryWithItems> {
//         // Find the story by ID
//         const story = await this.storyModel.findById(id).exec();
//         if (!story) {
//             throw new NotFoundException(`Story with ID ${id} not found`);
//         }

//         // Find all related story items
//         const storyItems = await this.storyItemModel
//             .find({
//                 storyId: new Types.ObjectId(id),
//             })
//             .sort({ orderNumber: 1 })
//             .exec();

//         // Convert story to plain object and attach items
//         const storyObj = story.toObject();
//         // Create a new object that matches our interface
//         const storyWithItems: StoryWithItems = {
//             ...storyObj,
//             _id: storyObj._id.toString(),
//             items: storyItems,
//         };

//         return storyWithItems;
//     }

//     async updateStory(id: string, updateStoryDto: UpdateStoryDto, userId: string): Promise<Story> {
//         const storyExists = await this.storyModel.exists({ _id: id });

//         if (!storyExists) {
//             throw new NotFoundException(`Story with ID ${id} not found`);
//         }

//         const updatedStory = await this.storyModel
//             .findByIdAndUpdate(
//                 id,
//                 {
//                     ...updateStoryDto,
//                     updatedBy: new Types.ObjectId(userId),
//                 },
//                 { new: true },
//             )
//             .exec();

//         if (!updatedStory) {
//             throw new Error(`Story with ID ${id} can not be updated`);
//         }

//         return updatedStory;
//     }

//     async removeStory(id: string): Promise<Story> {
//         // First remove all associated story items
//         const deletedStoryItems = await this.storyItemModel.deleteMany({ storyId: id }).exec();

//         if (!deletedStoryItems) {
//             throw new Error(`Story items with ID ${id} can not be deleted`);
//         }

//         // Then remove the story
//         const deletedStory = await this.storyModel.findByIdAndDelete(id).exec();

//         if (!deletedStory) {
//             throw new Error(`Story with ID ${id} can not be deleted`);
//         }

//         return deletedStory;
//     }

//     async createStoryItem(createStoryItemDto: CreateStoryItemDto): Promise<StoryItem[]> {
//         // Verify the story exists
//         console.log('1');
//         const storyExists = await this.storyModel.exists({
//             _id: createStoryItemDto.storyId,
//         });

//         if (!storyExists) {
//             throw new NotFoundException(`Story with ID ${createStoryItemDto.storyId} not found`);
//         }
//         console.log('2');

//         const createdItems: StoryItem[] = [];

//         try {
//             // Create each story item without complex order number validation
//             for (const storyItem of createStoryItemDto.storyItems) {
//                 const newStoryItem = new this.storyItemModel({
//                     storyId: createStoryItemDto.storyId,
//                     title: storyItem.title,
//                     description: storyItem.description,
//                     image: storyItem.image,
//                     orderNumber: storyItem.orderNumber || 0, // Use provided orderNumber or default to 0
//                 });

//                 const savedItem = await newStoryItem.save();
//                 createdItems.push(savedItem);
//             }

//             // Return created items sorted by orderNumber for consistency
//             return createdItems.sort((a, b) => a.orderNumber - b.orderNumber);
//         } catch (error: any) {
//             throw error;
//         }
//     }

//     async findStoryItemById(id: string): Promise<StoryItem> {
//         const storyItem = await this.storyItemModel.findById(id).exec();

//         if (!storyItem) {
//             throw new NotFoundException(`Story item with ID ${id} not found`);
//         }

//         return storyItem;
//     }

//     async updateStoryItem(id: string, updateStoryItemDto: UpdateStoryItemDto): Promise<StoryItem> {
//         // Find the current item
//         const currentItem = await this.storyItemModel.findById(id).exec();
//         if (!currentItem) {
//             throw new NotFoundException(`Story item with ID ${id} not found`);
//         }

//         // Check if we have storyItem data to update
//         if (!updateStoryItemDto.storyItem) {
//             return currentItem; // Nothing to update
//         }

//         try {
//             // Extract values from the nested DTO
//             const { title, description, image, orderNumber } = updateStoryItemDto.storyItem;

//             // Create update object with only the properties that are defined
//             const updateData: any = {};
//             if (title !== undefined) updateData.title = title;
//             if (description !== undefined) updateData.description = description;
//             if (image !== undefined) updateData.image = image;
//             if (orderNumber !== undefined) updateData.orderNumber = orderNumber;

//             const updatedStoryItem = await this.storyItemModel
//                 .findByIdAndUpdate(id, updateData, { new: true })
//                 .exec();

//             if (!updatedStoryItem) {
//                 throw new Error(`Story item with ID ${id} could not be updated`);
//             }

//             return updatedStoryItem;
//         } catch (error: any) {
//             throw error;
//         }
//     }

//     // Removed batch update method as each item must be updated individually

//     async removeStoryItem(id: string): Promise<{ deleted: StoryItem; reordered: number }> {
//         // Find the item first to get its storyId and orderNumber
//         const storyItem = await this.storyItemModel.findById(id).exec();

//         if (!storyItem) {
//             throw new NotFoundException(`Story item with ID ${id} not found`);
//         }

//         try {
//             // Delete the item
//             const deletedStoryItem = await this.storyItemModel.findByIdAndDelete(id).exec();

//             if (!deletedStoryItem) {
//                 throw new Error(`Failed to delete story item with ID ${id}`);
//             }

//             // Count how many items will be reordered
//             const itemsToReorder = await this.storyItemModel
//                 .countDocuments({
//                     storyId: storyItem.storyId,
//                     orderNumber: { $gt: storyItem.orderNumber },
//                 })
//                 .exec();

//             // Reorder remaining items to close the gap
//             await this.reorderAfterDelete(storyItem.storyId.toString(), storyItem.orderNumber);

//             // Return both the deleted item and count of reordered items
//             return {
//                 deleted: deletedStoryItem,
//                 reordered: itemsToReorder,
//             };
//         } catch (error: any) {
//             throw new Error(`Failed to delete story item: ${error.message}`);
//         }
//     }

//     // Helper method to reorder items when orderNumber changes
//     private async reorderItems(
//         storyId: string,
//         oldOrderNumber: number,
//         newOrderNumber: number,
//     ): Promise<void> {
//         if (oldOrderNumber < newOrderNumber) {
//             // Moving item down - shift items in between up
//             await this.storyItemModel
//                 .updateMany(
//                     {
//                         storyId: storyId,
//                         orderNumber: { $gt: oldOrderNumber, $lte: newOrderNumber },
//                     },
//                     { $inc: { orderNumber: -1 } },
//                 )
//                 .exec();
//         } else if (oldOrderNumber > newOrderNumber) {
//             // Moving item up - shift items in between down
//             await this.storyItemModel
//                 .updateMany(
//                     {
//                         storyId: storyId,
//                         orderNumber: { $gte: newOrderNumber, $lt: oldOrderNumber },
//                     },
//                     { $inc: { orderNumber: 1 } },
//                 )
//                 .exec();
//         }
//     }

//     // Helper method to reorder items after deletion
//     private async reorderAfterDelete(storyId: string, deletedOrderNumber: number): Promise<void> {
//         // Decrease orderNumber of all items that had a higher order
//         await this.storyItemModel
//             .updateMany(
//                 {
//                     storyId: storyId,
//                     orderNumber: { $gt: deletedOrderNumber },
//                 },
//                 { $inc: { orderNumber: -1 } },
//             )
//             .exec();
//     }
// }
