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
                const isProduction = process.env.NODE_ENV === 'production';
                console.log('isProduction', isProduction);
                return {
                    uri: 'mongodb://localhost:27017/registan', 
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
