// faculty.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, getSchemaPath, ApiExtraModels, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { FacultyService } from '../service/faculty.service';
import { CreateFacultyDto } from '../dto/create-faculty.dto';
import { UpdateFacultyDto } from '../dto/update-faculty.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { FacultyEntity, FacultyWithProgramsEntity } from '../entity/university-search.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - University Search - Faculty')
@ApiExtraModels(CommonEntity, FacultyEntity, FacultyWithProgramsEntity)
@Controller('university-search/faculty/web')
export class FacultyController {
    constructor(private readonly facultyService: FacultyService) {}

    @Post()
    @ApiOperation({ summary: `Create Faculty` })
    @ApiResponse({
        status: 201,
        description: 'Faculty created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Faculty created successfully' },
                data: { $ref: getSchemaPath(FacultyEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created faculty',  
                value: {
                    statusCode: 201,
                    message: 'Faculty created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        name: 'Faculty of Engineering',
                        description: 'Faculty focusing on engineering disciplines',
                        universityId: '123e4567-e89b-12d3-a456-426614174001',
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
        description: 'Failed to create Faculty',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to create Faculty' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async create(@Body() createFacultyDto: CreateFacultyDto, @Req() req: CustomRequest) {
        return this.facultyService.create(createFacultyDto, req.user.userId);
    }

    @Get()
    @ApiOperation({ summary: `Get all Faculties` })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiResponse({
        status: 200,
        description: 'List of Faculties',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Faculties' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(FacultyEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with faculties',  
                value: {
                    statusCode: 200,
                    message: 'List of Faculties',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            name: 'Faculty of Engineering',
                            description: 'Faculty focusing on engineering disciplines',
                            universityId: '123e4567-e89b-12d3-a456-426614174001',
                            createdAt: '2023-01-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedAt: '2023-01-01T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                        },
                        {
                            id: '123e4567-e89b-12d3-a456-426614174003',
                            name: 'Faculty of Business',
                            description: 'Faculty focusing on business studies',
                            universityId: '123e4567-e89b-12d3-a456-426614174001',
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
        description: 'Failed to fetch Faculties',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch Faculties' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.facultyService.getAll({ page, limit });
    }

    @Get('university/:universityId')
    @ApiOperation({ summary: `Get all Faculties by University ID` })
    @ApiResponse({
        status: 200,
        description: 'List of Faculties by University',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Faculties by University' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(FacultyEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with faculties for a university',  
                value: {
                    statusCode: 200,
                    message: 'List of Faculties by University',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            name: 'Faculty of Engineering',
                            description: 'Faculty focusing on engineering disciplines',
                            universityId: '123e4567-e89b-12d3-a456-426614174001',
                            createdAt: '2023-01-01T00:00:00Z',
                            createdBy: '123e4567-e89b-12d3-a456-426614174002',
                            updatedAt: '2023-01-01T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174002'
                        },
                        {
                            id: '123e4567-e89b-12d3-a456-426614174003',
                            name: 'Faculty of Business',
                            description: 'Faculty focusing on business studies',
                            universityId: '123e4567-e89b-12d3-a456-426614174001',
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
        description: 'Failed to fetch Faculties by University',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch Faculties by University' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getAllByUniversity(@Param('universityId') universityId: string) {
        return this.facultyService.getAllByUniversity(universityId);
    }

    @Get(':id')
    @ApiOperation({ summary: `Get Faculty by ID` })
    @ApiResponse({
        status: 200,
        description: 'Faculty details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Faculty details' },
                data: { $ref: getSchemaPath(FacultyWithProgramsEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with faculty details',  
                value: {
                    statusCode: 200,
                    message: 'Faculty details',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        name: 'Faculty of Engineering',
                        description: 'Faculty focusing on engineering disciplines',
                        universityId: '123e4567-e89b-12d3-a456-426614174001',
                        createdAt: '2023-01-01T00:00:00Z',
                        createdBy: '123e4567-e89b-12d3-a456-426614174002',
                        updatedAt: '2023-01-01T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002',
                        programs: [
                            {
                                id: '123e4567-e89b-12d3-a456-426614174004',
                                name: 'Computer Science',
                                description: 'Bachelor of Science in Computer Science',
                                facultyId: '123e4567-e89b-12d3-a456-426614174000',
                                credits: 120,
                                duration: 4,
                                degree: 'BACHELOR',
                                tuitionFee: 10000,
                                currency: 'USD',
                                language: 'English',
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
        description: 'Failed to fetch Faculty details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to fetch Faculty details' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async getOne(@Param('id') id: string) {
        return this.facultyService.getOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: `Update Faculty` })
    @ApiResponse({
        status: 200,
        description: 'Faculty updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Faculty updated successfully' },
                data: { $ref: getSchemaPath(FacultyEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response for updated faculty',  
                value: {
                    statusCode: 200,
                    message: 'Faculty updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        name: 'Faculty of Engineering and Technology',
                        description: 'Updated description for faculty focusing on engineering disciplines',
                        universityId: '123e4567-e89b-12d3-a456-426614174001',
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
        description: 'Failed to update Faculty',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to update Faculty' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async update(
        @Param('id') id: string, 
        @Body() updateFacultyDto: UpdateFacultyDto,
        @Req() req: CustomRequest
    ) {
        return this.facultyService.update(id, updateFacultyDto, req.user.userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: `Delete Faculty` })
    @ApiResponse({
        status: 200,
        description: 'Faculty deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Faculty deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after faculty deletion',  
                value: {
                    statusCode: 200,
                    message: 'Faculty deleted successfully',
                    data: {}
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Failed to delete Faculty',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Failed to delete Faculty' },
                error: { type: 'string', example: 'Internal Server Error' }
            }
        }
    })
    async delete(@Param('id') id: string) {
        return this.facultyService.delete(id);
    }
}
