// update-poll.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsMongoId, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PollQuestionDto } from './poll-question.dto';

export class UpdatePollDto {
    @ApiPropertyOptional({
        description: 'Poll title',
        maxLength: 100,
        example: 'Student Satisfaction Poll',
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    title?: string;

    @ApiPropertyOptional({
        description: 'Poll image URL',
        example: 'https://registon.bucket-name/2398ujfajfj92/image.jpg',
    })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiPropertyOptional({
        description: 'Poll questions',
        type: [PollQuestionDto],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PollQuestionDto)
    questions?: PollQuestionDto[];

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

    @ApiPropertyOptional({
        description: 'Admin comment about the poll',
        maxLength: 250,
        example: 'This poll is for the summer quarter evaluation.',
    })
    @IsString()
    @MaxLength(250)
    @IsOptional()
    commentAdmin?: string;
}
