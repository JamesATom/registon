// update-faq-category.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateFaqCategoryDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
