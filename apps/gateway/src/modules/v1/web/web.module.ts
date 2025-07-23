// web.module.ts
import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { MockRegisterModule } from './mock-register/mock-register.module';
import { IeltsRegisterModule } from './ielts-register/ielts-register.module';
import { JobHuntingModule } from './job-hunting/job-hunting.module';
import { UniversitySearchModule } from './university-search/university-search.module';
import { PollModule } from './poll/poll.module'; 
import { EventModule } from './event/event.module';
import { StoryModule } from './story/story.module';
import { FaqModule } from './faq/faq.module';
import { NewsModule } from './news/news.module';
import { ShopModule } from './shop/shop.module';
import { TimetableModule } from './timetable/timetable.module';

@Module({
    imports: [
        PollModule, 
        SharedModule,
        EventModule,
        StoryModule,
        MockRegisterModule,
        IeltsRegisterModule,
        JobHuntingModule,
        UniversitySearchModule,
        FaqModule,
        NewsModule,
        ShopModule,
        TimetableModule,
    ],
    exports: [
        PollModule,
        EventModule,
        StoryModule,
        MockRegisterModule,
        IeltsRegisterModule,
        JobHuntingModule,
        UniversitySearchModule,
        FaqModule,
        NewsModule,
        ShopModule,
        TimetableModule,
    ],
})
export class WebModule {}
