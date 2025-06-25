// update-certificate-requirement.dto.ts
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCertificateRequirementDto {
    @IsOptional()
    @IsString()
    @Length(1, 50)
    certificateRequirementsTitle?: string;

    @IsOptional()
    @IsString()
    @Length(1, 250)
    description?: string;
}
