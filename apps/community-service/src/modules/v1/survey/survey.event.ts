// survey.event.ts
import { Controller, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from 'src/common/constants/message-pattern';
import { SurveyService } from './survey.service';

@Controller()
export class SurveyEvent {
    private readonly logger = new Logger(SurveyEvent.name);

    constructor(
		private readonly surveyService: SurveyService,
	) {}

    @MessagePattern(MessagePatterns.Survey.V1.GET_ALL)
    async findAllSurveys() {
		return this.surveyService.findAll();
        return [];
    }
}
