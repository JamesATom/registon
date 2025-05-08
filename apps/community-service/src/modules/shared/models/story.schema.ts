import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type StoryDocument = Story & Document;

export enum StoryStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Story {
  @Prop({ required: true, maxlength: 100 })
  title: string;

  @Prop({
    type: String,
    enum: Object.values(StoryStatus),
    default: StoryStatus.DRAFT,
  })
  status: StoryStatus;

  @Prop({ maxlength: 250 })
  description?: string;

  @Prop({ required: true })
  mainImage: string;

  @Prop()
  datePublished?: Date;

  @Prop({ maxlength: 250 })
  link?: string;

  @Prop()
  buttonText?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  updatedBy: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Branch',
    required: true,
  })
  branches: MongooseSchema.Types.ObjectId[];

  @Prop()
  commentAdmin?: string;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;
}

export const StorySchema = SchemaFactory.createForClass(Story);

// No transforms - use MongoDB's native ISO format for timestamps

StorySchema.plugin(require('mongoose-paginate-v2'));
