// update-company.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDto {
    @ApiPropertyOptional({
        description: 'Company logo URL',
        example: 'https://example.com/logo.png',
    })
    @IsOptional()
    @IsString()
    companyLogo?: string;

    @ApiPropertyOptional({
        description: 'Company title',
        example: 'Tech Company',
    })
    @IsOptional()
    @IsString()
    companyTitle?: string;

    @ApiPropertyOptional({
        description: 'Company description',
        example: 'A leading tech company specializing in software development.',
    })
    @IsOptional()
    @IsString()
    description?: string;
}
