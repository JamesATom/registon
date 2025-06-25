// create-certificate-requirement.dto.ts
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCertificateRequirementDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    certificateRequirementsTitle: string;

    @IsOptional()
    @IsString()
    @Length(1, 250)
    description?: string;
}
