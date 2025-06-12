import { IsNotEmpty, IsString, IsOptional, IsEnum, IsArray, ArrayMinSize, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StoryStatus } from '../../../../../common/enum/common.enum';

export class CreateStoryDto {
    @ApiProperty({
        description: 'Title of the story',
        minLength: 3,
        maxLength: 100,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional({
        description: 'Description of the story',
        minLength: 3,
        maxLength: 250,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: 'Main image URL or path',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    mainImage: string;

    @ApiPropertyOptional({ description: 'External link', maxLength: 250 })
    @IsOptional()
    @IsString()
    link?: string;

    @ApiPropertyOptional({
        description: 'Button text',
        minLength: 3,
        maxLength: 50,
    })
    @IsOptional()
    @IsString()
    buttonText?: string;

    @ApiProperty({ description: 'Branch IDs associated with this story' })
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    branches: string[];
}
