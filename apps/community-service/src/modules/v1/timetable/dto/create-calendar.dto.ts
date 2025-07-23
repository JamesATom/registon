import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCalendarDto {
    @IsDateString()
    @IsNotEmpty()
    dateCreate: Date;

    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @IsEnum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'])
    @IsNotEmpty()
    weekday: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

    @IsString()
    @IsNotEmpty()
    timeFrom: string;

    @IsString()
    @IsNotEmpty()
    timeTo: string;

    @IsString()
    @IsNotEmpty()
    branchId: string;

    @IsString()
    @IsOptional()
    supportTeacherId?: string;

    @IsString()
    @IsNotEmpty()
    timetableId: string;

    @IsOptional()
    reservationsNumber?: number;
}
