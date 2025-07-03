// mock-register.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class MockRegistrationEntity {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ example: '2023-07-01T10:00:00Z' })
    createdAt: Date;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
    createdBy: string;

    @ApiProperty({ example: '2023-07-02T10:00:00Z' })
    updatedAt: Date;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', required: false })
    updatedBy?: string;

    @ApiProperty({ example: 'I need to improve my IELTS score', required: false })
    commentUser?: string;

    @ApiProperty({ example: 'Approved after review', required: false })
    commentAdmin?: string;

    @ApiProperty({ example: 'IELTS Mock Test - July 2023', required: false })
    title?: string;

    @ApiProperty({ example: '2023-07-15T09:00:00Z' })
    date: Date;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174003' })
    branchId: string;

    @ApiProperty({ example: true })
    isActive: boolean;
}

export class MockRegistrationStudentEntity {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
    studentId: string;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
    mockRegistrationId: string;

    @ApiProperty({ example: '2023-07-10T15:30:00Z' })
    registeredAt: Date;
}

export class MockRegistrationWithStudentsEntity extends MockRegistrationEntity {
    @ApiProperty({ type: [MockRegistrationStudentEntity], required: false })
    students?: MockRegistrationStudentEntity[];
}
