// shop-product.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateShopProductDto } from '../dto/create-shop-product.dto';
import { UpdateShopProductDto } from '../dto/update-shop-product.dto';
import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { CreatePresignedUrlDto } from 'src/common/libs/common.dto';
import { CommonEntity } from 'src/common/libs/common.entity';

@Injectable()
export class ShopProductService {
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

    async generatePresignedUploadUrlForImage({ filename, contentType }: CreatePresignedUrlDto): Promise<CommonEntity> {
        const uniqueKey = `shop-products/${uuidv4()}-${filename}`;

        const command = new PutObjectCommand({
            Bucket: this.BUCKET,
            Key: uniqueKey,
            ContentType: contentType,
            ACL: ObjectCannedACL.public_read,
        });

        try {
            const signedUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
            return {
                statusCode: 200,
                message: 'Presigned URL generated successfully',
                data: {
                    signedUrl,
                    publicUrl: `https://${this.BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${uniqueKey}`,
                    key: uniqueKey,
                },
            };
        } catch (error) {
            throw error;
        }
    }

    async create(createShopProductDto: CreateShopProductDto, userId: string) {
        try {
            const data = {
                ...createShopProductDto,
                createdBy: userId,
            };
            
            return await firstValueFrom(
                this.client.send(MessagePatterns.Shop.V1.Product.CREATE, data).pipe(
                    timeout(5000),
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            return await firstValueFrom(
                this.client.send(MessagePatterns.Shop.V1.Product.GET_ALL, {}).pipe(
                    timeout(5000),
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );
        } catch (error) {
            throw error;
        }
    }

    async getOne(id: string) {
        try {
            return await firstValueFrom(
                this.client.send(MessagePatterns.Shop.V1.Product.GET_ONE, id).pipe(
                    timeout(5000),
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );
        } catch (error) {
            throw error;
        }
    }

    async getByCategory(categoryId: string) {
        try {
            return await firstValueFrom(
                this.client.send(MessagePatterns.Shop.V1.Product.GET_BY_CATEGORY, categoryId).pipe(
                    timeout(5000),
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, updateShopProductDto: UpdateShopProductDto, userId: string) {
        try {
            const data = {
                id,
                updateShopProductDto: {
                    ...updateShopProductDto,
                    updatedBy: userId,
                },
            };
            
            return await firstValueFrom(
                this.client.send(MessagePatterns.Shop.V1.Product.UPDATE, data).pipe(
                    timeout(5000),
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string) {
        try {
            return await firstValueFrom(
                this.client.send(MessagePatterns.Shop.V1.Product.DELETE, id).pipe(
                    timeout(5000),
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );
        } catch (error) {
            throw error;
        }
    }
}
