import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { IeltsExamRepository } from './ielts-exam.repository';

@Injectable()
export class IeltsExamService {
    constructor(private readonly ieltsExamRepository: IeltsExamRepository) {}

    async createExam(examData: any, userId: string) {
        const createExamData = {
            ...examData,
            createdBy: userId,
        };

        return this.ieltsExamRepository.create(createExamData);
    }

    async findExamById(id: string) {
        const exam = await this.ieltsExamRepository.findById(id);

        if (!exam) {
            throw new NotFoundException(`IELTS exam with ID ${id} not found`);
        }

        return {
            status: 'success',
            statusCode: HttpStatus.OK,
            message: 'IELTS exam fetched successfully',
            data: exam,
        };
    }

    async updateExam(updateData: any, id: string, userId: string) {
        const exam = await this.ieltsExamRepository.findById(id);

        if (!exam) {
            throw new NotFoundException(`IELTS exam with ID ${id} not found`);
        }
        const updatedExam = await this.ieltsExamRepository.update(id, {
            ...updateData,
            updatedBy: userId,
        });

        return {
            status: 'success',
            statusCode: HttpStatus.OK,
            message: 'IELTS exam updated successfully',
            data: updatedExam,
        };
    }

    async deleteExam(id: string, userId: string) {
        const exam = await this.ieltsExamRepository.findById(id);

        if (!exam) {
            throw new NotFoundException(`IELTS exam with ID ${id} not found`);
        }

        const deleted = await this.ieltsExamRepository.delete(id);

        if (!deleted) {
            throw new Error(`Failed to delete IELTS exam with ID ${id}`);
        }

        return {
            status: 'success',
            statusCode: HttpStatus.OK,
            message: 'IELTS exam deleted successfully',
            data: deleted,
        };
    }

    async findAllExams(filterDto: any) {
        const { page, limit, search, status, fromDate, toDate } = filterDto;

        const query: any = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        if (status) {
            query.status = status;
        }

        if (fromDate || toDate) {
            query.examDate = {};

            if (fromDate) {
                query.examDate.$gte = new Date(fromDate);
            }

            if (toDate) {
                query.examDate.$lte = new Date(toDate);
            }
        }
        const options = {
            page: page,
            limit: limit,
            sort: { createdAt: -1 },
        };

        const ieltsExams = await this.ieltsExamRepository.findAll(query, options);

        return {
            status: 'success',
            message: 'IELTS exams fetched successfully',
            statusCode: HttpStatus.OK,
            data: ieltsExams,
        };
    }
}
