import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryEvents } from './story.event';
import { SharedModule } from '../../../shared/shared.module';
import { FileModule } from '../../../file/file.module';
import { StoryRepository } from './story.repository';

@Module({
    imports: [SharedModule, FileModule],
    controllers: [StoryEvents],
    providers: [StoryService, StoryEvents, StoryRepository],
    exports: [StoryService],
})
export class StoryModule {}
