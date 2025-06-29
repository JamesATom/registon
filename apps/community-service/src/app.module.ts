// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/v1/database/database.module';
import { CityModule } from './modules/v1/city/city.module';
import { MockRegisterModule } from './modules/v1/mock-register/mock-register.module';
import { IeltsRegisterModule } from './modules/v1/ielts-register/ielts-register.module';
import { JobHuntingModule } from './modules/v1/job-hunting/job-hunting.module';
import { SurveyModule } from './modules/v1/survey/survey.module';
import { EventModule } from './modules/v1/event/event.module';
import { StoryModule } from './modules/v1/story/story.module';
import { UniversitySearchModule } from './modules/v1/university-search/university-search.module';
import { FaqModule } from './modules/v1/faq/faq.module';
import { NewsModule } from './modules/v1/news/news.module';
import { ShopModule } from './modules/v1/shop/shop.module';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
        CityModule,
        MockRegisterModule,
        IeltsRegisterModule,
        JobHuntingModule,
        EventModule,
        SurveyModule,
        StoryModule,
        UniversitySearchModule,
        FaqModule,
        NewsModule,
        ShopModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
