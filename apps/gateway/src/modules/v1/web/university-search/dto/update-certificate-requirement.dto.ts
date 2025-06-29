// update-certificate-requirement.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCertificateRequirementDto {
    @ApiProperty({ 
        description: 'Title of the certificate requirement',
        example: 'TOEFL Requirements'
    })
    @IsString()
    @IsOptional()
    certificateRequirementsTitle?: string;

    @ApiProperty({ 
        description: 'Description of the certificate requirement',
        example: 'International applicants must submit TOEFL scores of at least 100 on the Internet-based test (IBT), with subscores of 25 or higher in each of the four test sections.'
    })
    @IsString()
    @IsOptional()
    description?: string;
}
