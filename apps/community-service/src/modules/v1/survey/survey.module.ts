// survey.module.ts
import { Module } from '@nestjs/common';
import { ExternalModule } from '../external/external.module';
import { SurveyService } from './survey.service';
import { SurveyEvent } from './survey.event';

@Module({
    imports: [ExternalModule],
    controllers: [SurveyEvent],
    providers: [SurveyService],
})
export class SurveyModule {}
