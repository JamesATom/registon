import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { FilterStoriesDto } from '../dto/filter-stories.dto';
import {
    StoryResponseEntity,
    StoryListResponseEntity,
    StoryItemResponseEntity,
} from '../story-response.entity';

export const ApiCreateStory = () =>
    applyDecorators(
        HttpCode(HttpStatus.CREATED),
        ApiOperation({ summary: 'Create a new story with file upload' }),
        ApiResponse({
            status: 201,
            description: 'Story created successfully',
            type: StoryResponseEntity,
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 201,
                        message: 'Story created successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567890',
                            title: 'New Story',
                            description: 'This is a new story',
                            status: 'DRAFT',
                            mainImage: 'https://example.com/image.jpg',
                            datePublished: null,
                            link: 'https://example.com/new-story',
                            buttonText: 'Read More',
                            branches: ['60a7c8b9e4b0c1234567891'],
                            startDate: '2025-05-15T00:00:00Z',
                            endDate: '2025-06-15T23:59:59Z',
                            commentAdmin: 'Initial story creation',
                            createdBy: '60a7c8b9e4b0c1234567892',
                            updatedBy: '60a7c8b9e4b0c1234567892',
                            createdAt: '2025-05-15T13:00:00Z',
                            updatedAt: '2025-05-15T13:00:00Z',
                            storyItems: [],
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'File upload failed or invalid data',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 400,
                        message: 'Main image file is required',
                        error: 'Bad Request',
                    },
                },
            },
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
                        description: 'Status of the story (draft, published)',
                        enum: ['DRAFT', 'PUBLISHED'],
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
        ApiOperation({ summary: 'Filter and get all stories' }),
        ApiResponse({
            status: 200,
            description: 'Stories retrieved successfully',
            type: StoryListResponseEntity,
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 200,
                        message: 'Stories retrieved successfully',
                        data: [
                            {
                                _id: '60a7c8b9e4b0c1234567890',
                                title: 'Sample Story 1',
                                description: 'This is sample story 1',
                                status: 'PUBLISHED',
                                mainImage: 'https://example.com/image1.jpg',
                                datePublished: '2025-05-15T10:00:00Z',
                                link: 'https://example.com/story1',
                                buttonText: 'Read More',
                                branches: ['60a7c8b9e4b0c1234567891'],
                                startDate: '2025-05-01T00:00:00Z',
                                endDate: '2025-05-31T23:59:59Z',
                                commentAdmin: 'Admin notes for story 1',
                                createdBy: '60a7c8b9e4b0c1234567892',
                                updatedBy: '60a7c8b9e4b0c1234567892',
                                createdAt: '2025-05-15T09:00:00Z',
                                updatedAt: '2025-05-15T09:30:00Z',
                                storyItems: [],
                            },
                        ],
                        pagination: {
                            total: 1,
                            page: 1,
                            limit: 10,
                            totalPages: 1,
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Invalid filter parameters',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 400,
                        message: 'Invalid filter parameters',
                        error: 'Bad Request',
                    },
                },
            },
        }),
        ApiBody({ type: FilterStoriesDto }),
    );

export const ApiGetStoryById = () =>
    applyDecorators(
        ApiOperation({ summary: 'Get a story by ID' }),
        ApiParam({ name: 'id', description: 'Story ID' }),
        ApiResponse({
            status: 200,
            description: 'Return the story',
            type: StoryResponseEntity,
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 200,
                        message: 'Story retrieved successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567890',
                            title: 'Sample Story 1',
                            description: 'This is sample story 1',
                            status: 'PUBLISHED',
                            mainImage: 'https://example.com/image1.jpg',
                            datePublished: '2025-05-15T10:00:00Z',
                            link: 'https://example.com/story1',
                            buttonText: 'Read More',
                            branches: ['60a7c8b9e4b0c1234567891'],
                            startDate: '2025-05-01T00:00:00Z',
                            endDate: '2025-05-31T23:59:59Z',
                            commentAdmin: 'Admin notes for story 1',
                            createdBy: '60a7c8b9e4b0c1234567892',
                            updatedBy: '60a7c8b9e4b0c1234567892',
                            createdAt: '2025-05-15T09:00:00Z',
                            updatedAt: '2025-05-15T09:30:00Z',
                            storyItems: [],
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Story not found',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 404,
                        message: 'Story with ID 60a7c8b9e4b0c1234567890 not found',
                        error: 'Not Found',
                    },
                },
            },
        }),
    );

export const ApiUpdateStory = () =>
    applyDecorators(
        ApiOperation({ summary: 'Update a story with optional file upload' }),
        ApiParam({ name: 'id', description: 'Story ID' }),
        ApiResponse({
            status: 200,
            description: 'Story updated successfully',
            type: StoryResponseEntity,
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 200,
                        message: 'Story updated successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567890',
                            title: 'Updated Story',
                            description: 'This is an updated story',
                            status: 'PUBLISHED',
                            mainImage: 'https://example.com/updated-image.jpg',
                            datePublished: '2025-05-15T13:00:00Z',
                            link: 'https://example.com/updated-story',
                            buttonText: 'View Story',
                            branches: ['60a7c8b9e4b0c1234567891'],
                            startDate: '2025-05-15T00:00:00Z',
                            endDate: '2025-06-15T23:59:59Z',
                            commentAdmin: 'Story has been updated',
                            updatedBy: '60a7c8b9e4b0c1234567892',
                            updatedAt: '2025-05-15T13:30:00Z',
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Story not found',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 404,
                        message: 'Story with ID 60a7c8b9e4b0c1234567890 not found',
                        error: 'Not Found',
                    },
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'File upload failed or invalid data',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 400,
                        message: 'Main image file is required',
                        error: 'Bad Request',
                    },
                },
            },
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
                        description: 'Status of the story (draft, published) (optional)',
                        enum: ['DRAFT', 'PUBLISHED'],
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
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 200,
                        message: 'Story deleted successfully',
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Story not found',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 404,
                        message: 'Story with ID 60a7c8b9e4b0c1234567890 not found',
                        error: 'Not Found',
                    },
                },
            },
        }),
    );

export const ApiPublishStory = () =>
    applyDecorators(
        ApiOperation({ summary: 'Publish a story' }),
        ApiParam({ name: 'id', description: 'Story ID' }),
        ApiResponse({
            status: 200,
            description: 'Story published successfully',
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 200,
                        message: 'Story published successfully',
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Story not found',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 404,
                        message: 'Story with ID 60a7c8b9e4b0c1234567890 not found',
                        error: 'Not Found',
                    },
                },
            },
        }),
    );

// Story Item decorators
export const ApiCreateStoryItem = () =>
    applyDecorators(
        HttpCode(HttpStatus.CREATED),
        ApiOperation({ summary: 'Create a new story item with file upload' }),
        ApiResponse({
            status: 201,
            description: 'Story item created successfully',
            type: StoryItemResponseEntity,
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 201,
                        message: 'Story item created successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567894',
                            storyId: '60a7c8b9e4b0c1234567890',
                            title: 'New Story Item',
                            description: 'This is a new story item',
                            image: 'https://example.com/item-image.jpg',
                            orderNumber: 1,
                            createdAt: '2025-05-15T13:00:00Z',
                            updatedAt: '2025-05-15T13:00:00Z',
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'File upload failed or invalid data',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 400,
                        message: 'Story item image is required',
                        error: 'Bad Request',
                    },
                },
            },
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
                        description: 'Order number for the story item',
                    },
                    file: {
                        type: 'string',
                        format: 'binary',
                        description: 'Image file for the story item',
                    },
                },
                required: ['storyId', 'title', 'file'],
            },
        }),
    );

export const ApiGetStoryItemById = () =>
    applyDecorators(
        ApiOperation({ summary: 'Get a story item by ID' }),
        ApiParam({ name: 'id', description: 'Story item ID' }),
        ApiResponse({
            status: 200,
            description: 'Return the story item',
            type: StoryItemResponseEntity,
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 200,
                        message: 'Story item retrieved successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567894',
                            storyId: '60a7c8b9e4b0c1234567890',
                            title: 'Sample Story Item',
                            description: 'This is a sample story item',
                            image: 'https://example.com/item-image.jpg',
                            orderNumber: 1,
                            createdAt: '2025-05-15T13:00:00Z',
                            updatedAt: '2025-05-15T13:00:00Z',
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Story item not found',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 404,
                        message: 'Story item with ID 60a7c8b9e4b0c1234567894 not found',
                        error: 'Not Found',
                    },
                },
            },
        }),
    );

export const ApiUpdateStoryItem = () =>
    applyDecorators(
        ApiOperation({ summary: 'Update a story item with optional file upload' }),
        ApiParam({ name: 'id', description: 'Story item ID' }),
        ApiResponse({
            status: 200,
            description: 'Story item updated successfully',
            type: StoryItemResponseEntity,
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 200,
                        message: 'Story item updated successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567894',
                            storyId: '60a7c8b9e4b0c1234567890',
                            title: 'Updated Story Item',
                            description: 'This is an updated story item',
                            image: 'https://example.com/updated-item-image.jpg',
                            orderNumber: 1,
                            updatedAt: '2025-05-15T13:30:00Z',
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Story item not found',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 404,
                        message: 'Story item with ID 60a7c8b9e4b0c1234567894 not found',
                        error: 'Not Found',
                    },
                },
            },
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

export const ApiUpdateStoryItems = () =>
    applyDecorators(
        ApiOperation({ summary: 'Update order numbers for multiple story items' }),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    items: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'string', example: '60a7c8b9e4b0c1234567894' },
                                orderNumber: { type: 'number', example: 1 },
                            },
                            required: ['id', 'orderNumber'],
                        },
                    },
                },
                required: ['items'],
            },
        }),
        ApiResponse({
            status: 200,
            description: 'Story items updated successfully',
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 200,
                        message: 'Story items updated successfully',
                        data: [
                            {
                                id: '60a7c8b9e4b0c1234567894',
                                orderNumber: 1,
                            },
                            {
                                id: '60a7c8b9e4b0c1234567895',
                                orderNumber: 2,
                            },
                        ],
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Story item not found',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 404,
                        message: 'One or more story items not found',
                        error: 'Not Found',
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
