import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';

@Injectable()
export class ReservationService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(createReservationDto: CreateReservationDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Reservation.V1.CREATE, { 
                    ...createReservationDto,
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
                            'Failed to create reservation',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Reservation.V1.GET_ALL, paginationParams || {})
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        throw new HttpException(
                            'Failed to retrieve reservations',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getById(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Reservation.V1.GET_ONE, { id })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        if (error && typeof error === 'object' && 'statusCode' in error) {
                            throw new HttpException(
                                {
                                    message: error.message || 'Reservation not found',
                                    statusCode: error.statusCode
                                },
                                error.statusCode
                            );
                        }
                        throw new HttpException(
                            'Reservation not found',
                            HttpStatus.NOT_FOUND
                        );
                    })
                ),
        );
    }

    async update(id: string, updateReservationDto: UpdateReservationDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Reservation.V1.UPDATE, { 
                    id, 
                    updateReservationDto: {
                        ...updateReservationDto,
                        updatedBy: userId
                    }
                })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        if (error && typeof error === 'object' && 'statusCode' in error) {
                            throw new HttpException(
                                {
                                    message: error.message || 'Failed to update reservation',
                                    statusCode: error.statusCode
                                },
                                error.statusCode
                            );
                        }
                        throw new HttpException(
                            'Failed to update reservation',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async delete(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.Reservation.V1.DELETE, { id })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        if (error && typeof error === 'object' && 'statusCode' in error) {
                            throw new HttpException(
                                {
                                    message: error.message || 'Failed to delete reservation',
                                    statusCode: error.statusCode
                                },
                                error.statusCode
                            );
                        }
                        throw new HttpException(
                            'Failed to delete reservation',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }
}
