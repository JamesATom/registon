import { Controller, Post, BadRequestException, Req, Body, UseGuards } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { FileService } from './file.service';
import { PresignedUrlDto } from './dto/presigned-url.dto';
import { PresignedUrlResponseDto } from './dto/presigned-url-response.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Files')
@Controller('files')
@ApiBearerAuth()
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post('presigned-url')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Generate a presigned URL for file upload' })
    @ApiBody({ type: PresignedUrlDto })
    async getPresignedUrl(
        @Body() presignedUrlDto: PresignedUrlDto,
    ): Promise<PresignedUrlResponseDto> {
        return this.fileService.generatePresignedUrl(presignedUrlDto);
    }
}
