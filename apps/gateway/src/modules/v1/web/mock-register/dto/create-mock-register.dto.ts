// create-mock-register.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    IsBoolean,
    IsDateString
} from 'class-validator';

export class CreateMockRegisterDto {
    @ApiPropertyOptional({
        description: 'Admin comments about this mock registration',
        maxLength: 250,
        example: 'This is a special mock test for advanced students',
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    commentAdmin?: string;

    @ApiPropertyOptional({
        description: 'Title of the mock registration',
        maxLength: 50,
        example: 'IELTS Mock Test - June 2025',
    })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    title?: string;

    @ApiProperty({
        description: 'Date of the mock exam in ISO format',
        example: '2025-06-20T09:00:00Z',
    })
    @IsNotEmpty()
    @IsDateString()
    date: string;

    @ApiProperty({
        description: 'Branch ID where the mock exam will take place',
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsNotEmpty()
    branch: string;

    @ApiPropertyOptional({
        description: 'Indicates if the mock registration is active',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
