import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FileService } from './file.service';

@Controller()
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @MessagePattern('file.delete')
    async deleteFile(key: string) {
        await this.fileService.deleteFile(key);
        return { success: true };
    }
}
