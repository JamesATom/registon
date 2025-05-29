// survey-question.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class SurveyQuestionDto {
    @ApiProperty({
        description: 'Unique identifier for the question',
        example: '60f7c0c2b4d1c72d88f8e8a3',
    })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({
        description: 'Question text',
        maxLength: 100,
        example: 'How would you rate our service?',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    question: string;

    @ApiPropertyOptional({
        description: 'Additional description for the question',
        maxLength: 250,
        example: 'Please provide your honest feedback about our customer service',
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    description?: string;

    @ApiProperty({
        description: 'First answer option',
        maxLength: 50,
        example: 'Excellent',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    answer1: string;

    @ApiProperty({
        description: 'Second answer option',
        maxLength: 50,
        example: 'Good',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    answer2: string;

    @ApiPropertyOptional({
        description: 'Third answer option',
        maxLength: 50,
        example: 'Average',
    })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    answer3?: string;

    @ApiPropertyOptional({
        description: 'Fourth answer option',
        maxLength: 50,
        example: 'Below Average',
    })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    answer4?: string;

    @ApiPropertyOptional({
        description: 'Fifth answer option',
        maxLength: 50,
        example: 'Poor',
    })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    answer5?: string;
}
