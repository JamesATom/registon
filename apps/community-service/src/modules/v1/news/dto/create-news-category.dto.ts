// create-news-category.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNewsCategoryDto {
    @IsString()
    @IsNotEmpty()
    categoryTitle: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    image?: string;
}
