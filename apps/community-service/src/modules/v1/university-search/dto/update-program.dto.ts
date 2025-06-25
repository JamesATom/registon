// update-program.dto.ts
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { Degree, StudyLanguage, StudyType } from '../enums/university-search.enum';

export class UpdateProgramDto {
    @IsOptional()
    @IsString()
    @Length(1, 100)
    title?: string;

    @IsOptional()
    @IsEnum(StudyLanguage)
    studyLanguage?: StudyLanguage;

    @IsOptional()
    @IsNumber()
    contract?: number;

    @IsOptional()
    @IsEnum(Degree)
    degree?: Degree;

    @IsOptional()
    @IsEnum(StudyType)
    studyType?: StudyType;

    @IsOptional()
    @IsUUID()
    facultyId?: string;

    @IsOptional()
    @IsUUID()
    universityId?: string;

    @IsOptional()
    @IsUUID()
    certificateRequirementId?: string;
}
