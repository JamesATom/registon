import { Module } from '@nestjs/common';
import { CommunityService } from '../../../microservices/community.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RedisModule } from '../redis/redis.module';
import { StoryModule } from './story/story.module';
import { IeltsExamModule } from './ielts/ielts-exam.module';
import { UniversityModule } from './university/university.module';

@Module({
    imports: [CommunityService, RedisModule, StoryModule, IeltsExamModule, UniversityModule],
    controllers: [],
    providers: [AuthGuard],
})
export class MobileModule {}
