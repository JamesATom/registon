// ielts-register.service.ts
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';

@Injectable()
export class IeltsRegisterService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

    async getAll(): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.IeltsRegister.V1.GET_ALL, {})
                .pipe(timeout(10000), catchError((error) => {
                    console.error('Error fetching IELTS registrations:', error);
                    throw new Error('Failed to fetch IELTS registrations');
                })),
        );
    }

    async getOne(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.IeltsRegister.V1.GET_ONE, { id })
                .pipe(timeout(10000), catchError((error) => {
                    console.error('Error fetching IELTS registration:', error);
                    throw new Error('Failed to fetch IELTS registration');
                })),
        );
    }

    async registerForExam(ieltsExamId: string, user: any): Promise<any> {
        const studentId = user?.userId || user?.userData?._id;
        
        return firstValueFrom(
            this.client
                .send(MessagePatterns.IeltsRegister.V1.REGISTER_FOR_EXAM, { 
                    ieltsExamId, 
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
                            'Failed to register for IELTS exam',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }

    async unregisterFromExam(ieltsExamId: string, user: any): Promise<any> {
        const studentId = user?.userId || user?.userData?._id;
        
        return firstValueFrom(
            this.client
                .send('unregisterFromIeltsExam', { 
                    ieltsExamId, 
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
                            'Failed to unregister from IELTS exam',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    })
                ),
        );
    }
}
