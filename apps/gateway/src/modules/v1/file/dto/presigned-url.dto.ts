import { IsNotEmpty, IsString, IsEnum, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum FolderType {
    STORIES = 'stories',
    IELTS = 'ielts',
    SURVEYS = 'surveys',
    PROFILE = 'profile',
    OTHER = 'other',
}

export class PresignedUrlDto {
    @ApiProperty({
        description: 'Original filename with extension',
        example: 'my-image.jpg',
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^[\w\-. ]+$/, { message: 'Filename contains invalid characters' })
    filename: string;

    @ApiProperty({
        description: 'MIME type of the file',
        example: 'image/jpeg',
    })
    @IsNotEmpty()
    @IsString()
    contentType: string;

    @ApiProperty({
        enum: FolderType,
        description: 'Target folder in the S3 bucket',
        example: 'stories',
    })
    @IsEnum(FolderType)
    folder: FolderType;
}
