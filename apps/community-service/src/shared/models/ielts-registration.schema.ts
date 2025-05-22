import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type IeltsRegistrationDocument = IeltsRegistration & Document;

export enum IeltsRegistrationStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
}

export enum IeltsRegistrationType {
    IELTS = 'IELTS',
    MOCK = 'MOCK',
}

@Schema({ timestamps: true, versionKey: false })
export class IeltsRegistration {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'IeltsExam', required: true })
    examId: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Student', required: true })
    studentId: MongooseSchema.Types.ObjectId;

    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    examDate: Date;

    @Prop({ required: true, enum: IeltsRegistrationType })
    examType: string;

    @Prop({ default: IeltsRegistrationStatus.PENDING, enum: IeltsRegistrationStatus })
    status: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    createdBy: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    updatedBy: MongooseSchema.Types.ObjectId;
}

export const IeltsRegistrationSchema = SchemaFactory.createForClass(IeltsRegistration);
IeltsRegistrationSchema.plugin(require('mongoose-paginate-v2'));
