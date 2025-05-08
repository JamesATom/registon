// import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
// import { ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
// import { CreateStoryDto } from '../dto/create-story.dto';
// import { CreateStoryItemDto } from '../dto/create-story-item.dto';
// import { FilterStoriesDto } from '../dto/filter-stories.dto';
// import { UpdateStoryItemsDto } from '../dto/update-story-items.dto';

// export const ApiCreateStory = () =>
//     applyDecorators(
//         HttpCode(HttpStatus.CREATED),
//         ApiOperation({ summary: 'Create a new story' }),
//         ApiResponse({
//             status: 201,
//             description: 'Story created successfully',
//         }),
//         ApiBody({ type: CreateStoryDto }),
//     );

// export const ApiFilterStories = () =>
//     applyDecorators(
//         ApiOperation({ summary: 'Filter stories with complex criteria' }),
//         ApiResponse({
//             status: 200,
//             description: 'Return stories matching the criteria',
//         }),
//         ApiBody({ type: FilterStoriesDto }),
//     );

// export const ApiGetStoryById = () =>
//     applyDecorators(
//         ApiOperation({ summary: 'Get a story by ID' }),
//         ApiParam({ name: 'id', description: 'Story ID' }),
//         ApiResponse({ status: 200, description: 'Return the story' }),
//         ApiResponse({ status: 404, description: 'Story not found' }),
//     );

// export const ApiUpdateStory = () =>
//     applyDecorators(
//         ApiOperation({ summary: 'Update a story' }),
//         ApiParam({ name: 'id', description: 'Story ID' }),
//         ApiResponse({
//             status: 200,
//             description: 'Story updated successfully',
//         }),
//         ApiResponse({ status: 404, description: 'Story not found' }),
//     );

// export const ApiRemoveStory = () =>
//     applyDecorators(
//         ApiOperation({ summary: 'Delete a story' }),
//         ApiParam({ name: 'id', description: 'Story ID' }),
//         ApiResponse({
//             status: 200,
//             description: 'Story deleted successfully',
//         }),
//         ApiResponse({ status: 404, description: 'Story not found' }),
//     );

// export const ApiPublishStory = () =>
//     applyDecorators(
//         ApiOperation({ summary: 'Publish a story' }),
//         ApiParam({ name: 'id', description: 'Story ID' }),
//         ApiResponse({
//             status: 200,
//             description: 'Story published successfully',
//         }),
//         ApiResponse({ status: 404, description: 'Story not found' }),
//     );

// // Story Item decorators
// export const ApiCreateStoryItem = () =>
//     applyDecorators(
//         HttpCode(HttpStatus.CREATED),
//         ApiOperation({ summary: 'Create a new story item' }),
//         ApiResponse({
//             status: 201,
//             description: 'Story item created successfully',
//         }),
//         ApiResponse({
//             status: 404,
//             description: 'Referenced story not found',
//         }),
//         ApiBody({ type: CreateStoryItemDto }),
//     );

// export const ApiGetAllStoryItems = () =>
//     applyDecorators(
//         ApiOperation({ summary: 'Get all items for a story' }),
//         ApiParam({ name: 'storyId', description: 'Story ID' }),
//         ApiResponse({ status: 200, description: 'Return all story items' }),
//     );

// export const ApiGetStoryItemById = () =>
//     applyDecorators(
//         ApiOperation({ summary: 'Get a story item by ID' }),
//         ApiParam({ name: 'id', description: 'Story item ID' }),
//         ApiResponse({ status: 200, description: 'Return the story item' }),
//         ApiResponse({
//             status: 404,
//             description: 'Story item not found',
//         }),
//     );

// export const ApiUpdateStoryItem = () =>
//     applyDecorators(
//         ApiOperation({ summary: 'Update a story item' }),
//         ApiParam({ name: 'id', description: 'Story item ID' }),
//         ApiResponse({
//             status: 200,
//             description: 'Story item updated successfully',
//         }),
//         ApiResponse({
//             status: 404,
//             description: 'Story item not found',
//         }),
//     );

// export const ApiDeleteStoryItem = () =>
//     applyDecorators(
//         ApiOperation({
//             summary: 'Delete a story item and reorder remaining items',
//         }),
//         ApiParam({ name: 'id', description: 'Story item ID' }),
//         ApiResponse({
//             status: 200,
//             description: 'Story item deleted successfully and remaining items reordered',
//         }),
//         ApiResponse({
//             status: 404,
//             description: 'Story item not found',
//         }),
//         ApiResponse({
//             status: 500,
//             description: 'Error deleting story item',
//         }),
//     );

// export const ApiBatchUpdateStoryItems = () =>
//     applyDecorators(
//         ApiOperation({ summary: 'Update multiple story items in batch' }),
//         ApiResponse({
//             status: 200,
//             description: 'Story items updated successfully',
//         }),
//         ApiResponse({
//             status: 404,
//             description: 'Story or story items not found',
//         }),
//         ApiResponse({
//             status: 500,
//             description: 'Error updating story items',
//         }),
//         ApiBody({ type: UpdateStoryItemsDto }),
//     );
