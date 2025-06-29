// create-faq-category.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFaqCategoryDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;
}
