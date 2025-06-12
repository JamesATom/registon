import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateJobHuntingDto } from '../dto/create-job-hunting.dto';
import { UpdateJobHuntingDto } from '../dto/update-job-hunting.dto';
import { FilterJobHuntingDto } from '../dto/filter-job-hunting.dto';

@Injectable()
export class JobHuntingService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(createJobHuntingDto: CreateJobHuntingDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.JobHunting.V1.CREATE, { 
                    ...createJobHuntingDto,
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
                            'Failed to create job listing',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async findAll(): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.JobHunting.V1.GET_ALL, {})
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error fetching job listings:', error);
                        throw new Error('Failed to fetch job listings');
                    })
                ),
        );
    }

    async findOne(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.JobHunting.V1.GET_ONE, { id })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error fetching job listing:', error);
                        throw new Error('Failed to fetch job listing');
                    })
                ),
        );
    }

    async update(id: string, updateJobHuntingDto: UpdateJobHuntingDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.JobHunting.V1.UPDATE, { 
                    id, 
                    updateJobHuntingDto: {
                        ...updateJobHuntingDto,
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
                            'Failed to update job listing',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async remove(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.JobHunting.V1.DELETE, { id })
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
                            'Failed to delete job listing',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async filter(filterJobHuntingDto: FilterJobHuntingDto): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.JobHunting.V1.FILTER, filterJobHuntingDto)
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error filtering job listings:', error);
                        throw new Error('Failed to filter job listings');
                    })
                ),
        );
    }
}
