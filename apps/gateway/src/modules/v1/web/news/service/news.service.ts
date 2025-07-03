// news.service.ts
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateNewsDto } from '../dto/create-news.dto';
import { UpdateNewsDto } from '../dto/update-news.dto';

@Injectable()
export class NewsService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(createNewsDto: CreateNewsDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.News.V1.CREATE, { 
                    ...createNewsDto,
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
                            'Failed to create news',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.News.V1.GET_ALL, paginationParams || {})
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error fetching news:', error);
                        throw new HttpException(
                            'Failed to retrieve news',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getOne(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.News.V1.GET_ONE, { id })
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
                            `Failed to retrieve news with ID ${id}`,
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async update(id: string, updateNewsDto: UpdateNewsDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.News.V1.UPDATE, { 
                    id, 
                    updateNewsDto: {
                        ...updateNewsDto,
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
                            `Failed to update news with ID ${id}`,
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async delete(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.News.V1.DELETE, { id })
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
                            `Failed to delete news with ID ${id}`,
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }
}
