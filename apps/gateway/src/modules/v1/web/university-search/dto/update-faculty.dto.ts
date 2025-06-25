// update-faculty.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateFacultyDto {
    @ApiProperty({ description: 'Name of the faculty' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'Description of the faculty' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'University ID that the faculty belongs to' })
    @IsString()
    @IsOptional()
    universityId?: string;
}
