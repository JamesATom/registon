import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUniversityApplyDto {
    @ApiProperty({ description: 'University ID', required: true })
    @IsNotEmpty()
    @IsString()
    universityId: string;

    @ApiProperty({ description: 'Program ID', required: true })
    @IsNotEmpty()
    @IsString()
    programId: string;

    @ApiProperty({ description: 'Full name', required: true, maxLength: 50 })
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({ description: 'Phone number', required: true, minLength: 9, maxLength: 13 })
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;
}
