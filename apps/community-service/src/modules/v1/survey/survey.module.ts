// survey.module.ts
import { Module } from '@nestjs/common';
import { SurveyService } from './service/survey.service';
import { SurveyEvent } from './survey.event';
import { SurveyRepository } from './repository/survey.repository';

@Module({
    controllers: [SurveyEvent],
    providers: [SurveyService, SurveyRepository],
})
export class SurveyModule {}
