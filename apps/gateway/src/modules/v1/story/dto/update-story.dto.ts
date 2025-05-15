import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsArray, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { StoryStatus } from '../../../../common/enum/common.enum';

export class UpdateStoryDto {
    @ApiPropertyOptional({
        description: 'Title of the story',
        minLength: 3,
        maxLength: 100,
    })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({
        description: 'Description of the story',
        minLength: 3,
        maxLength: 250,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        description: 'Story status',
        enum: StoryStatus,
    })
    @IsOptional()
    @IsEnum(StoryStatus)
    status?: StoryStatus;

    @ApiPropertyOptional({ description: 'Main image URL' })
    @IsOptional()
    @IsString()
    mainImage?: string;

    @ApiPropertyOptional({ description: 'Date published (dd-mm-yyyy hh:mm)' })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    datePublished?: Date;

    @ApiPropertyOptional({ description: 'Link associated with the story' })
    @IsOptional()
    @IsString()
    link?: string;

    @ApiPropertyOptional({ description: 'Button text for the story link' })
    @IsOptional()
    @IsString()
    buttonText?: string;

    @ApiPropertyOptional({ description: 'Branch IDs associated with this story' })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    branches?: string[];

    @ApiPropertyOptional({ description: 'Start date (dd-mm-yyyy hh:mm)' })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    startDate?: Date;

    @ApiPropertyOptional({ description: 'End date (dd-mm-yyyy hh:mm)' })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    endDate?: Date;

    @ApiPropertyOptional({ description: 'Admin comments about this story' })
    @IsOptional()
    @IsString()
    commentAdmin?: string;
}
