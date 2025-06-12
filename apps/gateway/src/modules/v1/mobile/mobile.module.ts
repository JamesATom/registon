// mobile.module.ts
import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { MockRegisterModule } from './mock-register/mock-register.module';
import { IeltsRegisterModule } from './ielts-register/ielts-register.module';
import { JobHuntingModule } from './job-hunting/job-hunting.module';
import { SurveyModule } from './survey/survey.module';
import { EventModule } from './event/event.module';
import { StoryModule } from './story/story.module';

@Module({
    imports: [
        SharedModule,
        MockRegisterModule,
        IeltsRegisterModule,
        JobHuntingModule,
        SurveyModule,
        EventModule,
        StoryModule,
    ],
    exports: [
        MockRegisterModule,
        IeltsRegisterModule,
        JobHuntingModule,
        SurveyModule,
        EventModule,
        StoryModule,
    ],
})
export class MobileModule {}
