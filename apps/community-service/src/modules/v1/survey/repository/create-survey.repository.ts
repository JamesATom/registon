// create-survey.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InsertManyOptions, Model, QueryOptions } from 'mongoose';
import { Survey, SurveyDocument } from '../schema/survey.schema';

@Injectable()
export class CreateSurveyRepository {
    constructor(@InjectModel(Survey.name) private readonly surveyModel: Model<SurveyDocument>) {}

    async createMany(createSurveyDtos: any[], options?: InsertManyOptions): Promise<SurveyDocument[]> {
        return this.surveyModel.insertMany(createSurveyDtos, options); 
    }

    async updateOne(updateSurveyDto: any, options?: QueryOptions): Promise<SurveyDocument> {
        return this.surveyModel.findOneAndUpdate({ _id: updateSurveyDto.id }, updateSurveyDto, { new: true, ...options });
    }

    async getAll(options?: QueryOptions): Promise<SurveyDocument[]> {
        return this.surveyModel.find({}, {}, options).lean();
    }

    async getOne(id: string, options?: QueryOptions): Promise<SurveyDocument> {
        return this.surveyModel.findById(id, {}, options).lean();
    }

    async delete(id: string, options?: QueryOptions): Promise<SurveyDocument> {
        return this.surveyModel.findByIdAndDelete(id, options).lean();
    }

    async submit(submitSurveyDto: any, options?: QueryOptions): Promise<void> {
        console.log('Submitting survey:', submitSurveyDto);
        // const result = await this.surveyModel.create(submitSurveyDto, options);
        // console.log('Survey submitted:', result);
    }

    async incrementAnswerAndTrackUser(surveyId: string, userId: string, answerQtyField: any): Promise<{ modifiedCount: number }> {
        const result = await this.surveyModel.updateOne(
            {
                _id: surveyId,
                takenBy: { $ne: userId }, 
            },
            {
                $addToSet: { takenBy: userId },
                $inc: { [answerQtyField]: 1 }
            }
        );

        return { modifiedCount: result.modifiedCount };
    }

}
