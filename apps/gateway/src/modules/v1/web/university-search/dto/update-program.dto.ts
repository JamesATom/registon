// update-program.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ProgramDegreeLevel, ProgramFormat, ProgramLanguage } from '../enums/university-search.enum';

export class UpdateProgramDto {
    @ApiProperty({ description: 'Name of the program' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'Description of the program' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'University ID that the program belongs to' })
    @IsString()
    @IsOptional()
    universityId?: string;

    @ApiProperty({ description: 'Faculty ID that the program belongs to' })
    @IsString()
    @IsOptional()
    facultyId?: string;

    @ApiProperty({ description: 'Certificate requirement ID for the program' })
    @IsString()
    @IsOptional()
    certificateRequirementId?: string;

    @ApiProperty({ description: 'Duration of the program in years' })
    @IsNumber()
    @IsOptional()
    duration?: number;

    @ApiProperty({ description: 'Tuition fee of the program' })
    @IsNumber()
    @IsOptional()
    tuitionFee?: number;

    @ApiProperty({ description: 'Degree level of the program', enum: ProgramDegreeLevel })
    @IsEnum(ProgramDegreeLevel)
    @IsOptional()
    degreeLevel?: ProgramDegreeLevel;

    @ApiProperty({ description: 'Format of the program', enum: ProgramFormat })
    @IsEnum(ProgramFormat)
    @IsOptional()
    format?: ProgramFormat;

    @ApiProperty({ description: 'Language of the program', enum: ProgramLanguage })
    @IsEnum(ProgramLanguage)
    @IsOptional()
    language?: ProgramLanguage;
}
