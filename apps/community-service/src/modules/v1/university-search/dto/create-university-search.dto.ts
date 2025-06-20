import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum, IsBoolean, IsInt, IsEmail, IsUrl, IsArray } from 'class-validator';
import { UniType, StudyLanguage, StudyType } from 'src/common/prisma/client/v1';

export class CreateUniversitySearchDto {
    @ApiProperty({ description: 'Title of the university', example: 'Harvard University' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional({
        description: 'Description of the university',
        example: 'One of the prestigious universities in the US',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Registration date of the university', example: '2025-01-01T00:00:00Z' })
    @IsNotEmpty()
    registrationDate: Date;

    @ApiPropertyOptional({ description: 'Type of the university', enum: UniType, example: 'Local' })
    @IsOptional()
    @IsEnum(UniType)
    type?: UniType;

    @ApiPropertyOptional({ description: 'Status of the university', example: true })
    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @ApiProperty({ description: 'Contract information of the university', example: 'Contract-2025-123' })
    @IsNotEmpty()
    @IsString()
    contract: string;

    @ApiPropertyOptional({ description: 'Contact number of the university', example: 123456789 })
    @IsOptional()
    @IsInt()
    contacts?: number;

    @ApiPropertyOptional({ description: 'Website of the university', example: 'https://www.university.edu' })
    @IsOptional()
    @IsUrl()
    website?: string;

    @ApiPropertyOptional({ description: 'Email of the university', example: 'info@university.edu' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ description: 'Address of the university', example: '123 University Street, City' })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional({ description: 'City ID of the university', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsOptional()
    @IsString()
    cityId?: string;

    @ApiPropertyOptional({ description: 'Logo of the university', example: 'logo.png' })
    @IsOptional()
    @IsString()
    logo?: string;

    @ApiPropertyOptional({ description: 'License of the university', example: 'license.pdf' })
    @IsOptional()
    @IsString()
    license?: string;

    @ApiPropertyOptional({ description: 'Certificate requirement ID', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsOptional()
    @IsString()
    certificateRequirementId?: string;

    @ApiPropertyOptional({
        description: 'Study languages offered',
        enum: StudyLanguage,
        isArray: true,
        example: ['English', 'Uzbek'],
    })
    @IsOptional()
    @IsArray()
    @IsEnum(StudyLanguage, { each: true })
    studyLanguages?: StudyLanguage[];

    @ApiPropertyOptional({
        description: 'Study types offered',
        enum: StudyType,
        isArray: true,
        example: ['FullTime', 'Remote'],
    })
    @IsOptional()
    @IsArray()
    @IsEnum(StudyType, { each: true })
    studyTypes?: StudyType[];

    @ApiProperty({ description: 'Created by user ID', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsNotEmpty()
    @IsString()
    createdBy: string;
}
