// survey.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SurveyDocument = Survey & Document;

@Schema({ timestamps: true })
export class Survey {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    createdBy: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    updatedBy?: Types.ObjectId;

    @Prop({ maxlength: 250 })
    commentAdmin?: string;

    @Prop({ maxlength: 100, required: true })
    question: string;

    @Prop({ maxlength: 250 })
    description?: string;

    @Prop()
    image?: string;

    @Prop({ maxlength: 50 })
    answer1: string;

    @Prop({ maxlength: 50 })
    answer2: string;

    @Prop({ maxlength: 50 })
    answer3?: string;

    @Prop({ maxlength: 50 })
    answer4?: string;

    @Prop({ maxlength: 50 })
    answer5?: string;

    @Prop({ default: 0 })
    answer1Qty: number;

    @Prop({ default: 0 })
    answer2Qty: number;

    @Prop({ default: 0 })
    answer3Qty: number;

    @Prop({ default: 0 })
    answer4Qty: number;

    @Prop({ default: 0 })
    answer5Qty: number;

    @Prop({ type: Types.ObjectId, ref: 'Branch', required: true })
    branch: Types.ObjectId;

    @Prop({ enum: ['ALL', 'TEACHER', 'STUDENT'], required: true })
    targetAudience: 'ALL' | 'TEACHER' | 'STUDENT';

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    takenBy?: Types.ObjectId[];
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
