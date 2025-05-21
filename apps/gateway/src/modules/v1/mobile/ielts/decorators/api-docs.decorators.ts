import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { FilterIeltsExamsDto } from '../dto/filter-ielts-registrations.dto';
import { CreateIeltsExamDto } from '../dto/create-ielts-exam.dto';
import { UpdateIeltsExamDto } from '../dto/update-ielts-exam.dto';
import {
    IeltsExamResponseEntity,
    IeltsExamListResponseEntity,
} from '../entity/ielts-response.entity';
import { IeltsExamStatus } from '../../../../../common/enums/roles.enum';

export const ApiCreateIeltsExam = () =>
    applyDecorators(
        HttpCode(HttpStatus.CREATED),
        ApiOperation({ summary: 'Create a new IELTS exam' }),
        ApiBody({ type: CreateIeltsExamDto }),
        ApiResponse({
            status: 201,
            description: 'IELTS exam created successfully',
            type: IeltsExamResponseEntity,
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 201,
                        message: 'IELTS exam created successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567890',
                            title: 'IELTS Academic Test - May 2025',
                            examDate: '2025-05-15T09:00:00.000Z',
                            registrationDeadline: '2025-05-01T23:59:59.000Z',
                            fee: 250,
                            location: 'British Council, Tashkent',
                            status: 'ACTIVE',
                            capacitySeats: 100,
                            availableSeats: 100,
                            description: 'Official IELTS Academic test with British Council',
                            createdBy: '60a7c8b9e4b0c1234567892',
                            updatedBy: '60a7c8b9e4b0c1234567892',
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
                        status: 'error',
                        statusCode: 400,
                        message: 'Invalid input: title is required',
                        error: 'Bad Request',
                    },
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden - requires admin privileges',
        }),
    );

export const ApiGetAllIeltsExams = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Get all IELTS exams with filtering options' }),
        ApiQuery({
            name: 'page',
            required: false,
            type: Number,
            description: 'Page number (pagination)',
        }),
        ApiQuery({
            name: 'limit',
            required: false,
            type: Number,
            description: 'Items per page (pagination)',
        }),
        ApiQuery({
            name: 'status',
            required: false,
            enum: IeltsExamStatus,
            description: 'Filter by exam status',
        }),
        ApiQuery({
            name: 'search',
            required: false,
            type: String,
            description: 'Search by title or location',
        }),
        ApiQuery({
            name: 'fromDate',
            required: false,
            type: Date,
            description: 'Filter exams after this date',
        }),
        ApiQuery({
            name: 'toDate',
            required: false,
            type: Date,
            description: 'Filter exams before this date',
        }),
        ApiResponse({
            status: 200,
            description: 'IELTS exams retrieved successfully',
            type: IeltsExamListResponseEntity,
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 200,
                        message: 'IELTS exams retrieved successfully',
                        data: [
                            {
                                _id: '60a7c8b9e4b0c1234567890',
                                title: 'IELTS Academic Test - May 2025',
                                examDate: '2025-05-15T09:00:00.000Z',
                                registrationDeadline: '2025-05-01T23:59:59.000Z',
                                fee: 250,
                                location: 'British Council, Tashkent',
                                status: 'ACTIVE',
                                capacitySeats: 100,
                                availableSeats: 75,
                                description: 'Official IELTS Academic test with British Council',
                                createdAt: '2025-01-15T13:00:00Z',
                                updatedAt: '2025-01-15T13:00:00Z',
                            },
                            {
                                _id: '60a7c8b9e4b0c1234567891',
                                title: 'IELTS General Training - June 2025',
                                examDate: '2025-06-10T09:00:00.000Z',
                                registrationDeadline: '2025-06-01T23:59:59.000Z',
                                fee: 250,
                                location: 'Registon Education Center',
                                status: 'ACTIVE',
                                capacitySeats: 50,
                                availableSeats: 50,
                                description: 'IELTS General Training test',
                                createdAt: '2025-01-20T14:30:00Z',
                                updatedAt: '2025-01-20T14:30:00Z',
                            },
                        ],
                        pagination: {
                            total: 2,
                            page: 1,
                            limit: 10,
                            totalPages: 1,
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Invalid filter parameters',
        }),
    );

export const ApiGetIeltsExamById = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Get an IELTS exam by ID' }),
        ApiParam({ name: 'id', description: 'IELTS Exam ID', type: String }),
        ApiResponse({
            status: 200,
            description: 'IELTS exam retrieved successfully',
            type: IeltsExamResponseEntity,
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 200,
                        message: 'IELTS exam retrieved successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567890',
                            title: 'IELTS Academic Test - May 2025',
                            examDate: '2025-05-15T09:00:00.000Z',
                            registrationDeadline: '2025-05-01T23:59:59.000Z',
                            fee: 250,
                            location: 'British Council, Tashkent',
                            status: 'ACTIVE',
                            capacitySeats: 100,
                            availableSeats: 75,
                            description: 'Official IELTS Academic test with British Council',
                            createdBy: '60a7c8b9e4b0c1234567892',
                            updatedBy: '60a7c8b9e4b0c1234567892',
                            createdAt: '2025-01-15T13:00:00Z',
                            updatedAt: '2025-01-15T13:00:00Z',
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'IELTS exam not found',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 404,
                        message: 'IELTS exam with ID 60a7c8b9e4b0c1234567890 not found',
                        error: 'Not Found',
                    },
                },
            },
        }),
    );

export const ApiUpdateIeltsExam = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Update an IELTS exam' }),
        ApiParam({ name: 'id', description: 'IELTS Exam ID', type: String }),
        ApiBody({ type: UpdateIeltsExamDto }),
        ApiResponse({
            status: 200,
            description: 'IELTS exam updated successfully',
            type: IeltsExamResponseEntity,
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 200,
                        message: 'IELTS exam updated successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567890',
                            title: 'IELTS Academic Test - June 2025 (Updated)',
                            examDate: '2025-06-15T09:00:00.000Z',
                            registrationDeadline: '2025-06-01T23:59:59.000Z',
                            fee: 275,
                            location: 'British Council, Tashkent',
                            status: 'ACTIVE',
                            capacitySeats: 120,
                            availableSeats: 95,
                            description:
                                'Updated: Official IELTS Academic test with British Council',
                            createdBy: '60a7c8b9e4b0c1234567892',
                            updatedBy: '60a7c8b9e4b0c1234567892',
                            createdAt: '2025-01-15T13:00:00Z',
                            updatedAt: '2025-01-20T14:30:00Z',
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
                        status: 'error',
                        statusCode: 400,
                        message: 'capacitySeats cannot be less than current registrations',
                        error: 'Bad Request',
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'IELTS exam not found',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 404,
                        message: 'IELTS exam with ID 60a7c8b9e4b0c1234567890 not found',
                        error: 'Not Found',
                    },
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden - requires admin privileges',
        }),
    );

export const ApiDeleteIeltsExam = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Delete an IELTS exam' }),
        ApiParam({ name: 'id', description: 'IELTS Exam ID', type: String }),
        ApiResponse({
            status: 200,
            description: 'IELTS exam deleted successfully',
            content: {
                'application/json': {
                    example: {
                        status: 'success',
                        statusCode: 200,
                        message: 'IELTS exam deleted successfully',
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'IELTS exam not found',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 404,
                        message: 'IELTS exam with ID 60a7c8b9e4b0c1234567890 not found',
                        error: 'Not Found',
                    },
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Cannot delete exam with registrations',
            content: {
                'application/json': {
                    example: {
                        status: 'error',
                        statusCode: 400,
                        message: 'Cannot delete an exam with existing registrations',
                        error: 'Bad Request',
                    },
                },
            },
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden - requires admin privileges',
        }),
    );
