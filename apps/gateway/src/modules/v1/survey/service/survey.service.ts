// survey.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { CommonEntity } from 'src/common/libs/common.entity';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { CreatePresignedUrlDto } from '../dto/create-presigned-url.dto';
import { CreatePresignedUrlEntity } from '../entity/create-presigned-url.entity';
import { UpdateSurveyDto } from '../dto/update-survey.dto';
import { SubmitSurveyDto } from '../dto/submit-survey.dto';

@Injectable()
export class SurveyService {
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

    async create(createSurveyDtoList: CreateSurveyDto, user: any): Promise<CommonEntity> {
        const userId = user?.userId || user?.userData?._id;

        const updatedDto = { ...createSurveyDtoList, createdBy: userId };
        
        return this.client.send(MessagePatterns.Survey.V1.CREATE, updatedDto).toPromise();
    }

    async generatePresignedUploadUrl({ filename, contentType }: CreatePresignedUrlDto): Promise<CreatePresignedUrlEntity> {
        const uniqueKey = `survey/${uuidv4()}-${filename}`;

        const command = new PutObjectCommand({
            Bucket: this.BUCKET,
            Key: uniqueKey,
            ContentType: contentType,
            ACL: ObjectCannedACL.public_read,
        });

        const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 600 }); 

        return {
            uploadUrl,
            fileKey: uniqueKey,
            publicUrl: `https://${this.BUCKET}.${process.env.DO_SPACES_REGION}.digitaloceanspaces.com/${uniqueKey}`,
        };
    }

    async update(id: string, updateSurveyDto: UpdateSurveyDto, user: any): Promise<CommonEntity> {
        const userId = user?.userId || user?.userData?._id;

        (updateSurveyDto as any).id = id;
        (updateSurveyDto as any).updatedBy = userId;

        return this.client.send(MessagePatterns.Survey.V1.UPDATE, updateSurveyDto).toPromise();
    }

    async getAll(userId: string): Promise<CommonEntity> {
        return this.client.send(MessagePatterns.Survey.V1.GET_ALL, userId).toPromise();
    }

    async getOne(id: string): Promise<CommonEntity> {
        return this.client.send(MessagePatterns.Survey.V1.GET_ONE, id).toPromise();
    }

    async delete(id: string): Promise<CommonEntity> {
        return this.client.send(MessagePatterns.Survey.V1.DELETE, id).toPromise();
    }

    async submitSurvey(submitSurveyDto: SubmitSurveyDto, user: any): Promise<any> {
        const userId = user?.userId || user?.userData?._id;

        const updatedDto = {
            ...submitSurveyDto,
            takenBy: userId,
        }

        return this.client.send(MessagePatterns.Survey.V1.SUBMIT, updatedDto).toPromise();
    }
}
