// web.module.ts
import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { MockRegisterModule } from './mock-register/mock-register.module';
import { IeltsRegisterModule } from './ielts-register/ielts-register.module';
import { JobHuntingModule } from './job-hunting/job-hunting.module';
import { SurveyModule } from './survey/survey.module';
import { EventModule } from './event/event.module';
import { StoryModule } from './story/story.module';
import { UniversitySearchModule } from './university-search/university-search.module';

@Module({
    imports: [
        SharedModule,
        SurveyModule,
        StoryModule,
        EventModule,
        MockRegisterModule,
        IeltsRegisterModule,
        JobHuntingModule,
        UniversitySearchModule,
    ],
    exports: [
        SurveyModule,
        StoryModule,
        EventModule,
        MockRegisterModule,
        IeltsRegisterModule,
        JobHuntingModule,
        UniversitySearchModule,
    ],
})
export class WebModule {}
