// mock-register.controller.ts
import { Post, Get, Body, Controller, Put, Req, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags, getSchemaPath, ApiExtraModels, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { BranchValidationPipe } from 'src/common/pipes/validation/branch-validation.pipe';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CustomRequest } from 'src/common/types/types';
import { CommonEntity } from 'src/common/libs/common.entity';
import { ApiAuth, ApiGetOne, ApiCreate, ApiUpdate, ApiDelete, ApiGetAll, ApiInternalServerErrorResponse } from 'src/common/swagger/common-swagger';
import { MockRegisterService } from '../service/mock-register.service';
import { CreateMockRegisterDto } from '../dto/create-mock-register.dto';
import { UpdateMockRegisterDto } from '../dto/update-mock-register.dto';
import { MockRegistrationEntity, MockRegistrationWithStudentsEntity } from '../entity/mock-register.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - Mock Register')
@ApiExtraModels(CommonEntity, MockRegistrationEntity, MockRegistrationWithStudentsEntity)
@Controller('mock-register/web')
export class MockRegisterController {
    constructor(private readonly mockRegisterService: MockRegisterService) {}

    @Get()
    @ApiOperation({ summary: `Get all Mock Registrations` })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiResponse({
        status: 200,
        description: 'List of Mock Registrations',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Mock Registrations' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(MockRegistrationEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with mock registrations',  
                value: {
                    statusCode: 200,
                    message: 'List of Mock Registrations',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            title: 'IELTS Mock Test - July 2023',
                            date: '2023-07-15T09:00:00Z',
                            branchId: '123e4567-e89b-12d3-a456-426614174003',
                            isActive: true,
                            commentUser: 'I need to improve my IELTS score',
                            commentAdmin: 'Approved after review',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            createdAt: '2023-07-01T00:00:00Z',
                            updatedAt: '2023-07-01T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                        }
                    ]
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to fetch Mock Registrations',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch Mock Registrations' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.mockRegisterService.getAll({ page, limit });
    }

    @Post()
    @ApiBody({ type: CreateMockRegisterDto })
    @ApiResponse({
        status: 201,
        description: 'Mock Registration created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Mock Registration created successfully' },
                data: { $ref: getSchemaPath(MockRegistrationEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created mock registration',  
                value: {
                    statusCode: 201,
                    message: 'Mock Registration created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'IELTS Mock Test - August 2023',
                        date: '2023-08-15T09:00:00Z',
                        branchId: '123e4567-e89b-12d3-a456-426614174003',
                        isActive: true,
                        commentUser: 'I need to improve my IELTS score',
                        commentAdmin: 'Approved after review',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        createdAt: '2023-07-25T00:00:00Z',
                        updatedAt: '2023-07-25T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                    }
                }
            }
        }
    })
    async create(@Body(BranchValidationPipe) createMockRegisterDto: CreateMockRegisterDto, @Req() req: CustomRequest) {
        return this.mockRegisterService.create(createMockRegisterDto, req?.user);
    }

    @Get(':id')
    @ApiOperation({ summary: `Get Mock Registration by ID` })
    @ApiExtraModels(MockRegistrationWithStudentsEntity)
    @ApiResponse({ 
        status: 200,
        description: 'Mock Registration details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Mock Registration details' },
                data: { $ref: getSchemaPath(MockRegistrationWithStudentsEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with mock registration details',  
                value: {
                    statusCode: 200,
                    message: 'Mock Registration details',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'IELTS Mock Test - July 2023',
                        date: '2023-07-15T09:00:00Z',
                        branchId: '123e4567-e89b-12d3-a456-426614174003',
                        isActive: true,
                        commentUser: 'I need to improve my IELTS score',
                        commentAdmin: 'Approved after review',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        createdAt: '2023-07-01T00:00:00Z',
                        updatedAt: '2023-07-01T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174001',
                        students: [
                            {
                                id: '101',
                                studentId: '123e4567-e89b-12d3-a456-426614174001',
                                mockRegistrationId: '1',
                                registeredAt: '2023-07-10T15:30:00Z'
                            },
                            {
                                id: '102',
                                studentId: '123e4567-e89b-12d3-a456-426614174002',
                                mockRegistrationId: '1',
                                registeredAt: '2023-07-11T14:20:00Z'
                            }
                        ]
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to fetch Mock Registration details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch Mock Registration details' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getOne(@Param('id') id: string) {
        return this.mockRegisterService.getOne(id);
    }

    @Put(':id')
    @ApiUpdate('Mock Registration', MockRegistrationEntity)
    @ApiBody({ type: UpdateMockRegisterDto })
    @ApiResponse({
        status: 200,
        description: 'Mock Registration updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Mock Registration updated successfully' },
                data: { $ref: getSchemaPath(MockRegistrationEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with updated mock registration',  
                value: {
                    statusCode: 200,
                    message: 'Mock Registration updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'IELTS Mock Test - September 2023',
                        date: '2023-09-15T10:00:00Z',
                        branchId: '123e4567-e89b-12d3-a456-426614174003',
                        isActive: true,
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        createdAt: '2023-07-25T00:00:00Z',
                        updatedAt: '2023-08-01T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                    }
                }
            }
        }
    })
    async update(
        @Param('id') id: string,
        @Body(BranchValidationPipe) updateMockRegisterDto: UpdateMockRegisterDto,
        @Req() req: CustomRequest,
    ): Promise<CommonEntity> {
        return this.mockRegisterService.update(id, updateMockRegisterDto, req.user);
    }

    @Delete(':id')
    @ApiDelete('Mock Registration')
    @ApiResponse({
        status: 200,
        description: 'Mock Registration deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Mock Registration deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after mock registration deletion',  
                value: {
                    statusCode: 200,
                    message: 'Mock Registration deleted successfully',
                    data: {}
                }
            }
        }
    })
    async delete(@Param('id') id: string): Promise<CommonEntity> {
        return this.mockRegisterService.delete(id);
    }
}
