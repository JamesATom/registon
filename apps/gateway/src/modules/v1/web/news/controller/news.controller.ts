// news.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, getSchemaPath, ApiExtraModels, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { NewsService } from '../service/news.service';
import { CreateNewsDto } from '../dto/create-news.dto';
import { UpdateNewsDto } from '../dto/update-news.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate, ApiInternalServerErrorResponse } from 'src/common/swagger/common-swagger';
import { NewsEntity, NewsWithCategoryEntity } from '../entity/news.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - News')
@ApiExtraModels(CommonEntity, NewsEntity, NewsWithCategoryEntity)
@Controller('news/web')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get()
    @ApiGetAll('News', NewsWithCategoryEntity)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiOperation({ summary: `Get all News` })
    @ApiResponse({
        status: 200,
        description: 'List of News',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of News' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(NewsWithCategoryEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with news items',  
                value: {
                    statusCode: 200,
                    message: 'List of News',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            title: 'New Campus Opening',
                            description: 'Our new campus is opening next month',
                            status: 'PUBLISHED',
                            thumbnail: 'https://example.com/thumbnail.jpg',
                            mainImage: 'https://example.com/main-image.jpg',
                            categoryId: '123e4567-e89b-12d3-a456-426614174001',
                            publishedAt: '2023-01-01T00:00:00Z',
                            targetAudience: 'ALL',
                            createdAt: '2023-01-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedAt: '2023-01-02T00:00:00Z',
                            categoryTitle: 'Education News',
                            categoryDescription: 'News about education and learning'
                        },
                        {
                            id: '123e4567-e89b-12d3-a456-426614174003',
                            title: 'Scholarship Program Launch',
                            description: 'New scholarship opportunities available',
                            status: 'PUBLISHED',
                            thumbnail: 'https://example.com/thumbnail2.jpg',
                            mainImage: 'https://example.com/main-image2.jpg',
                            categoryId: '123e4567-e89b-12d3-a456-426614174001',
                            publishedAt: '2023-01-05T00:00:00Z',
                            targetAudience: 'STUDENT',
                            createdAt: '2023-01-04T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedAt: '2023-01-05T00:00:00Z',
                            categoryTitle: 'Education News',
                            categoryDescription: 'News about education and learning'
                        }
                    ]
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to fetch News',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch News' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.newsService.getAll({ page, limit });
    }

    @Post()
    @ApiOperation({ summary: `Create News` })
    @ApiBody({ type: CreateNewsDto })
    @ApiResponse({ 
        status: 201,
        description: 'News created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'News created successfully' },
                data: { $ref: getSchemaPath(NewsEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response for created news',  
                value: {
                    statusCode: 201,
                    message: 'News created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'New Campus Opening',
                        description: 'Our new campus is opening next month',
                        status: 'PUBLISHED',
                        thumbnail: 'https://example.com/thumbnail.jpg',
                        mainImage: 'https://example.com/main-image.jpg',
                        categoryId: '123e4567-e89b-12d3-a456-426614174001',
                        publishedAt: '2023-01-01T00:00:00Z',
                        targetAudience: 'ALL',
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedAt: '2023-01-02T00:00:00Z'
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to create News',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to create News' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async create(@Body() createNewsDto: CreateNewsDto, @Req() req: CustomRequest) {
        return this.newsService.create(createNewsDto, req.user.userId);
    }

    @Get(':id')
    @ApiOperation({ summary: `Get News by ID` })
    @ApiResponse({ 
        status: 200,
        description: 'News details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'News details' },
                data: { $ref: getSchemaPath(NewsWithCategoryEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with news details',  
                value: {
                    statusCode: 200,
                    message: 'News details',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'New Campus Opening',
                        description: 'Our new campus is opening next month',
                        status: 'PUBLISHED',
                        thumbnail: 'https://example.com/thumbnail.jpg',
                        mainImage: 'https://example.com/main-image.jpg',
                        categoryId: '123e4567-e89b-12d3-a456-426614174001',
                        publishedAt: '2023-01-01T00:00:00Z',
                        targetAudience: 'ALL',
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedAt: '2023-01-02T00:00:00Z',
                        categoryTitle: 'Education News',
                        categoryDescription: 'News about education and learning'
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to fetch News details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch News details' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getOne(@Param('id') id: string) {
        return this.newsService.getOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: `Update News` })
    @ApiBody({ type: UpdateNewsDto })
    @ApiResponse({ 
        status: 200,
        description: 'News updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'News updated successfully' },
                data: { $ref: getSchemaPath(NewsEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response for updated news',  
                value: {
                    statusCode: 200,
                    message: 'News updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'Updated Campus Opening',
                        description: 'Our new campus is opening next month - updated info',
                        status: 'PUBLISHED',
                        thumbnail: 'https://example.com/thumbnail-updated.jpg',
                        mainImage: 'https://example.com/main-image-updated.jpg',
                        categoryId: '123e4567-e89b-12d3-a456-426614174001',
                        publishedAt: '2023-01-01T00:00:00Z',
                        targetAudience: 'ALL',
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedAt: '2023-01-03T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to update News',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to update News' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async update(
        @Param('id') id: string, 
        @Body() updateNewsDto: UpdateNewsDto,
        @Req() req: CustomRequest
    ) {
        return this.newsService.update(id, updateNewsDto, req.user.userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: `Delete News` })
    @ApiResponse({
        status: 200,
        description: 'News deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'News deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response for deleted news',  
                value: {
                    statusCode: 200,
                    message: 'News deleted successfully',
                    data: {}
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to delete News',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to delete News' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async delete(@Param('id') id: string) {
        return this.newsService.delete(id);
    }
}
