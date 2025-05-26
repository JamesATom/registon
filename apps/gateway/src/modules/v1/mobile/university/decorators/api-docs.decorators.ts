import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUniversityApplyDto } from '../dto/create-universityApply.dto';
import { FilterUniversitiesDto } from '../dto/filter-university.dto';

export const ApiCreateUniversityApply = () =>
    applyDecorators(
        HttpCode(HttpStatus.CREATED),
        ApiOperation({ summary: 'Create a new university apply' }),
        ApiBody({ type: CreateUniversityApplyDto }),
        ApiResponse({
            status: 201,
            description: 'University apply created successfully',
            content: {
                'application/json': {
                    example: {
                        statusCode: 201,
                        message: 'University apply created successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567890',
                            universityId: '60a7c8b9e4b0c1234567890',
                            programId: '60a7c8b9e4b0c1234567890',
                            branchId: '60a7c8b9e4b0c1234567890',
                            studentId: '60a7c8b9e4b0c1234567890',
                            fullName: 'John Doe',
                            phoneNumber: '1234567890',
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
                        message: 'Invalid input: universityId is required',
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

export const ApiGetMyApplies = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Get my applies' }),
        ApiResponse({
            status: 200,
            description: 'My applies',
            content: {
                'application/json': {
                    example: {
                        statusCode: 200,
                        message: 'University applies found successfully',
                        data: [
                            {
                                _id: '6831ca9548dba8564b06c83c',
                                universityId: '68318fa164e4fc7c10bbaafb',
                                programId: '68318fa164e4fc7c10bbaafc',
                                branchId: '68238b1d6978d6863d6cf535',
                                status: 'PENDING',
                                studentId: '68238b1d6978d6863d6cf535',
                                fullName: 'Abdukarim Tojimatov',
                                phoneNumber: '937410504',
                                createdAt: '2025-05-24T13:33:09.089Z',
                                updatedAt: '2025-05-24T13:33:09.089Z',
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
            description: 'Forbidden',
            content: {
                'application/json': {
                    example: {
                        statusCode: 403,
                        message: 'Forbidden',
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

export const ApiGetOneApply = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Get one apply' }),
        ApiParam({ name: 'id', description: 'Apply ID' }),
        ApiResponse({
            status: 200,
            description: 'Apply found successfully',
            content: {
                'application/json': {
                    example: {
                        statusCode: 200,
                        message: 'Apply found successfully',
                        data: {
                            _id: '6831ca9548dba8564b06c83c',
                            universityId: '68318fa164e4fc7c10bbaafb',
                            programId: '68318fa164e4fc7c10bbaafc',
                            branchId: '68238b1d6978d6863d6cf535',
                            status: 'PENDING',
                            studentId: '68238b1d6978d6863d6cf535',
                            fullName: 'Abdukarim Tojimatov',
                            phoneNumber: '937410504',
                            createdAt: '2025-05-24T13:33:09.089Z',
                            updatedAt: '2025-05-24T13:33:09.089Z',
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
            description: 'Forbidden',
            content: {
                'application/json': {
                    example: {
                        statusCode: 403,
                        message: 'Forbidden',
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
