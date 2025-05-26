import {
    ProgramDegree,
    LearningMode,
    EducationLanguage,
} from '../../../../../common/enum/common.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateProgramDto {
    @ApiProperty({ description: 'University ID', required: true })
    @IsNotEmpty()
    @IsString()
    universityId: string;

    @ApiProperty({ description: 'Program name', maxLength: 100 })
    @IsNotEmpty()
    @IsString()
    programName: string;

    @ApiProperty({ description: 'Language of education', enum: EducationLanguage })
    @IsEnum(EducationLanguage)
    languageOfEducation: EducationLanguage;

    @ApiProperty({ description: 'Learning mode', enum: LearningMode })
    @IsNotEmpty()
    @IsEnum(LearningMode)
    learningMode: LearningMode;

    @ApiProperty({ description: 'Program degree', enum: ProgramDegree })
    @IsNotEmpty()
    @IsEnum(ProgramDegree)
    degree: ProgramDegree;

    @ApiProperty({ description: 'Program requirement certificate', maxLength: 250 })
    @IsNotEmpty()
    @IsString()
    requirementCertificate: string;

    @ApiProperty({ description: 'Program tuition fee', maxLength: 250 })
    @IsString()
    tuitionFee: string;

    @ApiProperty({ description: 'Program duration', maxLength: 250 })
    @IsNotEmpty()
    @IsString()
    duration: string;

    @ApiPropertyOptional({ description: 'Program description', maxLength: 250 })
    @IsString()
    description?: string;

    @ApiPropertyOptional({ description: 'Program admission requirements', maxLength: 250 })
    @IsString()
    admissionRequirements?: string;

    @ApiPropertyOptional({ description: 'Program start date' })
    @IsOptional()
    startDate?: Date;

    @ApiPropertyOptional({ description: 'Program end date' })
    @IsOptional()
    endDate?: Date;
}
