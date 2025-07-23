// create-poll.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePollQuestionDto {
    @ApiProperty({
        description: 'Question text',
        maxLength: 100,
        example: 'How satisfied are you with our services?',
    })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    question: string;

    @ApiPropertyOptional({
        description: 'Additional description for the question',
        maxLength: 250,
        example: 'Please rate your overall satisfaction with our services provided during the last month.',
    })
    @IsString()
    @MaxLength(250)
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'First answer option',
        maxLength: 50,
        example: 'Very satisfied',
    })
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    answer1: string;

    @ApiProperty({
        description: 'Second answer option',
        maxLength: 50,
        example: 'Satisfied',
    })
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    answer2: string;

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

export class CreatePollDto {
    @ApiPropertyOptional({
        description: 'Created by user ID',
        example: '60f7c0c2b4d1c72d88f8e8a2',
    })
    @IsMongoId()
    @IsOptional()
    createdBy?: string;

    @ApiProperty({
        description: 'Branch ID where poll will be conducted',
        example: '60f7c0c2b4d1c72d88f8e8a3',
    })
    @IsMongoId()
    @IsNotEmpty()
    branch: string;

    @ApiProperty({
        description: 'Title of the poll',
        maxLength: 100,
        example: 'Customer Satisfaction Poll 2025',
    })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({
        description: 'Description of the poll',
        maxLength: 250,
        example: 'This poll aims to gather feedback about our services and identify areas for improvement.',
    })
    @IsString()
    @MaxLength(250)
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'Image URL for the poll',
        example: 'https://example.com/images/poll.jpg',
    })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiPropertyOptional({
        description: 'Admin comment about the poll',
        maxLength: 250,
        example: 'This poll is for the summer quarter evaluation.',
    })
    @IsString()
    @MaxLength(250)
    @IsOptional()
    commentAdmin?: string;

    @ApiProperty({
        description: 'Target audience for the poll',
        enum: ['ALL', 'TEACHER', 'STUDENT'],
        example: 'ALL',
    })
    @IsEnum(['ALL', 'TEACHER', 'STUDENT'])
    @IsNotEmpty()
    targetAudience: 'ALL' | 'TEACHER' | 'STUDENT';

    @ApiProperty({
        description: 'Poll questions',
        type: [CreatePollQuestionDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePollQuestionDto)
    @IsNotEmpty()
    questions: CreatePollQuestionDto[];
}
