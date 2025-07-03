// job-hunting.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, getSchemaPath, ApiExtraModels, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CityValidationPipe } from 'src/common/pipes/validation/city-validation.pipe';
import { JobHuntingService } from '../service/job-hunting.service';
import { CreateJobHuntingDto } from '../dto/create-job-hunting.dto';
import { UpdateJobHuntingDto } from '../dto/update-job-hunting.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { JobHuntingEntity, JobHuntingWithCompanyEntity } from '../entity/job-hunting.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Job Hunting')
@ApiExtraModels(CommonEntity, JobHuntingEntity, JobHuntingWithCompanyEntity)
@Controller('job-hunting/web')
export class JobHuntingController {
    constructor(private readonly jobHuntingService: JobHuntingService) {}

    @Post()
    @ApiOperation({ summary: `Create Job Hunting` })
    @ApiResponse({
        status: 201,
        description: 'Job Hunting created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Job Hunting created successfully' },
                data: { $ref: getSchemaPath(JobHuntingEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created job hunting',  
                value: {
                    statusCode: 201,
                    message: 'Job Hunting created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'Software Developer',
                        description: 'Developing web applications using modern frameworks',
                        requirements: 'JavaScript, React, Node.js',
                        salary: 75000,
                        currency: 'USD',
                        cityId: '123e4567-e89b-12d3-a456-426614174001',
                        companyId: '123e4567-e89b-12d3-a456-426614174003',
                        employmentType: 'FULL_TIME',
                        status: 'ACTIVE',
                        deadline: '2023-08-31T23:59:59Z',
                        createdAt: '2023-07-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedAt: '2023-07-01T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to create Job Hunting',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to create Job Hunting' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async create(@Body(CityValidationPipe) createJobHuntingDto: CreateJobHuntingDto, @Req() req: CustomRequest) {
        return this.jobHuntingService.create(createJobHuntingDto, req.user.userId);
    }

    @Get()
    @ApiOperation({ summary: `Get all Job Huntings` })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiResponse({
        status: 200,
        description: 'List of Job Huntings',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Job Huntings' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(JobHuntingWithCompanyEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with job huntings',  
                value: {
                    statusCode: 200,
                    message: 'List of Job Huntings',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            title: 'Senior Frontend Developer',
                            description: 'We are looking for an experienced Frontend Developer to join our team.',
                            certificateRequirements: 'Bachelor degree in Computer Science or related field',
                            workExperience: '3-6',
                            workScheduleHours: '5/2',
                            employmentType: 'FULL',
                            workMode: 'HYBRID',
                            salary: 5000000,
                            responsibilities: 'Developing new features, maintaining existing codebase',
                            requirements: '3+ years of experience with React, TypeScript proficiency',
                            conditions: 'Flexible work hours, health insurance, professional development budget',
                            createdAt: '2023-01-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            updatedAt: '2023-01-02T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002',
                            companyId: '123e4567-e89b-12d3-a456-426614174003',
                            city: 'Tashkent',
                            company: {
                                id: '123e4567-e89b-12d3-a456-426614174003',
                                companyLogo: 'https://example.com/company-logo.png',
                                companyTitle: 'Example Tech Solutions',
                                description: 'A leading technology company specializing in web development.',
                                createdAt: '2023-01-01T00:00:00Z',
                                createdBy: '123e4567-e89b-12d3-a456-426614174001',
                                updatedAt: '2023-01-02T00:00:00Z',
                                updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                            }
                        },
                        {
                            id: '223e4567-e89b-12d3-a456-426614174000',
                            title: 'UX/UI Designer',
                            description: 'Looking for a creative designer to improve user experience.',
                            certificateRequirements: 'Degree in Design or equivalent experience',
                            workExperience: '1-3',
                            workScheduleHours: '5/2',
                            employmentType: 'FULL',
                            workMode: 'OFFLINE',
                            salary: 4000000,
                            responsibilities: 'Creating wireframes, prototypes, and user flows',
                            requirements: 'Experience with Figma, Adobe XD, and user research',
                            conditions: 'Modern office, team events, health insurance',
                            createdAt: '2023-01-10T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            updatedAt: '2023-01-11T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002',
                            companyId: '223e4567-e89b-12d3-a456-426614174003',
                            city: 'Tashkent'
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
        return this.jobHuntingService.getAll({ page, limit });
    }

    @Get(':id')
    @ApiOperation({ summary: `Get Job Hunting by ID` })
    @ApiResponse({
        status: 200,
        description: 'Job Hunting details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Job Hunting details' },
                data: { $ref: getSchemaPath(JobHuntingWithCompanyEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with job hunting details',  
                value: {
                    statusCode: 200,
                    message: 'Job Hunting details',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'Senior Frontend Developer',
                        description: 'We are looking for an experienced Frontend Developer to join our team.',
                        certificateRequirements: 'Bachelor degree in Computer Science or related field',
                        workExperience: 'EXPERIENCE_3_6',
                        workScheduleHours: 'SCHEDULE_5_2',
                        employmentType: 'FULL',
                        workMode: 'HYBRID',
                        salary: 5000000,
                        responsibilities: 'Developing new features, maintaining existing codebase',
                        requirements: '3+ years of experience with React, TypeScript proficiency',
                        conditions: 'Flexible work hours, health insurance, professional development budget',
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        updatedAt: '2023-01-02T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002',
                        companyId: '123e4567-e89b-12d3-a456-426614174003',
                        city: 'Tashkent',
                        company: {
                            id: '123e4567-e89b-12d3-a456-426614174003',
                            companyLogo: 'https://example.com/company-logo.png',
                            companyTitle: 'Example Tech Solutions',
                            description: 'A leading technology company specializing in web development.',
                            createdAt: '2023-01-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            updatedAt: '2023-01-02T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                        }
                    }
                }
            }
        }
    })
    async getOne(@Param('id') id: string) {
        return this.jobHuntingService.getOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: `Update Job Hunting` })
    @ApiResponse({
        status: 200,
        description: 'Job Hunting updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Job Hunting updated successfully' },
                data: { $ref: getSchemaPath(JobHuntingEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with updated job hunting',  
                value: {
                    statusCode: 200,
                    message: 'Job Hunting updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'Senior Frontend Developer (Updated)',
                        description: 'We are looking for an experienced Frontend Developer to join our growing team.',
                        certificateRequirements: 'Bachelor degree in Computer Science or related field',
                        workExperience: 'EXPERIENCE_3_6',
                        workScheduleHours: 'SCHEDULE_5_2',
                        employmentType: 'FULL',
                        workMode: 'HYBRID',
                        salary: 5500000,
                        responsibilities: 'Developing new features, maintaining existing codebase, mentoring junior developers',
                        requirements: '3+ years of experience with React, TypeScript proficiency, and experience with state management',
                        conditions: 'Flexible work hours, health insurance, professional development budget, gym membership',
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        updatedAt: '2023-01-15T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002',
                        companyId: '123e4567-e89b-12d3-a456-426614174003',
                        city: 'Tashkent'
                    }
                }
            }
        }
    })
    async update(
        @Param('id') id: string, 
        @Body(CityValidationPipe) updateJobHuntingDto: UpdateJobHuntingDto,
        @Req() req: CustomRequest
    ) {
        return this.jobHuntingService.update(id, updateJobHuntingDto, req.user.userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: `Delete Job Hunting` })
    @ApiResponse({
        status: 200,
        description: 'Job Hunting deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Job Hunting deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after job hunting deletion',  
                value: {
                    statusCode: 200,
                    message: 'Job Hunting deleted successfully',
                    data: {}
                }
            }
        }
    })
    async delete(@Param('id') id: string) {
        return this.jobHuntingService.delete(id);
    }
}
