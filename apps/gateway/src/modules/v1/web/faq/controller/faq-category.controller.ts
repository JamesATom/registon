// faq-category.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, getSchemaPath, ApiExtraModels, ApiQuery } from '@nestjs/swagger';
import { FaqCategoryService } from '../service/faq-category.service';
import { CreateFaqCategoryDto } from '../dto/create-faq-category.dto';
import { UpdateFaqCategoryDto } from '../dto/update-faq-category.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiGetAll } from 'src/common/swagger/common-swagger';
import { FaqCategoryEntity, FaqCategoryWithFaqsEntity } from '../entity/faq-category.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - FAQ Categories')
@ApiExtraModels(CommonEntity, FaqCategoryEntity, FaqCategoryWithFaqsEntity)
@Controller('faq/category/web')
export class FaqCategoryController {
    constructor(private readonly faqCategoryService: FaqCategoryService) {}

    @Get()
    @ApiGetAll('FAQ Category', FaqCategoryEntity)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiResponse({ 
        status: 200,
        description: 'List of FAQ Categories',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of FAQ Categories' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(FaqCategoryEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with FAQ categories',  
                value: {
                    statusCode: 200,
                    message: 'List of FAQ Categories',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            title: 'General Questions',
                            description: 'Frequently asked general questions about our service',
                            createdAt: '2023-01-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedAt: '2023-01-02T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                        }
                    ]
                }
            }
        }
    })
    async getAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.faqCategoryService.getAll({ page, limit });
    }

    @Post()
    @ApiBody({ type: CreateFaqCategoryDto })
    @ApiResponse({ 
        status: 201,
        description: 'FAQ Category created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'FAQ Category created successfully' },
                data: { $ref: getSchemaPath(FaqCategoryEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created FAQ category',  
                value: {
                    statusCode: 201,
                    message: 'FAQ Category created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'Technical Support',
                        description: 'Questions about technical issues and support',
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedAt: '2023-01-01T00:00:00Z'
                    }
                }
            }
        }
    })
    async create(@Body() createFaqCategoryDto: CreateFaqCategoryDto, @Req() req: CustomRequest) {
        return this.faqCategoryService.create(createFaqCategoryDto, req.user.userId);
    }

    @Get(':id')
    @ApiResponse({ 
        status: 200,
        description: 'FAQ Category details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'FAQ Category details' },
                data: { $ref: getSchemaPath(FaqCategoryWithFaqsEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with FAQ category details',  
                value: {
                    statusCode: 200,
                    message: 'FAQ Category details',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'General Questions',
                        description: 'Frequently asked general questions about our service',
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedAt: '2023-01-02T00:00:00Z',
                        faqs: [
                            {
                                id: '123e4567-e89b-12d3-a456-426614174005',
                                question: 'How do I reset my password?',
                                answer: 'You can reset your password by clicking the "Forgot Password" link on the login page.',
                                categoryId: '123e4567-e89b-12d3-a456-426614174000',
                                createdAt: '2023-01-01T00:00:00Z',
                                createdBy: '123e4567-e89b-12d3-a456-426614174002',
                                updatedAt: '2023-01-02T00:00:00Z'
                            },
                        ]
                    }
                }
            }
        }
    })
    async getOne(@Param('id') id: string) {
        return this.faqCategoryService.getOne(id);
    }

    @Put(':id')
    @ApiBody({ type: UpdateFaqCategoryDto })
    @ApiResponse({ 
        status: 200,
        description: 'FAQ Category updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'FAQ Category updated successfully' },
                data: { $ref: getSchemaPath(FaqCategoryEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with updated FAQ category',  
                value: {
                    statusCode: 200,
                    message: 'FAQ Category updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'Common Questions',
                        description: 'Most frequently asked questions about our services',
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
        @Body() updateFaqCategoryDto: UpdateFaqCategoryDto,
        @Req() req: CustomRequest
    ) {
        return this.faqCategoryService.update(id, updateFaqCategoryDto, req.user.userId);
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'FAQ Category deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'FAQ Category deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after FAQ category deletion',  
                value: {
                    statusCode: 200,
                    message: 'FAQ Category deleted successfully',
                    data: {}
                }
            }
        }
    })
    async delete(@Param('id') id: string) {
        return this.faqCategoryService.delete(id);
    }
}
