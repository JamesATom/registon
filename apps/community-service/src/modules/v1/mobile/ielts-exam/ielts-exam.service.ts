import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ServiceResponse } from '../../../../common/interfaces/service-response.interface';
import { MobileIeltsExamRepository } from './ielts-exam.repository';

@Injectable()
export class MobileIeltsExamService {
    constructor(private readonly ieltsExamRepository: MobileIeltsExamRepository) {}

    async getAllIeltsExamDays(location: string): Promise<ServiceResponse<any[]>> {
        return this.ieltsExamRepository.getAllIeltsExamDays(location);
    }

    async registerForExam(examId: string, studentInformation: any): Promise<ServiceResponse<any>> {
        return this.ieltsExamRepository.registerForExam(examId, studentInformation);
    }

    async getRegistredExams(studentId: string): Promise<ServiceResponse<any>> {
        return this.ieltsExamRepository.getRegistredExams(studentId);
    }

    async findExamById(id: string): Promise<ServiceResponse<any>> {
        return this.ieltsExamRepository.findById(id);
    }
}
