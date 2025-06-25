// story.module.ts
import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { StoryController } from './story.controller';
import { StoryService } from './service/story.service';

@Module({
    imports: [CommunityService],
    controllers: [StoryController],
    providers: [StoryService],
    exports: [StoryService],
})
export class StoryModule {}
