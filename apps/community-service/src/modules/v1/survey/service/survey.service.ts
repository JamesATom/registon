// survey.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { CommonEntity } from 'src/common/libs/common.entity';
import { CreateSurveyRepository } from '../repository/create-survey.repository';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { UpdateSurveyDto } from '../dto/update-survey.dto';

@Injectable()
export class SurveyService {
    constructor(private readonly createSurveyRepository: CreateSurveyRepository) {}

    async create(createSurveyDto: CreateSurveyDto[]): Promise<CommonEntity> {
        return { statusCode: HttpStatus.CREATED, message: 'Survey created successfully', data: await this.createSurveyRepository.createMany(createSurveyDto, { lean: true }) };
    }

    async update(updateSurveyDto: UpdateSurveyDto[]): Promise<CommonEntity> {
        return { statusCode: HttpStatus.OK, message: 'Survey updated successfully', data: await this.createSurveyRepository.updateOne(updateSurveyDto, { lean: true }) };
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
