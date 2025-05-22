import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, Types, PaginateOptions } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { IeltsExam, IeltsExamDocument } from '../../../shared/models/ielts-exam.schema';
import { ServiceResponse, PaginateResult } from 'src/common/interfaces/service-response.interface';

@Injectable()
export class IeltsExamRepository {
    constructor(
        @InjectModel(IeltsExam.name) private ieltsExamModel: PaginateModel<IeltsExamDocument>,
    ) {}

    async create(examData: any): Promise<ServiceResponse<IeltsExamDocument>> {
        const newExam = new this.ieltsExamModel(examData);
        const savedExam = await newExam.save();
        if (!savedExam) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to create IELTS exam',
            };
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'IELTS exam created successfully',
            data: savedExam,
        };
    }

    async findById(id: string): Promise<ServiceResponse<IeltsExamDocument>> {
        const exam = await this.ieltsExamModel.findById(id).exec();
        if (!exam) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: 'IELTS exam not found',
            };
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'IELTS exam found successfully',
            data: exam,
        };
    }

    async update(id: string, examData: any): Promise<ServiceResponse<IeltsExamDocument>> {
        const updatedExam = await this.ieltsExamModel
            .findByIdAndUpdate(id, { $set: examData }, { new: true })
            .exec();
        return {
            statusCode: HttpStatus.OK,
            message: 'IELTS exam updated successfully',
            data: updatedExam,
        };
    }

    async delete(id: string): Promise<ServiceResponse<boolean>> {
        const exam = await this.ieltsExamModel.findById(id, { isDeleted: false }).exec();

        if (!exam) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: 'IELTS exam not found',
            };
        }

        const deletedExam = await this.ieltsExamModel
            .findByIdAndUpdate(id, { $set: { isDeleted: true } })
            .exec();

        if (!deletedExam) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to delete IELTS exam',
            };
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'IELTS exam deleted successfully',
            data: !!deletedExam,
        };
    }

    async findAll(filterDto: any, options: any): Promise<PaginateResult<IeltsExamDocument>> {
        const query = this.buildQuery(filterDto);
        const ieltsExams = await this.ieltsExamModel.paginate(query, options);
        return ieltsExams;
    }

    buildQuery(filterDto: any): any {
        const { search, status, fromDate, toDate } = filterDto;
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

        return query;
    }
}
