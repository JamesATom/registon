import { ApiProperty } from '@nestjs/swagger';

export class PresignedUrlResponseDto {
  @ApiProperty({
    description: 'Presigned URL for uploading the file',
    example: 'https://registon-edu.fra1.digitaloceanspaces.com/path/to/file?AWSAccessKeyId=...'
  })
  presignedUrl: string;

  @ApiProperty({
    description: 'Final URL where the file will be accessible after upload',
    example: 'https://registon-edu.fra1.digitaloceanspaces.com/path/to/file'
  })
  fileUrl: string;
  
  @ApiProperty({
    description: 'Unique file key in S3',
    example: 'stories/abc123-image.jpg'
  })
  key: string;
}
