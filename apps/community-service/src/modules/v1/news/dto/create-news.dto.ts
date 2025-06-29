// create-news.dto.ts
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsISO8601 } from 'class-validator';

export class CreateNewsDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(['DRAFT', 'PUBLISHED'])
    @IsNotEmpty()
    status: 'DRAFT' | 'PUBLISHED';

    @IsString()
    @IsNotEmpty()
    thumbnail: string;

    @IsString()
    @IsNotEmpty()
    mainImage: string;

    @IsString()
    @IsOptional()
    categoryId?: string;

    @IsISO8601()
    @IsOptional()
    publishedAt?: string;

    @IsEnum(['ALL', 'TEACHER', 'STUDENT'])
    @IsNotEmpty()
    targetAudience: 'ALL' | 'TEACHER' | 'STUDENT';
}
