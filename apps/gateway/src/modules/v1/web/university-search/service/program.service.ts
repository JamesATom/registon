// program.service.ts
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateProgramDto } from '../dto/create-program.dto';
import { UpdateProgramDto } from '../dto/update-program.dto';

@Injectable()
export class ProgramService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(createProgramDto: CreateProgramDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.Program.CREATE, { 
                    ...createProgramDto,
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
                            'Failed to create program',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getAll(): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.Program.GET_ALL, {})
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error fetching programs:', error);
                        throw new HttpException(
                            'Failed to fetch programs',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getAllByUniversity(universityId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.Program.GET_ALL_BY_UNIVERSITY, { universityId })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error fetching programs by university:', error);
                        throw new HttpException(
                            'Failed to fetch programs by university',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getAllByFaculty(facultyId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.Program.GET_ALL_BY_FACULTY, { facultyId })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error fetching programs by faculty:', error);
                        throw new HttpException(
                            'Failed to fetch programs by faculty',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async getOne(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.Program.GET_ONE, { id })
                .pipe(
                    timeout(10000),
                    catchError((error) => {
                        console.error('Error fetching program:', error);
                        throw new HttpException(
                            'Failed to fetch program',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async update(id: string, updateProgramDto: UpdateProgramDto, userId: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.Program.UPDATE, { 
                    id, 
                    updateProgramDto: {
                        ...updateProgramDto,
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
                            'Failed to update program',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async delete(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.UniversitySearch.V1.Program.DELETE, { id })
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
                            'Failed to delete program',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }
}
