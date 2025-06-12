// mock-register.service.ts
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';

@Injectable()
export class MockRegisterService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

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
