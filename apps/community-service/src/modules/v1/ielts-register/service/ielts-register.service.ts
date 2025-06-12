// ielts-register.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { IeltsRegisterRepository } from '../repository/ielts-register.repository';
import { CreateIeltsRegisterDto } from '../dto/create-ielts-register.dto';
import { UpdateIeltsRegisterDto } from '../dto/update-ielts-register.dto';

@Injectable()
export class IeltsRegisterService {
    constructor(private readonly ieltsRegisterRepository: IeltsRegisterRepository) {}

    async create(createIeltsRegisterDto: any): Promise<any> {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Ielts registration created successfully',
            data: await this.ieltsRegisterRepository.create(createIeltsRegisterDto),
        };
    }

    async getAll(): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Ielts registrations retrieved successfully',
            data: await this.ieltsRegisterRepository.getAll(),
        };
    }

    async getOne(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Ielts registration with ID ${id} retrieved successfully`,
            data: await this.ieltsRegisterRepository.getOne(id),
        };
    }

    async update(id: string, updateIeltsRegisterDto: UpdateIeltsRegisterDto): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Ielts registration with ID ${id} updated successfully`,
            data: await this.ieltsRegisterRepository.update(id, updateIeltsRegisterDto),
        }
    }

    async delete(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Ielts registration with ID ${id} deleted successfully`,
            data: await this.ieltsRegisterRepository.delete(id),
        }
    }

    async registerForExam(examId: string, studentId: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Student with ID ${studentId} registered for exam with ID ${examId} successfully`,
            data: await this.ieltsRegisterRepository.registerForExam(examId, studentId),
        };
    }
}
