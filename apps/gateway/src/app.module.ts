// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/v1/auth/auth.module';
import { StoryModule } from './modules/v1/story/story.module';

@Module({
    imports: [
		ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        AuthModule,
        StoryModule,
	],
    controllers: [],
    providers: [],
})
export class AppModule {}