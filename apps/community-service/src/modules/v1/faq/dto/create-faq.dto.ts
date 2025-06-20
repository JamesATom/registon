// create-faq.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateFaqDto {
    @ApiProperty({
        description: 'FAQ question',
        example: 'How do I reset my password?',
        maxLength: 500,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    question: string;

    @ApiProperty({
        description: 'FAQ answer',
        example: 'You can reset your password by clicking on the "Forgot Password" link on the login page.',
        maxLength: 500,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    answer: string;

    @ApiProperty({
        description: 'Category ID',
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsNotEmpty()
    @IsUUID()
    categoryId: string;

    @ApiPropertyOptional({
        description: 'ID of the user who created this FAQ',
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsOptional()
    @IsString()
    createdBy?: string;

    @ApiPropertyOptional({
        description: 'ID of the user who last updated this FAQ',
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsOptional()
    @IsString()
    updatedBy?: string;
}
