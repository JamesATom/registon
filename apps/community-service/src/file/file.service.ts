import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
    ObjectCannedACL,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';

// Interface for file upload data from gateway
interface FileUploadData {
    originalname: string;
    mimetype: string;
    size: number;
    buffer: string; // Base64 encoded
    folder: string;
    filename?: string;
}

// Interface for file metadata
interface FileMetadata {
    url: string;
    key: string;
    size: number;
    mimetype: string;
    originalname: string;
}

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

    async uploadFile(fileData: any): Promise<FileMetadata> {
        try {
            const fileUploadData = {
                originalname: fileData.originalname || 'unknown-file.jpg',
                mimetype: fileData.mimetype || 'image/jpeg',
                size: fileData.size || 0,
                buffer: fileData.buffer,
                folder: 'stories',
            };

            const buffer = Buffer.from(fileUploadData.buffer, 'base64');

            const filename =
                fileData.filename || `${uuidv4()}-${fileData.originalname.replace(/\s+/g, '-')}`;

            const key = join(fileUploadData.folder, filename);

            const uploadParams = {
                Bucket: this.bucketName,
                Key: key,
                Body: buffer,
                ContentType: fileData.mimetype,
                ACL: ObjectCannedACL.public_read,
            };

            await this.s3Client.send(new PutObjectCommand(uploadParams));

            return {
                url: `${this.baseUrl}/${key}`,
                key,
                size: fileData.size,
                mimetype: fileData.mimetype,
                originalname: fileData.originalname,
            };
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            const errorStack = error instanceof Error ? error.stack : undefined;
            this.logger.error(`Error uploading file: ${errorMessage}`, errorStack);
            throw new Error(`Failed to upload file: ${errorMessage}`);
        }
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
