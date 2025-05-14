import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateStoryDto } from '../dto/create-story.dto';
import { CreateStoryItemDto } from '../dto/create-story-item.dto';
import { FilterStoriesDto } from '../dto/filter-stories.dto';
import { UpdateStoryItemsDto } from '../dto/update-story-items.dto';

export const ApiCreateStory = () =>
    applyDecorators(
        HttpCode(HttpStatus.CREATED),
        ApiOperation({ summary: 'Create a new story with file upload' }),
        ApiResponse({
            status: 201,
            description: 'Story created successfully',
        }),
        ApiResponse({
            status: 400,
            description: 'File upload failed or invalid data',
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
        }),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    file: {
                        type: 'string',
                        format: 'binary',
                        description: 'Main image file to upload',
                    },
                    title: {
                        type: 'string',
                        description: 'Title of the story',
                    },
                    description: {
                        type: 'string',
                        description: 'Description of the story (optional)',
                    },
                    status: {
                        type: 'string',
                        description: 'Status of the story (draft, published, archived)',
                        enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
                    },
                    branches: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                        description: 'Branch IDs associated with this story',
                    },
                    link: {
                        type: 'string',
                        description: 'External link (optional)',
                    },
                    buttonText: {
                        type: 'string',
                        description: 'Button text (optional)',
                    },
                    startDate: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Start date (optional)',
                    },
                    endDate: {
                        type: 'string',
                        format: 'date-time',
                        description: 'End date (optional)',
                    },
                    commentAdmin: {
                        type: 'string',
                        description: 'Admin comments about this story (optional)',
                    },
                },
                required: ['file', 'title', 'branches'],
            },
        }),
    );

export const ApiFilterStories = () =>
    applyDecorators(
        ApiOperation({ summary: 'Filter stories with complex criteria' }),
        ApiResponse({
            status: 200,
            description: 'Return stories matching the criteria',
        }),
        ApiBody({ type: FilterStoriesDto }),
    );

export const ApiGetStoryById = () =>
    applyDecorators(
        ApiOperation({ summary: 'Get a story by ID' }),
        ApiParam({ name: 'id', description: 'Story ID' }),
        ApiResponse({ status: 200, description: 'Return the story' }),
        ApiResponse({ status: 404, description: 'Story not found' }),
    );

export const ApiUpdateStory = () =>
    applyDecorators(
        ApiOperation({ summary: 'Update a story with optional file upload' }),
        ApiParam({ name: 'id', description: 'Story ID' }),
        ApiResponse({
            status: 200,
            description: 'Story updated successfully',
        }),
        ApiResponse({ status: 404, description: 'Story not found' }),
        ApiResponse({
            status: 400,
            description: 'File upload failed or invalid data',
        }),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    file: {
                        type: 'string',
                        format: 'binary',
                        description: 'New main image file to upload (optional)',
                    },
                    title: {
                        type: 'string',
                        description: 'Title of the story (optional)',
                    },
                    description: {
                        type: 'string',
                        description: 'Description of the story (optional)',
                    },
                    status: {
                        type: 'string',
                        description: 'Status of the story (draft, published, archived) (optional)',
                        enum: ['draft', 'published', 'archived'],
                    },
                    branches: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                        description: 'Branch IDs associated with this story (optional)',
                    },
                    link: {
                        type: 'string',
                        description: 'External link (optional)',
                    },
                    buttonText: {
                        type: 'string',
                        description: 'Button text (optional)',
                    },
                    startDate: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Start date (optional)',
                    },
                    endDate: {
                        type: 'string',
                        format: 'date-time',
                        description: 'End date (optional)',
                    },
                    commentAdmin: {
                        type: 'string',
                        description: 'Admin comments about this story (optional)',
                    },
                },
            },
        }),
    );

export const ApiRemoveStory = () =>
    applyDecorators(
        ApiOperation({ summary: 'Delete a story' }),
        ApiParam({ name: 'id', description: 'Story ID' }),
        ApiResponse({
            status: 200,
            description: 'Story deleted successfully',
        }),
        ApiResponse({ status: 404, description: 'Story not found' }),
    );

export const ApiPublishStory = () =>
    applyDecorators(
        ApiOperation({ summary: 'Publish a story' }),
        ApiParam({ name: 'id', description: 'Story ID' }),
        ApiResponse({
            status: 200,
            description: 'Story published successfully',
        }),
        ApiResponse({ status: 404, description: 'Story not found' }),
    );

// Story Item decorators
export const ApiCreateStoryItem = () =>
    applyDecorators(
        HttpCode(HttpStatus.CREATED),
        ApiOperation({ summary: 'Create a new story item with file upload' }),
        ApiResponse({
            status: 201,
            description: 'Story item created successfully',
        }),
        ApiResponse({
            status: 404,
            description: 'Referenced story not found',
        }),
        ApiResponse({
            status: 400,
            description: 'File upload failed or invalid data',
        }),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    storyId: {
                        type: 'string',
                        description: 'ID of the parent story',
                    },
                    title: {
                        type: 'string',
                        description: 'Title of the story item',
                    },
                    description: {
                        type: 'string',
                        description: 'Description of the story item (optional)',
                    },
                    orderNumber: {
                        type: 'number',
                        description: 'Order number for sorting (optional)',
                    },
                    file: {
                        type: 'string',
                        format: 'binary',
                        description: 'Image file to upload',
                    },
                },
                required: ['file', 'storyId', 'title'],
            },
        }),
    );

export const ApiGetAllStoryItems = () =>
    applyDecorators(
        ApiOperation({ summary: 'Get all items for a story' }),
        ApiParam({ name: 'storyId', description: 'Story ID' }),
        ApiResponse({ status: 200, description: 'Return all story items' }),
    );

export const ApiGetStoryItemById = () =>
    applyDecorators(
        ApiOperation({ summary: 'Get a story item by ID' }),
        ApiParam({ name: 'id', description: 'Story item ID' }),
        ApiResponse({ status: 200, description: 'Return the story item' }),
        ApiResponse({
            status: 404,
            description: 'Story item not found',
        }),
    );

export const ApiUpdateStoryItem = () =>
    applyDecorators(
        ApiOperation({ summary: 'Update a story item with optional file upload' }),
        ApiParam({ name: 'id', description: 'Story item ID' }),
        ApiResponse({
            status: 200,
            description: 'Story item updated successfully',
        }),
        ApiResponse({
            status: 404,
            description: 'Story item not found',
        }),
        ApiResponse({
            status: 400,
            description: 'File upload failed or invalid data',
        }),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        description: 'New title of the story item (optional)',
                    },
                    description: {
                        type: 'string',
                        description: 'New description of the story item (optional)',
                    },
                    orderNumber: {
                        type: 'number',
                        description: 'New order number for sorting (optional)',
                    },
                    file: {
                        type: 'string',
                        format: 'binary',
                        description: 'New image file to upload (optional)',
                    },
                },
            },
        }),
    );

export const ApiDeleteStoryItem = () =>
    applyDecorators(
        ApiOperation({
            summary: 'Delete a story item and reorder remaining items',
        }),
        ApiParam({ name: 'id', description: 'Story item ID' }),
        ApiResponse({
            status: 200,
            description: 'Story item deleted successfully and remaining items reordered',
        }),
        ApiResponse({
            status: 404,
            description: 'Story item not found',
        }),
        ApiResponse({
            status: 500,
            description: 'Error deleting story item',
        }),
    );

export const ApiBatchUpdateStoryItems = () =>
    applyDecorators(
        ApiOperation({ summary: 'Update multiple story items in batch' }),
        ApiResponse({
            status: 200,
            description: 'Story items updated successfully',
        }),
        ApiResponse({
            status: 404,
            description: 'Story or story items not found',
        }),
        ApiResponse({
            status: 500,
            description: 'Error updating story items',
        }),
        ApiBody({ type: UpdateStoryItemsDto }),
    );
