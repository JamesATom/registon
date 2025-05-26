// submit-survey.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsArray, MaxLength, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SubmitSurveyQuestionDto {
    @ApiProperty({ 
        description: 'Unique identifier for the question', 
        example: '60f7c0c2b4d1c72d88f8e8a3' 
    })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ 
        description: 'First answer option', 
        maxLength: 50, 
        example: 'Excellent' 
    })
    @IsString()
    @MaxLength(50)
    answer1: string;

    @ApiProperty({ 
        description: 'Second answer option', 
        maxLength: 50, 
        example: 'Good' 
    })
    @IsString()
    @MaxLength(50)
    answer2: string;

    @ApiPropertyOptional({ 
        description: 'Third answer option', 
        maxLength: 50, 
        example: 'Average' 
    })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    answer3?: string;

    @ApiPropertyOptional({ 
        description: 'Fourth answer option', 
        maxLength: 50, 
        example: 'Below Average' 
    })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    answer4?: string;

    @ApiPropertyOptional({ 
        description: 'Fifth answer option', 
        maxLength: 50, 
        example: 'Poor' 
    })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    answer5?: string;
}

export class SubmitSurveyDto {
    @ApiProperty({ description: 'Survey ID', example: '1234567890abcdef12345678' })
    @IsString()
    @IsNotEmpty()
    surveyId: string;

    @ApiPropertyOptional({ 
        description: 'Survey questions', 
        type: [SubmitSurveyQuestionDto] 
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SubmitSurveyQuestionDto)
    questions?: SubmitSurveyQuestionDto[];
}
