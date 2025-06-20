// ielts-register.service.ts
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CreateIeltsRegisterDto } from '../dto/create-ielts-register.dto';
import { UpdateIeltsRegisterDto } from '../dto/update-ielts-register.dto';

@Injectable()
export class IeltsRegisterService {
    constructor(
        @Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy,
    ) {}

     async create(createIeltsRegisterDto: CreateIeltsRegisterDto, user: any): Promise<any> {
        const userId = user?.userId || user?.userData?._id;
        
        const updatedDto = { 
            ...createIeltsRegisterDto, 
            createdBy: userId, 
            updatedBy: userId,
        };
        
        return firstValueFrom(
            this.client
                .send(MessagePatterns.IeltsRegister.V1.CREATE, updatedDto)
                .pipe(timeout(10000), catchError((error) => {
                    console.error('Error creating IELTS registration:', error);
                    throw new HttpException(
                        error.message || 'Failed to create IELTS registration',
                        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
                    );
                })),
        );
    }

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

    async update(id: string, updateIeltsRegisterDto: UpdateIeltsRegisterDto, user: any): Promise<any> {
        const userId = user?.userId || user?.userData?._id;
        
        const updatedDto = {
            ...updateIeltsRegisterDto,
            updatedBy: userId
        };
        
        return firstValueFrom(
            this.client
                .send(MessagePatterns.IeltsRegister.V1.UPDATE, { id, updateIeltsRegisterDto: updatedDto })
                .pipe(timeout(10000), catchError((error) => {
                    console.error('Error updating IELTS registration:', error);
                    throw new HttpException(
                        error.message || 'Failed to update IELTS registration',
                        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
                    );
                })),
        );
    }

    async delete(id: string): Promise<any> {
        return firstValueFrom(
            this.client
                .send(MessagePatterns.IeltsRegister.V1.DELETE, { id })
                .pipe(timeout(10000), catchError((error) => {
                    console.error('Error deleting IELTS registration:', error);
                    throw new HttpException(
                        error.message || 'Failed to delete IELTS registration',
                        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
                    );
                })),
        );
    }
}
