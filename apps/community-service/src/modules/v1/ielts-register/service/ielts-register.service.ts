// ielts-register.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { IeltsRegisterRepository } from '../repository/ielts-register.repository';
import { CreateIeltsRegisterDto } from '../dto/create-ielts-register.dto';
import { UpdateIeltsRegisterDto } from '../dto/update-ielts-register.dto';

@Injectable()
export class IeltsRegisterService {
    constructor(private readonly ieltsRegisterRepository: IeltsRegisterRepository) {}

    async create(createIeltsRegisterDto: CreateIeltsRegisterDto): Promise<any> {
        const ieltsExamData = this.prepareIeltsExamData(createIeltsRegisterDto);
        const createdIeltsExam = await this.ieltsRegisterRepository.createIeltsExam(ieltsExamData);
        const ieltsRegistrationStudentData = this.prepareIeltsRegistrationStudentData({
            ...createdIeltsExam,
            student: createIeltsRegisterDto.student,
        });
        await this.ieltsRegisterRepository.createIeltsRegistrationStudent(ieltsRegistrationStudentData);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'IELTS registration created successfully',
            data: ieltsExamData || {},
        };
    }

    async getAll(): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: 'IELTS registrations retrieved successfully',
            data: (await this.ieltsRegisterRepository.getAll()) || {},
        };
    }

    async getOne(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `IELTS registration with ID ${id} retrieved successfully`,
            data: (await this.ieltsRegisterRepository.getOne(id)) || {},
        };
    }

    async update(id: string, updateIeltsRegisterDto: UpdateIeltsRegisterDto): Promise<any> {
        const ieltsExamData = this.prepareIeltsExamData(updateIeltsRegisterDto);
        const updatedIeltsExam = await this.ieltsRegisterRepository.updateIeltsExam(id, ieltsExamData);
        const ieltsRegistrationStudentData = this.prepareIeltsRegistrationStudentData({
            ...updatedIeltsExam,
            student: updateIeltsRegisterDto.student,
        });
        await this.ieltsRegisterRepository.updateIeltsRegistrationStudent(id, ieltsRegistrationStudentData);

        return {
            statusCode: HttpStatus.OK,
            message: `IELTS registration with ID ${id} updated successfully`,
            data: updatedIeltsExam,
        };
    }

    async delete(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `IELTS registration with ID ${id} deleted successfully`,
            data: await this.ieltsRegisterRepository.delete(id),
        };
    }

    private prepareIeltsExamData(dto: any): any {
        const { cityId, student, date_exam, ...examData } = dto;
        return {
            ...examData,
            cityId,
            dateExam: new Date(date_exam),
        };
    }

    private prepareIeltsRegistrationStudentData(dto: any): any {
        return {
            examId: dto[0].id,
            studentId: dto.student,
        };
    }
}
