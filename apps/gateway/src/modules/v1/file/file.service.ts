import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { FileUploadDto } from './dto/file-upload.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { PresignedUrlDto } from './dto/presigned-url.dto';
import { PresignedUrlResponseDto } from './dto/presigned-url-response.dto';

// Define a type for the uploaded file
interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
    destination?: string;
    filename?: string;
    path?: string;
}

@Injectable()
export class FileService {
    private readonly logger = new Logger(FileService.name);
    private readonly s3Client: S3Client;
    private readonly bucketName: string;
    private readonly baseUrl: string;

    constructor(
        @Inject('COMMUNITY_SERVICE') private communityClient: ClientProxy,
        private configService: ConfigService,
    ) {
        // Initialize S3 client with DigitalOcean Spaces configuration
        this.s3Client = new S3Client({
            region: 'fra1', // DigitalOcean Spaces region
            endpoint: 'https://fra1.digitaloceanspaces.com', // DigitalOcean Spaces endpoint
            credentials: {
                accessKeyId: this.configService.get<string>('DO_SPACES_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get<string>('DO_SPACES_SECRET_ACCESS_KEY'),
            },
        });

        this.bucketName = this.configService.get<string>('DO_SPACES_BUCKET_NAME', 'registon-edu');
        this.baseUrl = this.configService.get<string>(
            'DO_SPACES_BASE_URL',
            'https://registon-edu.fra1.digitaloceanspaces.com',
        );
    }

    async generatePresignedUrl(presignedUrlDto: PresignedUrlDto): Promise<PresignedUrlResponseDto> {
        try {
            const { filename, contentType, folder } = presignedUrlDto;

            const timestamp = new Date().getTime();
            const sanitizedName = filename.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_.]/g, '');
            const uniqueFilename = `${timestamp}-${uuidv4().slice(0, 8)}-${sanitizedName}`;
            const key = join(folder, uniqueFilename);

            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                ContentType: contentType,
            });

            const presignedUrl = await getSignedUrl(this.s3Client, command, {
                expiresIn: 3600,
            });

            const fileUrl = `${this.baseUrl}/${key}`;

            this.logger.log(`Generated presigned URL for ${folder}/${uniqueFilename}`);

            return {
                presignedUrl,
                fileUrl,
                key,
            };
        } catch (error) {
            this.logger.error(`Error generating presigned URL: ${error.message}`);
            throw new HttpException(
                'Failed to generate presigned URL',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
