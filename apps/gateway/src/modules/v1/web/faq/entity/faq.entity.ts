// faq.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class FaqEntity {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ example: 'How do I reset my password?' })
    question: string;

    @ApiProperty({ example: 'You can reset your password by clicking the "Forgot Password" link on the login page.' })
    answer: string;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001', required: false })
    categoryId?: string;
    
    @ApiProperty({ example: '2023-01-01T00:00:00Z' })
    createdAt: Date;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
    createdBy: string;
    
    @ApiProperty({ example: '2023-01-02T00:00:00Z' })
    updatedAt: Date;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', required: false })
    updatedBy?: string;
}

export class FaqWithCategoryEntity extends FaqEntity {
    @ApiProperty({ example: 'General Questions', required: false })
    categoryTitle?: string;
    
    @ApiProperty({ example: 'Frequently asked general questions about our service', required: false })
    categoryDescription?: string;
}
