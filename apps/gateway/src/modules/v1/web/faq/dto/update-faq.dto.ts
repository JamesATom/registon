// update-faq.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateFaqDto {
    @ApiPropertyOptional({
        description: 'FAQ question',
        example: 'How do I reset my password?',
        maxLength: 500,
    })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    question?: string;

    @ApiPropertyOptional({
        description: 'FAQ answer',
        example: 'You can reset your password by clicking on the "Forgot Password" link on the login page.',
        maxLength: 500,
    })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    answer?: string;

    @ApiPropertyOptional({
        description: 'Category ID',
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsOptional()
    @IsUUID()
    categoryId?: string;
}
