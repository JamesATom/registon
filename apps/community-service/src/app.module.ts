import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StoryModule } from './modules/v1/story/story.module';
import { MobileModule } from './modules/v1/mobile/mobile.module';
import { FileModule } from './file/file.module';
import { SurveyModule } from './modules/v1/survey/survey.module';
import { IeltsExamModule } from './modules/v1/ielts/ielts-exam.module';
import { UniversityModule } from './modules/v1/university/university.module';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            useFactory: () => {
                return {
                    uri:
                        process.env.NODE_ENV === 'production'
                            ? process.env.MONGODB_URI
                            : process.env.MONGODB_URI_LOCAL,
                };
            },
        }),
        MobileModule,
        StoryModule,
        FileModule,
        SurveyModule,
        IeltsExamModule,
        UniversityModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
