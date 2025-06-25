// create-program.dto.ts
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { Degree, StudyLanguage, StudyType } from '../enums/university-search.enum';

export class CreateProgramDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    title: string;

    @IsNotEmpty()
    @IsEnum(StudyLanguage)
    studyLanguage: StudyLanguage;

    @IsNotEmpty()
    @IsNumber()
    contract: number;

    @IsNotEmpty()
    @IsEnum(Degree)
    degree: Degree;

    @IsOptional()
    @IsEnum(StudyType)
    studyType?: StudyType;

    @IsOptional()
    @IsUUID()
    facultyId?: string;

    @IsNotEmpty()
    @IsUUID()
    universityId: string;

    @IsOptional()
    @IsUUID()
    certificateRequirementId?: string;
}
