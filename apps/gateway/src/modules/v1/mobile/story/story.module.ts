import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { CommunityService } from '../../../../microservices/community.service';
import { AuthGuard } from '../../auth/guards/auth.guard';

@Module({
    imports: [CommunityService],
    controllers: [StoryController],
    providers: [StoryService, AuthGuard],
})
export class StoryModule {}
