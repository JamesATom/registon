// create-survey.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InsertManyOptions, Model, QueryOptions } from 'mongoose';
import { Survey, SurveyDocument } from '../schema/survey.schema';

@Injectable()
export class CreateSurveyRepository {
    constructor(@InjectModel(Survey.name) private readonly surveyModel: Model<SurveyDocument>) {}

    async createMany(createSurveyDtos: any[], options?: InsertManyOptions): Promise<SurveyDocument[]> {
        console.log('createSurveyDtos', createSurveyDtos);
        return this.surveyModel.insertMany(createSurveyDtos, options); 
    }

    async updateOne(updateSurveyDto: any, options?: QueryOptions): Promise<SurveyDocument> {
        console.log('updateSurveyDto', updateSurveyDto);
        return this.surveyModel.findOneAndUpdate({ _id: updateSurveyDto.id }, updateSurveyDto, { new: true, ...options });
    }

    async getAll(options?: QueryOptions): Promise<SurveyDocument[]> {
        return this.surveyModel.find({}, {}, options).lean();
    }

    async getOne(id: string, options?: QueryOptions): Promise<SurveyDocument> {
        return this.surveyModel.findById(id, {}, options).lean();
    }
}
