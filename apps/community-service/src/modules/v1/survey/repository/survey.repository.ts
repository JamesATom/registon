// survey.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { Survey, SurveyQuestion, SurveyParticipant } from '../interface/survey.interface';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { SurveyFilterDto } from '../dto/filter-survey.dto';
import { SubmitSurveyDto } from '../dto/submit-survey.dto';

@Injectable()
export class SurveyRepository extends BaseRepository<Survey, any> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.SURVEY);
    }

    async createSurvey(dto: CreateSurveyDto): Promise<any> {
        const { questions, ...surveyData } = dto;
        return this.knex.transaction(async trx => {
            const [createdSurvey]: any = await super.create(surveyData);
            if (questions && questions.length > 0) {
                const questionsToInsert = questions.map(question => ({
                    surveyId: createdSurvey.id,
                    ...question,
                    answer1Qty: 0,
                    answer2Qty: 0,
                    answer3Qty: 0,
                    answer4Qty: 0,
                    answer5Qty: 0,
                }));

                const createdQuestions = await trx('surveyQuestion').insert(questionsToInsert).returning('*');

                createdSurvey.questions = createdQuestions;
            }

            return createdSurvey;
        });
    }

    async getSurveys(filter?: SurveyFilterDto & { page?: number; limit?: number }): Promise<{ data: Survey[]; pagination: { totalItems: number; itemsPerPage: number; currentPage: number; totalPages: number } }> {
        const { page, limit, ...restFilter } = filter || {};
        
        if (Object.keys(restFilter || {}).length > 0) {
            const query = this.knex(this.tableName);
            
            // Apply filters
            Object.entries(restFilter).forEach(([key, value]) => {
                if (value !== undefined) {
                    query.where(key, value);
                }
            });

            const [totalItems] = await query.clone().count('* as count');
            const data = await query
                .select('*')
                .offset(((page || 1) - 1) * (limit || 10))
                .limit(limit || 10);

            const totalPages = Math.ceil(Number(totalItems.count) / (limit || 10));

            return {
                data,
                pagination: {
                    totalItems: Number(totalItems.count),
                    itemsPerPage: limit || 10,
                    currentPage: page || 1,
                    totalPages,
                }
            };
        }

        return super.getAll({ page, limit });
    }

    async getSurveyWithQuestions(id: string): Promise<any> {
        const survey = await super.getOne(id);

        if (!survey) {
            return null;
        }

        const questions = await this.knex('surveyQuestion').where('surveyId', survey.id).select('*');

        return {
            ...survey,
            questions,
        };
    }

    async updateSurvey(id: string, dto: any): Promise<any> {
        const { questions, ...surveyData } = dto;
        return this.knex.transaction(async trx => {
            const [updatedSurvey] = await super.update(id, surveyData);

            if (questions && questions.length > 0) {
                for (const question of questions) {
                    await trx('surveyQuestion')
                        .where('id', question.id)
                        .update({
                            question: question.question,
                            description: question.description,
                            answer1: question.answer1,
                            answer2: question.answer2,
                            answer3: question.answer3 || null,
                            answer4: question.answer4 || null,
                            answer5: question.answer5 || null,
                        });
                }
            }

            const updatedQuestions = await trx('surveyQuestion').where('surveyId', id).select('*');

            return {
                ...updatedSurvey,
                questions: updatedQuestions,
            };
        });
    }

    async deleteSurvey(id: string): Promise<any> {
        return super.delete(id);
    }
}
