// event.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { CommonEntity } from 'src/common/libs/common.entity';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventFilterDto } from '../dto/filter-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';

@Injectable()
export class EventService {
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

    async generatePresignedUploadUrl({filename, contentType}: CreatePresignedUrlDto): Promise<CommonEntity> {
        const uniqueKey = `event/${uuidv4()}-${filename}`;

        const command = new PutObjectCommand({
            Bucket: this.BUCKET,
            Key: uniqueKey,
            ContentType: contentType,
            ACL: ObjectCannedACL.public_read,
        });

        const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 600 });

        return {
            statusCode: 200,
            message: 'Presigned URL generated successfully',
            data: {
                uploadUrl,
                fileKey: uniqueKey,
                publicUrl: `https://${this.BUCKET}.${process.env.DO_SPACES_REGION}.digitaloceanspaces.com/${uniqueKey}`,
            }
        };
    }

    async create(createEventDto: CreateEventDto, user: any): Promise<CommonEntity> {
        const userId = user?.userId || user?.userData?._id;
        
        const updatedDto = { ...createEventDto, createdBy: userId };

        return this.client.send(MessagePatterns.Event.V1.CREATE, updatedDto).toPromise();
    }

    async getAll(filter: EventFilterDto, user: any): Promise<CommonEntity> {
        const userId = user?.userId || user?.userData?._id;
        (filter as any).userId = userId; 
        return this.client.send(MessagePatterns.Event.V1.GET_ALL, filter).toPromise();
    }

    async getOne(id: string): Promise<CommonEntity> {
        return this.client.send(MessagePatterns.Event.V1.GET_ONE, id).toPromise();
    }

    async update(id: string, updateEventDto: UpdateEventDto, user: any): Promise<CommonEntity> {
        const userId = user?.userId || user?.userData?._id;

        (updateEventDto as any).updatedBy = userId;
        return this.client.send(MessagePatterns.Event.V1.UPDATE, { id, updateEventDto }).toPromise();
    }

    async delete(id: string): Promise<CommonEntity> {
        return this.client.send(MessagePatterns.Event.V1.DELETE, id).toPromise();
    }
}
