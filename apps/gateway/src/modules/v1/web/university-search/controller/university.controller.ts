// university.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, getSchemaPath, ApiExtraModels, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CityValidationPipe } from 'src/common/pipes/validation/city-validation.pipe';
import { UniversityService } from '../service/university.service';
import { CreateUniversityDto } from '../dto/create-university.dto';
import { UpdateUniversityDto } from '../dto/update-university.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { UniversityEntity, UniversityWithFacultiesEntity } from '../entity/university-search.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - University Search')
@ApiExtraModels(CommonEntity, UniversityEntity, UniversityWithFacultiesEntity)
@Controller('university-search/university/web')
export class UniversityController {
    constructor(private readonly universityService: UniversityService) {}

    @Post()
    @ApiResponse({
        status: 201,
        description: 'University created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'University created successfully' },
                data: { $ref: getSchemaPath(UniversityEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created university',  
                value: {
                    statusCode: 201,
                    message: 'University created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        name: 'Harvard University',
                        description: 'One of the most prestigious universities in the world',
                        cityId: '123e4567-e89b-12d3-a456-426614174001',
                        logoUrl: 'https://example.com/harvard-logo.jpg',
                        websiteUrl: 'https://harvard.edu',
                        foundedYear: 1636,
                        isActive: true,
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedAt: '2023-01-01T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to create University',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to create University' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async create(@Body(CityValidationPipe) createUniversityDto: CreateUniversityDto, @Req() req: CustomRequest) {
        return this.universityService.create(createUniversityDto, req.user.userId);
    }

    @Get()
    @ApiOperation({ summary: `Get all Universities` })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiResponse({
        status: 200,
        description: 'List of Universities',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Universities' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(UniversityEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with universities',  
                value: {
                    statusCode: 200,
                    message: 'List of Universities',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            name: 'Harvard University',
                            description: 'One of the most prestigious universities in the world',
                            cityId: '123e4567-e89b-12d3-a456-426614174001',
                            logoUrl: 'https://example.com/harvard-logo.jpg',
                            websiteUrl: 'https://harvard.edu',
                            foundedYear: 1636,
                            isActive: true,
                            createdAt: '2023-01-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedAt: '2023-01-01T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                        },
                        {
                            id: '123e4567-e89b-12d3-a456-426614174003',
                            name: 'MIT',
                            description: 'Massachusetts Institute of Technology',
                            cityId: '123e4567-e89b-12d3-a456-426614174001',
                            logoUrl: 'https://example.com/mit-logo.jpg',
                            websiteUrl: 'https://mit.edu',
                            foundedYear: 1861,
                            isActive: true,
                            createdAt: '2023-01-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedAt: '2023-01-01T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                        }
                    ]
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to fetch Universities',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch Universities' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.universityService.getAll({ page, limit });
    }

    @Get(':id')
    @ApiOperation({ summary: `Get University by ID` })
    @ApiResponse({ 
        status: 200,
        description: 'University details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'University details' },
                data: { $ref: getSchemaPath(UniversityWithFacultiesEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with university details',  
                value: {
                    statusCode: 200,
                    message: 'University details',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        name: 'Harvard University',
                        description: 'One of the most prestigious universities in the world',
                        cityId: '123e4567-e89b-12d3-a456-426614174001',
                        logoUrl: 'https://example.com/harvard-logo.jpg',
                        websiteUrl: 'https://harvard.edu',
                        foundedYear: 1636,
                        isActive: true,
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedAt: '2023-01-01T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002',
                        faculties: [
                            {
                                id: '123e4567-e89b-12d3-a456-426614174005',
                                name: 'Faculty of Arts and Sciences',
                                description: 'The largest of Harvard\'s academic units',
                                universityId: '123e4567-e89b-12d3-a456-426614174000',
                                createdAt: '2023-01-01T00:00:00Z',
                                createdBy: '123e4567-e89b-12d3-a456-426614174002',
                                updatedAt: '2023-01-01T00:00:00Z',
                                updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                            }
                        ]
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to fetch University details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch University details' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getOne(@Param('id') id: string) {
        return this.universityService.getOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: `Update University` })
    @ApiResponse({
        status: 200,
        description: 'University updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'University updated successfully' },
                data: { $ref: getSchemaPath(UniversityEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response for updated university',  
                value: {
                    statusCode: 200,
                    message: 'University updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        name: 'Harvard University - Updated',
                        description: 'One of the most prestigious universities in the world - Updated description',
                        cityId: '123e4567-e89b-12d3-a456-426614174001',
                        logoUrl: 'https://example.com/harvard-logo-updated.jpg',
                        websiteUrl: 'https://harvard.edu',
                        foundedYear: 1636,
                        isActive: true,
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
        description: 'Failed to update University',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to update University' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async update(
        @Param('id') id: string, 
        @Body(CityValidationPipe) updateUniversityDto: UpdateUniversityDto,
        @Req() req: CustomRequest
    ) {
        return this.universityService.update(id, updateUniversityDto, req.user.userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: `Delete University` })
    @ApiResponse({
        status: 200,
        description: 'University deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'University deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after university deletion',  
                value: {
                    statusCode: 200,
                    message: 'University deleted successfully',
                    data: {}
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to delete University',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to delete University' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async delete(@Param('id') id: string) {
        return this.universityService.delete(id);
    }

    @Post('presigned-url')
    @ApiOperation({ summary: `Generate Presigned URL for Logo Upload` })
    @ApiResponse({
        status: 201,
        description: 'Presigned URL generated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Presigned URL generated successfully' },
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
                    statusCode: 201,
                    message: 'Presigned URL generated successfully',
                    data: {
                        url: 'https://presigned-url-example.com/upload-path?token=abc123'
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to generate presigned URL',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to generate presigned URL' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async generatePresignedUrlForLogo(@Body() createPresignedUrlDto: CreatePresignedUrlDto) {
        return this.universityService.generatePresignedUploadUrlForLogo(createPresignedUrlDto);
    }
}
