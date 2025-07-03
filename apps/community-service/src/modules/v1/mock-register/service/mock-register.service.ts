// mock-register.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { MockRegisterRepository } from '../repository/mock-register.repository';
import { CreateMockRegisterDto } from '../dto/create-mock-register.dto';
import { UpdateMockRegisterDto } from '../dto/update-mock-register.dto';

@Injectable()
export class MockRegisterService {
    constructor(private readonly mockRegisterRepository: MockRegisterRepository) {}

    async create(createMockRegisterDto: CreateMockRegisterDto): Promise<any> {
        const mockRegData = this.prepareMockRegistrationData(createMockRegisterDto);
        const createdMockReg = await this.mockRegisterRepository.createMockRegistration(mockRegData);
        const mockRegStudentData = this.prepareMockRegistrationStudentData({
            ...createdMockReg,
            student: createMockRegisterDto.student,
        });
        await this.mockRegisterRepository.createMockRegistrationStudent(mockRegStudentData);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Mock registration created successfully',
            data: createdMockReg,
        };
    }

    async getAll(paginationParams?: { page?: number; limit?: number }): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Mock registrations retrieved successfully',
            data: await this.mockRegisterRepository.getAll(paginationParams),
        };
    }

    async getOne(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Mock registration with ID ${id} retrieved successfully`,
            data: (await this.mockRegisterRepository.getOne(id)) || {},
        };
    }

    async update(id: string, updateMockRegisterDto: UpdateMockRegisterDto): Promise<any> {
        const mockRegData = this.prepareMockRegistrationData(updateMockRegisterDto);
        const updatedMockReg = await this.mockRegisterRepository.updateMockRegistration(id, mockRegData);
        const mockRegStudentData = this.prepareMockRegistrationStudentData({
            ...updatedMockReg,
            student: updateMockRegisterDto.student,
        });
        await this.mockRegisterRepository.updateMockRegistrationStudent(id, mockRegStudentData);

        return {
            statusCode: HttpStatus.OK,
            message: `Mock registration with ID ${id} updated successfully`,
            data: updatedMockReg,
        };
    }

    async delete(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Mock registration with ID ${id} deleted successfully`,
            data: await this.mockRegisterRepository.delete(id),
        };
    }

    private prepareMockRegistrationData(dto: any): any {
        const { branch, student, ...registrationData } = dto;
        return {
            ...registrationData,
            branchId: branch,
        };
    }

    private prepareMockRegistrationStudentData(dto: any): any {
        return {
            mockRegistrationId: dto[0].id,
            studentId: dto.student,
        };
    }
}
