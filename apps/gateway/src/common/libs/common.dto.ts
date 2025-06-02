// create-presigned-url.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePresignedUrlDto {
    @ApiProperty({
        description: 'The filename of the file to be uploaded',
        example: 'survey-image.jpg',
    })
    @IsString()
    filename: string;

    @ApiProperty({
        description: 'The content type of the file to be uploaded',
        example: 'image/jpeg',
    })
    @IsString()
    contentType: string;
}
