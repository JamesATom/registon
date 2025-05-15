import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StoryModule } from './modules/v1/story/story.module';
import { FileModule } from './file/file.module';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/registan',
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
        }),
        StoryModule,
        FileModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
