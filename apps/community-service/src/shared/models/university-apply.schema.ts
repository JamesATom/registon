import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UniversityApplyDocument = UniversityApply & Document;

export enum UniversityApplyStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING = 'PENDING',
}
@Schema({
    timestamps: true,
    versionKey: false,
})
export class UniversityApply {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'University' })
    universityId: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'UniversityProgram' })
    programId: MongooseSchema.Types.ObjectId;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Branch' })
    branchId: MongooseSchema.Types.ObjectId;

    @Prop({
        type: String,
        enum: Object.values(UniversityApplyStatus),
        default: UniversityApplyStatus.PENDING,
    })
    status: UniversityApplyStatus;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Student' })
    studentId: MongooseSchema.Types.ObjectId;

    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    createdBy: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    updatedBy: MongooseSchema.Types.ObjectId;
}

export const UniversityApplySchema = SchemaFactory.createForClass(UniversityApply);

UniversityApplySchema.plugin(require('mongoose-paginate-v2'));
