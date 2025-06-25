// update-university.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateUniversityDto {
    @ApiProperty({ description: 'Name of the university' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'Description of the university' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Website URL of the university' })
    @IsString()
    @IsUrl()
    @IsOptional()
    website?: string;

    @ApiProperty({ description: 'Logo URL of the university' })
    @IsString()
    @IsUrl()
    @IsOptional()
    logo?: string;

    @ApiProperty({ description: 'Address of the university' })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiProperty({ description: 'City ID where the university is located' })
    @IsString()
    @IsOptional()
    city?: string;

    @ApiProperty({ description: 'Contact information of the university' })
    @IsString()
    @IsOptional()
    contact?: string;

    @ApiProperty({ description: 'Email of the university' })
    @IsString()
    @IsOptional()
    email?: string;

    @ApiProperty({ description: 'Certificate requirement ID' })
    @IsString()
    @IsOptional()
    certificateRequirementId?: string;
}
