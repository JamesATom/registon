import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateCalendarDto } from '../dto/create-calendar.dto';

@Injectable()
export class CalendarService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(createCalendarDto: CreateCalendarDto): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Calendar.V1.CREATE, createCalendarDto)
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
                            'Failed to create calendar entry',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Calendar.V1.GET_ALL, paginationParams || {})
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        throw new HttpException(
                            'Failed to retrieve calendar entries',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getById(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Calendar.V1.GET_ONE, { id })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        if (error && typeof error === 'object' && 'statusCode' in error) {
                            throw new HttpException(
                                {
                                    message: error.message || 'Calendar entry not found',
                                    statusCode: error.statusCode
                                },
                                error.statusCode
                            );
                        }
                        throw new HttpException(
                            'Calendar entry not found',
                            HttpStatus.NOT_FOUND
                        );
                    })
                ),
        );
    }
}
