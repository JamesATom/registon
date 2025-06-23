// submit-survey.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SurveyQuestionResponseDto {
    @ApiProperty({
        description: 'ID of the survey question',
        example: '60f7c0c2b4d1c72d88f8e8a5',
    })
    @IsMongoId()
    @IsNotEmpty()
    questionId: string;

    @ApiProperty({
        description: 'Selected answer index (1-5)',
        example: 1,
        minimum: 1,
        maximum: 5,
    })
    @IsNumber()
    @Min(1)
    @Max(5)
    @IsNotEmpty()
    answerIndex: number;
}

export class SubmitSurveyDto {
    @ApiProperty({
        description: 'ID of the survey',
        example: '60f7c0c2b4d1c72d88f8e8a4',
    })
    @IsMongoId()
    @IsNotEmpty()
    surveyId: string;

    @ApiProperty({
        description: 'ID of the user submitting the survey',
        example: '60f7c0c2b4d1c72d88f8e8a3',
    })
    @IsMongoId()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        description: 'Responses to survey questions',
        type: [SurveyQuestionResponseDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SurveyQuestionResponseDto)
    @IsNotEmpty()
    responses: SurveyQuestionResponseDto[];
}
