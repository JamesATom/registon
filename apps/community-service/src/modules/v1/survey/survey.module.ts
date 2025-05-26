// survey.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from './schema/survey.schema';
import { SurveyService } from './service/survey.service';
import { SurveyEvent } from './survey.event';
import { SurveyRepository } from './repository/survey.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: Survey.name, schema: SurveySchema }])],
    controllers: [SurveyEvent],
    providers: [SurveyService, SurveyRepository],
})
export class SurveyModule {}
