// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './modules/v1/database/database.module';
import { CityModule } from './modules/v1/city/city.module';
import { MockRegisterModule } from './modules/v1/mock-register/mock-register.module';
import { IeltsRegisterModule } from './modules/v1/ielts-register/ielts-register.module';
import { JobHuntingModule } from './modules/v1/job-hunting/job-hunting.module';
import { SurveyModule } from './modules/v1/survey/survey.module';
import { EventModule } from './modules/v1/event/event.module';
// import { StoryModule } from './modules/v1/story/story.module';
import { UniversitySearchModule } from './modules/v1/university-search/university-search.module';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            useFactory: () => {
                console.log('here: ', process.env.MONGODB_URI_LOCAL);
                return {
                    uri: 'mongodb://admin:password@localhost:27017/registon?authSource=admin',
                };
            },
        }),
        DatabaseModule,
        CityModule,
        MockRegisterModule,
        IeltsRegisterModule,
        JobHuntingModule,
        // SurveyModule,
        // EventModule,
        // UniversitySearchModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
