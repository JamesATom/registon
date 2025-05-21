// app.module.ts in community-service
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { StoryModule } from './modules/v1/story/story.module';
import { MobileModule } from './modules/v1/mobile/mobile.module';
// import { FileModule } from './file/file.module';
import { SurveyModule } from './modules/v1/survey/survey.module';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        MongooseModule.forRootAsync({
            useFactory: () => {
                return {
                    uri:  process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : process.env.MONGODB_URI_LOCAL, 
                };
            },
        }),
        // StoryModule,
        MobileModule,
        // FileModule,
        SurveyModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
