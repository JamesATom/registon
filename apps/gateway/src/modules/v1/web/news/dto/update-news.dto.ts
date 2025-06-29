// update-news.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateNewsDto {
    @ApiPropertyOptional({ 
        description: 'News title',
        example: 'Updated scholarship opportunities'
    })
    @IsString()
    @IsOptional()
    title?: string;
    
    @ApiPropertyOptional({ 
        description: 'News description',
        example: 'Updated summary of the news article content'
    })
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiPropertyOptional({ 
        description: 'News status',
        enum: ['DRAFT', 'PUBLISHED'],
        example: 'PUBLISHED'
    })
    @IsEnum(['DRAFT', 'PUBLISHED'])
    @IsOptional()
    status?: 'DRAFT' | 'PUBLISHED';
    
    @ApiPropertyOptional({ 
        description: 'Thumbnail image URL',
        example: 'https://example.com/images/updated-thumbnail.jpg'
    })
    @IsString()
    @IsOptional()
    thumbnail?: string;
    
    @ApiPropertyOptional({ 
        description: 'Main image URL',
        example: 'https://example.com/images/updated-main.jpg'
    })
    @IsString()
    @IsOptional()
    mainImage?: string;
    
    @ApiPropertyOptional({ 
        description: 'News Category ID',
        example: 'b2c3d4e5-f6g7-8901-bcde-2345678901ab'
    })
    @IsString()
    @IsOptional()
    categoryId?: string;
    
    @ApiPropertyOptional({ 
        description: 'Publication date',
        example: '2025-06-29T14:30:00Z'
    })
    @IsString()
    @IsOptional()
    publishedAt?: string;
    
    @ApiPropertyOptional({ 
        description: 'Target audience',
        enum: ['ALL', 'TEACHER', 'STUDENT'],
        example: 'STUDENT'
    })
    @IsEnum(['ALL', 'TEACHER', 'STUDENT'])
    @IsOptional()
    targetAudience?: 'ALL' | 'TEACHER' | 'STUDENT';
}
