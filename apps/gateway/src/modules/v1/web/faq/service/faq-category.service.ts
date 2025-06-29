// faq-category.service.ts
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateFaqCategoryDto } from '../dto/create-faq-category.dto';
import { UpdateFaqCategoryDto } from '../dto/update-faq-category.dto';

@Injectable()
export class FaqCategoryService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(createFaqCategoryDto: CreateFaqCategoryDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.FaqCategory.V1.CREATE, { 
                    ...createFaqCategoryDto,
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
                            'Failed to create FAQ Category',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getAll(): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.FaqCategory.V1.GET_ALL, {})
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error fetching FAQ Categories:', error);
                        throw new HttpException(
                            'Failed to retrieve FAQ Categories',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getOne(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.FaqCategory.V1.GET_ONE, { id })
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
                            `Failed to retrieve FAQ Category with ID ${id}`,
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async update(id: string, updateFaqCategoryDto: UpdateFaqCategoryDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.FaqCategory.V1.UPDATE, { 
                    id, 
                    updateFaqCategoryDto: {
                        ...updateFaqCategoryDto,
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
                            `Failed to update FAQ Category with ID ${id}`,
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async delete(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.FaqCategory.V1.DELETE, { id })
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
                            `Failed to delete FAQ Category with ID ${id}`,
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }
}
