import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
    @ApiPropertyOptional({ 
        description: 'User comment for the reservation',
        example: 'Need extra time for this session',
        maxLength: 250
    })
    @IsString()
    @IsOptional()
    commentUser?: string;

    @ApiPropertyOptional({ 
        description: 'Reservation status',
        enum: ['RESERVED', 'STUDENT_CANCELLED', 'TEACHER_CANCELLED', 'MISSED'],
        example: 'RESERVED'
    })
    @IsEnum(['RESERVED', 'STUDENT_CANCELLED', 'TEACHER_CANCELLED', 'MISSED'])
    @IsOptional()
    status?: 'RESERVED' | 'STUDENT_CANCELLED' | 'TEACHER_CANCELLED' | 'MISSED';

    @ApiPropertyOptional({ 
        description: 'Student ID who made the reservation',
        example: 'student-789'
    })
    @IsString()
    @IsOptional()
    studentId?: string;

    @ApiProperty({ 
        description: 'Calendar ID this reservation is for',
        example: '123e4567-e89b-12d3-a456-426614174001'
    })
    @IsString()
    @IsNotEmpty()
    reservationCalendarId: string;
}
