// update-faq-category.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateFaqCategoryDto {
    @ApiPropertyOptional({
        description: 'Category title',
        example: 'Account Management',
        maxLength: 50,
    })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    title?: string;

    @ApiPropertyOptional({
        description: 'Category description',
        example: 'Questions related to user account management',
        maxLength: 250,
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    description?: string;

    @IsOptional()
    @IsString()
    updatedBy?: string;
}
