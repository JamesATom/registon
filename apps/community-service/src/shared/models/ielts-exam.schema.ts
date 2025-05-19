import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type IeltsExamDocument = IeltsExam & Document;

export enum IeltsExamStatus {
    ACTIVE = 'ACTIVE',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
}

@Schema({ timestamps: true })
export class IeltsExam {
    @Prop({ required: true, maxlength: 100 })
    title: string;

    @Prop({ required: true })
    examDate: Date;

    @Prop({ required: true })
    registrationDeadline: Date;

    @Prop({ required: true })
    fee: number;

    @Prop({ required: true, maxlength: 100 })
    location: string;

    @Prop({ default: IeltsExamStatus.ACTIVE, enum: IeltsExamStatus })
    status: string;

    @Prop({ required: true })
    capacitySeats: number;

    @Prop({ default: 0 })
    availableSeats: number;

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop({ maxlength: 500 })
    description: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    createdBy: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    updatedBy: MongooseSchema.Types.ObjectId;
}

export const IeltsExamSchema = SchemaFactory.createForClass(IeltsExam);
IeltsExamSchema.plugin(require('mongoose-paginate-v2'));
