// store.module.ts
import { Module } from '@nestjs/common';
import { StoryEvents } from './story.event';
// import { StoriesService } from './stories.service';

@Module({
    imports: [],
    controllers: [StoryEvents],
    providers: [],
    exports: [],
})
export class StoryModule {}
