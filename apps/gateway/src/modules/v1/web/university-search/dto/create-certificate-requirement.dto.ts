// create-certificate-requirement.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCertificateRequirementDto {
    @ApiProperty({ 
        description: 'Title of the certificate requirement',
        example: 'TOEFL Requirements'
    })
    @IsString()
    @IsNotEmpty()
    certificateRequirementsTitle: string;

    @ApiProperty({ 
        description: 'Description of the certificate requirement',
        example: 'International applicants must submit TOEFL scores of at least 100 on the Internet-based test (IBT), with subscores of 25 or higher in each of the four test sections.'
    })
    @IsString()
    @IsNotEmpty()
    description: string;
}
