import { Module } from '@nestjs/common';
import { MobileStoryController } from './mobile-story.controller';
import { MobileStoryService } from './mobile-story.service';
import { CommunityService } from '../../../../microservices/community.service';
import { AuthGuard } from '../../auth/guards/auth.guard';

@Module({
    imports: [CommunityService],
    controllers: [MobileStoryController],
    providers: [MobileStoryService, AuthGuard],
})
export class MobileStoryModule {}
