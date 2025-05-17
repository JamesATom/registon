// survey.module.ts
import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';

@Module({
    imports: [CommunityService],
    controllers: [SurveyController],
    providers: [SurveyService],
})
export class SurveyModule {}
