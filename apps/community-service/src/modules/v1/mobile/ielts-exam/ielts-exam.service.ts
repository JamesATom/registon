import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ServiceResponse } from '../../../../common/interfaces/service-response.interface';
import { MobileIeltsExamRepository } from './ielts-exam.repository';

@Injectable()
export class MobileIeltsExamService {
    constructor(private readonly ieltsExamRepository: MobileIeltsExamRepository) {}

    async getAllIeltsExamDays(city: string, examType: string): Promise<ServiceResponse<any[]>> {
        return this.ieltsExamRepository.getAllIeltsExamDays(city, examType);
    }

    async findExamById(id: string): Promise<ServiceResponse<any>> {
        return this.ieltsExamRepository.findById(id);
    }

    async registerForExam(
        studentInformation: any,
        studentId: string,
    ): Promise<ServiceResponse<any>> {
        return this.ieltsExamRepository.registerForExam(studentInformation, studentId);
    }

    async getRegistredExams(studentId: string, examType: string): Promise<ServiceResponse<any>> {
        return this.ieltsExamRepository.getRegistredExams(studentId, examType);
    }
}
