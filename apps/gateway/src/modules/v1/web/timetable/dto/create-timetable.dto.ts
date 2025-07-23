import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTimetableDto {
    @ApiPropertyOptional({ 
        description: 'Support teacher ID',
        example: 'teacher-123'
    })
    @IsString()
    @IsOptional()
    supportTeacherId?: string;

    @ApiProperty({ 
        description: 'Branch ID',
        example: 'branch-456'
    })
    @IsString()
    @IsNotEmpty()
    branchId: string;

    @ApiProperty({ 
        description: 'Day of the week',
        enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
        example: 'MONDAY'
    })
    @IsEnum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'])
    @IsNotEmpty()
    weekday: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

    @ApiPropertyOptional({ 
        description: 'User comment',
        example: 'Special instructions for this time slot',
        maxLength: 250
    })
    @IsString()
    @IsOptional()
    commentUser?: string;

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
}
