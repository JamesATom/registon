import { IsString, IsEnum, IsOptional } from 'class-validator';
import { UniversityStatus, UniversityType } from '../../../../../common/enum/common.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUniversityDto {
    @ApiProperty({ description: 'University name', maxLength: 100 })
    @IsOptional()
    @IsString()
    universityName: string;

    @ApiProperty({ description: 'University status', enum: UniversityStatus })
    @IsOptional()
    @IsEnum(UniversityStatus)
    status: UniversityStatus;

    @ApiPropertyOptional({ description: 'About university', maxLength: 250 })
    @IsOptional()
    @IsString()
    aboutUniversity?: string;

    @ApiProperty({ description: 'University image', maxLength: 250 })
    @IsOptional()
    @IsString()
    image: string;

    @ApiProperty({ description: 'University licence file', maxLength: 250 })
    @IsOptional()
    @IsString()
    licenceFile: string;

    @ApiProperty({ description: 'University requirement certificate', maxLength: 250 })
    @IsOptional()
    @IsString()
    requirementCerfiticate: string;

    @ApiProperty({ description: 'University location', maxLength: 250 })
    @IsOptional()
    @IsString()
    location: string;

    @ApiProperty({ description: 'University tuition fee', maxLength: 250 })
    @IsOptional()
    @IsString()
    tuitionFee: string;

    @ApiProperty({ description: 'University date of admission', maxLength: 250 })
    @IsOptional()
    @IsString()
    dateOfAdmission: string;

    @ApiProperty({ description: 'University type', enum: UniversityType })
    @IsOptional()
    @IsEnum(UniversityType)
    universityType: UniversityType;

    @ApiPropertyOptional({ description: 'University phone number', maxLength: 250 })
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @ApiProperty({ description: 'University email', maxLength: 250 })
    @IsOptional()
    @IsString()
    email: string;

    @ApiProperty({ description: 'University website', maxLength: 250 })
    @IsOptional()
    @IsString()
    universityWebsite: string;

    @ApiPropertyOptional({ description: 'University admin comments', maxLength: 250 })
    @IsOptional()
    @IsString()
    commentAdmin?: string;
}
