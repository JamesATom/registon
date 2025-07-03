// ielts-register.controller.ts
import { Controller, Get, Post, Body, Req, Param, UseGuards, Put, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags, ApiResponse, ApiOperation, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CustomRequest } from 'src/common/types/types';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CityValidationPipe } from 'src/common/pipes/validation/city-validation.pipe';
import { ApiAuth, ApiGetOne, ApiGetAll, ApiCreate, ApiUpdate, ApiDelete } from 'src/common/swagger/common-swagger';
import { IeltsRegisterService } from '../service/ielts-register.service';
import { CreateIeltsRegisterDto } from '../dto/create-ielts-register.dto';
import { UpdateIeltsRegisterDto } from '../dto/update-ielts-register.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - IELTS Register')
@ApiExtraModels(CommonEntity)
@Controller('ielts-register/web')
export class IeltsRegisterController {
    constructor(private readonly ieltsRegisterService: IeltsRegisterService) {}

    @Post()
    @ApiOperation({ summary: `Create IELTS Registration` })
    @ApiBody({ type: CreateIeltsRegisterDto })
    @ApiResponse({
        status: 201,
        description: 'IELTS Registration created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'IELTS Registration created successfully' },
                data: { $ref: getSchemaPath(CommonEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created IELTS registration',  
                value: {
                    statusCode: 201,
                    message: 'IELTS Registration created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        fullName: 'John Doe',
                        email: 'john.doe@example.com',
                        phone: '+1234567890',
                        testDate: '2023-08-15T09:00:00Z',
                        testType: 'ACADEMIC',
                        cityId: '123e4567-e89b-12d3-a456-426614174001',
                        status: 'PENDING',
                        comments: 'Requesting academic IELTS test',
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
        description: 'Failed to create IELTS Registration',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to create IELTS Registration' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async create(
        @Body(CityValidationPipe) createIeltsRegisterDto: CreateIeltsRegisterDto, 
        @Req() req: CustomRequest
    ): Promise<CommonEntity> {
        return this.ieltsRegisterService.create(createIeltsRegisterDto, req?.user);
    }

    @Get()
    @ApiOperation({ summary: `Get all IELTS Registrations` })
    @ApiResponse({
        status: 200,
        description: 'List of IELTS Registrations',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of IELTS Registrations' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(CommonEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with IELTS registrations',  
                value: {
                    statusCode: 200,
                    message: 'List of IELTS Registrations',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            fullName: 'John Doe',
                            email: 'john.doe@example.com',
                            phone: '+1234567890',
                            testDate: '2023-08-15T09:00:00Z',
                            testType: 'ACADEMIC',
                            cityId: '123e4567-e89b-12d3-a456-426614174001',
                            status: 'PENDING',
                            comments: 'Requesting academic IELTS test',
                            createdAt: '2023-07-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedAt: '2023-07-01T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                        },
                        {
                            id: '123e4567-e89b-12d3-a456-426614174003',
                            fullName: 'Jane Smith',
                            email: 'jane.smith@example.com',
                            phone: '+9876543210',
                            testDate: '2023-08-20T14:00:00Z',
                            testType: 'GENERAL',
                            cityId: '123e4567-e89b-12d3-a456-426614174001',
                            status: 'APPROVED',
                            comments: 'General training IELTS test confirmed',
                            createdAt: '2023-07-02T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedAt: '2023-07-03T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                        }
                    ]
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to fetch IELTS Registrations',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch IELTS Registrations' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getAll(): Promise<CommonEntity> {
        return this.ieltsRegisterService.getAll();
    }

    @Get(':id')
    @ApiOperation({ summary: `Get IELTS Registration by ID` })
    @ApiResponse({
        status: 200,
        description: 'IELTS Registration details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'IELTS Registration details' },
                data: { $ref: getSchemaPath(CommonEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with IELTS registration details',  
                value: {
                    statusCode: 200,
                    message: 'IELTS Registration details',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        fullName: 'John Doe',
                        email: 'john.doe@example.com',
                        phone: '+1234567890',
                        testDate: '2023-08-15T09:00:00Z',
                        testType: 'ACADEMIC',
                        cityId: '123e4567-e89b-12d3-a456-426614174001',
                        cityName: 'New York',
                        status: 'PENDING',
                        comments: 'Requesting academic IELTS test',
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
        description: 'Failed to fetch IELTS Registration details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch IELTS Registration details' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getOne(@Param('id') id: string): Promise<CommonEntity> {
        return this.ieltsRegisterService.getOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: `Update IELTS Registration` })
    @ApiBody({ type: UpdateIeltsRegisterDto })
    @ApiResponse({
        status: 200,
        description: 'IELTS Registration updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'IELTS Registration updated successfully' },
                data: { $ref: getSchemaPath(CommonEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response for updated IELTS registration',  
                value: {
                    statusCode: 200,
                    message: 'IELTS Registration updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        fullName: 'John Doe',
                        email: 'john.updated@example.com',
                        phone: '+1234567890',
                        testDate: '2023-09-01T10:00:00Z',
                        testType: 'ACADEMIC',
                        cityId: '123e4567-e89b-12d3-a456-426614174001',
                        status: 'APPROVED',
                        comments: 'Academic IELTS test rescheduled and approved',
                        createdAt: '2023-07-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedAt: '2023-07-10T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to update IELTS Registration',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to update IELTS Registration' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async update(
        @Param('id') id: string,
        @Body(CityValidationPipe) updateIeltsRegisterDto: UpdateIeltsRegisterDto,
        @Req() req: CustomRequest
    ): Promise<CommonEntity> {
        return this.ieltsRegisterService.update(id, updateIeltsRegisterDto, req.user);
    }

    @Delete(':id')
    @ApiOperation({ summary: `Delete IELTS Registration` })
    @ApiResponse({
        status: 200,
        description: 'IELTS Registration deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'IELTS Registration deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after IELTS registration deletion',  
                value: {
                    statusCode: 200,
                    message: 'IELTS Registration deleted successfully',
                    data: {}
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to delete IELTS Registration',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to delete IELTS Registration' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async delete(@Param('id') id: string): Promise<CommonEntity> {
        return this.ieltsRegisterService.delete(id);
    }
}
