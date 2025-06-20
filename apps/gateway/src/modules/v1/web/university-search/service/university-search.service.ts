import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateUniversitySearchDto } from '../dto/create-university-search.dto';
import { UpdateUniversitySearchDto } from '../dto/update-university-search.dto';
import { FilterUniversitySearchDto } from '../dto/filter-university-search.dto';

@Injectable()
export class UniversitySearchService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(createUniversitySearchDto: CreateUniversitySearchDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.CREATE, { 
                    ...createUniversitySearchDto,
                    createdBy: userId,
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

    async findAll(): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.GET_ALL, {})
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
                            'Failed to fetch universities',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async findOne(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.GET_ONE, id)
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
                            `Failed to fetch university with ID ${id}`,
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async update(id: string, updateUniversitySearchDto: UpdateUniversitySearchDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.UPDATE, {
                    id,
                    updateUniversitySearchDto: {
                        ...updateUniversitySearchDto,
                        updatedBy: userId,
                    },
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
                            `Failed to update university with ID ${id}`,
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async remove(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.DELETE, id)
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
                            `Failed to delete university with ID ${id}`,
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async filter(filterDto: FilterUniversitySearchDto): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.FILTER, filterDto)
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
                            'Failed to filter universities',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }
}
