// event.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class EventEntity {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
    createdBy: string;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', required: false })
    updatedBy?: string;

    @ApiProperty({ example: 'Approved after review', required: false })
    commentAdmin?: string;

    @ApiProperty({ example: 'PUBLISHED', enum: ['DRAFT', 'PUBLISHED'] })
    status: 'DRAFT' | 'PUBLISHED';

    @ApiProperty({ example: 'Main Branch' })
    branch: string;

    @ApiProperty({ example: 'Introduction to IELTS Writing' })
    eventTitle: string;

    @ApiProperty({ example: '2023-07-15T09:00:00Z' })
    date: Date;

    @ApiProperty({ example: '09:00' })
    startTime: string;

    @ApiProperty({ example: '12:00', required: false })
    endTime?: string;

    @ApiProperty({ example: 16, required: false })
    age?: number;

    @ApiProperty({ example: 'https://example.com/event-image.jpg' })
    image: string;

    @ApiProperty({ example: 'A workshop focused on IELTS writing techniques', required: false })
    description?: string;

    @ApiProperty({ example: 100000, required: false })
    price?: number;

    @ApiProperty({ example: 'STUDENT', enum: ['ALL', 'TEACHER', 'STUDENT'] })
    targetAudience: 'ALL' | 'TEACHER' | 'STUDENT';

    @ApiProperty({ example: ['IELTS', 'Academic English'], required: false, type: [String] })
    course?: string[];

    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    createdAt: Date;

    @ApiProperty({ example: '2023-01-02T00:00:00Z' })
    updatedAt: Date;
}

export class EventRegistrationStudentEntity {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
    studentId: string;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
    eventId: string;

    @ApiProperty({ example: '2023-07-10T15:30:00Z' })
    registeredAt: Date;
}
