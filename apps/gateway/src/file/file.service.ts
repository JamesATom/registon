import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FileUploadDto } from './dto/file-upload.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom, timeout, catchError } from 'rxjs';

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
    constructor(@Inject('COMMUNITY_SERVICE') private communityClient: ClientProxy) {}

    async uploadFile(file: MulterFile, fileUploadDto: FileUploadDto) {
        try {
            console.log('Starting file upload process in service');
            console.log('File details:', {
                name: file.originalname,
                size: file.size,
                mimetype: file.mimetype,
                folder: fileUploadDto.folder,
                filename: fileUploadDto.filename,
            });

            // Convert file buffer to base64 to send through microservice transport
            const fileData = {
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
                buffer: file.buffer.toString('base64'),
                folder: fileUploadDto.folder || 'default',
                filename: fileUploadDto.filename,
            };

            console.log('Sending file data to community service...');

            // Send to community service
            const result = await firstValueFrom(
                this.communityClient.send('file.upload', fileData).pipe(
                    // Add timeout to avoid hanging indefinitely
                    timeout(30000), // 30 seconds timeout
                    catchError(err => {
                        console.error('Error in microservice communication:', err);
                        throw new Error(
                            'Communication with file upload service timed out or failed',
                        );
                    }),
                ),
            );

            console.log('Received response from community service:', result);
            return result;
        } catch (error: any) {
            throw new HttpException(
                error.message || 'Error uploading file',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
