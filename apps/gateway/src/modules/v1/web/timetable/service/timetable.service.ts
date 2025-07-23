import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateTimetableDto } from '../dto/create-timetable.dto';
import { UpdateTimetableDto } from '../dto/update-timetable.dto';

@Injectable()
export class TimetableService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(createTimetableDto: CreateTimetableDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Timetable.V1.CREATE, { 
                    ...createTimetableDto,
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
                            'Failed to create timetable',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Timetable.V1.GET_ALL, paginationParams || {})
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        throw new HttpException(
                            'Failed to retrieve timetables',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getById(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Timetable.V1.GET_ONE, { id })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        if (error && typeof error === 'object' && 'statusCode' in error) {
                            throw new HttpException(
                                {
                                    message: error.message || 'Timetable not found',
                                    statusCode: error.statusCode
                                },
                                error.statusCode
                            );
                        }
                        throw new HttpException(
                            'Timetable not found',
                            HttpStatus.NOT_FOUND
                        );
                    })
                ),
        );
    }

    async update(id: string, updateTimetableDto: UpdateTimetableDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Timetable.V1.UPDATE, { 
                    id, 
                    updateTimetableDto: {
                        ...updateTimetableDto,
                        updatedBy: userId
                    }
                })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        if (error && typeof error === 'object' && 'statusCode' in error) {
                            throw new HttpException(
                                {
                                    message: error.message || 'Failed to update timetable',
                                    statusCode: error.statusCode
                                },
                                error.statusCode
                            );
                        }
                        throw new HttpException(
                            'Failed to update timetable',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async delete(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Timetable.V1.DELETE, { id })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        if (error && typeof error === 'object' && 'statusCode' in error) {
                            throw new HttpException(
                                {
                                    message: error.message || 'Failed to delete timetable',
                                    statusCode: error.statusCode
                                },
                                error.statusCode
                            );
                        }
                        throw new HttpException(
                            'Failed to delete timetable',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }
}
