// web.module.ts
import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { MockRegisterModule } from './mock-register/mock-register.module';
import { SurveyModule } from './survey/survey.module';
import { EventModule } from './event/event.module';
import { StoryModule } from './story/story.module';

@Module({
    imports: [
        SharedModule,
        SurveyModule,
        StoryModule,
        EventModule,
        MockRegisterModule,
    ],
    exports: [
        SurveyModule,
        StoryModule,
        EventModule,
        MockRegisterModule,
    ],
})
export class WebModule {}
