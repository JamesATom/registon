// update-event.dto.ts
import {
    IsOptional,
    IsEnum,
    IsMongoId,
    IsString,
    MaxLength,
    IsDateString,
    IsArray,
    IsNumber
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEventDto {
    @IsOptional()
    @IsMongoId()
    updatedBy?: string;

    @IsOptional()
    @IsString()
    @MaxLength(250)
    commentAdmin?: string;

    @IsOptional()
    @IsEnum(['DRAFT', 'PUBLISHED'])
    status?: 'DRAFT' | 'PUBLISHED';

    @IsOptional()
    @IsMongoId()
    branch?: string;

    @IsOptional()
    @IsString()
    @MaxLength(250)
    eventTitle?: string;

    @IsOptional()
    @IsDateString()
    date?: string;

    @IsOptional()
    @IsString()
    startTime?: string;

    @IsOptional()
    @IsString()
    endTime?: string;

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    course?: string[];

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    age?: number;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    @MaxLength(250)
    description?: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    price?: number;

    @IsOptional()
    @IsEnum(['ALL', 'TEACHER', 'STUDENT'])
    targetAudience?: 'ALL' | 'TEACHER' | 'STUDENT';
}
