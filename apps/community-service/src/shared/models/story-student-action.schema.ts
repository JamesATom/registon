import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type StoryStudentActionDocument = StoryStudentAction & Document;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class StoryStudentAction {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Student', required: true })
    studentId: MongooseSchema.Types.ObjectId; //student id

    @Prop()
    fullname: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch' })
    branchId: MongooseSchema.Types.ObjectId; //student branch

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Story', required: true })
    storyId: MongooseSchema.Types.ObjectId; //viewed story

    @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'StoryItem' })
    storyItemId?: MongooseSchema.Types.ObjectId[]; // viwed storyItem

    @Prop({
        type: Boolean,
        default: false,
    })
    pressButton: boolean; // student clicked button
}

export const StoryStudentActionSchema = SchemaFactory.createForClass(StoryStudentAction);

StoryStudentActionSchema.index({ studentId: 1, storyId: 1 });
StoryStudentActionSchema.index({ storyId: 1, pressButton: 1 });
StoryStudentActionSchema.index({ branchId: 1 });
StoryStudentActionSchema.index({ createdAt: -1 });

StoryStudentActionSchema.plugin(require('mongoose-paginate-v2'));
