// mock-register.service.ts
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateMockRegisterDto } from '../dto/create-mock-register.dto';
import { UpdateMockRegisterDto } from '../dto/update-mock-register.dto';

@Injectable()
export class MockRegisterService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

    async create(createMockRegisterDto: CreateMockRegisterDto, user: any): Promise<any> {
        const userId = user?.userId || user?.userData?._id;
        
        const updatedDto = { 
            ...createMockRegisterDto, 
            createdBy: userId, 
            updatedBy: userId,
        };
        
        return firstValueFrom(
            this.client
                .send(MessagePatterns.MockRegister.V1.CREATE, updatedDto)
                .pipe(timeout(10000), catchError((error) => {
                    console.error('Error creating mock registration:', error);
                    throw new HttpException(
                        error.message || 'Failed to create mock registration',
                        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
                    );
                })),
        );
    }

    async getAll(): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.MockRegister.V1.GET_ALL, {})
                .pipe(timeout(10000), catchError((error) => {
                    console.error('Error fetching mock registrations:', error);
                    throw new Error('Failed to fetch mock registrations');
                })),
        );
    }

    async getOne(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.MockRegister.V1.GET_ONE, { id })
                .pipe(timeout(10000), catchError((error) => {
                    console.error('Error fetching mock registration:', error);
                    throw new Error('Failed to fetch mock registration');
                })),
        );
    }

    async update(id: string, updateMockRegisterDto: UpdateMockRegisterDto, user: any): Promise<any> {
        const userId = user?.userId || user?.userData?._id;

        const updatedDto = {
            ...updateMockRegisterDto,
            updatedBy: userId
        };

        return firstValueFrom(
            this.client
                .send(MessagePatterns.MockRegister.V1.UPDATE, { id, updateMockRegisterDto: updatedDto })
                .pipe(timeout(10000), catchError((error) => {
                    console.error('Error updating mock registration:', error);
                    throw new Error('Failed to update mock registration');
                })),
        );
    }

    async delete(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.MockRegister.V1.DELETE, { id })
                .pipe(timeout(10000), catchError((error) => {
                    console.error('Error deleting mock registration:', error);
                    throw new Error('Failed to delete mock registration');
                })),
        );
    }

    async registerStudent(mockRegistrationId: string, user: any): Promise<any> {
        const studentId = user?.userId || user?.userData?._id;
        
        return firstValueFrom(
            this.client
                .send(MessagePatterns.MockRegister.V1.REGISTER_STUDENT, { 
                    mockRegistrationId, 
                    studentId 
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
                            'Failed to register for mock exam',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }
    
    async unregisterStudent(mockRegistrationId: string, user: any): Promise<any> {
        const studentId = user?.userId || user?.userData?._id;
        
        return firstValueFrom(
            this.client
                .send(MessagePatterns.MockRegister.V1.UNREGISTER_STUDENT, { 
                    mockRegistrationId, 
                    studentId 
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
                            'Failed to unregister from mock exam',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }
}
