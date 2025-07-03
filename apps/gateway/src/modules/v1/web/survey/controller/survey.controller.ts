// survey.controller.ts
import { Controller, Get, Post, Put, Body, UseGuards, Req, Param, Delete, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags, getSchemaPath, ApiExtraModels, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { CommonEntity } from 'src/common/libs/common.entity';
import { ApiAuth, ApiGetAll, ApiGetOne, ApiCreate, ApiUpdate, ApiDelete, ApiInternalServerErrorResponse } from 'src/common/swagger/common-swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CustomRequest } from 'src/common/types/types';
import { BranchValidationPipe } from 'src/common/pipes/validation/branch-validation.pipe';
import { SurveyService } from '../service/survey.service';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { UpdateSurveyDto } from '../dto/update-survey.dto';
import { SubmitSurveyDto } from '../dto/submit-survey.dto';
import { SurveyEntity, SurveyWithQuestionsEntity, SurveyResponseEntity } from '../entity/survey.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Survey')
@ApiExtraModels(CommonEntity, SurveyEntity, SurveyWithQuestionsEntity, SurveyResponseEntity)
@Controller('survey/web')
export class SurveyController {
    constructor(private readonly surveyService: SurveyService) {}

    @Post('presigned-upload')
    @ApiBody({
        type: Object,
        examples: {
            'application/json': {
                value: {
                    filename: 'survey-image.jpg',
                    contentType: 'image/jpeg',
                },
            },
        },
    })
    @ApiOperation({ summary: 'Get presigned upload URL for survey images' })
    @ApiResponse({ 
        status: 200,
        description: 'Presigned Upload URL generated',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Presigned Upload URL generated successfully' },
                data: { 
                    type: 'object',
                    properties: {
                        url: { type: 'string', example: 'https://presigned-url-example.com' }
                    }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with presigned URL',  
                value: {
                    statusCode: 200,
                    message: 'Presigned Upload URL generated successfully',
                    data: {
                        url: 'https://presigned-url-example.com'
                    }
                }
            }
        }
    })
    async getPresignedUploadUrl(@Body() body: CreatePresignedUrlDto): Promise<CommonEntity> {
        return this.surveyService.generatePresignedUploadUrl(body);
    }

    @Post()
    @ApiBody({ type: CreateSurveyDto })
    @ApiOperation({ summary: 'Create a new Survey' })
    @ApiResponse({ 
        status: 201,
        description: 'Survey created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Survey created successfully' },
                data: { $ref: getSchemaPath(SurveyEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created survey',  
                value: {
                    statusCode: 201,
                    message: 'Survey created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        image: 'https://example.com/survey-image.jpg',
                        title: 'Customer Satisfaction Survey',
                        description: 'Help us improve our services',
                        branch: '123e4567-e89b-12d3-a456-426614174003',
                        targetAudience: 'ALL',
                        createdAt: '2023-07-01T10:00:00Z',
                        updatedAt: '2023-07-01T10:00:00Z'
                    }
                }
            }
        }
    })
    async create(@Body(BranchValidationPipe) createSurveyDto: CreateSurveyDto, @Req() req: CustomRequest): Promise<CommonEntity> {
        return this.surveyService.create(createSurveyDto, req.user);
    }

    @Get()
    @ApiGetAll('Survey', SurveyEntity)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiOperation({ summary: `Get all Surveys` })
    @ApiResponse({
        status: 200,
        description: 'List of Surveys',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Surveys' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(SurveyEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with surveys',  
                value: {
                    statusCode: 200,
                    message: 'List of Surveys',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002',
                            image: 'https://example.com/survey-image.jpg',
                            commentAdmin: 'Admin comment about the survey',
                            title: 'Customer Satisfaction Survey',
                            description: 'Help us improve our services',
                            branch: '123e4567-e89b-12d3-a456-426614174003',
                            targetAudience: 'ALL',
                            createdAt: '2023-07-01T10:00:00Z',
                            updatedAt: '2023-07-02T10:00:00Z'
                        },
                        {
                            id: '123e4567-e89b-12d3-a456-426614174005',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            image: 'https://example.com/survey-image2.jpg',
                            title: 'Product Satisfaction Survey',
                            description: 'Rate our products',
                            branch: '123e4567-e89b-12d3-a456-426614174003',
                            targetAudience: 'STUDENT',
                            createdAt: '2023-07-02T10:00:00Z',
                            updatedAt: '2023-07-02T10:00:00Z'
                        }
                    ]
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to fetch Surveys',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch Surveys' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getAll(
        @Req() req: CustomRequest,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ): Promise<CommonEntity> {
        return this.surveyService.getAll(req?.user?.userId, { page, limit });
    }

    @Get(':id')
    @ApiOperation({ summary: `Get Survey by ID` })
    @ApiExtraModels(SurveyWithQuestionsEntity)
    @ApiResponse({ 
        status: 200,
        description: 'Survey details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Survey details' },
                data: { $ref: getSchemaPath(SurveyWithQuestionsEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with survey details',  
                value: {
                    statusCode: 200,
                    message: 'Survey details',
                    data: {
                        id: '1',
                        title: 'Customer Feedback Survey',
                        description: 'Tell us about your experience',
                        status: 'ACTIVE',
                        questions: [
                            {
                                id: '101',
                                question: 'How would you rate our service?',
                                type: 'RATING',
                                options: ['1', '2', '3', '4', '5'],
                                order: 1
                            },
                            {
                                id: '102',
                                question: 'Any additional comments?',
                                type: 'TEXT',
                                options: [],
                                order: 2
                            }
                        ],
                        createdAt: '2023-10-01T00:00:00Z',
                        updatedAt: '2023-10-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174001',
                        image: 'https://example.com/survey-image.jpg',
                        branch: '123e4567-e89b-12d3-a456-426614174003',
                        targetAudience: 'ALL'
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to fetch Survey details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch Survey details' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getOne(@Param('id') id: string) {
        return this.surveyService.getOne(id);
    }

    @Put(':id')
    @ApiBody({ type: UpdateSurveyDto })
    @ApiOperation({ summary: 'Update an existing Survey' })
    @ApiResponse({ 
        status: 200,
        description: 'Survey updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Survey updated successfully' },
                data: { $ref: getSchemaPath(SurveyEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with updated survey',  
                value: {
                    statusCode: 200,
                    message: 'Survey updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174001',
                        image: 'https://example.com/survey-image-updated.jpg',
                        commentAdmin: 'This survey has been reviewed and approved',
                        title: 'Updated Customer Satisfaction Survey',
                        description: 'Help us improve our services - updated version',
                        branch: '123e4567-e89b-12d3-a456-426614174003',
                        targetAudience: 'ALL',
                        createdAt: '2023-07-01T10:00:00Z',
                        updatedAt: '2023-07-03T10:00:00Z'
                    }
                }
            }
        }
    })
    async update(
        @Param('id') id: string,
        @Body(BranchValidationPipe) updateSurveyDto: UpdateSurveyDto,
        @Req() req: CustomRequest,
    ): Promise<CommonEntity> {
        return this.surveyService.update(id, updateSurveyDto, req.user);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a Survey' })
    @ApiResponse({
        status: 200,
        description: 'Survey deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Survey deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after survey deletion',  
                value: {
                    statusCode: 200,
                    message: 'Survey deleted successfully',
                    data: {}
                }
            }
        }
    })
    async remove(@Param('id') id: string): Promise<CommonEntity> {
        return this.surveyService.delete(id);
    }

    @Post('submit')
    @ApiBody({ type: SubmitSurveyDto })
    @ApiOperation({ summary: 'Submit a Survey response' })
    @ApiResponse({ 
        status: 201,
        description: 'Survey response submitted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Survey response submitted successfully' },
                data: { $ref: getSchemaPath(SurveyResponseEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after survey submission',  
                value: {
                    statusCode: 201,
                    message: 'Survey response submitted successfully',
                    data: {
                        surveyId: '123e4567-e89b-12d3-a456-426614174000',
                        userId: '123e4567-e89b-12d3-a456-426614174001',
                        responses: [
                            {
                                questionId: '123e4567-e89b-12d3-a456-426614174002',
                                answerIndex: 1
                            },
                            {
                                questionId: '123e4567-e89b-12d3-a456-426614174003',
                                answerIndex: 2
                            }
                        ]
                    }
                }
            }
        }
    })
    async submitSurvey(@Body() submitSurveyDto: SubmitSurveyDto, @Req() req: CustomRequest): Promise<CommonEntity> {
        return this.surveyService.submitSurvey(submitSurveyDto, req.user);
    }
}
