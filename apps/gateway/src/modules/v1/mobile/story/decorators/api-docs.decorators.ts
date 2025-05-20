import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
    MobileStoryListResponseEntity,
    MobileStoryItemEntity,
} from '../entity/mobile-response.entity';
import { TrackStoryItemsDto, TrackStoryButtonDto } from '../dto/dto';

export function ApiGetAllMobileStories() {
    return applyDecorators(
        ApiOperation({ summary: 'Get all stories for mobile without pagination' }),
        ApiResponse({
            status: 200,
            description: 'The stories have been successfully retrieved',
            type: MobileStoryListResponseEntity,
            content: {
                'application/json': {
                    example: {
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
            content: {
                'application/json': {
                    example: {
                        statusCode: 200,
                        message: 'Story with items retrieved successfully',
                        data: {
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
                                    isViewed: true,
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
                                    isViewed: false,
                                },
                            ],
                            isButtonPressed: true,
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
                        statusCode: 404,
                        message: 'Story with ID 60a7c8b9e4b0c1234567890 not found',
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
                        statusCode: 400,
                        message: 'Failed to get story with items',
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
                        statusCode: 500,
                        message: 'An unexpected error occurred',
                    },
                },
            },
        }),
    );
}

export function ApiTrackStoryItems() {
    return applyDecorators(
        ApiOperation({ summary: 'Track story items' }),
        ApiBody({
            type: TrackStoryItemsDto,
            description: 'Data for tracking story items viewed by the student',
            examples: {
                example1: {
                    summary: 'Track story item view example',
                    description: 'A student viewed a specific item within a story',
                    value: {
                        storyId: '682c3a46a7d884313d6d96e0',
                        storyItemId: '682c4d94092e4c6854653dee'
                    }
                }
            }
        }),
        ApiResponse({
            status: 200,
            description: 'Story items tracked successfully',
            content: {
                'application/json': {
                    example: {
                        statusCode: 200,
                        message: 'Story items tracked successfully',
                        data: true,
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
                        statusCode: 400,
                        message: 'Failed to track story items',
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
                        statusCode: 500,
                        message: 'An unexpected error occurred',
                    },
                },
            },
        }),
    );
}

export function ApiTrackStoryButton() {
    return applyDecorators(
        ApiOperation({ summary: 'Track story button' }),
        ApiBody({
            type: TrackStoryButtonDto,
            description: 'Data for tracking story button press by the student',
            examples: {
                example1: {
                    summary: 'Track button press example',
                    description: 'A student pressed the button on a story',
                    value: {
                        storyId: '682c3a46a7d884313d6d96e0'
                    }
                }
            }
        }),
        ApiResponse({
            status: 200,
            description: 'Story button tracked successfully',
            content: {
                'application/json': {
                    example: {
                        statusCode: 200,
                        message: 'Story button tracked successfully',
                        data: true,
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
                        statusCode: 400,
                        message: 'Failed to track story button',
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
                        statusCode: 404,
                        message: 'Story not found',
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
                        statusCode: 500,
                        message: 'An unexpected error occurred',
                    },
                },
            },
        }),
    );
}
