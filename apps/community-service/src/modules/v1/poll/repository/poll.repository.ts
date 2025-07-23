// poll.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { TableNames } from 'src/common/constants/table-names';
import { Poll, PollQuestion } from '../interface/poll.interface';
import { CreatePollDto } from '../dto/create-poll.dto';

@Injectable()
export class PollRepository extends BaseRepository<Poll, any> {
    constructor(@InjectKnex() protected readonly knex: Knex) {
        super(knex, TableNames.POLL);
    }

    async createPoll(dto: CreatePollDto): Promise<any> {
        const { questions, ...pollData } = dto;
        return this.knex.transaction(async trx => {
            const [createdPoll]: any = await super.create(pollData);
            if (questions && questions.length > 0) {
                const questionsToInsert = questions.map(question => ({
                    pollId: createdPoll.id,
                    ...question,
                    answer1Qty: 0,
                    answer2Qty: 0,
                    answer3Qty: 0,
                    answer4Qty: 0,
                    answer5Qty: 0,
                }));

                const createdQuestions = await trx('pollQuestion').insert(questionsToInsert).returning('*');

                createdPoll.questions = createdQuestions;
            }

            return createdPoll;
        });
    }

    async getPolls(paginationParams?: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: Poll[];
        pagination: { totalItems: number; itemsPerPage: number; currentPage: number; totalPages: number };
    }> {
        return super.getAll(paginationParams);
    }

    async getPollWithQuestions(id: string): Promise<any> {
        const poll = await super.getOne(id);

        if (!poll) {
            return null;
        }

        const questions = await this.knex('pollQuestion').where('pollId', poll.id).select('*');

        return {
            ...poll,
            questions,
        };
    }

    async updatePoll(id: string, dto: any): Promise<any> {
        const { questions, ...pollData } = dto;
        return this.knex.transaction(async trx => {
            const [updatedPoll] = await super.update(id, pollData);

            if (questions && questions.length > 0) {
                for (const question of questions) {
                    await trx('pollQuestion')
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

            const updatedQuestions = await trx('pollQuestion').where('pollId', id).select('*');

            return {
                ...updatedPoll,
                questions: updatedQuestions,
            };
        });
    }

    async deletePoll(id: string): Promise<any> {
        return super.delete(id);
    }
}
