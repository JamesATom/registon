// survey.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

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

    create(createSurveyDto: CreateSurveyDto) {
        return this.client.send(MessagePatterns.Survey.V1.CREATE, {}).toPromise();
    }

    async generatePresignedUploadUrl(filename: string, contentType: string) {
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

    // findAll() {
    //     return this.client.send(MessagePatterns.Survey.V1.GET_ALL, {}).toPromise();
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} survey`;
    // }

    // update(id: number, updateSurveyDto: UpdateSurveyDto) {
    //     return `This action updates a #${id} survey`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} survey`;
    // }
}
