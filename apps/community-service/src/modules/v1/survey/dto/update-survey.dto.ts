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

export class UpdateSurveyQuestionDto {
    @ApiPropertyOptional({
        description: 'Question ID',
        example: '60f7c0c2b4d1c72d88f8e8a4',
    })
    @IsMongoId()
    @IsOptional()
    id?: string;

    @ApiPropertyOptional({
        description: 'Question text',
        maxLength: 100,
        example: 'How satisfied are you with our services?',
    })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    question?: string;

    @ApiPropertyOptional({
        description: 'Additional description for the question',
        maxLength: 250,
        example: 'Please rate your overall satisfaction with our services provided during the last month.',
    })
    @IsString()
    @MaxLength(250)
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({
        description: 'First answer option',
        maxLength: 50,
        example: 'Very satisfied',
    })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    answer1?: string;

    @ApiPropertyOptional({
        description: 'Second answer option',
        maxLength: 50,
        example: 'Satisfied',
    })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    answer2?: string;

    @ApiPropertyOptional({
        description: 'Third answer option',
        maxLength: 50,
        example: 'Neutral',
    })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    answer3?: string;

    @ApiPropertyOptional({
        description: 'Fourth answer option',
        maxLength: 50,
        example: 'Dissatisfied',
    })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    answer4?: string;

    @ApiPropertyOptional({
        description: 'Fifth answer option',
        maxLength: 50,
        example: 'Very dissatisfied',
    })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    answer5?: string;
}

export class UpdateSurveyDto {
    @ApiPropertyOptional({
        description: 'Updated by user ID',
        example: '60f7c0c2b4d1c72d88f8e8a2',
    })
    @IsMongoId()
    @IsOptional()
    updatedBy?: string;

    @ApiPropertyOptional({
        description: 'Branch ID where survey will be conducted',
        example: '60f7c0c2b4d1c72d88f8e8a3',
    })
    @IsMongoId()
    @IsOptional()
    branchId?: string;

    @ApiPropertyOptional({
        description: 'Title of the survey',
        maxLength: 100,
        example: 'Customer Satisfaction Survey 2025',
    })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    title?: string;

    @ApiPropertyOptional({
        description: 'Description of the survey',
        maxLength: 250,
        example: 'This survey aims to gather feedback about our services and identify areas for improvement.',
    })
    @IsString()
    @MaxLength(250)
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({
        description: 'Image URL for the survey',
        example: 'https://example.com/images/survey.jpg',
    })
    @IsString()
    @IsOptional()
    image?: string;

    @ApiPropertyOptional({
        description: 'Admin comment about the survey',
        maxLength: 250,
        example: 'This survey is for the summer quarter evaluation.',
    })
    @IsString()
    @MaxLength(250)
    @IsOptional()
    commentAdmin?: string;

    @ApiPropertyOptional({
        description: 'Target audience for the survey',
        enum: ['ALL', 'TEACHER', 'STUDENT'],
        example: 'ALL',
    })
    @IsEnum(['ALL', 'TEACHER', 'STUDENT'])
    @IsOptional()
    targetAudience?: 'ALL' | 'TEACHER' | 'STUDENT';

    @ApiPropertyOptional({
        description: 'Survey questions to update',
        type: [UpdateSurveyQuestionDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateSurveyQuestionDto)
    @IsOptional()
    questions?: UpdateSurveyQuestionDto[];
}
