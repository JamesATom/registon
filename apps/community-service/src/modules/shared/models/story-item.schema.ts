import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type StoryItemDocument = StoryItem & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class StoryItem {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Story', required: true })
  storyId: MongooseSchema.Types.ObjectId;

  @Prop({ maxlength: 100 })
  title: string;

  @Prop({ maxlength: 250 })
  description?: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: 0 })
  orderNumber: number;
}

export const StoryItemSchema = SchemaFactory.createForClass(StoryItem);

// Index for improved query performance, but without the unique constraint
StoryItemSchema.index({ storyId: 1 });

StoryItemSchema.plugin(require('mongoose-paginate-v2'));
