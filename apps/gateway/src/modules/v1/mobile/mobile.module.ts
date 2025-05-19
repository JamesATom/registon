import { Module } from '@nestjs/common';
import { MobileStoryController } from './story/mobile-story.controller';
import { MobileStoryService } from './story/mobile-story.service';
import { IeltsExamController } from './services/ielts/ielts.controller';
import { IeltsExamService } from './services/ielts/ielts.service';
import { CommunityService } from '../../../microservices/community.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RedisModule } from '../redis/redis.module';

@Module({
    imports: [CommunityService, RedisModule],
    controllers: [MobileStoryController, IeltsExamController],
    providers: [MobileStoryService, IeltsExamService, AuthGuard],
})
export class MobileModule {}
