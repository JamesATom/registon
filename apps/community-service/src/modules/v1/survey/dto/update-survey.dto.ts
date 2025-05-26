// update-survey.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { 
    IsArray, 
    IsEnum, 
    IsMongoId, 
    IsNotEmpty, 
    IsOptional, 
    IsString, 
    MaxLength, 
    ValidateNested 
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSurveyQuestionDto {
    @ApiProperty({ 
        description: 'Question text', 
        maxLength: 100, 
        example: 'How would you rate our teaching?' 
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    question: string;

    @ApiPropertyOptional({ 
        description: 'Question description', 
        maxLength: 250, 
        example: 'Please rate the quality of instruction' 
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    description?: string;

    @ApiProperty({ 
        description: 'First answer option', 
        maxLength: 50, 
        example: 'Excellent' 
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    answer1: string;

    @ApiProperty({ 
        description: 'Second answer option', 
        maxLength: 50, 
        example: 'Good' 
    })
    @IsNotEmpty()
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
        example: 'Poor' 
    })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    answer4?: string;

    @ApiPropertyOptional({ 
        description: 'Fifth answer option', 
        maxLength: 50, 
        example: 'Very Poor' 
    })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    answer5?: string;
}

export class UpdateSurveyDto {
    @ApiPropertyOptional({ 
        description: 'Survey title', 
        maxLength: 100, 
        example: 'Student Satisfaction Survey' 
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    title?: string;

    @ApiPropertyOptional({ 
        description: 'Survey image URL', 
        example: 'https://registon.bucket-name/2398ujfajfj92/image.jpg' 
    })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiPropertyOptional({ 
        description: 'Survey questions', 
        type: [UpdateSurveyQuestionDto] 
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateSurveyQuestionDto)
    questions?: UpdateSurveyQuestionDto[];

    @ApiPropertyOptional({ 
        description: 'Branch ID', 
        example: '60f7c0c2b4d1c72d88f8e8a3' 
    })
    @IsOptional()
    @IsMongoId()
    branch?: string;

    @ApiPropertyOptional({ 
        description: 'Target audience', 
        enum: ['ALL', 'TEACHER', 'STUDENT'], 
        example: 'STUDENT' 
    })
    @IsOptional()
    @IsEnum(['ALL', 'TEACHER', 'STUDENT'])
    targetAudience?: 'ALL' | 'TEACHER' | 'STUDENT';
}