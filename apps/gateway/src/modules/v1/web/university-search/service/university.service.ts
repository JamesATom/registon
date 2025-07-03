// university.service.ts
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateUniversityDto } from '../dto/create-university.dto';
import { UpdateUniversityDto } from '../dto/update-university.dto';
import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { CommonEntity } from 'src/common/libs/common.entity';

@Injectable()
export class UniversityService {
    private s3: S3Client;
    private BUCKET = process.env.DO_SPACES_BUCKET;

    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {
        this.s3 = new S3Client({
            region: 'fra1',
            endpoint: 'https://' + process.env.DO_SPACES_ENDPOINT,
            credentials: {
                accessKeyId: process.env.DO_SPACES_KEY,
                secretAccessKey: process.env.DO_SPACES_SECRET,
            },
        });
    }

    async generatePresignedUploadUrlForLogo({ filename, contentType }: CreatePresignedUrlDto): Promise<CommonEntity> {
        const uniqueKey = `university-logos/${uuidv4()}-${filename}`;

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
            },
        };
    }

    async create(createUniversityDto: CreateUniversityDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.University.CREATE, { 
                    ...createUniversityDto,
                    createdBy: userId,
                    updatedBy: userId
                })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        if (error && typeof error === 'object' && 'statusCode' in error) {
                            throw new HttpException(
                                {
                                    message: error.message || 'An error occurred',
                                    statusCode: error.statusCode
                                },
                                error.statusCode
                            );
                        }
                        throw new HttpException(
                            'Failed to create university',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.University.GET_ALL, paginationParams || {})
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error fetching universities:', error);
                        throw new HttpException(
                            'Failed to fetch universities',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getOne(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.University.GET_ONE, { id })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error fetching university:', error);
                        throw new HttpException(
                            'Failed to fetch university',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async update(id: string, updateUniversityDto: UpdateUniversityDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.University.UPDATE, { 
                    id, 
                    updateUniversityDto: {
                        ...updateUniversityDto,
                        updatedBy: userId
                    }
                })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        if (error && typeof error === 'object' && 'statusCode' in error) {
                            throw new HttpException(
                                {
                                    message: error.message || 'An error occurred',
                                    statusCode: error.statusCode
                                },
                                error.statusCode
                            );
                        }
                        throw new HttpException(
                            'Failed to update university',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async delete(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.University.DELETE, { id })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        if (error && typeof error === 'object' && 'statusCode' in error) {
                            throw new HttpException(
                                {
                                    message: error.message || 'An error occurred',
                                    statusCode: error.statusCode
                                },
                                error.statusCode
                            );
                        }
                        throw new HttpException(
                            'Failed to delete university',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }
}
