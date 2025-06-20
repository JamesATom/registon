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

    @ApiPropertyOptional({
        description: 'ID of the user who created this FAQ category',
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsString()
    createdBy: string;

    @ApiPropertyOptional({
        description: 'ID of the user who last updated this FAQ category',
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsOptional()
    @IsString()
    updatedBy?: string;
}
