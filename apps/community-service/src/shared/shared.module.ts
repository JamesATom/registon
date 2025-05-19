import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Story, StorySchema } from './models/story.schema';
import { StoryItem, StoryItemSchema } from './models/story-item.schema';
import { IeltsExam, IeltsExamSchema } from './models/ielts-exam.schema';
import { IeltsRegistration, IeltsRegistrationSchema } from './models/ielts-registration.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Story.name, schema: StorySchema },
            { name: StoryItem.name, schema: StoryItemSchema },
            { name: IeltsExam.name, schema: IeltsExamSchema },
            { name: IeltsRegistration.name, schema: IeltsRegistrationSchema },
        ]),
    ],
    exports: [
        MongooseModule.forFeature([
            { name: Story.name, schema: StorySchema },
            { name: StoryItem.name, schema: StoryItemSchema },
            { name: IeltsExam.name, schema: IeltsExamSchema },
            { name: IeltsRegistration.name, schema: IeltsRegistrationSchema },
        ]),
    ],
})
export class SharedModule {}
