// update-news.dto.ts
import { IsEnum, IsOptional, IsString, IsISO8601 } from 'class-validator';

export class UpdateNewsDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(['DRAFT', 'PUBLISHED'])
    @IsOptional()
    status?: 'DRAFT' | 'PUBLISHED';

    @IsString()
    @IsOptional()
    thumbnail?: string;

    @IsString()
    @IsOptional()
    mainImage?: string;

    @IsString()
    @IsOptional()
    categoryId?: string;

    @IsISO8601()
    @IsOptional()
    publishedAt?: string;

    @IsEnum(['ALL', 'TEACHER', 'STUDENT'])
    @IsOptional()
    targetAudience?: 'ALL' | 'TEACHER' | 'STUDENT';
}
