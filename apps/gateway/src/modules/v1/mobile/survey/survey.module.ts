// survey.module.ts
import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { SurveyController } from './controller/survey.controller';
import { SurveyService } from './service/survey.service';

@Module({
    imports: [CommunityService],
    controllers: [SurveyController],
    providers: [SurveyService],
    exports: [SurveyService],
})
export class SurveyModule {}
