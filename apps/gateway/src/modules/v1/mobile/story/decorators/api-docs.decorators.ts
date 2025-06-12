import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { FilterStoriesDto } from '../dto/filter-stories.dto';
import { StoryResponseEntity, StoryListResponseEntity, StoryItemResponseEntity } from '../entity/story-response.entity';

export const ApiCreateStory = () =>
    applyDecorators(
        HttpCode(HttpStatus.CREATED),
        ApiOperation({ summary: 'Create a new story with file upload' }),
        ApiResponse({
            status: 201,
            description: 'Story created successfully',
            type: StoryResponseEntity,
        }),
        ApiResponse({
            status: 400,
            description: 'File upload failed or invalid data',
        }),
    );

export const ApiGetStoryById = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Get a story by ID' }),
        ApiParam({
            name: 'id',
            description: 'Story ID',
            example: '60a7c8b9e4b0c1234567890',
        }),
        ApiResponse({
            status: 200,
            description: 'Story retrieved successfully',
            type: StoryResponseEntity,
        }),
        ApiResponse({
            status: 404,
            description: 'Story not found',
        }),
    );

export const ApiFilterStories = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Filter stories based on criteria' }),
        ApiBody({ type: FilterStoriesDto }),
        ApiResponse({
            status: 200,
            description: 'Stories retrieved successfully',
            type: StoryListResponseEntity,
        }),
    );

export const ApiCreateStoryItem = () =>
    applyDecorators(
        HttpCode(HttpStatus.CREATED),
        ApiOperation({ summary: 'Create a new story item' }),
        ApiResponse({
            status: 201,
            description: 'Story item created successfully',
            type: StoryItemResponseEntity,
        }),
        ApiResponse({
            status: 400,
            description: 'Invalid data',
        }),
    );

export const ApiGetStoryItemById = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Get a story item by ID' }),
        ApiParam({
            name: 'id',
            description: 'Story item ID',
            example: '60a7c8b9e4b0c1234567894',
        }),
        ApiResponse({
            status: 200,
            description: 'Story item retrieved successfully',
            type: StoryItemResponseEntity,
        }),
        ApiResponse({
            status: 404,
            description: 'Story item not found',
        }),
    );
