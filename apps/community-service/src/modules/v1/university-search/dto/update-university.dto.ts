// update-university.dto.ts
import { IsBoolean, IsDate, IsEmail, IsEnum, IsOptional, IsString, IsUUID, Length, IsNumber } from 'class-validator';
import { UniType } from '../enums/university-search.enum';

export class UpdateUniversityDto {
    @IsOptional()
    @IsString()
    @Length(1, 100)
    title?: string;

    @IsOptional()
    @IsString()
    @Length(1, 500)
    description?: string;

    @IsOptional()
    @IsDate()
    registrationDate?: Date;

    @IsOptional()
    @IsEnum(UniType)
    type?: UniType;

    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    contract?: string;

    @IsOptional()
    @IsNumber()
    contacts?: number;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    website?: string;

    @IsOptional()
    @IsEmail()
    @Length(1, 50)
    email?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    address?: string;

    @IsOptional()
    @IsString()
    logo?: string;

    @IsOptional()
    @IsString()
    license?: string;

    @IsOptional()
    @IsUUID()
    city?: string;

    @IsOptional()
    @IsUUID()
    certificateRequirementId?: string;
}
