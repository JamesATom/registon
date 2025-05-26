import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { CommunityService } from '../../../../microservices/community.service';

@Module({
    imports: [CommunityService],
    controllers: [StoryController],
    providers: [StoryService],
})
export class StoryModule {}
