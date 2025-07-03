// company.controller.ts
import { Controller, Get, Post, Body, Param, Put, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, getSchemaPath, ApiExtraModels, ApiQuery } from '@nestjs/swagger';
import { CompanyService } from '../service/company.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { CompanyEntity, CompanyWithJobsEntity } from '../entity/job-hunting.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Job Hunting - Company')
@ApiExtraModels(CommonEntity, CompanyEntity, CompanyWithJobsEntity)
@Controller('job-hunting/company/web')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post('presigned-upload')
    @ApiOperation({ summary: `Generate Presigned URL for Company Logo Upload` })
    @ApiBody({
        type: CreatePresignedUrlDto,
        examples: {
            'application/json': {
                value: {
                    filename: 'company-logo.jpg',
                    contentType: 'image/jpeg',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Presigned Upload URL generated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Presigned Upload URL generated successfully' },
                data: { 
                    type: 'object',
                    properties: {
                        uploadUrl: { type: 'string', example: 'https://storage.example.com/company-logos/abc123-company-logo.jpg?signature=xyz' },
                        fileKey: { type: 'string', example: 'company-logos/abc123-company-logo.jpg' },
                        publicUrl: { type: 'string', example: 'https://storage.example.com/company-logos/abc123-company-logo.jpg' }
                    }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with presigned URL',  
                value: {
                    statusCode: 201,
                    message: 'Presigned Upload URL generated successfully',
                    data: {
                        uploadUrl: 'https://storage.example.com/company-logos/abc123-company-logo.jpg?signature=xyz',
                        fileKey: 'company-logos/abc123-company-logo.jpg',
                        publicUrl: 'https://storage.example.com/company-logos/abc123-company-logo.jpg'
                    }
                }
            }
        }
    })
    async getPresignedUploadUrl(@Body() body: CreatePresignedUrlDto): Promise<CommonEntity> {
        return this.companyService.generatePresignedUploadUrlForCompanyLogo(body);
    }

    @Post()
    @ApiOperation({ summary: `Create Company` })
    @ApiResponse({
        status: 201,
        description: 'Company created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Company created successfully' },
                data: { $ref: getSchemaPath(CompanyEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created company',  
                value: {
                    statusCode: 201,
                    message: 'Company created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        companyLogo: 'https://example.com/company-logo.png',
                        companyTitle: 'Example Tech Solutions',
                        description: 'A leading technology company specializing in web development.',
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        updatedAt: '2023-01-01T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                    }
                }
            }
        }
    })
    async create(@Body() createCompanyDto: CreateCompanyDto, @Req() req: CustomRequest) {
        return this.companyService.create(createCompanyDto, req.user.userId);
    }

    @Get()
    @ApiOperation({ summary: `Get all Companies` })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiResponse({
        status: 200,
        description: 'List of Companies',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Companies' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(CompanyEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with companies',  
                value: {
                    statusCode: 200,
                    message: 'List of Companies',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            companyLogo: 'https://example.com/company-logo.png',
                            companyTitle: 'Example Tech Solutions',
                            description: 'A leading technology company specializing in web development.',
                            createdAt: '2023-01-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            updatedAt: '2023-01-02T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                        },
                        {
                            id: '223e4567-e89b-12d3-a456-426614174000',
                            companyLogo: 'https://example.com/innovate-logo.png',
                            companyTitle: 'Innovate Design Studio',
                            description: 'Creative design agency focused on user experience.',
                            createdAt: '2023-01-10T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            updatedAt: '2023-01-10T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                        }
                    ]
                }
            }
        }
    })
    async findAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.companyService.getAll({ page, limit });
    }

    @Get(':id')
    @ApiOperation({ summary: `Get Company by ID` })
    @ApiResponse({
        status: 200,
        description: 'Company details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Company details' },
                data: { $ref: getSchemaPath(CompanyEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with company details',  
                value: {
                    statusCode: 200,
                    message: 'Company details',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
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
    })
    async findOne(@Param('id') id: string) {
        return this.companyService.getOne(id);
    }

    // @Get(':id/jobs')
    // @ApiOperation({ summary: 'Get a company with its job listings' })
    // @ApiResponse({
    //     status: 200,
    //     description: 'Company with job listings',
    //     schema: {
    //         type: 'object',
    //         properties: {
    //             statusCode: { type: 'number', example: 200 },
    //             message: { type: 'string', example: 'Company with job listings' },
    //             data: { $ref: getSchemaPath(CompanyWithJobsEntity) }
    //         }
    //     },
    //     examples: {
    //         'application/json': {
    //             summary: 'Sample response with company and its job listings',  
    //             value: {
    //                 statusCode: 200,
    //                 message: 'Company with job listings',
    //                 data: {
    //                     id: '123e4567-e89b-12d3-a456-426614174000',
    //                     companyLogo: 'https://example.com/company-logo.png',
    //                     companyTitle: 'Example Tech Solutions',
    //                     description: 'A leading technology company specializing in web development.',
    //                     createdAt: '2023-01-01T00:00:00Z',
    //                     createdBy: '123e4567-e89b-12d3-a456-426614174001',
    //                     updatedAt: '2023-01-02T00:00:00Z',
    //                     updatedBy: '123e4567-e89b-12d3-a456-426614174002',
    //                     jobs: [
    //                         {
    //                             id: '123e4567-e89b-12d3-a456-426614174000',
    //                             title: 'Senior Frontend Developer',
    //                             description: 'We are looking for an experienced Frontend Developer to join our team.',
    //                             workExperience: 'EXPERIENCE_3_6',
    //                             workScheduleHours: 'SCHEDULE_5_2',
    //                             employmentType: 'FULL',
    //                             workMode: 'HYBRID',
    //                             salary: 5000000,
    //                             responsibilities: 'Developing new features, maintaining existing codebase',
    //                             requirements: '3+ years of experience with React, TypeScript proficiency',
    //                             conditions: 'Flexible work hours, health insurance, professional development budget',
    //                             createdAt: '2023-01-01T00:00:00Z',
    //                             createdBy: '123e4567-e89b-12d3-a456-426614174001',
    //                             updatedAt: '2023-01-02T00:00:00Z',
    //                             updatedBy: '123e4567-e89b-12d3-a456-426614174002',
    //                             companyId: '123e4567-e89b-12d3-a456-426614174000',
    //                             city: 'Tashkent'
    //                         },
    //                         {
    //                             id: '223e4567-e89b-12d3-a456-426614174000',
    //                             title: 'UX/UI Designer',
    //                             description: 'Looking for a creative designer to improve user experience.',
    //                             workExperience: 'EXPERIENCE_1_3',
    //                             workScheduleHours: 'SCHEDULE_5_2',
    //                             employmentType: 'FULL',
    //                             workMode: 'OFFLINE',
    //                             salary: 4000000,
    //                             responsibilities: 'Creating wireframes, prototypes, and user flows',
    //                             requirements: 'Experience with Figma, Adobe XD, and user research',
    //                             conditions: 'Modern office, team events, health insurance',
    //                             createdAt: '2023-01-10T00:00:00Z',
    //                             createdBy: '123e4567-e89b-12d3-a456-426614174001',
    //                             updatedAt: '2023-01-11T00:00:00Z',
    //                             updatedBy: '123e4567-e89b-12d3-a456-426614174002',
    //                             companyId: '123e4567-e89b-12d3-a456-426614174000',
    //                             city: 'Tashkent'
    //                         }
    //                     ]
    //                 }
    //             }
    //         }
    //     }
    // })
    // async findOneWithJobs(@Param('id') id: string) {
    //     return this.companyService.getOneWithJobs(id);
    // }

    @Put(':id')
    @ApiOperation({ summary: `Update Company` })
    @ApiResponse({
        status: 200,
        description: 'Company updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Company updated successfully' },
                data: { $ref: getSchemaPath(CompanyEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with updated company',  
                value: {
                    statusCode: 200,
                    message: 'Company updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        companyLogo: 'https://example.com/updated-company-logo.png',
                        companyTitle: 'Example Tech Solutions (Updated)',
                        description: 'A leading technology company specializing in web and mobile development.',
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        updatedAt: '2023-01-15T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                    }
                }
            }
        }
    })
    async update(
        @Param('id') id: string, 
        @Body() updateCompanyDto: UpdateCompanyDto,
        @Req() req: CustomRequest
    ) {
        return this.companyService.update(id, updateCompanyDto, req.user.userId);
    }
}
