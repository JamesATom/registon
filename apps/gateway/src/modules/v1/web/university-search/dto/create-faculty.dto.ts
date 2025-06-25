// create-faculty.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFacultyDto {
    @ApiProperty({ description: 'Name of the faculty' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Description of the faculty' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'University ID that the faculty belongs to' })
    @IsString()
    @IsNotEmpty()
    universityId: string;
}
