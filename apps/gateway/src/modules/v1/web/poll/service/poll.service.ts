// poll.service.ts
import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { CommonEntity } from 'src/common/libs/common.entity';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreatePollDto } from '../dto/create-poll.dto';
import { UpdatePollDto } from '../dto/update-poll.dto';
import { SubmitPollDto } from '../dto/submit-poll.dto';

@Injectable()
export class PollService {
    private s3: S3Client;
    private BUCKET = process.env.DO_SPACES_BUCKET;

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
        const uniqueKey = `poll/${uuidv4()}-${filename}`;

        const command = new PutObjectCommand({
            Bucket: this.BUCKET,
            Key: uniqueKey,
            ContentType: contentType,
            ACL: ObjectCannedACL.public_read,
        });

        const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 600 });

        return {
            statusCode: HttpStatus.OK,
            message: 'Presigned URL generated successfully',
            data: {
                uploadUrl,
                fileKey: uniqueKey,
                publicUrl: `https://${this.BUCKET}.${process.env.DO_SPACES_REGION}.digitaloceanspaces.com/${uniqueKey}`,
            },
        };
    }

    async create(createPollDtoList: CreatePollDto, user: any): Promise<CommonEntity> {
        const userId = user?.userId || user?.userData?._id;

        const updatedDto = { ...createPollDtoList, createdBy: userId };

        return firstValueFrom(
            this.client.send(MessagePatterns.Poll.V1.CREATE, updatedDto).pipe(
                timeout(10000),
                catchError((error) => {
                    console.error('Error creating poll:', error);
                    throw error;
                })
            )
        );
    }

    async update(id: string, updatePollDto: UpdatePollDto, user: any): Promise<CommonEntity> {
        const userId = user?.userId || user?.userData?._id;

        (updatePollDto as any).updatedBy = userId;

        return firstValueFrom(
            this.client.send(MessagePatterns.Poll.V1.UPDATE, { id, updatePollDto }).pipe(
                timeout(10000),
                catchError((error) => {
                    console.error('Error updating poll:', error);
                    throw error;
                })
            )
        );
    }

    async getAll(userId: string, paginationParams?: { page?: number; limit?: number }): Promise<CommonEntity> {
        const filter = { 
            userId,
            ...(paginationParams || {})
        };
        
        return firstValueFrom(
            this.client.send(MessagePatterns.Poll.V1.GET_ALL, filter).pipe(
                timeout(10000),
                catchError((error) => {
                    console.error('Error fetching polls:', error);
                    throw error;
                })
            )
        );
    }

    async getOne(id: string): Promise<CommonEntity> {
        return firstValueFrom(
            this.client.send(MessagePatterns.Poll.V1.GET_ONE, id).pipe(
                timeout(10000),
                catchError((error) => {
                    console.error('Error fetching poll:', error);
                    throw error;
                })
            )
        );
    }

    async delete(id: string): Promise<CommonEntity> {
        return firstValueFrom(
            this.client.send(MessagePatterns.Poll.V1.DELETE, id).pipe(
                timeout(10000),
                catchError((error) => {
                    console.error('Error deleting poll:', error);
                    throw error;
                })
            )
        );
    }

    async submitPoll(submitPollDto: SubmitPollDto, user: any): Promise<any> {
        const userId = user?.userId || user?.userData?._id;

        const updatedDto = {
            ...submitPollDto,
            takenBy: userId,
        };

        return firstValueFrom(
            this.client.send(MessagePatterns.Poll.V1.SUBMIT, updatedDto).pipe(
                timeout(10000),
                catchError((error) => {
                    console.error('Error submitting poll:', error);
                    throw error;
                })
            )
        );
    }
}
