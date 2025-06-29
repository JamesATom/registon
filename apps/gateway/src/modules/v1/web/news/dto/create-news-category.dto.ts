// create-news-category.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNewsCategoryDto {
    @ApiProperty({ 
        description: 'Category title',
        example: 'Academic News'
    })
    @IsString()
    @IsNotEmpty()
    categoryTitle: string;
    
    @ApiPropertyOptional({ 
        description: 'Category description',
        example: 'News related to academic activities and achievements'
    })
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiPropertyOptional({ 
        description: 'Category image URL',
        example: 'https://example.com/images/academic-news-category.jpg'
    })
    @IsString()
    @IsOptional()
    image?: string;
}
