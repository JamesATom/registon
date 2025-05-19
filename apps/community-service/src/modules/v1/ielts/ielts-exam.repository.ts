import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { IeltsExam, IeltsExamDocument } from '../../../shared/models/ielts-exam.schema';

@Injectable()
export class IeltsExamRepository {
    constructor(
        @InjectModel(IeltsExam.name) private ieltsExamModel: PaginateModel<IeltsExamDocument>,
    ) {}

    async create(examData: any): Promise<IeltsExamDocument> {
        const newExam = new this.ieltsExamModel(examData);
        return newExam.save();
    }

    async findAll(query: any, options: any): Promise<any> {
        const ieltsExams = await this.ieltsExamModel.paginate(query, options);
        return ieltsExams;
    }

    async findById(id: string): Promise<IeltsExamDocument> {
        return this.ieltsExamModel.findById(id).exec();
    }

    async update(id: string, examData: any): Promise<IeltsExamDocument> {
        return this.ieltsExamModel.findByIdAndUpdate(id, { $set: examData }, { new: true }).exec();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.ieltsExamModel
            .findByIdAndUpdate(id, { $set: { isDeleted: true } })
            .exec();
        return !!result;
    }
}
