// news.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class NewsEntity {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ example: 'New Campus Opening' })
    title: string;

    @ApiProperty({ example: 'Our new campus is opening next month', required: false })
    description?: string;
    
    @ApiProperty({ example: 'PUBLISHED', enum: ['DRAFT', 'PUBLISHED'] })
    status: 'DRAFT' | 'PUBLISHED';
    
    @ApiProperty({ example: 'https://example.com/thumbnail.jpg' })
    thumbnail: string;
    
    @ApiProperty({ example: 'https://example.com/main-image.jpg' })
    mainImage: string;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001', required: false })
    categoryId?: string;
    
    @ApiProperty({ example: '2023-01-01T00:00:00Z', required: false })
    publishedAt?: Date;
    
    @ApiProperty({ example: 'ALL', enum: ['ALL', 'TEACHER', 'STUDENT'] })
    targetAudience: 'ALL' | 'TEACHER' | 'STUDENT';
    
    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    createdAt: Date;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
    createdBy: string;
    
    @ApiProperty({ example: '2023-01-02T00:00:00Z' })
    updatedAt: Date;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', required: false })
    updatedBy?: string;
}

export class NewsWithCategoryEntity extends NewsEntity {
    @ApiProperty({ example: 'Education News', required: false })
    categoryTitle?: string;
    
    @ApiProperty({ example: 'News about education and learning', required: false })
    categoryDescription?: string;
}
