// survey.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CreateSurveyRepository } from '../repository/create-survey.repository';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { UpdateSurveyDto } from '../dto/update-survey.dto';
import { SubmitSurveyDto } from '../dto/submit-survey.dto';

@Injectable()
export class SurveyService {
    constructor(private readonly createSurveyRepository: CreateSurveyRepository) {}

    async create(createSurveyDto: CreateSurveyDto[]): Promise<CommonEntity> {
        return { statusCode: HttpStatus.CREATED, message: 'Survey created successfully', data: await this.createSurveyRepository.createMany(createSurveyDto, { lean: true }) };
    }

    async update(updateSurveyDto: UpdateSurveyDto[]): Promise<CommonEntity> {
        return { statusCode: HttpStatus.OK, message: 'Survey updated successfully', data: await this.createSurveyRepository.updateOne(updateSurveyDto, { lean: true }) };
    }
    
    async getAll(): Promise<CommonEntity> {
        return { statusCode: HttpStatus.OK, message: 'Surveys retrieved successfully', data: await this.createSurveyRepository.getAll({ lean: true }) };
    }

    async getOne(id: string): Promise<CommonEntity> {
        return { statusCode: HttpStatus.OK, message: 'Survey retrieved successfully', data: await this.createSurveyRepository.getOne(id, { lean: true }) };
    }
    
    async delete(id: string): Promise<CommonEntity> {
        return { statusCode: HttpStatus.OK, message: 'Survey deleted successfully', data: await this.createSurveyRepository.delete(id, { lean: true }) };
    }

    async submit(submissions: SubmitSurveyDto[]): Promise<CommonEntity> {
        const results = [];
        for (const submission of submissions) {
            const { surveyId, answer1, answer2, answer3, answer4, answer5, takenBy } = submission;
            console.log('submission:', submission);

            if (!surveyId) {
                return {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Survey ID is required',
                    data: null,
                };
            }

            const answerField1 = `${answer1}Qty`;
            const answerField2 = `${answer2}Qty`;
            const answerField3 = `${answer3}Qty`;
            const answerField4 = `${answer4}Qty`;
            const answerField5 = `${answer5}Qty`;

            // const updateResult = await this.createSurveyRepository.incrementAnswerAndTrackUser(
            //     surveyId,
            //     takenBy,
            //     {
            //         [answerField1]: answer1 ? 1 : 0,
            //         [answerField2]: answer2 ? 1 : 0,
            //         [answerField3]: answer3 ? 1 : 0,
            //         [answerField4]: answer4 ? 1 : 0,
            //         [answerField5]: answer5 ? 1 : 0,
            //     }
            // );

            // results.push({
            //     surveyId,
            //     updated: updateResult.modifiedCount > 0,
            //     alreadySubmitted: updateResult.modifiedCount === 0,
            // });
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'Survey submissions processed',
            data: results,
        };
    }

}
