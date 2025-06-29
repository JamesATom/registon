// create-faq-category.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFaqCategoryDto {
    @ApiProperty({ 
        description: 'Category title',
        example: 'IELTS Registration'
    })
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @ApiPropertyOptional({ 
        description: 'Category description',
        example: 'Frequently asked questions about IELTS registration process.'
    })
    @IsString()
    @IsOptional()
    description?: string;
}
