import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { FileService } from '../../../file/file.service';
import { RedisService } from '../redis/redis.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Module({
    imports: [CommunityService],
    controllers: [StoryController],
    providers: [StoryService, FileService, RedisService, AuthGuard],
    exports: [],
})
export class StoryModule {}