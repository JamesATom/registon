// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/v1/auth/auth.module';
import { StoryModule } from './modules/v1/story/story.module';
import { MobileModule } from './modules/v1/mobile/mobile.module';
import { FileModule } from './modules/v1/file/file.module';
import { SurveyModule } from './modules/v1/survey/survey.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        AuthModule,
        StoryModule,
        MobileModule,
        FileModule,
        SurveyModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
