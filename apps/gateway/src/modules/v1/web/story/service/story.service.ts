// story.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { firstValueFrom } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { CommonEntity } from 'src/common/libs/common.entity';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateStoryDto } from '../dto/create-story.dto';
import { FilterStoryDto } from '../dto/filter-story.dto';
import { UpdateStoryDto } from '../dto/update-story.dto';

@Injectable()
export class StoryService {
    private s3: S3Client;
    private BUCKET = process.env.DO_SPACES_BUCKET;
    private REQUEST_TIMEOUT = 10000; // 10 seconds timeout

    constructor(@Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy) {
        this.s3 = new S3Client({
            region: 'fra1',
            endpoint: 'https://' + process.env.DO_SPACES_ENDPOINT,
            credentials: {
                accessKeyId: process.env.DO_SPACES_KEY,
                secretAccessKey: process.env.DO_SPACES_SECRET,
            },
        });
    }

    async generatePresignedUploadUrl({ filename, contentType }: CreatePresignedUrlDto): Promise<CommonEntity> {
        const key = `stories/${uuidv4()}-${filename}`;

        const command = new PutObjectCommand({
            Bucket: this.BUCKET,
            Key: key,
            ContentType: contentType,
            ACL: 'public-read',
        });

        const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
        const publicUrl = `https://${this.BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${key}`;

        return {
            statusCode: 200,
            message: 'Presigned upload URL generated successfully',
            data: { uploadUrl, publicUrl },
        };
    }

    async create(createStoryDto: CreateStoryDto, user: any): Promise<CommonEntity> {
        const userId = user?.userId || user?.userData?._id;
        
        const updatedDto = { ...createStoryDto, createdBy: userId };

        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.CREATE, updatedDto).pipe(
                timeout(this.REQUEST_TIMEOUT),
                catchError((error) => {
                    throw error;
                })
            )
        );
    }

    async getAll(filter: FilterStoryDto): Promise<CommonEntity> {
        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.GET_ALL, filter).pipe(
                timeout(this.REQUEST_TIMEOUT),
                catchError((error) => {
                    throw error;
                })
            )
        );
    }

    async getOne(id: string): Promise<CommonEntity> {
        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.GET_ONE, id).pipe(
                timeout(this.REQUEST_TIMEOUT),
                catchError((error) => {
                    throw error;
                })
            )
        );
    }

    async update(id: string, updateStoryDto: UpdateStoryDto, user: any): Promise<CommonEntity> {
        const userId = user?.userId || user?.userData?._id;
        
        const updatedDto = { ...updateStoryDto, updatedBy: userId };

        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.UPDATE, { id, updateStoryDto: updatedDto }).pipe(
                timeout(this.REQUEST_TIMEOUT),
                catchError((error) => {
                    throw error;
                })
            )
        );
    }

    async delete(id: string): Promise<CommonEntity> {
        return firstValueFrom(
            this.client.send(MessagePatterns.Story.V1.DELETE, id).pipe(
                timeout(this.REQUEST_TIMEOUT),
                catchError((error) => {
                    throw error;
                })
            )
        );
    }
}
