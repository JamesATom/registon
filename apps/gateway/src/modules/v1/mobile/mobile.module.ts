// mobile.module.ts
import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { MockRegisterModule } from './mock-register/mock-register.module';
import { SurveyModule } from './survey/survey.module';
import { EventModule } from './event/event.module';
import { StoryModule } from './story/story.module';

@Module({
    imports: [
        SharedModule,
        MockRegisterModule,
        SurveyModule,
        EventModule,
        StoryModule,
    ],
    exports: [
        MockRegisterModule,
        SurveyModule,
        EventModule,
        StoryModule,
    ],
})
export class MobileModule {}
