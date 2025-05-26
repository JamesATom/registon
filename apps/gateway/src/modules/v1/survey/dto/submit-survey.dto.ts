// submit-survey.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SubmitSurveyDto {
    @ApiProperty({ description: 'Survey ID', example: '1234567890abcdef12345678' })
    @IsString()
    @IsNotEmpty()
    surveyId: string;

    @ApiProperty({ description: 'First answer option', maxLength: 50, example: 'Red' })
    @IsString()
    answer1: string;

    @ApiProperty({ description: 'Second answer option', maxLength: 50, example: 'Blue' })
    @IsString()
    answer2: string;

    @ApiPropertyOptional({ description: 'Third answer option', maxLength: 50, example: 'Green' })
    @IsOptional()
    @IsString()
    answer3?: string;

    @ApiPropertyOptional({ description: 'Fourth answer option', maxLength: 50, example: 'Yellow' })
    @IsOptional()
    @IsString()
    answer4?: string;

    @ApiPropertyOptional({ description: 'Fifth answer option', maxLength: 50, example: 'Black' })
    @IsOptional()
    @IsString()
    answer5?: string;
}
