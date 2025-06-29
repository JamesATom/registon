// update-university.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl, IsDate, IsBoolean, IsEnum, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { UniType } from '../enums/university-search.enum';

export class UpdateUniversityDto {
    @ApiProperty({ 
        description: 'Title of the university',
        example: 'Harvard University'
    })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ 
        description: 'Description of the university',
        example: 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636, it is the oldest institution of higher learning in the United States.'
    })
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiProperty({ 
        description: 'Registration date of the university',
        example: '2023-01-01T00:00:00.000Z'
    })
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    registrationDate?: Date;
    
    @ApiProperty({ 
        description: 'Type of university',
        enum: UniType,
        example: UniType.LOCAL
    })
    @IsEnum(UniType)
    @IsOptional()
    type?: UniType;
    
    @ApiProperty({ 
        description: 'Status of the university',
        example: true
    })
    @IsBoolean()
    @IsOptional()
    status?: boolean;
    
    @ApiProperty({ 
        description: 'Contract information of the university',
        example: 'Contract-2023-001'
    })
    @IsString()
    @IsOptional()
    contract?: string;

    @ApiProperty({ 
        description: 'Number of contacts',
        example: 5
    })
    @IsInt()
    @IsOptional()
    contacts?: number;

    @ApiProperty({ 
        description: 'Website URL of the university',
        example: 'https://www.harvard.edu'
    })
    @IsString()
    @IsUrl()
    @IsOptional()
    website?: string;

    @ApiProperty({ 
        description: 'Email of the university',
        example: 'admissions@harvard.edu'
    })
    @IsString()
    @IsOptional()
    email?: string;

    @ApiProperty({ 
        description: 'Address of the university',
        example: 'Massachusetts Hall, Cambridge, MA 02138, USA'
    })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiProperty({ 
        description: 'Logo URL of the university',
        example: 'https://storage.domain.com/university-logos/harvard-logo.png'
    })
    @IsString()
    @IsUrl()
    @IsOptional()
    logo?: string;
    
    @ApiProperty({ 
        description: 'License information of the university',
        example: 'LIC-2023-001'
    })
    @IsString()
    @IsOptional()
    license?: string;

    @ApiProperty({ 
        description: 'City ID where the university is located',
        example: '5f8d0d55b54764421b7156c9'
    })
    @IsString()
    @IsOptional()
    city?: string;

    @ApiProperty({ 
        description: 'Certificate requirement description',
        example: 'International applicants must submit TOEFL scores of at least 100 on the Internet'
    })
    @IsString()
    @IsOptional()
    certificateRequirements?: string;
}
