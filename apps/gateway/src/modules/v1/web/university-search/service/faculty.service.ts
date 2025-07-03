// faculty.service.ts
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateFacultyDto } from '../dto/create-faculty.dto';
import { UpdateFacultyDto } from '../dto/update-faculty.dto';

@Injectable()
export class FacultyService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(createFacultyDto: CreateFacultyDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.Faculty.CREATE, { 
                    ...createFacultyDto,
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
                            'Failed to create faculty',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getAll(options?: { page?: number; limit?: number }): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.Faculty.GET_ALL, options || {})
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error fetching faculties:', error);
                        throw new HttpException(
                            'Failed to fetch faculties',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getAllByUniversity(universityId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.Faculty.GET_ALL_BY_UNIVERSITY, { universityId })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error fetching faculties by university:', error);
                        throw new HttpException(
                            'Failed to fetch faculties by university',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getOne(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.Faculty.GET_ONE, { id })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error fetching faculty:', error);
                        throw new HttpException(
                            'Failed to fetch faculty',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async update(id: string, updateFacultyDto: UpdateFacultyDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.Faculty.UPDATE, { 
                    id, 
                    updateFacultyDto: {
                        ...updateFacultyDto,
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
                            'Failed to update faculty',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async delete(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.Faculty.DELETE, { id })
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
                            'Failed to delete faculty',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }
}
