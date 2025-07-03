// event.controller.ts
import { Controller, Get, Post, UseGuards, Body, Req, Query, Param, Put, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags, getSchemaPath, ApiExtraModels, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ApiAuth, ApiGetAll, ApiGetOne, ApiCreate, ApiUpdate, ApiDelete, ApiInternalServerErrorResponse } from 'src/common/swagger/common-swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { BranchValidationPipe } from 'src/common/pipes/validation/branch-validation.pipe';
import { CourseValidationPipe } from 'src/common/pipes/validation/course-validation.pipe';
import { CustomRequest } from 'src/common/types/types';
import { EventService } from './service/event.service';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { EventFilterDto } from './dto/filter-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity, EventRegistrationStudentEntity } from './entity/event.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Event')
@ApiExtraModels(CommonEntity, EventEntity, EventRegistrationStudentEntity)
@Controller('web/event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post('presigned-upload')
    @ApiBody({
        type: Object,
        examples: {
            'application/json': {
                value: {
                    filename: 'event-image.jpg',
                    contentType: 'image/jpeg',
                },
            },
        },
    })
    @ApiOperation({ summary: 'Get presigned upload URL' })
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
                        url: { type: 'string', example: 'https://s3.example.com/uploads/presigned-url' },
                        fields: { type: 'object', example: { key: 'value' } }
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
                        url: 'https://s3.example.com/uploads/presigned-url',
                        fields: { key: 'value' }
                    }
                }
            }
        }
    })
    async getPresignedUploadUrl(@Body() body: CreatePresignedUrlDto): Promise<CommonEntity> {
        return this.eventService.generatePresignedUploadUrl(body);
    }

    @Post()
    @ApiBody({ type: CreateEventDto })
    @ApiOperation({ summary: 'Create a new Event' })
    @ApiResponse({
        status: 201,
        description: 'Event created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Event created successfully' },
                data: { $ref: getSchemaPath(EventEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created event',  
                value: {
                    statusCode: 201,
                    message: 'Event created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        status: 'PUBLISHED',
                        branch: 'Main Branch',
                        eventTitle: 'Introduction to IELTS Writing',
                        date: '2023-07-15T09:00:00Z',
                        startTime: '09:00',
                        endTime: '12:00',
                        age: 16,
                        image: 'https://example.com/event-image.jpg',
                        description: 'A workshop focused on IELTS writing techniques',
                        price: 100000,
                        targetAudience: 'STUDENT',
                        course: ['IELTS', 'Academic English'],
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-02T00:00:00Z'
                    }
                }
            }
        }
    })
    async create(
        @Body(BranchValidationPipe, CourseValidationPipe) createEventDto: CreateEventDto, 
        @Req() req: CustomRequest
    ) {
        return this.eventService.create(createEventDto, req.user);
    }

    @Get()
    @ApiGetAll('Event', EventEntity)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiOperation({ summary: `Get all Events` })
    @ApiResponse({
        status: 200,
        description: 'List of Events',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Events' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(EventEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with events',  
                value: {
                    statusCode: 200,
                    message: 'List of Events',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            status: 'PUBLISHED',
                            branch: 'Main Branch',
                            eventTitle: 'Introduction to IELTS Writing',
                            date: '2023-07-15T09:00:00Z',
                            startTime: '09:00',
                            endTime: '12:00',
                            age: 16,
                            image: 'https://example.com/event-image.jpg',
                            description: 'A workshop focused on IELTS writing techniques',
                            price: 100000,
                            targetAudience: 'STUDENT',
                            course: ['IELTS', 'Academic English'],
                            createdAt: '2023-01-01T00:00:00Z',
                            updatedAt: '2023-01-02T00:00:00Z'
                        },
                    ]
                }
            }
        }
    })
    async getAll(
        @Query() filter: EventFilterDto,
        @Req() req: CustomRequest,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.eventService.getAll(filter, req?.user, { page, limit });
    }

    @Get(':id')
    @ApiOperation({ summary: `Get Event by ID` })
    @ApiResponse({
        status: 200,
        description: 'Event details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Event details' },
                data: { $ref: getSchemaPath(EventEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with event details',  
                value: {
                    statusCode: 200,
                    message: 'Event details',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        status: 'PUBLISHED',
                        branch: 'Main Branch',
                        eventTitle: 'Introduction to IELTS Writing',
                        date: '2023-07-15T09:00:00Z',
                        startTime: '09:00',
                        endTime: '12:00',
                        age: 16,
                        image: 'https://example.com/event-image.jpg',
                        description: 'A workshop focused on IELTS writing techniques',
                        price: 100000,
                        targetAudience: 'STUDENT',
                        course: ['IELTS', 'Academic English'],
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-02T00:00:00Z'
                    }
                }
            }
        }
    })
    async getOne(@Param('id') id: string) {
        return this.eventService.getOne(id);
    }

    @Put(':id')
    @ApiBody({ type: UpdateEventDto })
    @ApiOperation({ summary: 'Update an existing Event' })
    @ApiResponse({
        status: 200,
        description: 'Event updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Event updated successfully' },
                data: { $ref: getSchemaPath(EventEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with updated event',  
                value: {
                    statusCode: 200,
                    message: 'Event updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174001',
                        status: 'PUBLISHED',
                        branch: 'Main Branch',
                        eventTitle: 'Advanced IELTS Writing',
                        date: '2023-07-15T09:00:00Z',
                        startTime: '09:00',
                        endTime: '12:00',
                        age: 16,
                        image: 'https://example.com/event-image-updated.jpg',
                        description: 'An updated workshop focused on IELTS writing techniques',
                        price: 120000,
                        targetAudience: 'STUDENT',
                        course: ['IELTS', 'Academic English'],
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-03T00:00:00Z'
                    }
                }
            }
        }
    })
    async update(
        @Param('id') id: string, 
        @Body(BranchValidationPipe, CourseValidationPipe) updateEventDto: UpdateEventDto, 
        @Req() req: CustomRequest
    ) {
        return this.eventService.update(id, updateEventDto, req?.user);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an Event' })
    @ApiResponse({
        status: 200,
        description: 'Event deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Event deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after event deletion',  
                value: {
                    statusCode: 200,
                    message: 'Event deleted successfully',
                    data: {}
                }
            }
        }
    })
    async delete(@Param('id') id: string) {
        return this.eventService.delete(id);
    }
}
