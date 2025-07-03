// story.controller.ts
import { Controller, Get, Post, UseGuards, Body, Req, Query, Param, Put, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags, getSchemaPath, ApiExtraModels, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ApiAuth, ApiGetAll, ApiGetOne, ApiCreate, ApiUpdate, ApiDelete, ApiInternalServerErrorResponse } from 'src/common/swagger/common-swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { BranchValidationPipe } from 'src/common/pipes/validation/branch-validation.pipe';
import { CustomRequest } from 'src/common/types/types';
import { StoryService } from './service/story.service';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CreateStoryDto } from './dto/create-story.dto';
import { FilterStoryDto } from './dto/filter-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { StoryEntity, StoryWithItemsEntity } from './entity/story.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Story')
@ApiExtraModels(CommonEntity, StoryEntity, StoryWithItemsEntity)
@Controller('web/story')
export class StoryController {
    constructor(private readonly storyService: StoryService) {}

    @Post('presigned-upload')
    @ApiBody({
        type: Object,
        examples: {
            'application/json': {
                value: {
                    filename: 'story-image.jpg',
                    contentType: 'image/jpeg',
                },
            },
        },
    })
    @ApiCreate('Presigned Upload URL')
    @ApiResponse({ 
        schema: {
            allOf: [
                { $ref: getSchemaPath(CommonEntity) },
                {
                    properties: {
                        data: { 
                            type: 'object',
                            properties: {
                                url: { type: 'string', example: 'https://presigned-url-example.com' }
                            }
                        }
                    }
                }
            ]
        }
    })
    async getPresignedUploadUrl(@Body() body: CreatePresignedUrlDto): Promise<CommonEntity> {
        return this.storyService.generatePresignedUploadUrl(body);
    }

    @Post()
    @ApiCreate('Story', StoryEntity)
    @ApiBody({ type: CreateStoryDto })
    @ApiResponse({ 
        schema: {
            allOf: [
                { $ref: getSchemaPath(CommonEntity) },
                {
                    properties: {
                        data: { $ref: getSchemaPath(StoryEntity) }
                    }
                }
            ]
        }
    })
    async create(@Body(BranchValidationPipe) createStoryDto: CreateStoryDto, @Req() req: CustomRequest) {
        return this.storyService.create(createStoryDto, req.user);
    }

    @Get()
    @ApiOperation({ summary: `Get all Stories` })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiResponse({
        status: 200,
        description: 'List of Stories',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Stories' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(StoryEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with stories',  
                value: {
                    statusCode: 200,
                    message: 'List of Stories',
                    data: [
                        {
                            id: '1',
                            thumbnail: 'https://example.com/thumbnail.jpg',
                            branch: '123e4567-e89b-12d3-a456-426614174001',
                            title: 'Story Title 1',
                            status: 'PUBLISHED',
                            publishedAt: '2023-10-01T00:00:00Z',
                            buttonText: 'Read More',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            createdAt: '2023-10-01T00:00:00Z',
                            updatedAt: '2023-10-01T00:00:00Z'
                        },
                    ]
                }
            }
        }
    })
    @ApiInternalServerErrorResponse(`Failed to fetch Stories`)
    async getAll(
        @Query() filter: FilterStoryDto,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.storyService.getAll(filter, { page, limit });
    }

    @Get(':id')
    @ApiOperation({ summary: `Get Story by ID` })
    @ApiExtraModels(StoryWithItemsEntity)
    @ApiResponse({ 
        status: 200,
        description: 'Story details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Story details' },
                data: { $ref: getSchemaPath(StoryWithItemsEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with story details',  
                value: {
                    statusCode: 200,
                    message: 'Story details',
                    data: {
                        id: '1',
                        thumbnail: 'https://example.com/thumbnail.jpg',
                        branch: '123e4567-e89b-12d3-a456-426614174001',
                        title: 'Story Title 1',
                        status: 'PUBLISHED',
                        publishedAt: '2023-10-01T00:00:00Z',
                        buttonText: 'Read More',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        items: [
                            {
                                id: '101',
                                storyId: '1',
                                title: 'Item Title 1',
                                description: 'Detailed description of the first item',
                                image: 'https://example.com/item1.jpg',
                                orderNumber: 1
                            },
                            {
                                id: '102',
                                storyId: '1',
                                title: 'Item Title 2',
                                description: 'Detailed description of the second item',
                                image: 'https://example.com/item2.jpg',
                                orderNumber: 2
                            }
                        ],
                        createdAt: '2023-10-01T00:00:00Z',
                        updatedAt: '2023-10-01T00:00:00Z'
                    }
                }
            }
        }
    })
    @ApiInternalServerErrorResponse(`Failed to fetch Story details`)
    async getOne(@Param('id') id: string) {
        return this.storyService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('Story', StoryEntity)
    @ApiBody({ type: UpdateStoryDto })
    @ApiResponse({ 
        schema: {
            allOf: [
                { $ref: getSchemaPath(CommonEntity) },
                {
                    properties: {
                        data: { $ref: getSchemaPath(StoryEntity) }
                    }
                }
            ]
        }
    })
    async update(@Param('id') id: string, @Body(BranchValidationPipe) updateStoryDto: UpdateStoryDto, @Req() req: CustomRequest) {
        return this.storyService.update(id, updateStoryDto, req.user);
    }

    @Delete(':id')
    @ApiDelete('Story')
    @ApiResponse({
        schema: {
            allOf: [
                { $ref: getSchemaPath(CommonEntity) },
                {
                    properties: {
                        statusCode: { type: 'number', example: 200 },
                        message: { type: 'string', example: 'Story deleted successfully' },
                        data: { type: 'object', example: {} }
                    }
                }
            ]
        }
    })
    async delete(@Param('id') id: string) {
        return this.storyService.delete(id);
    }
}
