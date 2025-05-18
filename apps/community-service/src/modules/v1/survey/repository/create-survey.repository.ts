// create-survey.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Survey, SurveyDocument } from '../schema/survey.schema';

@Injectable()
export class CreateSurveyRepository {
    constructor(
        @InjectModel(Survey.name)
        private readonly surveyModel: Model<SurveyDocument>,
    ) {}

    async createOne(createSurveyDto: any): Promise<Survey> {
        const newSurvey = await this.surveyModel.create({
            createdBy: createSurveyDto.createdBy,
            commentAdmin: createSurveyDto.commentAdmin,
            question: createSurveyDto.question,
            description: createSurveyDto.description,
            image: createSurveyDto.image,
            answer1: createSurveyDto.answer1,
            answer2: createSurveyDto.answer2,
            answer3: createSurveyDto.answer3,
            answer4: createSurveyDto.answer4,
            answer5: createSurveyDto.answer5,
            branch: createSurveyDto.branch,
            targetAudience: createSurveyDto.targetAudience,
        });

        return newSurvey;
    }

    async createMany(createSurveyDtos: any[]): Promise<void> {
        const payload = createSurveyDtos.map(dto => ({
            createdBy: dto.createdBy,
            commentAdmin: dto.commentAdmin,
            question: dto.question,
            description: dto.description,
            image: dto.image,
            answer1: dto.answer1,
            answer2: dto.answer2,
            answer3: dto.answer3,
            answer4: dto.answer4,
            answer5: dto.answer5,
            branch: dto.branch,
            targetAudience: dto.targetAudience,
        }));

        await this.surveyModel.insertMany(payload);
    }
}
