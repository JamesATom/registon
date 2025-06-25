// survey.event.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { SurveyService } from './service/survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SurveyFilterDto } from './dto/filter-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SubmitSurveyDto } from './dto/submit-survey.dto';

@Controller()
export class SurveyEvent {
    constructor(private readonly surveyService: SurveyService) {}

    @MessagePattern(MessagePatterns.Survey.V1.CREATE)
    async create(@Payload() createSurveyDto: CreateSurveyDto) {
        return this.surveyService.create(createSurveyDto);
    }

    @MessagePattern(MessagePatterns.Survey.V1.GET_ALL)
    async getAll(@Payload() filter: SurveyFilterDto) {
        return this.surveyService.getAll(filter);
    }

    @MessagePattern(MessagePatterns.Survey.V1.GET_ONE)
    async getOne(@Payload() id: string) {
        return this.surveyService.getOne(id);
    }

    @MessagePattern(MessagePatterns.Survey.V1.UPDATE)
    async update(@Payload() { id, updateSurveyDto }: { id: string; updateSurveyDto: UpdateSurveyDto }) {
        return this.surveyService.update(id, updateSurveyDto);
    }

    @MessagePattern(MessagePatterns.Survey.V1.DELETE)
    async delete(@Payload() id: string) {
        return this.surveyService.delete(id);
    }
    
}
