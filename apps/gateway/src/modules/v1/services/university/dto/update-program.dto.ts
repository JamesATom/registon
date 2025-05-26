import {
    ProgramDegree,
    LearningMode,
    EducationLanguage,
} from '../../../../../common/enum/common.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDate } from 'class-validator';

export class UpdateProgramDto {
    @ApiProperty({ description: 'University ID', required: true })
    @IsNotEmpty()
    @IsString()
    universityId: string;

    @ApiProperty({ description: 'Program name', maxLength: 100 })
    @IsOptional()
    @IsString()
    programName?: string;

    @ApiProperty({ description: 'Language of education', enum: EducationLanguage })
    @IsOptional()
    @IsEnum(EducationLanguage)
    languageOfEducation?: EducationLanguage;

    @ApiProperty({ description: 'Learning mode', enum: LearningMode })
    @IsOptional()
    @IsEnum(LearningMode)
    learningMode?: LearningMode;

    @ApiProperty({ description: 'Program degree', enum: ProgramDegree })
    @IsOptional()
    @IsEnum(ProgramDegree)
    degree?: ProgramDegree;

    @ApiProperty({ description: 'Program requirement certificate', maxLength: 250 })
    @IsOptional()
    @IsString()
    requirementCertificate?: string;

    @ApiProperty({ description: 'Program tuition fee', maxLength: 250 })
    @IsOptional()
    @IsString()
    tuitionFee?: string;

    @ApiProperty({ description: 'Program duration', maxLength: 250 })
    @IsOptional()
    @IsString()
    duration?: string;

    @ApiPropertyOptional({ description: 'Program description', maxLength: 250 })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ description: 'Program admission requirements', maxLength: 250 })
    @IsOptional()
    @IsString()
    admissionRequirements?: string;

    @ApiPropertyOptional({ description: 'Program start date' })
    @IsOptional()
    @IsDate()
    startDate?: Date;

    @ApiPropertyOptional({ description: 'Program end date' })
    @IsOptional()
    @IsDate()
    endDate?: Date;
}
