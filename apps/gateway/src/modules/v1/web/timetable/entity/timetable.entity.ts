import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TimetableEntity {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiPropertyOptional({ example: 'teacher-123' })
    supportTeacherId?: string;

    @ApiProperty({ example: 'branch-456' })
    branchId: string;

    @ApiProperty({ 
        example: 'MONDAY', 
        enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'] 
    })
    weekday: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

    @ApiPropertyOptional({ example: 'Special instructions for this time slot' })
    commentUser?: string;

    @ApiProperty({ example: '09:00' })
    timeFrom: string;

    @ApiProperty({ example: '10:30' })
    timeTo: string;

    @ApiProperty({ example: '2024-01-15T09:00:00Z' })
    createdAt: Date;

    @ApiPropertyOptional({ example: 'user-123' })
    createdBy?: string;

    @ApiProperty({ example: '2024-01-15T09:00:00Z' })
    updatedAt: Date;

    @ApiPropertyOptional({ example: 'user-456' })
    updatedBy?: string;
}

export class CalendarEntity {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
    id: string;

    @ApiProperty({ example: '2024-01-15T09:00:00Z' })
    dateCreate: Date;

    @ApiProperty({ example: '2024-01-20T00:00:00Z' })
    date: Date;

    @ApiProperty({ 
        example: 'MONDAY', 
        enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'] 
    })
    weekday: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

    @ApiProperty({ example: '09:00' })
    timeFrom: string;

    @ApiProperty({ example: '10:30' })
    timeTo: string;

    @ApiProperty({ example: 'branch-456' })
    branchId: string;

    @ApiPropertyOptional({ example: 'teacher-123' })
    supportTeacherId?: string;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    timetableId: string;

    @ApiPropertyOptional({ example: 5 })
    reservationsNumber?: number;
}

export class ReservationEntity {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
    id: string;

    @ApiPropertyOptional({ example: 'Need extra time for this session' })
    commentUser?: string;

    @ApiPropertyOptional({ 
        example: 'RESERVED', 
        enum: ['RESERVED', 'STUDENT_CANCELLED', 'TEACHER_CANCELLED', 'MISSED'] 
    })
    status?: 'RESERVED' | 'STUDENT_CANCELLED' | 'TEACHER_CANCELLED' | 'MISSED';

    @ApiPropertyOptional({ example: 'student-789' })
    studentId?: string;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
    reservationCalendarId: string;

    @ApiProperty({ example: '2024-01-15T09:00:00Z' })
    createdAt: Date;

    @ApiPropertyOptional({ example: 'user-123' })
    createdBy?: string;

    @ApiProperty({ example: '2024-01-15T09:00:00Z' })
    updatedAt: Date;

    @ApiPropertyOptional({ example: 'user-456' })
    updatedBy?: string;
}
