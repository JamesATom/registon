import { HttpStatus, Injectable } from '@nestjs/common';
import { IeltsExamRepository } from './ielts-exam.repository';

@Injectable()
export class IeltsExamService {
    constructor(private readonly ieltsExamRepository: IeltsExamRepository) {}

    async createExam(examData: any, userId: string) {
        return this.ieltsExamRepository.create({ ...examData, createdBy: userId });
    }

    async findExamById(id: string) {
        return await this.ieltsExamRepository.findById(id);
    }

    async updateExam(updateData: any, id: string, userId: string) {
        return await this.ieltsExamRepository.update(id, {
            ...updateData,
            updatedBy: userId,
        });
    }

    async deleteExam(id: string, userId: string) {
        return await this.ieltsExamRepository.delete(id);
    }

    async findAllExams(filterDto: any): Promise<any> {
        const { page, limit } = filterDto;

        const options = {
            page,
            limit,
            sort: { createdAt: -1 },
        };

        const paginationResult = await this.ieltsExamRepository.findAll(filterDto, options);
        const { docs, ...pagination } = paginationResult;

        return {
            statusCode: HttpStatus.OK,
            message: 'IELTS exams fetched successfully',
            data: docs,
            pagination,
        };
    }
}
