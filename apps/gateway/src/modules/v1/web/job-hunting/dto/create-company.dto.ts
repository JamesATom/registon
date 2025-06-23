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
}
