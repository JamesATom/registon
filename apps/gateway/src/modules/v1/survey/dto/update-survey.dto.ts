// update-survey.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsEnum,
    IsMongoId,
    IsOptional,
    IsString,
    MaxLength,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SurveyQuestionDto } from './survey-question.dto';

export class UpdateSurveyDto {
    @ApiPropertyOptional({
        description: 'Survey title',
        maxLength: 100,
        example: 'Student Satisfaction Survey',
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    title?: string;

    @ApiPropertyOptional({
        description: 'Survey image URL',
        example: 'https://registon.bucket-name/2398ujfajfj92/image.jpg',
    })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiPropertyOptional({
        description: 'Survey questions',
        type: [SurveyQuestionDto],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SurveyQuestionDto)
    questions?: SurveyQuestionDto[];

    @ApiPropertyOptional({
        description: 'Branch ID',
        example: '60f7c0c2b4d1c72d88f8e8a3',
    })
    @IsOptional()
    @IsMongoId()
    branch?: string;

    @ApiPropertyOptional({
        description: 'Target audience',
        enum: ['ALL', 'TEACHER', 'STUDENT'],
        example: 'STUDENT',
    })
    @IsOptional()
    @IsEnum(['ALL', 'TEACHER', 'STUDENT'])
    targetAudience?: 'ALL' | 'TEACHER' | 'STUDENT';
}
