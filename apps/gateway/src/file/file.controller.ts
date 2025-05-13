import { Controller, Post, BadRequestException, Req } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { FileService } from './file.service';

@ApiTags('Files')
@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post('upload')
    @ApiOperation({ summary: 'Upload a file' })
    @ApiConsumes('multipart/form-data')
    async uploadFile(@Req() request: FastifyRequest) {
        console.log('File upload request received');

        try {
            // Use the simplest possible approach with Fastify
            const data = await (request as any).file();

            if (!data) {
                throw new BadRequestException('File is required');
            }

            console.log('File received:', data.filename);

            // Convert to buffer
            const buffer = await data.toBuffer();

            console.log('File converted to buffer, size:', buffer.length);

            // Initialize default values
            let folder = 'default';
            let customFilename: string | undefined;

            // Try to get fields if available
            try {
                const fields = data.fields || {};
                console.log('Form fields:', fields);
                folder = fields.folder?.value || 'default';
                customFilename = fields.filename?.value;
            } catch (err) {
                console.log('Could not extract fields, using defaults:', err);
            }

            // Create a file object
            const file = {
                fieldname: data.fieldname,
                originalname: data.filename,
                encoding: data.encoding,
                mimetype: data.mimetype,
                size: buffer.length,
                buffer: buffer,
            };

            // Use the values we extracted
            const filename = customFilename || data.filename;

            // Forward the file to the community service for storage
            const result = await this.fileService.uploadFile(file, { folder, filename });

            return {
                success: true,
                message: 'File uploaded successfully',
                data: result,
            };
        } catch (error: unknown) {
            console.error('Error uploading file:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new BadRequestException(errorMessage || 'Error uploading file to storage');
        }
    }
}
