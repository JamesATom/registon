import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTimetableDto {
    @IsString()
    @IsOptional()
    supportTeacherId?: string;

    @IsString()
    @IsNotEmpty()
    branchId: string;

    @IsEnum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'])
    @IsNotEmpty()
    weekday: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

    @IsString()
    @IsOptional()
    commentUser?: string;

    @IsString()
    @IsNotEmpty()
    timeFrom: string;

    @IsString()
    @IsNotEmpty()
    timeTo: string;

    @IsString()
    @IsOptional()
    createdBy?: string;

    @IsString()
    @IsOptional()
    updatedBy?: string;
}
