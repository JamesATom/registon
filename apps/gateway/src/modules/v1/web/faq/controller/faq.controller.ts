// faq.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, getSchemaPath, ApiExtraModels, ApiQuery } from '@nestjs/swagger';
import { FaqService } from '../service/faq.service';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { UpdateFaqDto } from '../dto/update-faq.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { FaqEntity, FaqWithCategoryEntity } from '../entity/faq.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - FAQ')
@ApiExtraModels(CommonEntity, FaqEntity, FaqWithCategoryEntity)
@Controller('faq/web')
export class FaqController {
    constructor(private readonly faqService: FaqService) {}

    @Get()
    @ApiResponse({ 
        status: 200,
        description: 'List of FAQs',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of FAQs' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(FaqWithCategoryEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with FAQs',  
                value: {
                    statusCode: 200,
                    message: 'List of FAQs',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            question: 'How do I reset my password?',
                            answer: 'You can reset your password by clicking the "Forgot Password" link on the login page.',
                            categoryId: '123e4567-e89b-12d3-a456-426614174001',
                            createdAt: '2023-01-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedAt: '2023-01-02T00:00:00Z',
                            categoryTitle: 'General Questions',
                            categoryDescription: 'Frequently asked general questions about our service'
                        },
                        {
                            id: '123e4567-e89b-12d3-a456-426614174003',
                            question: 'How do I register for a course?',
                            answer: 'You can register for courses through your student dashboard after logging in.',
                            categoryId: '123e4567-e89b-12d3-a456-426614174004',
                            createdAt: '2023-01-03T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedAt: '2023-01-04T00:00:00Z',
                            categoryTitle: 'Course Registration',
                            categoryDescription: 'Questions about registering for courses'
                        }
                    ]
                }
            }
        }
    })
    @ApiGetAll('FAQ', FaqWithCategoryEntity)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    async getAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.faqService.getAll({ page, limit });
    }

    @Post()
    @ApiBody({ type: CreateFaqDto })
    @ApiResponse({ 
        status: 201,
        description: 'FAQ created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'FAQ created successfully' },
                data: { $ref: getSchemaPath(FaqEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created FAQ',  
                value: {
                    statusCode: 201,
                    message: 'FAQ created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        question: 'How do I reset my password?',
                        answer: 'You can reset your password by clicking the "Forgot Password" link on the login page.',
                        categoryId: '123e4567-e89b-12d3-a456-426614174001',
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedAt: '2023-01-02T00:00:00Z'
                    }
                }
            }
        }
    })
    async create(@Body() createFaqDto: CreateFaqDto, @Req() req: CustomRequest) {
        return this.faqService.create(createFaqDto, req.user.userId);
    }

    @Get(':id')
    @ApiResponse({ 
        status: 200,
        description: 'FAQ details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'FAQ details' },
                data: { $ref: getSchemaPath(FaqWithCategoryEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with FAQ details',  
                value: {
                    statusCode: 200,
                    message: 'FAQ details',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        question: 'How do I reset my password?',
                        answer: 'You can reset your password by clicking the "Forgot Password" link on the login page.',
                        categoryId: '123e4567-e89b-12d3-a456-426614174001',
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedAt: '2023-01-02T00:00:00Z',
                        categoryTitle: 'General Questions',
                        categoryDescription: 'Frequently asked general questions about our service'
                    }
                }
            }
        }
    })
    async getOne(@Param('id') id: string) {
        return this.faqService.getOne(id);
    }

    @Put(':id')
    @ApiBody({ type: UpdateFaqDto })
    @ApiResponse({ 
        status: 200,
        description: 'FAQ updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'FAQ updated successfully' },
                data: { $ref: getSchemaPath(FaqEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with updated FAQ',  
                value: {
                    statusCode: 200,
                    message: 'FAQ updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        question: 'How do I update my profile information?',
                        answer: 'You can update your profile by going to the Account Settings page and clicking on "Edit Profile".',
                        categoryId: '123e4567-e89b-12d3-a456-426614174001',
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
        @Body() updateFaqDto: UpdateFaqDto,
        @Req() req: CustomRequest
    ) {
        return this.faqService.update(id, updateFaqDto, req.user.userId);
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'FAQ deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'FAQ deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after FAQ deletion',  
                value: {
                    statusCode: 200,
                    message: 'FAQ deleted successfully',
                    data: {}
                }
            }
        }
    })
    async delete(@Param('id') id: string) {
        return this.faqService.delete(id);
    }
}
