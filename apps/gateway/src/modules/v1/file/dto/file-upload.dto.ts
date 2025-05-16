import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class FileUploadDto {
    // The file is handled separately by Fastify multipart
    @ApiProperty({ type: 'string', format: 'binary', description: 'File to upload' })
    file?: any; // Only used for Swagger documentation

    @ApiProperty({ description: 'Optional folder path for organization', required: false })
    @IsOptional()
    @IsString()
    folder?: string;

    @ApiProperty({ description: 'Optional custom filename', required: false })
    @IsOptional()
    @IsString()
    filename?: string;
}
