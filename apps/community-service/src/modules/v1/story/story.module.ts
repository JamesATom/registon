// story.module.ts
import { Module } from '@nestjs/common';
import { StoryRepository } from './repository/story.repository';
import { StoryService } from './service/story.service';
import { StoryEvent } from './story.event';

@Module({
    controllers: [StoryEvent],
    providers: [StoryService, StoryRepository],
})
export class StoryModule {}
