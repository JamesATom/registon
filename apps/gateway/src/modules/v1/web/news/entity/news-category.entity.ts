// news-category.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { NewsEntity } from './news.entity';

export class NewsCategoryEntity {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ example: 'Education News' })
    categoryTitle: string;

    @ApiProperty({ example: 'News about education and learning', required: false })
    description?: string;
    
    @ApiProperty({ example: 'https://example.com/category-image.jpg', required: false })
    image?: string;
    
    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    createdAt: Date;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
    createdBy: string;
    
    @ApiProperty({ example: '2023-01-02T00:00:00Z' })
    updatedAt: Date;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', required: false })
    updatedBy?: string;
}

export class NewsCategoryWithNewsEntity extends NewsCategoryEntity {
    @ApiProperty({ type: [NewsEntity] })
    news: NewsEntity[];
}
