// faq.service.ts
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { UpdateFaqDto } from '../dto/update-faq.dto';

@Injectable()
export class FaqService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(createFaqDto: CreateFaqDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Faq.V1.CREATE, { 
                    ...createFaqDto,
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
                            'Failed to create FAQ',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Faq.V1.GET_ALL, paginationParams || {})
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error fetching FAQs:', error);
                        throw new HttpException(
                            'Failed to retrieve FAQs',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getOne(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Faq.V1.GET_ONE, { id })
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
                            `Failed to retrieve FAQ with ID ${id}`,
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async update(id: string, updateFaqDto: UpdateFaqDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Faq.V1.UPDATE, { 
                    id, 
                    updateFaqDto: {
                        ...updateFaqDto,
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
                            `Failed to update FAQ with ID ${id}`,
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async delete(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Faq.V1.DELETE, { id })
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
                            `Failed to delete FAQ with ID ${id}`,
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }
}
