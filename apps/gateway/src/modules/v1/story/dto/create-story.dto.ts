import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsEnum,
    IsArray,
    ArrayMinSize,
    IsDate,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StoryStatus } from '../../../../common/enum/common.enum';

export class CreateStoryDto {
    @ApiProperty({
        description: 'Title of the story',
        minLength: 3,
        maxLength: 100,
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
        description: 'Story status',
        enum: StoryStatus,
        default: StoryStatus.DRAFT,
    })
    @IsOptional()
    @IsEnum(StoryStatus)
    status?: StoryStatus = StoryStatus.DRAFT;

    @ApiProperty({ description: 'Main image' })
    @IsNotEmpty()
    @IsString()
    mainImage: string;

    @ApiPropertyOptional({ description: 'Date when the story was published (dd-mm-yyyy hh:mm)' })
    @IsOptional()
    @IsDate()
    datePublished?: Date;

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

    @ApiProperty({ description: 'ID of the user who created the story' })
    @IsOptional()
    @IsString()
    createdBy: string;

    @ApiProperty({ description: 'ID of the user who updated the story' })
    @IsOptional()
    @IsString()
    updatedBy: string;

    @ApiProperty({ description: 'Branch IDs associated with this story' })
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    branches: string[];

    @ApiPropertyOptional({ description: 'Start date (dd-mm-yyyy hh:mm)' })
    @IsOptional()
    @IsDate()
    startDate?: Date;

    @ApiPropertyOptional({ description: 'End date (dd-mm-yyyy hh:mm)' })
    @IsOptional()
    @IsDate()
    endDate?: Date;

    @ApiPropertyOptional({ description: 'Admin comments about this story' })
    @IsOptional()
    @IsString()
    commentAdmin?: string;
}
