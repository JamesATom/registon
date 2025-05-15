import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MobileStoryListResponseEntity, MobileStoryWithItemsEntity } from '../dto/mobile-response.entity';

export function ApiGetAllMobileStories() {
    return applyDecorators(
        ApiOperation({ summary: 'Get all stories for mobile without pagination' }),
        ApiQuery({
            name: 'status',
            required: false,
            enum: ['DRAFT', 'PUBLISHED'],
            description: 'Filter stories by status',
        }),
        ApiResponse({
            status: 200,
            description: 'The stories have been successfully retrieved',
            type: MobileStoryListResponseEntity,
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 200,
                        message: 'Stories retrieved successfully',
                        data: [
                            {
                                _id: '60a7c8b9e4b0c1234567890',
                                title: 'Sample Mobile Story',
                                description: 'This is a sample story for mobile',
                                status: 'PUBLISHED',
                                mainImage: 'https://example.com/image1.jpg',
                                datePublished: '2025-05-15T10:00:00Z',
                                link: 'https://example.com/story1',
                                buttonText: 'Read More',
                                branches: ['60a7c8b9e4b0c1234567891'],
                                createdBy: '60a7c8b9e4b0c1234567892',
                                createdAt: '2025-05-15T09:00:00Z',
                                updatedAt: '2025-05-15T09:30:00Z',
                            },
                            {
                                _id: '60a7c8b9e4b0c1234567893',
                                title: 'Another Mobile Story',
                                description: 'This is another mobile story',
                                status: 'PUBLISHED',
                                mainImage: 'https://example.com/image2.jpg',
                                datePublished: '2025-05-14T10:00:00Z',
                                link: 'https://example.com/story2',
                                buttonText: 'View',
                                branches: ['60a7c8b9e4b0c1234567891'],
                                createdBy: '60a7c8b9e4b0c1234567892',
                                createdAt: '2025-05-14T09:00:00Z',
                                updatedAt: '2025-05-14T09:30:00Z',
                            },
                        ],
                    },
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad request',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 400,
                        message: 'Failed to get mobile stories',
                        error: 'Bad Request',
                    },
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 500,
                        message: 'An unexpected error occurred',
                        error: 'Internal Server Error',
                    },
                },
            },
        }),
    );
}

export function ApiGetMobileStoryWithItems() {
    return applyDecorators(
        ApiOperation({ summary: 'Get a story with its items by ID for mobile' }),
        ApiParam({
            name: 'id',
            required: true,
            description: 'Story ID',
            type: String,
        }),
        ApiResponse({
            status: 200,
            description: 'The story with items has been successfully retrieved',
            type: MobileStoryWithItemsEntity,
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 200,
                        message: 'Story with items retrieved successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567890',
                            title: 'Sample Mobile Story',
                            description: 'This is a sample story for mobile',
                            status: 'PUBLISHED',
                            mainImage: 'https://example.com/image1.jpg',
                            datePublished: '2025-05-15T10:00:00Z',
                            link: 'https://example.com/story1',
                            buttonText: 'Read More',
                            branches: ['60a7c8b9e4b0c1234567891'],
                            createdBy: '60a7c8b9e4b0c1234567892',
                            createdAt: '2025-05-15T09:00:00Z',
                            updatedAt: '2025-05-15T09:30:00Z',
                            items: [
                                {
                                    _id: '60a7c8b9e4b0c1234567894',
                                    storyId: '60a7c8b9e4b0c1234567890',
                                    title: 'First Item',
                                    description: 'This is the first item of the story',
                                    image: 'https://example.com/item1.jpg',
                                    orderNumber: 1,
                                    createdAt: '2025-05-15T10:05:00Z',
                                    updatedAt: '2025-05-15T10:05:00Z',
                                },
                                {
                                    _id: '60a7c8b9e4b0c1234567895',
                                    storyId: '60a7c8b9e4b0c1234567890',
                                    title: 'Second Item',
                                    description: 'This is the second item of the story',
                                    image: 'https://example.com/item2.jpg',
                                    orderNumber: 2,
                                    createdAt: '2025-05-15T10:10:00Z',
                                    updatedAt: '2025-05-15T10:10:00Z',
                                },
                            ],
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
            description: 'Bad request',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 400,
                        message: 'Failed to get story with items',
                        error: 'Bad Request',
                    },
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 500,
                        message: 'An unexpected error occurred',
                        error: 'Internal Server Error',
                    },
                },
            },
        }),
    );
}
