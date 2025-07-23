// poll.controller.ts
import { Controller, Get, Post, Put, Body, UseGuards, Req, Param, Delete, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags, getSchemaPath, ApiExtraModels, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { CommonEntity } from 'src/common/libs/common.entity';
import { ApiAuth, ApiGetAll, ApiGetOne, ApiCreate, ApiUpdate, ApiDelete, ApiInternalServerErrorResponse } from 'src/common/swagger/common-swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CustomRequest } from 'src/common/types/types';
import { BranchValidationPipe } from 'src/common/pipes/validation/branch-validation.pipe';
import { PollService } from '../service/poll.service';
import { CreatePollDto } from '../dto/create-poll.dto';
import { UpdatePollDto } from '../dto/update-poll.dto';
import { SubmitPollDto } from '../dto/submit-poll.dto';
import { PollEntity, PollWithQuestionsEntity, PollResponseEntity } from '../entity/poll.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Poll')
@ApiExtraModels(CommonEntity, PollEntity, PollWithQuestionsEntity, PollResponseEntity)
@Controller('poll/web')
export class PollController {
    constructor(private readonly pollService: PollService) {}

    @Post('presigned-upload')
    @ApiBody({
        type: Object,
        examples: {
            'application/json': {
                value: {
                    filename: 'poll-image.jpg',
                    contentType: 'image/jpeg',
                },
            },
        },
    })
    @ApiOperation({ summary: 'Get presigned upload URL for poll images' })
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
        return this.pollService.generatePresignedUploadUrl(body);
    }

    @Post()
    @ApiBody({ type: CreatePollDto })
    @ApiOperation({ summary: 'Create a new Poll' })
    @ApiResponse({ 
        status: 201,
        description: 'Poll created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Poll created successfully' },
                data: { $ref: getSchemaPath(PollEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created poll',  
                value: {
                    statusCode: 201,
                    message: 'Poll created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        image: 'https://example.com/poll-image.jpg',
                        title: 'Customer Satisfaction Poll',
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
    async create(@Body(BranchValidationPipe) createPollDto: CreatePollDto, @Req() req: CustomRequest): Promise<CommonEntity> {
        return this.pollService.create(createPollDto, req.user);
    }

    @Get()
    @ApiGetAll('Poll', PollEntity)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiOperation({ summary: `Get all Polls` })
    @ApiResponse({
        status: 200,
        description: 'List of Polls',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Polls' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(PollEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with polls',  
                value: {
                    statusCode: 200,
                    message: 'List of Polls',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002',
                            image: 'https://example.com/poll-image.jpg',
                            commentAdmin: 'Admin comment about the poll',
                            title: 'Customer Satisfaction Poll',
                            description: 'Help us improve our services',
                            branch: '123e4567-e89b-12d3-a456-426614174003',
                            targetAudience: 'ALL',
                            createdAt: '2023-07-01T10:00:00Z',
                            updatedAt: '2023-07-02T10:00:00Z'
                        },
                        {
                            id: '123e4567-e89b-12d3-a456-426614174005',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            image: 'https://example.com/poll-image2.jpg',
                            title: 'Product Satisfaction Poll',
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
        description: 'Failed to fetch Polls',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch Polls' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getAll(
        @Req() req: CustomRequest,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ): Promise<CommonEntity> {
        return this.pollService.getAll(req?.user?.userId, { page, limit });
    }

    @Get(':id')
    @ApiOperation({ summary: `Get Poll by ID` })
    @ApiExtraModels(PollWithQuestionsEntity)
    @ApiResponse({ 
        status: 200,
        description: 'Poll details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Poll details' },
                data: { $ref: getSchemaPath(PollWithQuestionsEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with poll details',  
                value: {
                    statusCode: 200,
                    message: 'Poll details',
                    data: {
                        id: '1',
                        title: 'Customer Feedback Poll',
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
                        image: 'https://example.com/poll-image.jpg',
                        branch: '123e4567-e89b-12d3-a456-426614174003',
                        targetAudience: 'ALL'
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to fetch Poll details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch Poll details' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getOne(@Param('id') id: string) {
        return this.pollService.getOne(id);
    }

    @Put(':id')
    @ApiBody({ type: UpdatePollDto })
    @ApiOperation({ summary: 'Update an existing Poll' })
    @ApiResponse({ 
        status: 200,
        description: 'Poll updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Poll updated successfully' },
                data: { $ref: getSchemaPath(PollEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with updated poll',  
                value: {
                    statusCode: 200,
                    message: 'Poll updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174001',
                        image: 'https://example.com/poll-image-updated.jpg',
                        commentAdmin: 'This poll has been reviewed and approved',
                        title: 'Updated Customer Satisfaction Poll',
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
        @Body(BranchValidationPipe) updatePollDto: UpdatePollDto,
        @Req() req: CustomRequest,
    ): Promise<CommonEntity> {
        return this.pollService.update(id, updatePollDto, req.user);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a Poll' })
    @ApiResponse({
        status: 200,
        description: 'Poll deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Poll deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after poll deletion',
                value: {
                    statusCode: 200,
                    message: 'Poll deleted successfully',
                    data: {}
                }
            }
        }
    })
    async remove(@Param('id') id: string): Promise<CommonEntity> {
        return this.pollService.delete(id);
    }

    // @Post('submit')
    // @ApiBody({ type: SubmitPollDto })
    // @ApiOperation({ summary: 'Submit a Poll response' })
    // @ApiResponse({ 
    //     status: 201,
    //     description: 'Poll response submitted successfully',
    //     schema: {
    //         type: 'object',
    //         properties: {
    //             statusCode: { type: 'number', example: 201 },
    //             message: { type: 'string', example: 'Poll response submitted successfully' },
    //             data: { $ref: getSchemaPath(PollResponseEntity) }
    //         }
    //     },
    //     examples: {
    //         'application/json': {
    //             summary: 'Sample response after poll submission',  
    //             value: {
    //                 statusCode: 201,
    //                 message: 'Poll response submitted successfully',
    //                 data: {
    //                     pollId: '123e4567-e89b-12d3-a456-426614174000',
    //                     userId: '123e4567-e89b-12d3-a456-426614174001',
    //                     responses: [
    //                         {
    //                             questionId: '123e4567-e89b-12d3-a456-426614174002',
    //                             answerIndex: 1
    //                         },
    //                         {
    //                             questionId: '123e4567-e89b-12d3-a456-426614174003',
    //                             answerIndex: 2
    //                         }
    //                     ]
    //                 }
    //             }
    //         }
    //     }
    // })
    // async submitPoll(@Body() submitPollDto: SubmitPollDto, @Req() req: CustomRequest): Promise<CommonEntity> {
    //     return this.pollService.submitPoll(submitPollDto, req.user);
    // }
}
