// update-certificate-requirement.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCertificateRequirementDto {
    @ApiProperty({ description: 'Title of the certificate requirement' })
    @IsString()
    @IsOptional()
    certificateRequirementsTitle?: string;

    @ApiProperty({ description: 'Description of the certificate requirement' })
    @IsString()
    @IsOptional()
    description?: string;
}
