// survey.module.ts
import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyEvent } from './survey.event';

@Module({
    controllers: [SurveyEvent],
    providers: [SurveyService],
})
export class SurveyModule {}
