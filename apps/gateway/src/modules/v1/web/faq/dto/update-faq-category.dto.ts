// update-faq-category.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFaqCategoryDto {
    @ApiPropertyOptional({ 
        description: 'Category title',
        example: 'IELTS Registration'
    })
    @IsString()
    @IsOptional()
    title?: string;
    
    @ApiPropertyOptional({ 
        description: 'Category description',
        example: 'Frequently asked questions about IELTS registration process.'
    })
    @IsString()
    @IsOptional()
    description?: string;
}
