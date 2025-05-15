import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Story, StorySchema } from '../../../shared/models/story.schema';
import { StoryItem, StoryItemSchema } from '../../../shared/models/story-item.schema';
import { MobileRepository } from './mobile.repository';
import { MobileService } from './mobile.service';
import { MobileEvent } from './mobile.event';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Story.name, schema: StorySchema },
            { name: StoryItem.name, schema: StoryItemSchema },
        ]),
    ],
    controllers: [MobileEvent],
    providers: [MobileService, MobileRepository],
    exports: [MobileService],
})
export class MobileModule {}
