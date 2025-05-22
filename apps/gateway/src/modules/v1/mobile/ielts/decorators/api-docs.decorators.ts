import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import {
    IeltsExamResponseEntity,
    IeltsExamListResponseEntity,
} from '../entity/ielts-response.entity';
import { CreateIeltsRegistrationDto } from '../dto/create-ielts-exam.dto';

export const ApiGetAllIeltsExams = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Get all IELTS exams by city' }),
        ApiQuery({
            name: 'city',
            required: true,
            type: String,
            description: 'City name',
        }),
        ApiResponse({
            status: 200,
            description: 'IELTS exams retrieved successfully',
            type: IeltsExamListResponseEntity,
            content: {
                'application/json': {
                    example: {
                        statusCode: 200,
                        message: 'IELTS exams retrieved successfully',
                        data: [
                            {
                                _id: '60a7c8b9e4b0c1234567890',
                                title: 'IELTS Academic Test - May 2025',
                                examDate: '2025-05-15T09:00:00.000Z',
                                registrationDeadline: '2025-05-01T23:59:59.000Z',
                                examType: 'IELTS',
                                fee: 250,
                                location: 'British Council, Tashkent',
                                city: 'Tashkent',
                                status: 'ACTIVE',
                                capacitySeats: 100,
                                availableSeats: 75,
                                description: 'Official IELTS Academic test with British Council',
                                createdAt: '2025-01-15T13:00:00Z',
                                updatedAt: '2025-01-15T13:00:00Z',
                            },
                        ],
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
                        statusCode: 200,
                        message: 'IELTS exam retrieved successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567890',
                            title: 'IELTS Academic Test - May 2025',
                            examDate: '2025-05-15T09:00:00.000Z',
                            registrationDeadline: '2025-05-01T23:59:59.000Z',
                            examType: 'IELTS',
                            fee: 250,
                            location: 'British Council, Tashkent',
                            status: 'ACTIVE',
                            city: 'Tashkent',
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
                        statusCode: 404,
                        message: 'IELTS exam with ID 60a7c8b9e4b0c1234567890 not found',
                        error: 'Not Found',
                    },
                },
            },
        }),
    );

export const ApiCreateIeltsRegistration = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Create IELTS registration' }),
        ApiBody({ type: CreateIeltsRegistrationDto }),
        ApiResponse({
            status: 200,
            description: 'IELTS registration created successfully',
            content: {
                'application/json': {
                    example: {
                        statusCode: 200,
                        message: 'Exam registered successfully',
                        data: {
                            _id: '60a7c8b9e4b0c1234567890',
                            examId: '60a7c8b9e4b0c1234567890',
                            fullName: 'Abduqodir Khusanov',
                            email: 'abduqodir.khusanov@gmail.com',
                            phoneNumber: '+998991234567',
                            examDate: '2025-05-15T09:00:00.000Z',
                            examType: 'IELTS',
                            status: 'PENDING',
                            createdAt: '2025-01-15T13:00:00Z',
                            updatedAt: '2025-01-15T13:00:00Z',
                        },
                    },
                },
            },
        }),
        ApiResponse({
            status: 404,
            description: 'Exam not found',
            content: {
                'application/json': {
                    example: {
                        statusCode: 404,
                        message: 'Exam not found',
                        error: 'Not Found',
                    },
                },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Bad request',
            content: {
                'application/json': {
                    example: {
                        statusCode: 400,
                        message: 'Bad request',
                        error: 'You have already registered for this exam',
                    },
                },
            },
        }),
    );
export const ApiGetRegistredExams = () =>
    applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Get registered exams' }),
        ApiResponse({
            status: 200,
            description: 'Registered exams retrieved successfully',
            content: {
                'application/json': {
                    example: {
                        statusCode: 200,
                        message: 'Registered exams retrieved successfully',
                        data: [
                            {
                                _id: '60a7c8b9e4b0c1234567890',
                                examId: {
                                    _id: '60a7c8b9e4b0c1234567890',
                                    title: 'IELTS Academic Test - May 2025',
                                    examDate: '2025-05-15T09:00:00.000Z',
                                    registrationDeadline: '2025-05-01T23:59:59.000Z',
                                    fee: 250,
                                    location: 'British Council, Tashkent',
                                    city: 'Tashkent',
                                    status: 'ACTIVE',
                                    capacitySeats: 100,
                                    availableSeats: 75,
                                    description:
                                        'Official IELTS Academic test with British Council',
                                    examType: 'IELTS',
                                    createdAt: '2025-01-15T13:00:00Z',
                                    updatedAt: '2025-01-15T13:00:00Z',
                                },
                                fullName: 'Abduqodir Khusanov',
                                email: 'abduqodir.khusanov@gmail.com',
                                phoneNumber: '+998991234567',
                                examDate: '2025-05-15T09:00:00.000Z',
                                status: 'PENDING',
                                createdAt: '2025-01-15T13:00:00Z',
                                updatedAt: '2025-01-15T13:00:00Z',
                            },
                        ],
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
                        message: 'An unexpected error occurred',
                    },
                },
            },
        }),
    );
