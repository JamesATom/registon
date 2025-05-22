import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class FileService {
    private s3Client: S3Client;
    private readonly logger = new Logger(FileService.name);
    private readonly bucketName: string;
    private readonly baseUrl: string;

    constructor(private configService: ConfigService) {
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

    getBaseUrl(): string {
        return this.baseUrl;
    }

    async deleteFile(key: string): Promise<void> {
        try {
            const deleteParams = {
                Bucket: this.bucketName,
                Key: key,
            };
            await this.s3Client.send(new DeleteObjectCommand(deleteParams));
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            const errorStack = error instanceof Error ? error.stack : undefined;

            this.logger.error(`Error deleting file: ${errorMessage}`, errorStack);
            throw new Error(`Failed to delete file: ${errorMessage}`);
        }
    }
}
