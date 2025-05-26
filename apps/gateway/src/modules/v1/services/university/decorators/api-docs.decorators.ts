import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateUniversityDto } from '../dto/create-university.dto';
import { UpdateUniversityDto } from '../dto/update-university.dto';
import { FilterUniversitiesDto } from '../dto/filter-university.dto';
import { CreateProgramDto } from '../dto/create-program.dto';
import { UpdateProgramDto } from '../dto/update-program.dto';

export const ApiCreateUniversity = () =>
    applyDecorators(
        HttpCode(HttpStatus.CREATED),
        ApiOperation({ summary: 'Create a new university' }),
        ApiBody({ type: CreateUniversityDto }),
        ApiResponse({
            status: 201,
            description: 'University created successfully',
            content: {
                'application/json': {
                    example: {
                        statusCode: 201,
                        message: 'University created successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567890',
                            universityName: 'Webster University',
                            status: 'VERIFIED',
                            aboutUniversity:
                                'This is branch of Webster University of Great Britain',
                            image: 'https://websteruniversity.com/',
                            licenceFile: 'https://websteruniversity.com/',
                            requirementCerfiticate: 'IELTS B2',
                            location: 'Tashkent, Uzbekistan',
                            tuitionFee: '33000 USD',
                            dateOfAdmission: '2025-05-15T09:00:00.000Z',
                            universityType: 'INTERNATIONAL',
                            programs: [
                                {
                                    _id: '60a7c8b9e4b0c1234567890',
                                    programName: 'Master of Business Administration',
                                    languageOfEducation: 'ENGLISH',
                                    learningMode: 'ONLINE',
                                    degree: 'BACHELOR',
                                    requirementCertificate: 'IELTS B2',
                                    tuitionFee: '2025-05-15T09:00:00.000Z',
                                    duration: '4 years',
                                    description:
                                        'This is master of business administration program, and it is a bachelor degree program',
                                    admissionRequirements: 'Admission Requirements',
                                    startDate: '2025-05-15T09:00:00.000Z',
                                    endDate: '2025-08-15T09:00:00.000Z',
                                },
                            ],
                            createdAt: '2025-01-15T13:00:00Z',
                            updatedAt: '2025-01-15T13:00:00Z',
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Invalid input data',
            content: {
                'application/json': {
                    example: {
                        statusCode: 400,
                        message: 'Invalid input: universityName is required',
                    },
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            content: {
                'application/json': {
                    example: {
                        statusCode: 401,
                        message: 'Unauthorized',
                    },
                },
            },
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden - requires admin privileges',
            content: {
                'application/json': {
                    example: {
                        statusCode: 403,
                        message: 'Forbidden - requires admin privileges',
                    },
                },
            },
        }),
    );

export const ApiGetUniversityById = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Get university by id' }),
        ApiParam({ name: 'id', type: String }),
        ApiResponse({
            status: 200,
            description: 'University found successfully',
            content: {
                'application/json': {
                    example: {
                        status: 200,
                        message: 'University found successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567890',
                            universityName: 'Webster University',
                            status: 'VERIFIED',
                            aboutUniversity:
                                'This is branch of Webster University of Great Britain',
                            image: 'https://websteruniversity.com/',
                            licenceFile: 'https://websteruniversity.com/',
                            requirementCerfiticate: 'IELTS B2',
                            location: 'Tashkent, Uzbekistan',
                            tuitionFee: '33000 USD',
                            dateOfAdmission: '2025-05-15T09:00:00.000Z',
                            universityType: 'INTERNATIONAL',
                            programs: [
                                {
                                    _id: '60a7c8b9e4b0c1234567890',
                                    programName: 'Master of Business Administration',
                                    languageOfEducation: 'ENGLISH',
                                    learningMode: 'ONLINE',
                                    degree: 'BACHELOR',
                                    requirementCertificate: 'IELTS B2',
                                    tuitionFee: '2025-05-15T09:00:00.000Z',
                                    duration: '4 years',
                                    description:
                                        'This is master of business administration program, and it is a bachelor degree program',
                                    admissionRequirements: 'Admission Requirements',
                                    startDate: '2025-05-15T09:00:00.000Z',
                                    endDate: '2025-08-15T09:00:00.000Z',
                                },
                            ],
                            createdAt: '2025-01-15T13:00:00Z',
                            updatedAt: '2025-01-15T13:00:00Z',
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            content: {
                'application/json': {
                    example: {
                        statusCode: 401,
                        message: 'Unauthorized',
                    },
                },
            },
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden - requires admin privileges',
            content: {
                'application/json': {
                    example: {
                        statusCode: 403,
                        message: 'Forbidden - requires admin privileges',
                    },
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
            content: {
                'application/json': {
                    example: {
                        statusCode: 500,
                        message: 'Internal server error',
                        error: 'Internal Server Error',
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'University not found',
            content: {
                'application/json': {
                    example: {
                        statusCode: 404,
                        message: 'University not found',
                    },
                },
            },
        }),
    );

export const ApiUpdateUniversity = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Update university by id' }),
        ApiParam({ name: 'id', type: String }),
        ApiBody({ type: UpdateUniversityDto }),
        ApiResponse({
            status: 200,
            description: 'University updated successfully',
            content: {
                'application/json': {
                    example: {
                        status: 200,
                        message: 'University updated successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567890',
                            universityName: 'Webster University',
                            status: 'VERIFIED',
                            aboutUniversity:
                                'This is branch of Webster University of Great Britain',
                            image: 'https://websteruniversity.com/',
                            licenceFile: 'https://websteruniversity.com/',
                            requirementCerfiticate: 'IELTS B2',
                            location: 'Tashkent, Uzbekistan',
                            tuitionFee: '33000 USD',
                            dateOfAdmission: '2025-05-15T09:00:00.000Z',
                            universityType: 'INTERNATIONAL',
                            programs: [
                                {
                                    _id: '60a7c8b9e4b0c1234567890',
                                    programName: 'Master of Business Administration',
                                    languageOfEducation: 'ENGLISH',
                                    learningMode: 'ONLINE',
                                    degree: 'BACHELOR',
                                    requirementCertificate: 'IELTS B2',
                                    tuitionFee: '2025-05-15T09:00:00.000Z',
                                    duration: '4 years',
                                    description:
                                        'This is master of business administration program, and it is a bachelor degree program',
                                    admissionRequirements: 'Admission Requirements',
                                    startDate: '2025-05-15T09:00:00.000Z',
                                    endDate: '2025-08-15T09:00:00.000Z',
                                },
                            ],
                            createdAt: '2025-01-15T13:00:00Z',
                            updatedAt: '2025-01-15T13:00:00Z',
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            content: {
                'application/json': {
                    example: {
                        statusCode: 401,
                        message: 'Unauthorized',
                    },
                },
            },
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden - requires admin privileges',
            content: {
                'application/json': {
                    example: {
                        statusCode: 403,
                        message: 'Forbidden - requires admin privileges',
                    },
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
            content: {
                'application/json': {
                    example: {
                        statusCode: 500,
                        message: 'Internal server error',
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'University not found',
            content: {
                'application/json': {
                    example: {
                        statusCode: 404,
                        message: 'University not found',
                    },
                },
            },
        }),
    );
export const ApiDeleteUniversity = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Delete university by id' }),
        ApiParam({ name: 'id', type: String }),
        ApiResponse({
            status: 200,
            description: 'University deleted successfully',
            content: {
                'application/json': {
                    example: {
                        status: 200,
                        message: 'University deleted successfully',
                        data: true,
                    },
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            content: {
                'application/json': {
                    example: {
                        statusCode: 401,
                        message: 'Unauthorized',
                    },
                },
            },
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden - requires admin privileges',
            content: {
                'application/json': {
                    example: {
                        statusCode: 403,
                        message: 'Forbidden - requires admin privileges',
                    },
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
            content: {
                'application/json': {
                    example: {
                        statusCode: 500,
                        message: 'Internal server error',
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'University not found',
            content: {
                'application/json': {
                    example: {
                        statusCode: 404,
                        message: 'University not found',
                    },
                },
            },
        }),
    );
export const ApiFilterUniversities = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Filter universities' }),
        ApiBody({ type: FilterUniversitiesDto }),
        ApiResponse({
            status: 200,
            description: 'Universities filtered successfully',
            content: {
                'application/json': {
                    example: {
                        statusCode: 200,
                        message: 'Universities filtered successfully',
                        data: {
                            docs: [
                                {
                                    _id: '60a7c8b9e4b0c1234567890',
                                    universityName: 'Webster University',
                                    status: 'VERIFIED',
                                    aboutUniversity:
                                        'This is branch of Webster University of Great Britain',
                                    image: 'https://websteruniversity.com/',
                                    licenceFile: 'https://websteruniversity.com/',
                                    requirementCerfiticate: 'IELTS B2',
                                    location: 'Tashkent, Uzbekistan',
                                    tuitionFee: '33000 USD',
                                    dateOfAdmission: '2025-05-15T09:00:00.000Z',
                                    universityType: 'INTERNATIONAL',
                                    programs: [
                                        {
                                            _id: '60a7c8b9e4b0c1234567890',
                                            programName: 'Master of Business Administration',
                                            languageOfEducation: 'ENGLISH',
                                            learningMode: 'ONLINE',
                                            degree: 'BACHELOR',
                                            requirementCertificate: 'IELTS B2',
                                            tuitionFee: '2025-05-15T09:00:00.000Z',
                                            duration: '4 years',
                                            description:
                                                'This is master of business administration program, and it is a bachelor degree program',
                                            admissionRequirements: 'Admission Requirements',
                                            startDate: '2025-05-15T09:00:00.000Z',
                                            endDate: '2025-08-15T09:00:00.000Z',
                                        },
                                    ],
                                    createdAt: '2025-01-15T13:00:00Z',
                                    updatedAt: '2025-01-15T13:00:00Z',
                                },
                            ],
                            totalDocs: 1,
                            limit: 10,
                            totalPages: 1,
                            page: 1,
                            pagingCounter: 1,
                            hasPrevPage: false,
                            hasNextPage: false,
                            prevPage: null,
                            nextPage: null,
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            content: {
                'application/json': {
                    example: {
                        statusCode: 401,
                        message: 'Unauthorized',
                    },
                },
            },
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden - requires admin privileges',
            content: {
                'application/json': {
                    example: {
                        statusCode: 403,
                        message: 'Forbidden - requires admin privileges',
                    },
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
            content: {
                'application/json': {
                    example: {
                        statusCode: 500,
                        message: 'Internal server error',
                    },
                },
            },
        }),
    );
export const ApiAddProgram = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Add program to university' }),
        ApiBody({ type: CreateProgramDto }),
        ApiResponse({
            status: 200,
            description: 'Program added successfully',
            content: {
                'application/json': {
                    example: {
                        statusCode: 200,
                        message: 'Program added successfully',
                        data: [
                            {
                                _id: '60a7c8b9e4b0c1234567890',
                                programName: 'Master of Business Administration',
                                languageOfEducation: 'ENGLISH',
                                learningMode: 'ONLINE',
                                degree: 'BACHELOR',
                                requirementCertificate: 'IELTS B2',
                                tuitionFee: '2025-05-15T09:00:00.000Z',
                                duration: '4 years',
                                description:
                                    'This is master of business administration program, and it is a bachelor degree program',
                                admissionRequirements: 'Admission Requirements',
                                startDate: '2025-05-15T09:00:00.000Z',
                                endDate: '2025-08-15T09:00:00.000Z',
                            },
                        ],
                    },
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            content: {
                'application/json': {
                    example: {
                        statusCode: 401,
                        message: 'Unauthorized',
                    },
                },
            },
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden - requires admin privileges',
            content: {
                'application/json': {
                    example: {
                        statusCode: 403,
                        message: 'Forbidden - requires admin privileges',
                    },
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
            content: {
                'application/json': {
                    example: {
                        statusCode: 500,
                        message: 'Internal server error',
                    },
                },
            },
        }),
    );

export const ApiUpdateProgram = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Update program' }),
        ApiBody({ type: UpdateProgramDto }),
        ApiResponse({
            status: 200,
            description: 'Program updated successfully',
            content: {
                'application/json': {
                    example: {
                        statusCode: 200,
                        message: 'Program updated successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567890',
                            programName: 'Master of Business Administration',
                            languageOfEducation: 'ENGLISH',
                            learningMode: 'ONLINE',
                            degree: 'BACHELOR',
                            requirementCertificate: 'IELTS B2',
                            tuitionFee: '3300 USD',
                            duration: '4 years',
                            description:
                                'This is master of business administration program, and it is a bachelor degree program',
                            admissionRequirements: 'Admission Requirements',
                            startDate: '2025-05-15T09:00:00.000Z',
                            endDate: '2025-08-15T09:00:00.000Z',
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            content: {
                'application/json': {
                    example: {
                        statusCode: 401,
                        message: 'Unauthorized',
                    },
                },
            },
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden - requires admin privileges',
            content: {
                'application/json': {
                    example: {
                        statusCode: 403,
                        message: 'Forbidden - requires admin privileges',
                    },
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
            content: {
                'application/json': {
                    example: {
                        statusCode: 500,
                        message: 'Internal server error',
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Program not found',
            content: {
                'application/json': {
                    example: {
                        statusCode: 404,
                        message: 'Program not found',
                    },
                },
            },
        }),
    );

export const ApiDeleteProgram = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Delete program by id' }),
        ApiParam({ name: 'id', type: String }),
        ApiQuery({ name: 'universityId', type: String }),
        ApiResponse({
            status: 200,
            description: 'Program deleted successfully',
            content: {
                'application/json': {
                    example: {
                        status: 200,
                        message: 'Program deleted successfully',
                        data: true,
                    },
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            content: {
                'application/json': {
                    example: {
                        statusCode: 401,
                        message: 'Unauthorized',
                    },
                },
            },
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden - requires admin privileges',
            content: {
                'application/json': {
                    example: {
                        statusCode: 403,
                        message: 'Forbidden - requires admin privileges',
                    },
                },
            },
        }),
        ApiResponse({
            status: 500,
            description: 'Internal server error',
            content: {
                'application/json': {
                    example: {
                        statusCode: 500,
                        message: 'Internal server error',
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Program not found',
            content: {
                'application/json': {
                    example: {
                        statusCode: 404,
                        message: 'Program not found',
                    },
                },
            },
        }),
    );
