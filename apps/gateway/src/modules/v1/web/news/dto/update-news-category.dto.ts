// update-news-category.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateNewsCategoryDto {
    @ApiPropertyOptional({ 
        description: 'Category title',
        example: 'Updated Academic News'
    })
    @IsString()
    @IsOptional()
    categoryTitle?: string;
    
    @ApiPropertyOptional({ 
        description: 'Category description',
        example: 'Updated description for academic news'
    })
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiPropertyOptional({ 
        description: 'Category image URL',
        example: 'https://example.com/images/updated-category.jpg'
    })
    @IsString()
    @IsOptional()
    image?: string;
}
