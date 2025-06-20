// create-faq-category.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFaqCategoryDto {
    @ApiProperty({
        description: 'Category title',
        example: 'Account Management',
        maxLength: 50,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    title: string;

    @ApiPropertyOptional({
        description: 'Category description',
        example: 'Questions related to user account management',
        maxLength: 250,
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    description?: string;
}
