import { Controller, Post, BadRequestException, Req, Body, UseGuards } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ApiAuth, ApiGetAll, ApiGetOne, ApiCreate, ApiUpdate, ApiDelete } from 'src/common/swagger/common-swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { FastifyRequest } from 'fastify';
import { FileService } from './file.service';
import { PresignedUrlDto } from './dto/presigned-url.dto';
import { PresignedUrlResponseDto } from './dto/presigned-url-response.dto';

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post('presigned-url')
    @ApiOperation({ summary: 'Generate a presigned URL for file upload' })
    @ApiBody({ type: PresignedUrlDto })
    async getPresignedUrl(
        @Body() presignedUrlDto: PresignedUrlDto,
    ): Promise<PresignedUrlResponseDto> {
        return this.fileService.generatePresignedUrl(presignedUrlDto);
    }
}
