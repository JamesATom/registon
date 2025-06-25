// create-faculty.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateFacultyDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    facultyTitle: string;

    @IsOptional()
    @IsString()
    @Length(1, 250)
    description?: string;

    @IsNotEmpty()
    @IsUUID()
    universityId: string;
}
