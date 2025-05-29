// create-survey.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InsertManyOptions, Model, QueryOptions, Types } from 'mongoose';
import { Survey, SurveyDocument } from '../schema/survey.schema';

@Injectable()
export class SurveyRepository {
    constructor(@InjectModel(Survey.name) private readonly surveyModel: Model<SurveyDocument>) {}

    async create(survey: any, options?: QueryOptions): Promise<SurveyDocument> {
        return this.surveyModel.create(survey);
    }

    async getAll(options?: QueryOptions): Promise<SurveyDocument[]> {
        return this.surveyModel
            .find({})
            .select(
                'image title targetAudience takenBy questions._id questions.question questions.answer1 questions.answer2',
            )
            .setOptions(options)
            .lean();
    }

    async getOne(id: string, options?: QueryOptions): Promise<SurveyDocument> {
        return this.surveyModel
            .findById(id)
            .select(
                'image title targetAudience branch questions._id questions.question questions.description questions.answer1 questions.answer2 questions.answer3 questions.answer4 questions.answer5',
            )
            .setOptions(options)
            .lean();
    }

    async update(updateSurveyDto: any, options?: QueryOptions): Promise<SurveyDocument> {
        return this.surveyModel
            .findOneAndUpdate({ _id: updateSurveyDto.id }, updateSurveyDto, {
                new: true,
                ...options,
            })
            .select(
                'image title targetAudience branch questions.question questions.description questions.answer1 questions.answer2 questions.answer3 questions.answer4 questions.answer5',
            )
            .setOptions(options);
    }

    async delete(id: string, options?: QueryOptions): Promise<SurveyDocument> {
        return this.surveyModel.findByIdAndDelete(id, options).lean();
    }

    async submit(surveyId: string, takenBy: string, questions: any): Promise<void> {
        const survey = await this.surveyModel.findById(surveyId);
        if (survey.takenBy.includes(new Types.ObjectId(takenBy))) return;

        questions.forEach(q => {
            const sub = (survey.questions as any[]).find(subDoc => subDoc._id.toString() === q.id);

            if (!sub) return;

            if (q.answer1) {
                sub.answer1Qty += 1;
            }
            if (q.answer2) {
                sub.answer2Qty += 1;
            }
            if (q.answer3) {
                sub.answer3Qty += 1;
            }
            if (q.answer4) {
                sub.answer4Qty += 1;
            }
            if (q.answer5) {
                sub.answer5Qty += 1;
            }
        });

        survey.takenBy = survey.takenBy || [];
        survey.takenBy.push(new Types.ObjectId(takenBy));
        await survey.save();
    }
}
