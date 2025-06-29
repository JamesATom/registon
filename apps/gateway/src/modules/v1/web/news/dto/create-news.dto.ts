// create-news.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
    @ApiProperty({ 
        description: 'News title',
        example: 'New scholarship opportunities available'
    })
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @ApiPropertyOptional({ 
        description: 'News description',
        example: 'A brief summary of the news article content'
    })
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiProperty({ 
        description: 'News status',
        enum: ['DRAFT', 'PUBLISHED'],
        default: 'DRAFT',
        example: 'DRAFT'
    })
    @IsEnum(['DRAFT', 'PUBLISHED'])
    @IsOptional()
    status?: 'DRAFT' | 'PUBLISHED';
    
    @ApiProperty({ 
        description: 'Thumbnail image URL',
        example: 'https://example.com/images/news-thumbnail.jpg'
    })
    @IsString()
    @IsNotEmpty()
    thumbnail: string;
    
    @ApiProperty({ 
        description: 'Main image URL',
        example: 'https://example.com/images/news-main.jpg'
    })
    @IsString()
    @IsNotEmpty()
    mainImage: string;
    
    @ApiPropertyOptional({ 
        description: 'News Category ID',
        example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab'
    })
    @IsString()
    @IsOptional()
    categoryId?: string;
    
    @ApiPropertyOptional({ 
        description: 'Publication date',
        example: '2025-06-28T10:00:00Z'
    })
    @IsString()
    @IsOptional()
    publishedAt?: string;
    
    @ApiPropertyOptional({ 
        description: 'Target audience',
        enum: ['ALL', 'TEACHER', 'STUDENT'],
        default: 'ALL',
        example: 'ALL'
    })
    @IsEnum(['ALL', 'TEACHER', 'STUDENT'])
    @IsOptional()
    targetAudience?: 'ALL' | 'TEACHER' | 'STUDENT';
}
