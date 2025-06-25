// update-faculty.dto.ts
import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class UpdateFacultyDto {
    @IsOptional()
    @IsString()
    @Length(1, 50)
    facultyTitle?: string;

    @IsOptional()
    @IsString()
    @Length(1, 250)
    description?: string;

    @IsOptional()
    @IsUUID()
    universityId?: string;
}
