// survey.event.ts
import { Controller, Logger, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Controller()
export class SurveyEvent {
    private readonly logger = new Logger(SurveyEvent.name);

    constructor(
		private readonly surveyService: SurveyService,
	) {}

    @MessagePattern(MessagePatterns.Survey.V1.CREATE)
    async create(@Body() createSurveyDto: CreateSurveyDto) {
		return this.surveyService.create(createSurveyDto);
    }
}
