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
import { PollQuestionDto } from './poll-question.dto';

export class CreatePollDto {
    @ApiPropertyOptional({
        description: 'Admin comments about this poll',
        maxLength: 250,
        example: 'End of term student satisfaction poll',
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    commentAdmin?: string;

    @ApiProperty({
        description: 'Poll title',
        maxLength: 100,
        example: 'Student Satisfaction Poll',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    title: string;

    @ApiPropertyOptional({
        description: 'Poll description',
        maxLength: 250,
        example: 'Help us improve our services by answering these questions',
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    description?: string;

    @ApiProperty({
        description: 'Poll image URL or path',
        example: 'https://registon.bucket-name/2398ujfajfj92/image.jpg',
    })
    @IsNotEmpty()
    @IsString()
    image: string;

    @ApiProperty({
        description: 'Poll questions',
        type: [PollQuestionDto],
        example: [
            {
                question: 'How would you rate our teaching?',
                description: 'Please rate the quality of instruction',
                answer1: 'Excellent',
                answer2: 'Good',
                answer3: 'Average',
                answer4: 'Poor',
                answer5: 'Very Poor',
            },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PollQuestionDto)
    @IsNotEmpty()
    questions: PollQuestionDto[];

    @ApiProperty({
        description: 'Branch ID',
        example: '60f7c0c2b4d1c72d88f8e8a3',
    })
    @IsMongoId()
    @IsNotEmpty()
    branch: string;

    @ApiProperty({
        description: 'Target audience for this poll',
        enum: ['ALL', 'TEACHER', 'STUDENT'],
        example: 'STUDENT',
    })
    @IsEnum(['ALL', 'TEACHER', 'STUDENT'])
    @IsNotEmpty()
    targetAudience: 'ALL' | 'TEACHER' | 'STUDENT';
}
