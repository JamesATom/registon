import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './modules/v1/redis/redis.module';
import { AuthModule } from './modules/v1/auth/auth.module';
import { StoryModule } from './modules/v1/story/story.module';
import { MobileModule } from './modules/v1/mobile/mobile.module';
import { FileModule } from './modules/v1/file/file.module';
import { SurveyModule } from './modules/v1/survey/survey.module';
import { BranchModule } from './modules/v1/branch/branch.module';
import { IeltsExamModule } from './modules/v1/services/ielts/ielts-exam.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        RedisModule,
        AuthModule,
        StoryModule,
        MobileModule,
        FileModule,
        SurveyModule,
        BranchModule,
        IeltsExamModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
