// certificate-requirement.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse, getSchemaPath, ApiExtraModels, ApiOperation } from '@nestjs/swagger';
import { CertificateRequirementService } from '../service/certificate-requirement.service';
import { CreateCertificateRequirementDto } from '../dto/create-certificate-requirement.dto';
import { UpdateCertificateRequirementDto } from '../dto/update-certificate-requirement.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { CertificateRequirementEntity } from '../entity/university-search.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - University Search - Certificate Requirement')
@ApiExtraModels(CommonEntity, CertificateRequirementEntity)
@Controller('university-search/certificate-requirement/web')
export class CertificateRequirementController {
    constructor(private readonly certificateRequirementService: CertificateRequirementService) {}

    @Post()
    @ApiOperation({ summary: `Create Certificate Requirement` })
    @ApiResponse({
        status: 201,
        description: 'Certificate Requirement created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Certificate Requirement created successfully' },
                data: { $ref: getSchemaPath(CertificateRequirementEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created certificate requirement',  
                value: {
                    statusCode: 201,
                    message: 'Certificate Requirement created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        certificateRequirementsTitle: 'Standard Admission Requirements',
                        description: 'These are the standard requirements for admission',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        createdAt: '2023-07-01T00:00:00Z',
                        updatedAt: '2023-07-01T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                    }
                }
            }
        }
    })
    async create(@Body() createCertificateRequirementDto: CreateCertificateRequirementDto, @Req() req: CustomRequest) {
        return this.certificateRequirementService.create(createCertificateRequirementDto, req.user.userId);
    }

    @Get()
    @ApiOperation({ summary: `Get all Certificate Requirements` })
    @ApiResponse({
        status: 200,
        description: 'List of Certificate Requirements',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Certificate Requirements' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(CertificateRequirementEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with certificate requirements',  
                value: {
                    statusCode: 200,
                    message: 'List of Certificate Requirements',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            certificateRequirementsTitle: 'Standard Admission Requirements',
                            description: 'These are the standard requirements for admission',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            createdAt: '2023-07-01T00:00:00Z',
                            updatedAt: '2023-07-01T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                        },
                        {
                            id: '223e4567-e89b-12d3-a456-426614174000',
                            certificateRequirementsTitle: 'Advanced Admission Requirements',
                            description: 'Advanced requirements for admission to specialized programs',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            createdAt: '2023-07-02T00:00:00Z',
                            updatedAt: '2023-07-02T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                        }
                    ]
                }
            }
        }
    })
    async getAll() {
        return this.certificateRequirementService.getAll();
    }

    @Get(':id')
    @ApiOperation({ summary: `Get Certificate Requirement by ID` })
    @ApiResponse({
        status: 200,
        description: 'Certificate Requirement details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Certificate Requirement details' },
                data: { $ref: getSchemaPath(CertificateRequirementEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with certificate requirement details',  
                value: {
                    statusCode: 200,
                    message: 'Certificate Requirement details',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        certificateRequirementsTitle: 'Standard Admission Requirements',
                        description: 'These are the standard requirements for admission',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        createdAt: '2023-07-01T00:00:00Z',
                        updatedAt: '2023-07-01T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                    }
                }
            }
        }
    })
    async getOne(@Param('id') id: string) {
        return this.certificateRequirementService.getOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: `Update Certificate Requirement` })
    @ApiResponse({
        status: 200,
        description: 'Certificate Requirement updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Certificate Requirement updated successfully' },
                data: { $ref: getSchemaPath(CertificateRequirementEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with updated certificate requirement',  
                value: {
                    statusCode: 200,
                    message: 'Certificate Requirement updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        certificateRequirementsTitle: 'Updated Standard Admission Requirements',
                        description: 'Updated standard requirements for admission',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        createdAt: '2023-07-01T00:00:00Z',
                        updatedAt: '2023-07-05T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                    }
                }
            }
        }
    })
    async update(
        @Param('id') id: string, 
        @Body() updateCertificateRequirementDto: UpdateCertificateRequirementDto,
        @Req() req: CustomRequest
    ) {
        return this.certificateRequirementService.update(id, updateCertificateRequirementDto, req.user.userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: `Delete Certificate Requirement` })
    @ApiResponse({
        status: 200,
        description: 'Certificate Requirement deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Certificate Requirement deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after certificate requirement deletion',  
                value: {
                    statusCode: 200,
                    message: 'Certificate Requirement deleted successfully',
                    data: {}
                }
            }
        }
    })
    async delete(@Param('id') id: string) {
        return this.certificateRequirementService.delete(id);
    }
}
