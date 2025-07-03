// news-category.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiOperation, getSchemaPath, ApiExtraModels, ApiQuery } from '@nestjs/swagger';
import { NewsCategoryService } from '../service/news-category.service';
import { CreateNewsCategoryDto } from '../dto/create-news-category.dto';
import { UpdateNewsCategoryDto } from '../dto/update-news-category.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { NewsCategoryEntity, NewsCategoryWithNewsEntity } from '../entity/news-category.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - News Categories')
@ApiExtraModels(CommonEntity, NewsCategoryEntity, NewsCategoryWithNewsEntity)
@Controller('news/categories/web')
export class NewsCategoryController {
    constructor(private readonly newsCategoryService: NewsCategoryService) {}

    @Get()
    @ApiGetAll('News Category', NewsCategoryEntity)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiOperation({ summary: `Get all News Categories` })
    @ApiResponse({ 
        status: 200,
        description: 'List of News Categories',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of News Categories' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(NewsCategoryEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with news categories',  
                value: {
                    statusCode: 200,
                    message: 'List of News Categories',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            categoryTitle: 'Education News',
                            description: 'News about education and learning',
                            image: 'https://example.com/category-image.jpg',
                            createdAt: '2023-01-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedAt: '2023-01-02T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                        },
                        {
                            id: '123e4567-e89b-12d3-a456-426614174001',
                            categoryTitle: 'Campus Events',
                            description: 'News about campus events and activities',
                            image: 'https://example.com/category-image2.jpg',
                            createdAt: '2023-01-03T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedAt: '2023-01-04T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                        }
                    ]
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to fetch News Categories',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch News Categories' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.newsCategoryService.getAll({ page, limit });
    }

    @Post()
    @ApiBody({ type: CreateNewsCategoryDto })
    @ApiResponse({ 
        status: 201,
        description: 'News Category created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'News Category created successfully' },
                data: { $ref: getSchemaPath(NewsCategoryEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created news category',  
                value: {
                    statusCode: 201,
                    message: 'News Category created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        categoryTitle: 'Technology News',
                        description: 'News about technology and innovation',
                        image: 'https://example.com/tech-category-image.jpg',
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedAt: '2023-01-01T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                    }
                }
            }
        }
    })
    async create(@Body() createNewsCategoryDto: CreateNewsCategoryDto, @Req() req: CustomRequest) {
        return this.newsCategoryService.create(createNewsCategoryDto, req.user.userId);
    }

    @Get(':id')
    @ApiResponse({ 
        status: 200,
        description: 'News Category details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'News Category details' },
                data: { $ref: getSchemaPath(NewsCategoryWithNewsEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with news category details',  
                value: {
                    statusCode: 200,
                    message: 'News Category details',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        categoryTitle: 'Education News',
                        description: 'News about education and learning',
                        image: 'https://example.com/category-image.jpg',
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedAt: '2023-01-02T00:00:00Z',
                        news: [
                            {
                                id: '123e4567-e89b-12d3-a456-426614174005',
                                title: 'New Campus Opening',
                                description: 'Our new campus is opening next month',
                                status: 'PUBLISHED',
                                thumbnail: 'https://example.com/thumbnail.jpg',
                                mainImage: 'https://example.com/main-image.jpg',
                                categoryId: '123e4567-e89b-12d3-a456-426614174000',
                                publishedAt: '2023-01-01T00:00:00Z',
                                targetAudience: 'ALL',
                                createdAt: '2023-01-01T00:00:00Z',
                                createdBy: '123e4567-e89b-12d3-a456-426614174002',
                                updatedAt: '2023-01-02T00:00:00Z'
                            },
                            {
                                id: '123e4567-e89b-12d3-a456-426614174006',
                                title: 'Scholarship Program Launch',
                                description: 'New scholarship opportunities available',
                                status: 'PUBLISHED',
                                thumbnail: 'https://example.com/thumbnail2.jpg',
                                mainImage: 'https://example.com/main-image2.jpg',
                                categoryId: '123e4567-e89b-12d3-a456-426614174000',
                                publishedAt: '2023-01-05T00:00:00Z',
                                targetAudience: 'STUDENT',
                                createdAt: '2023-01-04T00:00:00Z',
                                createdBy: '123e4567-e89b-12d3-a456-426614174002',
                                updatedAt: '2023-01-05T00:00:00Z'
                            }
                        ]
                    }
                }
            }
        }
    })
    async getOne(@Param('id') id: string) {
        return this.newsCategoryService.getOne(id);
    }

    @Put(':id')
    @ApiBody({ type: UpdateNewsCategoryDto })
    @ApiResponse({ 
        status: 200,
        description: 'News Category updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'News Category updated successfully' },
                data: { $ref: getSchemaPath(NewsCategoryEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with updated news category',  
                value: {
                    statusCode: 200,
                    message: 'News Category updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        categoryTitle: 'Educational Updates',
                        description: 'Latest updates in the field of education',
                        image: 'https://example.com/updated-category-image.jpg',
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedAt: '2023-01-05T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                    }
                }
            }
        }
    })
    async update(
        @Param('id') id: string, 
        @Body() updateNewsCategoryDto: UpdateNewsCategoryDto,
        @Req() req: CustomRequest
    ) {
        return this.newsCategoryService.update(id, updateNewsCategoryDto, req.user.userId);
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'News Category deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'News Category deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after news category deletion',  
                value: {
                    statusCode: 200,
                    message: 'News Category deleted successfully',
                    data: {}
                }
            }
        }
    })
    async delete(@Param('id') id: string) {
        return this.newsCategoryService.delete(id);
    }
}
