// import { Controller } from '@nestjs/common';
// import { MessagePattern } from '@nestjs/microservices';
// import { FileService } from './file.service';

// // Interface for file upload data from gateway
// interface FileUploadData {
//     originalname: string;
//     mimetype: string;
//     size: number;
//     buffer: string; // Base64 encoded
//     folder: string;
//     filename?: string;
// }

// @Controller()
// export class FileController {
//     constructor(private readonly fileService: FileService) {}

//     @MessagePattern('file.upload')
//     async uploadFile(data: FileUploadData) {
//         return this.fileService.uploadFile(data);
//     }

//     @MessagePattern('file.delete')
//     async deleteFile(key: string) {
//         await this.fileService.deleteFile(key);
//         return { success: true };
//     }
// }
