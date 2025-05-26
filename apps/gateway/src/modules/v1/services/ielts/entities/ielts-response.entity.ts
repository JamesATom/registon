import { ApiProperty } from '@nestjs/swagger';
import { IeltsExamStatus, IeltsExamType } from '../../../../../common/enum/common.enum';

export class IeltsExamEntity {
    @ApiProperty({ example: '60a7c8b9e4b0c1234567890' })
    _id: string;

    @ApiProperty({ example: 'IELTS Academic Test - May 2025' })
    title: string;

    @ApiProperty({ example: '2025-05-15T09:00:00.000Z' })
    examDate: Date;

    @ApiProperty({ example: '2025-05-01T23:59:59.000Z' })
    registrationDeadline: Date;

    @ApiProperty({ example: 250 })
    fee: number;

    @ApiProperty({ example: 'British Council, Tashkent' })
    location: string;

    @ApiProperty({ enum: IeltsExamType, example: 'IELTS' })
    examType: IeltsExamType;

    @ApiProperty({ example: 'Tashkent' })
    city: string;

    @ApiProperty({ enum: IeltsExamStatus, example: 'ACTIVE' })
    status: IeltsExamStatus;

    @ApiProperty({ example: 100 })
    capacitySeats: number;

    @ApiProperty({ example: 75 })
    availableSeats: number;

    @ApiProperty({ example: 'Official IELTS Academic test with British Council' })
    description?: string;

    @ApiProperty({ example: '60a7c8b9e4b0c1234567892' })
    createdBy: string;

    @ApiProperty({ example: '60a7c8b9e4b0c1234567892' })
    updatedBy: string;

    @ApiProperty({ example: '2025-01-15T13:00:00Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-01-15T13:00:00Z' })
    updatedAt: Date;
}

export class PaginationEntity {
    @ApiProperty({ example: 1 })
    page: number;

    @ApiProperty({ example: 10 })
    limit: number;

    @ApiProperty({ example: 100 })
    totalDocs: number;

    @ApiProperty({ example: 1 })
    totalPages: number;

    @ApiProperty({ example: 1 })
    pagingCounter: number;

    @ApiProperty({ example: false })
    hasPrevPage: boolean;

    @ApiProperty({ example: false })
    hasNextPage: boolean;

    @ApiProperty({ example: null })
    prevPage: number | null;

    @ApiProperty({ example: null })
    nextPage: number | null;
}

export class BaseResponseEntity {
    @ApiProperty({ example: 'success' })
    status: string;

    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ example: 'Operation completed successfully' })
    message: string;
}

export class IeltsExamResponseEntity extends BaseResponseEntity {
    @ApiProperty({ type: IeltsExamEntity })
    data: IeltsExamEntity;
}

export class IeltsExamListResponseEntity extends BaseResponseEntity {
    @ApiProperty({ type: [IeltsExamEntity] })
    data: IeltsExamEntity[];

    @ApiProperty({ type: PaginationEntity })
    pagination: PaginationEntity;
}

export class IeltsRegistrationEntity {
    @ApiProperty({ example: '60a7c8b9e4b0c1234567890' })
    _id: string;

    @ApiProperty({ example: '60a7c8b9e4b0c1234567891' })
    ieltsExamId: string;

    @ApiProperty({ example: '60a7c8b9e4b0c1234567892' })
    studentId: string;

    @ApiProperty({ example: 'John Doe' })
    fullName: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    email: string;

    @ApiProperty({ example: '+998901234567' })
    phoneNumber: string;

    @ApiProperty({ example: 'PENDING', enum: ['PENDING', 'CONFIRMED', 'CANCELLED'] })
    status: string;

    @ApiProperty({ example: 'IELTS', enum: ['IELTS', 'MOCK'] })
    examType: string;

    @ApiProperty({ example: '60a7c8b9e4b0c1234567892' })
    createdBy: string;

    @ApiProperty({ example: '60a7c8b9e4b0c1234567892' })
    updatedBy: string;

    @ApiProperty({ example: '2025-05-15T13:00:00Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-05-15T13:00:00Z' })
    updatedAt: Date;
}

export class IeltsRegistrationResponseEntity extends BaseResponseEntity {
    @ApiProperty({ type: IeltsRegistrationEntity })
    data: IeltsRegistrationEntity;
}

export class IeltsRegistrationListResponseEntity extends BaseResponseEntity {
    @ApiProperty({ type: [IeltsRegistrationEntity] })
    data: IeltsRegistrationEntity[];

    @ApiProperty({ type: PaginationEntity })
    pagination: PaginationEntity;
}
