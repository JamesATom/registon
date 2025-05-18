// create-survey.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsEnum, IsMongoId } from 'class-validator';

export class CreateSurveyPresignedUploadDto {
    @ApiProperty({
        description: 'The filename of the file to be uploaded',
        example: 'survey-image.jpg',
    })
    @IsString()
    filename: string;

    @ApiProperty({
        description: 'The content type of the file to be uploaded',
        example: 'image/jpeg',
    })
    @IsString()
    contentType: string;
}

export class CreateSurveyDto {
    @ApiPropertyOptional({ description: 'Optional Admin comment', maxLength: 250, example: 'Reviewed by admin.' })
    @IsOptional()
    @IsString()
    commentAdmin?: string;

    @ApiProperty({ description: 'Survey question', maxLength: 250, example: 'What is your favorite color?' })
    @IsString()
    @IsNotEmpty()
    question: string;

    @ApiPropertyOptional({ description: 'Optional Survey description', maxLength: 250, example: 'Choose the color you like most.' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ description: 'Image URL or key', example: 'survey/uuid-survey-image.jpg' })
    @IsOptional()
    @IsString()
    image: string;

    @ApiProperty({ description: 'First answer option', maxLength: 50, example: 'Red' })
    @IsString()
    answer1: string;

    @ApiProperty({ description: 'Optional Second answer option', maxLength: 50, example: 'Blue' })
    @IsString()
    answer2: string;

    @ApiPropertyOptional({ description: 'Optional Third answer option', maxLength: 50, example: 'Green' })
    @IsOptional()
    @IsString()
    answer3?: string;

    @ApiPropertyOptional({ description: 'Optional Fourth answer option', maxLength: 50, example: 'Yellow' })
    @IsOptional()
    @IsString()
    answer4?: string;

    @ApiPropertyOptional({ description: 'Optional Fifth answer option', maxLength: 50, example: 'Black' })
    @IsOptional()
    @IsString()
    answer5?: string;

    @ApiProperty({ description: 'Branch ID', example: '60f7c0c2b4d1c72d88f8e8a3' })
    @IsMongoId()
    branch: string;

    @ApiProperty({ description: 'Target audience', enum: ['ALL', 'TEACHER', 'STUDENT'], example: 'ALL' })
    @IsEnum(['ALL', 'TEACHER', 'STUDENT'])
    targetAudience: 'ALL' | 'TEACHER' | 'STUDENT';
}