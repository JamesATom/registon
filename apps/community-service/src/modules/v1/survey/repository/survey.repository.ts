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
export class SurveyRepository extends BaseRepository<Survey, CreateSurveyDto> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.SURVEY);
    }

    async createSurvey(dto: CreateSurveyDto): Promise<any> {
        const { branchId, questions, ...surveyData } = dto;
        
        // Start a transaction to ensure all operations succeed or fail together
        return this.knex.transaction(async (trx) => {
            // Create the survey
            const [survey] = await trx(TableNames.SURVEY)
                .insert({
                    ...surveyData,
                    branch: branchId,
                })
                .returning('*');
            
            // If there are questions, create them
            if (questions && questions.length > 0) {
                const questionsToInsert = questions.map(question => ({
                    surveyId: survey.id,
                    ...question,
                    answer1Qty: 0,
                    answer2Qty: 0,
                    answer3Qty: 0,
                    answer4Qty: 0,
                    answer5Qty: 0,
                }));
                
                const createdQuestions = await trx('surveyQuestion')
                    .insert(questionsToInsert)
                    .returning('*');
                
                // Add the questions to the survey object for response
                survey.questions = createdQuestions;
            }
            
            return survey;
        });
    }

    async getSurveys(filter?: SurveyFilterDto): Promise<any> {
        let query = this.knex(TableNames.SURVEY)
            .select('*');
        
        if (filter) {
            if (filter.branch) {
                query = query.where('branch', filter.branch);
            }
            
            if (filter.targetAudience) {
                query = query.where('targetAudience', filter.targetAudience);
            }
            
            if (filter.userId) {
                query = query.where('createdBy', filter.userId);
            }
            
            if (filter.search) {
                query = query.where(function() {
                    this.where('title', 'ILIKE', `%${filter.search}%`)
                        .orWhere('description', 'ILIKE', `%${filter.search}%`);
                });
            }
            
            if (filter.fromDate) {
                query = query.where('createdAt', '>=', filter.fromDate);
            }
            
            if (filter.toDate) {
                query = query.where('createdAt', '<=', filter.toDate);
            }
        }
        
        return query.orderBy('createdAt', 'desc');
    }

    async getSurveyWithQuestions(id: string): Promise<any> {
        const survey = await this.knex(TableNames.SURVEY)
            .where('id', id)
            .first();
        
        if (!survey) {
            return null;
        }
        
        const questions = await this.knex('surveyQuestion')
            .where('surveyId', id)
            .select('*');
        
        return {
            ...survey,
            questions,
        };
    }

    async updateSurvey(id: string, dto: any): Promise<any> {
        const { branchId, questions, ...surveyData } = dto;
        
        // Start a transaction to ensure all operations succeed or fail together
        return this.knex.transaction(async (trx) => {
            // Update the survey
            const [updatedSurvey] = await trx(TableNames.SURVEY)
                .where('id', id)
                .update({
                    ...surveyData,
                    ...(branchId ? { branch: branchId } : {}),
                    updatedAt: this.knex.fn.now(),
                })
                .returning('*');
            
            // If there are questions to update
            if (questions && questions.length > 0) {
                // Handle each question update or creation
                for (const question of questions) {
                    if (question.id) {
                        // Update existing question
                        await trx('surveyQuestion')
                            .where({
                                id: question.id,
                                surveyId: id,
                            })
                            .update(question);
                    } else {
                        // Create new question
                        await trx('surveyQuestion')
                            .insert({
                                surveyId: id,
                                ...question,
                                answer1Qty: 0,
                                answer2Qty: 0,
                                answer3Qty: 0,
                                answer4Qty: 0,
                                answer5Qty: 0,
                            });
                    }
                }
            }
            
            // Get updated questions
            const updatedQuestions = await trx('surveyQuestion')
                .where('surveyId', id)
                .select('*');
            
            return {
                ...updatedSurvey,
                questions: updatedQuestions,
            };
        });
    }

    async submitSurveyResponses(dto: SubmitSurveyDto): Promise<any> {
        return this.knex.transaction(async (trx) => {
            // First, record the participant
            const [participant] = await trx('surveyParticipant')
                .insert({
                    surveyId: dto.surveyId,
                    userId: dto.userId,
                    takenAt: this.knex.fn.now(),
                })
                .returning('*');
            
            // Then update the question answer counts
            for (const response of dto.responses) {
                const questionId = response.questionId;
                const answerColumn = `answer${response.answerIndex}Qty`;
                
                await trx('surveyQuestion')
                    .where({
                        id: questionId,
                        surveyId: dto.surveyId,
                    })
                    .increment(answerColumn, 1);
            }
            
            return participant;
        });
    }

    async deleteSurvey(id: string): Promise<any> {
        return super.delete(id);
    }
    
    async getSurveyParticipants(surveyId: string): Promise<SurveyParticipant[]> {
        return this.knex('surveyParticipant')
            .where('surveyId', surveyId)
            .select('*');
    }
    
    async checkUserParticipation(surveyId: string, userId: string): Promise<boolean> {
        const participant = await this.knex('surveyParticipant')
            .where({
                surveyId,
                userId,
            })
            .first();
        
        return !!participant;
    }
}
