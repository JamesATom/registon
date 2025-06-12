// event.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
    @Prop({ type: Types.ObjectId, required: true })
    createdBy: Types.ObjectId;

    @Prop({ type: Types.ObjectId })
    updatedBy?: Types.ObjectId;

    @Prop({ maxlength: 250 })
    commentAdmin?: string;

    @Prop({ enum: ['DRAFT', 'PUBLISHED'], default: 'DRAFT' })
    status: 'DRAFT' | 'PUBLISHED';

    @Prop({ type: Types.ObjectId, required: true })
    branch: Types.ObjectId;

    @Prop({ required: true, maxlength: 250 })
    eventTitle: string;

    @Prop({ required: true, type: Date })
    date: Date;

    @Prop({ required: true })
    startTime: string;

    @Prop()
    endTime?: string;

    @Prop({ type: [Types.ObjectId], required: true })
    course: Types.ObjectId[];

    @Prop()
    age?: number;

    @Prop({ required: true })
    image: string;

    @Prop({ maxlength: 250 })
    description?: string;

    @Prop()
    price?: number;

    @Prop({ enum: ['ALL', 'TEACHER', 'STUDENT'], required: true })
    targetAudience: 'ALL' | 'TEACHER' | 'STUDENT';

    @Prop({ type: [Types.ObjectId], default: [] })
    students?: Types.ObjectId[];

    @Prop({ type: [Types.ObjectId], default: [] })
    paidUsers?: Types.ObjectId[];
}

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.index({ date: 1 });
EventSchema.index({ branch: 1 });
EventSchema.index({ status: 1 });
EventSchema.index({ targetAudience: 1 });
