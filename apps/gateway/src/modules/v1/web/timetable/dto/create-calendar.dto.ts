import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateCalendarDto {
    @ApiProperty({ 
        description: 'Date when the calendar entry was created',
        example: '2024-01-15T09:00:00Z'
    })
    @IsDateString()
    @IsNotEmpty()
    dateCreate: Date;

    @ApiProperty({ 
        description: 'The actual date of the scheduled time',
        example: '2024-01-20T00:00:00Z'
    })
    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ 
        description: 'Day of the week',
        enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
        example: 'MONDAY'
    })
    @IsEnum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'])
    @IsNotEmpty()
    weekday: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

    @ApiProperty({ 
        description: 'Start time in HH:MM format',
        example: '09:00'
    })
    @IsString()
    @IsNotEmpty()
    timeFrom: string;

    @ApiProperty({ 
        description: 'End time in HH:MM format',
        example: '10:30'
    })
    @IsString()
    @IsNotEmpty()
    timeTo: string;

    @ApiProperty({ 
        description: 'Branch ID',
        example: 'branch-456'
    })
    @IsString()
    @IsNotEmpty()
    branchId: string;

    @ApiPropertyOptional({ 
        description: 'Support teacher ID',
        example: 'teacher-123'
    })
    @IsString()
    @IsOptional()
    supportTeacherId?: string;

    @ApiProperty({ 
        description: 'Reference to timetable ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsString()
    @IsNotEmpty()
    timetableId: string;

    @ApiPropertyOptional({ 
        description: 'Number of reservations for this calendar slot',
        example: 5
    })
    @IsNumber()
    @IsOptional()
    reservationsNumber?: number;
}
