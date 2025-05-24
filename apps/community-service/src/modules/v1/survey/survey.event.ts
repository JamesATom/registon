// survey.event.ts
import { Controller, Logger, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CommonEntity } from 'src/common/libs/common.entity';
import { SurveyService } from './service/survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SubmitSurveyDto } from './dto/submit-survey.dto';

@Controller()
export class SurveyEvent {
    private readonly logger = new Logger(SurveyEvent.name);

    constructor(private readonly surveyService: SurveyService) {}

    @MessagePattern(MessagePatterns.Survey.V1.CREATE)
    async create(@Body() createSurveyDto: CreateSurveyDto[]): Promise<CommonEntity> {
        return this.surveyService.create(createSurveyDto);
    }

    @MessagePattern(MessagePatterns.Survey.V1.UPDATE)
    async update(@Payload() updateSurveyDto: UpdateSurveyDto[]): Promise<CommonEntity> {
        return this.surveyService.update(updateSurveyDto);
    }

    @MessagePattern(MessagePatterns.Survey.V1.GET_ALL)
    async getAll(): Promise<CommonEntity> {
        return this.surveyService.getAll();
    }

    @MessagePattern(MessagePatterns.Survey.V1.GET_ONE)
    async getOne(@Payload() id: string): Promise<CommonEntity> {
        return this.surveyService.getOne(id);
    }

    @MessagePattern(MessagePatterns.Survey.V1.DELETE)
    async delete(@Payload() id: string): Promise<CommonEntity> {
        return this.surveyService.delete(id);
    }

    @MessagePattern(MessagePatterns.Survey.V1.SUBMIT)
    async submit(@Payload() submitSurveyDto: SubmitSurveyDto[]): Promise<CommonEntity> {
        return this.surveyService.submit(submitSurveyDto);
    }
}
