// survey.service.ts
import { Injectable } from '@nestjs/common';
import { CommonEntity } from 'src/common/libs/common.entity';
import type { Survey } from '../schema/survey.schema';
import { CreateSurveyRepository } from '../repository/create-survey.repository';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { UpdateSurveyDto } from '../dto/update-survey.dto';

@Injectable()
export class SurveyService {
    constructor(private readonly createSurveyRepository: CreateSurveyRepository) {}

    async create(createSurveyDto: CreateSurveyDto[]): Promise<CommonEntity> {
        await this.createSurveyRepository.createMany(createSurveyDto);
        return { status: 'success', message: 'Survey created successfully' };
    }

    // findAll() {
    //     return `This action returns all survey`;
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} survey`;
    // }

    // update(id: number, updateSurveyDto: UpdateSurveyDto) {
    //     return `This action updates a #${id} survey`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} survey`;
    // }
}
