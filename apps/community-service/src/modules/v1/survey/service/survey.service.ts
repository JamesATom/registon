// survey.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { CommonEntity } from 'src/common/libs/common.entity';
import { SurveyRepository } from '../repository/survey.repository';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { UpdateSurveyDto } from '../dto/update-survey.dto';
import { SubmitSurveyDto } from '../dto/submit-survey.dto';

@Injectable()
export class SurveyService {
    constructor(private readonly surveyRepository: SurveyRepository) {}

    async create(createSurveyDto: CreateSurveyDto): Promise<CommonEntity> {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Survey created successfully',
            data: await this.surveyRepository.create(createSurveyDto, { lean: true })
        };
    }

    async getAll(userId: string): Promise<CommonEntity> {
        const surveys: any[] = await this.surveyRepository.getAll({ lean: true });

        const dataWithFlag = surveys.map((s) => ({
            ...s,
            hasTaken: (s.takenBy || []).some((id: any) => id.toString() === userId),
        }));

        return {
            statusCode: HttpStatus.OK,
            message: 'Surveys retrieved successfully',
            data: dataWithFlag,
        };
    }

    async getOne(id: string): Promise<CommonEntity> {
        return { statusCode: HttpStatus.OK, message: 'Survey retrieved successfully', data: await this.surveyRepository.getOne(id, { lean: true }) };
    }

    async update(updateSurveyDto: UpdateSurveyDto): Promise<CommonEntity> {
        return { statusCode: HttpStatus.OK, message: 'Survey updated successfully', data: await this.surveyRepository.update(updateSurveyDto, { lean: true }) };
    }
    
    async delete(id: string): Promise<CommonEntity> {
        return { statusCode: HttpStatus.OK, message: 'Survey deleted successfully', data: await this.surveyRepository.delete(id, { lean: true }) };
    }

    async submit(submissions: SubmitSurveyDto): Promise<CommonEntity> {
        const { surveyId, questions, takenBy } = submissions;
        await this.surveyRepository.submit(surveyId, takenBy, questions);

        return {
            statusCode: HttpStatus.OK,
            message: 'Survey submitted successfully',
            data: {}
        };
    }

}
