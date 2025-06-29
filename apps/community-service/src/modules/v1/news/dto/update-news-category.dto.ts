// update-news-category.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateNewsCategoryDto {
    @IsString()
    @IsOptional()
    categoryTitle?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    image?: string;
}
