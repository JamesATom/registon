// program.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, getSchemaPath, ApiExtraModels, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ProgramService } from '../service/program.service';
import { CreateProgramDto } from '../dto/create-program.dto';
import { UpdateProgramDto } from '../dto/update-program.dto';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CustomRequest } from 'src/common/types/types';
import { ApiAuth, ApiCreate, ApiDelete, ApiGetAll, ApiGetOne, ApiUpdate } from 'src/common/swagger/common-swagger';
import { ProgramEntity, ProgramWithDetailsEntity } from '../entity/university-search.entity';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('Web - University Search - Program')
@ApiExtraModels(CommonEntity, ProgramEntity, ProgramWithDetailsEntity)
@Controller('university-search/program/web')
export class ProgramController {
    constructor(private readonly programService: ProgramService) {}

    @Post()
    @ApiOperation({ summary: `Create Program` })
    @ApiResponse({
        status: 201,
        description: 'Program created successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 201 },
                message: { type: 'string', example: 'Program created successfully' },
                data: { $ref: getSchemaPath(ProgramEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with created program',  
                value: {
                    statusCode: 201,
                    message: 'Program created successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'Computer Science',
                        studyLanguage: 'English',
                        contract: 15000,
                        degree: 'Bachelor',
                        studyType: 'Full-time',
                        facultyId: '123e4567-e89b-12d3-a456-426614174003',
                        universityId: '123e4567-e89b-12d3-a456-426614174004',
                        certificateRequirementId: '123e4567-e89b-12d3-a456-426614174005',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        createdAt: '2023-07-01T00:00:00Z',
                        updatedAt: '2023-07-01T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                    }
                }
            }
        }
    })
    async create(@Body() createProgramDto: CreateProgramDto, @Req() req: CustomRequest) {
        return this.programService.create(createProgramDto, req.user.userId);
    }

    @Get()
    @ApiOperation({ summary: `Get all Programs` })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
    @ApiResponse({
        status: 200,
        description: 'List of Programs',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Programs' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(ProgramEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with programs',  
                value: {
                    statusCode: 200,
                    message: 'List of Programs',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            title: 'Computer Science',
                            studyLanguage: 'ENGLISH',
                            contract: 15000,
                            degree: 'BACHELOR',
                            studyType: 'FULL_TIME',
                            facultyId: '123e4567-e89b-12d3-a456-426614174003',
                            universityId: '123e4567-e89b-12d3-a456-426614174004',
                            certificateRequirementId: '123e4567-e89b-12d3-a456-426614174005',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            createdAt: '2023-07-01T00:00:00Z',
                            updatedAt: '2023-07-01T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                        },
                        {
                            id: '223e4567-e89b-12d3-a456-426614174000',
                            title: 'Business Administration',
                            studyLanguage: 'ENGLISH',
                            contract: 12000,
                            degree: 'BACHELOR',
                            studyType: 'PART_TIME',
                            facultyId: '223e4567-e89b-12d3-a456-426614174003',
                            universityId: '123e4567-e89b-12d3-a456-426614174004',
                            certificateRequirementId: '123e4567-e89b-12d3-a456-426614174005',
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
    async getAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.programService.getAll({ page, limit });
    }

    @Get('university/:universityId')
    @ApiOperation({ summary: `Get Programs by University ID` })
    @ApiResponse({
        status: 200,
        description: 'List of Programs by University',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Programs by University' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(ProgramEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with programs for a university',  
                value: {
                    statusCode: 200,
                    message: 'List of Programs by University',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            title: 'Computer Science',
                            studyLanguage: 'English',
                            contract: 15000,
                            degree: 'Bachelor',
                            studyType: 'Full-time',
                            facultyId: '123e4567-e89b-12d3-a456-426614174003',
                            universityId: '123e4567-e89b-12d3-a456-426614174004',
                            certificateRequirementId: '123e4567-e89b-12d3-a456-426614174005',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            createdAt: '2023-07-01T00:00:00Z',
                            updatedAt: '2023-07-01T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                        },
                        {
                            id: '223e4567-e89b-12d3-a456-426614174000',
                            title: 'Business Administration',
                            studyLanguage: 'English',
                            contract: 12000,
                            degree: 'Bachelor',
                            studyType: 'Part-time',
                            facultyId: '223e4567-e89b-12d3-a456-426614174003',
                            universityId: '123e4567-e89b-12d3-a456-426614174004',
                            certificateRequirementId: '123e4567-e89b-12d3-a456-426614174005',
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
    async getAllByUniversity(@Param('universityId') universityId: string) {
        return this.programService.getAllByUniversity(universityId);
    }

    @Get('faculty/:facultyId')
    @ApiOperation({ summary: `Get Programs by Faculty ID` })
    @ApiResponse({
        status: 200,
        description: 'List of Programs by Faculty',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'List of Programs by Faculty' },
                data: { 
                    type: 'array',
                    items: { $ref: getSchemaPath(ProgramEntity) }
                }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with programs for a faculty',  
                value: {
                    statusCode: 200,
                    message: 'List of Programs by Faculty',
                    data: [
                        {
                            id: '123e4567-e89b-12d3-a456-426614174000',
                            title: 'Computer Science',
                            studyLanguage: 'English',
                            contract: 15000,
                            degree: 'Bachelor',
                            studyType: 'Full-time',
                            facultyId: '123e4567-e89b-12d3-a456-426614174003',
                            universityId: '123e4567-e89b-12d3-a456-426614174004',
                            certificateRequirementId: '123e4567-e89b-12d3-a456-426614174005',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            createdAt: '2023-07-01T00:00:00Z',
                            updatedAt: '2023-07-01T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                        },
                        {
                            id: '323e4567-e89b-12d3-a456-426614174000',
                            title: 'Data Science',
                            studyLanguage: 'English',
                            contract: 16000,
                            degree: 'Master',
                            studyType: 'Full-time',
                            facultyId: '123e4567-e89b-12d3-a456-426614174003',
                            universityId: '123e4567-e89b-12d3-a456-426614174004',
                            certificateRequirementId: '123e4567-e89b-12d3-a456-426614174005',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            createdAt: '2023-07-03T00:00:00Z',
                            updatedAt: '2023-07-03T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                        }
                    ]
                }
            }
        }
    })
    async getAllByFaculty(@Param('facultyId') facultyId: string) {
        return this.programService.getAllByFaculty(facultyId);
    }

    @Get(':id')
    @ApiOperation({ summary: `Get Program by ID` })
    @ApiResponse({
        status: 200,
        description: 'Program details',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Program details' },
                data: { $ref: getSchemaPath(ProgramWithDetailsEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response with program details',  
                value: {
                    statusCode: 200,
                    message: 'Program details',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'Computer Science',
                        studyLanguage: 'English',
                        contract: 15000,
                        degree: 'Bachelor',
                        studyType: 'Full-time',
                        facultyId: '123e4567-e89b-12d3-a456-426614174003',
                        universityId: '123e4567-e89b-12d3-a456-426614174004',
                        certificateRequirementId: '123e4567-e89b-12d3-a456-426614174005',
                        createdBy: '123e4567-e89b-12d3-a456-426614174001',
                        createdAt: '2023-07-01T00:00:00Z',
                        updatedAt: '2023-07-02T00:00:00Z',
                        updatedBy: '123e4567-e89b-12d3-a456-426614174002',
                        faculty: {
                            id: '123e4567-e89b-12d3-a456-426614174003',
                            facultyTitle: 'Faculty of Computer Science',
                            description: 'Home to cutting-edge research and education in computing',
                            universityId: '123e4567-e89b-12d3-a456-426614174004',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            createdAt: '2023-07-01T00:00:00Z',
                            updatedAt: '2023-07-01T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                        },
                        university: {
                            id: '123e4567-e89b-12d3-a456-426614174004',
                            title: 'Stanford University',
                            description: 'One of the world\'s leading research universities',
                            registrationDate: '2023-01-01T00:00:00Z',
                            type: 'Private',
                            status: true,
                            contract: 'Full partnership',
                            contacts: 7,
                            website: 'https://www.stanford.edu',
                            email: 'info@stanford.edu',
                            address: 'Stanford, CA 94305, USA',
                            logo: 'https://example.com/stanford-logo.png',
                            license: 'LICENSE-54321',
                            city: 'Stanford',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            createdAt: '2023-07-01T00:00:00Z',
                            updatedAt: '2023-07-01T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                        },
                        certificateRequirement: {
                            id: '123e4567-e89b-12d3-a456-426614174005',
                            certificateRequirementsTitle: 'Computer Science Bachelor Requirements',
                            description: 'Requirements for admission to the CS bachelor program',
                            createdBy: '123e4567-e89b-12d3-a456-426614174001',
                            createdAt: '2023-07-01T00:00:00Z',
                            updatedAt: '2023-07-01T00:00:00Z',
                            updatedBy: '123e4567-e89b-12d3-a456-426614174001'
                        }
                    }
                }
            }
        }
    })
    async getOne(@Param('id') id: string) {
        return this.programService.getOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: `Update Program` })
    @ApiResponse({
        status: 200,
        description: 'Program updated successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Program updated successfully' },
                data: { $ref: getSchemaPath(ProgramEntity) }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response for updated program',  
                value: {
                    statusCode: 200,
                    message: 'Program updated successfully',
                    data: {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        title: 'Computer Science and Artificial Intelligence',
                        studyLanguage: 'English',
                        contract: 16000,
                        degree: 'Bachelor',
                        studyType: 'Full-time',
                        facultyId: '123e4567-e89b-12d3-a456-426614174003',
                        universityId: '123e4567-e89b-12d3-a456-426614174004',
                        certificateRequirementId: '123e4567-e89b-12d3-a456-426614174005',
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
        @Body() updateProgramDto: UpdateProgramDto,
        @Req() req: CustomRequest
    ) {
        return this.programService.update(id, updateProgramDto, req.user.userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: `Delete Program` })
    @ApiResponse({
        status: 200,
        description: 'Program deleted successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Program deleted successfully' },
                data: { type: 'object', example: {} }
            }
        },
        examples: {
            'application/json': {
                summary: 'Sample response after program deletion',  
                value: {
                    statusCode: 200,
                    message: 'Program deleted successfully',
                    data: {}
                }
            }
        }
    })
    async delete(@Param('id') id: string) {
        return this.programService.delete(id);
    }
}
