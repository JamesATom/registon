import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Story, StorySchema } from './models/story.schema';
import { StoryItem, StoryItemSchema } from './models/story-item.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Story.name, schema: StorySchema },
            { name: StoryItem.name, schema: StoryItemSchema },
        ]),
    ],
    exports: [
        MongooseModule.forFeature([
            { name: Story.name, schema: StorySchema },
            { name: StoryItem.name, schema: StoryItemSchema },
        ]),
    ],
})
export class SharedModule {}
