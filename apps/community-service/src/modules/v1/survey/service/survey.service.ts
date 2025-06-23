// survey.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { SurveyRepository } from '../repository/survey.repository';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { UpdateSurveyDto } from '../dto/update-survey.dto';
import { SurveyFilterDto } from '../dto/filter-survey.dto';
import { SubmitSurveyDto } from '../dto/submit-survey.dto';

@Injectable()
export class SurveyService {
    constructor(private readonly surveyRepository: SurveyRepository) {}

    async create(createSurveyDto: CreateSurveyDto): Promise<any> {
        const createdSurvey = await this.surveyRepository.createSurvey(createSurveyDto);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Survey created successfully',
            data: createdSurvey || {},
        };
    }

    async getAll(filter?: SurveyFilterDto): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Surveys retrieved successfully',
            data: (await this.surveyRepository.getSurveys(filter)) || [],
        };
    }

    async getOne(id: string): Promise<any> {
        const survey = await this.surveyRepository.getSurveyWithQuestions(id);
        
        if (!survey) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: `Survey with ID ${id} not found`,
                data: {},
            };
        }
        
        return {
            statusCode: HttpStatus.OK,
            message: `Survey with ID ${id} retrieved successfully`,
            data: survey || {},
        };
    }

    async update(id: string, updateSurveyDto: UpdateSurveyDto): Promise<any> {
        const survey = await this.surveyRepository.getOne(id);
        
        if (!survey) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: `Survey with ID ${id} not found`,
                data: {},
            };
        }
        
        const updatedSurvey = await this.surveyRepository.updateSurvey(id, updateSurveyDto);

        return {
            statusCode: HttpStatus.OK,
            message: `Survey with ID ${id} updated successfully`,
            data: updatedSurvey || {},
        };
    }

    async delete(id: string): Promise<any> {
        const survey = await this.surveyRepository.getOne(id);
        
        if (!survey) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: `Survey with ID ${id} not found`,
                data: {},
            };
        }
        
        await this.surveyRepository.deleteSurvey(id);
        
        return {
            statusCode: HttpStatus.OK,
            message: `Survey with ID ${id} deleted successfully`,
            data: { id },
        };
    }
    
    async submitSurvey(submitSurveyDto: SubmitSurveyDto): Promise<any> {
        // Check if the survey exists
        const survey = await this.surveyRepository.getOne(submitSurveyDto.surveyId);
        
        if (!survey) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: `Survey with ID ${submitSurveyDto.surveyId} not found`,
                data: {},
            };
        }
        
        // Check if user already participated
        const hasParticipated = await this.surveyRepository.checkUserParticipation(
            submitSurveyDto.surveyId,
            submitSurveyDto.userId
        );
        
        if (hasParticipated) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: `User with ID ${submitSurveyDto.userId} has already participated in this survey`,
                data: {},
            };
        }
        
        const result = await this.surveyRepository.submitSurveyResponses(submitSurveyDto);
        
        return {
            statusCode: HttpStatus.OK,
            message: 'Survey responses submitted successfully',
            data: result || {},
        };
    }
}
