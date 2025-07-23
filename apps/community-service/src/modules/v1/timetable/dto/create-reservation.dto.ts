import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
    @IsString()
    @IsOptional()
    commentUser?: string;

    @IsEnum(['RESERVED', 'STUDENT_CANCELLED', 'TEACHER_CANCELLED', 'MISSED'])
    @IsOptional()
    status?: 'RESERVED' | 'STUDENT_CANCELLED' | 'TEACHER_CANCELLED' | 'MISSED';

    @IsString()
    @IsOptional()
    studentId?: string;

    @IsString()
    @IsNotEmpty()
    reservationCalendarId: string;

    @IsString()
    @IsOptional()
    createdBy?: string;

    @IsString()
    @IsOptional()
    updatedBy?: string;
}
