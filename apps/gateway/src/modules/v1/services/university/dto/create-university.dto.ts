import { IsNotEmpty, IsString, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { UniversityStatus, UniversityType } from '../../../../../common/enum/common.enum';
import { CreateUniversityProgramDto } from './create-university-program.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateUniversityDto {
    @ApiProperty({ description: 'University name', maxLength: 100 })
    @IsNotEmpty()
    @IsString()
    universityName: string;

    @ApiProperty({ description: 'University status', enum: UniversityStatus })
    @IsEnum(UniversityStatus)
    status: UniversityStatus;

    @ApiPropertyOptional({ description: 'About university', maxLength: 250 })
    @IsOptional()
    @IsString()
    aboutUniversity?: string;

    @ApiProperty({ description: 'University image', maxLength: 250 })
    @IsNotEmpty()
    @IsString()
    image: string;

    @ApiProperty({ description: 'University licence file', maxLength: 250 })
    @IsNotEmpty()
    @IsString()
    licenceFile: string;

    @ApiProperty({ description: 'University requirement certificate', maxLength: 250 })
    @IsString()
    requirementCerfiticate: string;

    @ApiProperty({ description: 'University location', maxLength: 250 })
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty({ description: 'University tuition fee', maxLength: 250 })
    @IsString()
    tuitionFee: string;

    @ApiProperty({ description: 'University date of admission', maxLength: 250 })
    @IsNotEmpty()
    @IsString()
    dateOfAdmission: string;

    @ApiProperty({ description: 'University type', enum: UniversityType })
    @IsEnum(UniversityType)
    universityType: UniversityType;

    @ApiProperty({ description: 'University programs', type: [CreateUniversityProgramDto] })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateUniversityProgramDto)
    programs: CreateUniversityProgramDto[];

    @ApiPropertyOptional({ description: 'University phone number', maxLength: 250 })
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @ApiProperty({ description: 'University email', maxLength: 250 })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({ description: 'University website', maxLength: 250 })
    @IsNotEmpty()
    @IsString()
    universityWebsite: string;

    @ApiPropertyOptional({ description: 'University admin comments', maxLength: 250 })
    @IsOptional()
    @IsString()
    commentAdmin?: string;
}
