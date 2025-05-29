import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Story, StorySchema } from '../../../../shared/models/story.schema';
import { StoryItem, StoryItemSchema } from '../../../../shared/models/story-item.schema';
import {
    StoryStudentAction,
    StoryStudentActionSchema,
} from '../../../../shared/models/story-student-action.schema';
import { MobileStoryRepository } from './story.repository';
import { MobileStoryService } from './story.service';
import { MobileStoryEvent } from './story.event';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Story.name, schema: StorySchema },
            { name: StoryItem.name, schema: StoryItemSchema },
            { name: StoryStudentAction.name, schema: StoryStudentActionSchema },
        ]),
    ],
    controllers: [MobileStoryEvent],
    providers: [MobileStoryService, MobileStoryRepository],
    exports: [MobileStoryService],
})
export class MobileStoryModule {}
