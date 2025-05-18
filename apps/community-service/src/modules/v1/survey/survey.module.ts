// survey.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from './schema/survey.schema';
import { SurveyService } from './service/survey.service';
import { SurveyEvent } from './survey.event';
import { CreateSurveyRepository } from './repository/create-survey.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: Survey.name, schema: SurveySchema }])],
    controllers: [SurveyEvent],
    providers: [SurveyService, CreateSurveyRepository],
})
export class SurveyModule {}
