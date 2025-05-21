// survey.event.ts
import { Controller, Logger, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { CommonEntity } from 'src/common/libs/common.entity';
import { SurveyService } from './service/survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

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
}
