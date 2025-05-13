import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { FileService } from '../../../file/file.service';

@Module({
    imports: [CommunityService],
    controllers: [StoryController],
    providers: [StoryService, FileService],
    exports: [],
})
export class StoryModule {}