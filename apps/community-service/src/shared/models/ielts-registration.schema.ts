import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type IeltsRegistrationDocument = IeltsRegistration & Document;

export enum IeltsRegistrationStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
}

@Schema({ timestamps: true })
export class IeltsRegistration {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'IeltsExam', required: true })
    ieltsExamId: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    studentId: MongooseSchema.Types.ObjectId;

    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ default: IeltsRegistrationStatus.PENDING, enum: IeltsRegistrationStatus })
    status: string;

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    createdBy: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    updatedBy: MongooseSchema.Types.ObjectId;
}

export const IeltsRegistrationSchema = SchemaFactory.createForClass(IeltsRegistration);
IeltsRegistrationSchema.plugin(require('mongoose-paginate-v2'));
