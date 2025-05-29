// create-presigned-url.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreatePresignedUrlEntity {
    @ApiProperty({
        description: 'Signed URL to upload the file directly to Spaces',
        example: 'https://registon-edu.fra1.digitaloceanspaces.com/survey/uuid-filename.jpg?...',
    })
    uploadUrl: string;

    @ApiProperty({
        description: 'Unique file key stored in Spaces',
        example: 'survey/4513c94a-93a3-4429-8edd-b1d34c487044-survey-image.jpg',
    })
    fileKey: string;

    @ApiProperty({
        description: 'Publicly accessible URL to view the uploaded file',
        example:
            'https://registon-edu.fra1.digitaloceanspaces.com/survey/4513c94a-93a3-4429-8edd-b1d34c487044-survey-image.jpg',
    })
    publicUrl: string;
}
