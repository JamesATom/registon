// faq-category.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { FaqEntity } from './faq.entity';

export class FaqCategoryEntity {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ example: 'General Questions' })
    title: string;

    @ApiProperty({ example: 'Frequently asked general questions about our service', required: false })
    description?: string;
    
    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    createdAt: Date;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
    createdBy: string;
    
    @ApiProperty({ example: '2023-01-02T00:00:00Z' })
    updatedAt: Date;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', required: false })
    updatedBy?: string;
}

export class FaqCategoryWithFaqsEntity extends FaqCategoryEntity {
    @ApiProperty({ type: [FaqEntity] })
    faqs: FaqEntity[];
}
