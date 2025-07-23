// submit-poll.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PollQuestionResponseDto {
    @ApiProperty({
        description: 'ID of the poll question',
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

export class SubmitPollDto {
    @ApiProperty({
        description: 'ID of the poll',
        example: '60f7c0c2b4d1c72d88f8e8a4',
    })
    @IsMongoId()
    @IsNotEmpty()
    pollId: string;

    @ApiProperty({
        description: 'ID of the user submitting the poll',
        example: '60f7c0c2b4d1c72d88f8e8a3',
    })
    @IsMongoId()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        description: 'Responses to poll questions',
        type: [PollQuestionResponseDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PollQuestionResponseDto)
    @IsNotEmpty()
    responses: PollQuestionResponseDto[];
}
