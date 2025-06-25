// create-certificate-requirement.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCertificateRequirementDto {
    @ApiProperty({ description: 'Title of the certificate requirement' })
    @IsString()
    @IsNotEmpty()
    certificateRequirementsTitle: string;

    @ApiProperty({ description: 'Description of the certificate requirement' })
    @IsString()
    @IsNotEmpty()
    description: string;
}
