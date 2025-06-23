// create-company.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
    @ApiPropertyOptional({
        description: 'Company logo URL',
        example: 'https://example.com/logo.png',
    })
    @IsOptional()
    @IsString()
    companyLogo?: string;

    @ApiProperty({
        description: 'Company title',
        example: 'Tech Company',
    })
    @IsNotEmpty()
    @IsString()
    companyTitle: string;

    @ApiPropertyOptional({
        description: 'Company description',
        example: 'A leading tech company specializing in software development.',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: 'ID of the user who created this company',
        example: 'user-123',
    })
    @IsNotEmpty()
    @IsString()
    createdBy: string;

    @ApiPropertyOptional({
        description: 'ID of the user who last updated this company',
        example: 'user-123',
    })
    @IsOptional()
    @IsString()
    updatedBy?: string;
}
