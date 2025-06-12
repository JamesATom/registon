// mock-register.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { MockRegisterRepository } from '../repository/mock-register.repository';
import { CreateMockRegisterDto } from '../dto/create-mock-register.dto';
import { UpdateMockRegisterDto } from '../dto/update-mock-register.dto';

@Injectable()
export class MockRegisterService {
    constructor(private readonly mockRegisterRepository: MockRegisterRepository) {}

    async create(createMockRegisterDto: CreateMockRegisterDto): Promise<any> {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Mock registration created successfully',
            data: await this.mockRegisterRepository.create(createMockRegisterDto),
        };
    }

    async getAll(): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Mock registrations retrieved successfully',
            data: await this.mockRegisterRepository.getAll(),
        };
    }

    async getOne(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Mock registration with ID ${id} retrieved successfully`,
            data: await this.mockRegisterRepository.getOne(id),
        };
    }

    async update(id: string, updateMockRegisterDto: UpdateMockRegisterDto): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Mock registration with ID ${id} updated successfully`,
            data: await this.mockRegisterRepository.update(id, updateMockRegisterDto),
        };
    }

    async delete(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Mock registration with ID ${id} deleted successfully`,
            data: await this.mockRegisterRepository.delete(id),
        };
    }

    async registerStudent(mockRegistrationId: string, studentId: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Student with ID ${studentId} registered for mock exam with ID ${mockRegistrationId} successfully`,
            data: await this.mockRegisterRepository.registerStudent(mockRegistrationId, studentId),
        };
    }
    
    async unregisterStudent(mockRegistrationId: string, studentId: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Student with ID ${studentId} unregistered from mock exam with ID ${mockRegistrationId} successfully`,
            data: await this.mockRegisterRepository.unregisterStudent(mockRegistrationId, studentId),
        };
    }
}
