import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UniversityProgramSchema } from './university-program.schema';
import { UniversityProgram } from './university-program.schema';

export type UniversityDocument = University & Document;

export enum UniversityStatus {
    VERIFIED = 'VERIFIED',
    OTHERS = 'OTHERS',
}

export enum UniversityType {
    INTERNATIONAL = 'INTERNATIONAL',
    LOCAL = 'LOCAL',
}

@Schema({
    timestamps: true,
    versionKey: false,
})
export class University {
    @Prop({ required: true, maxlength: 100 })
    universityName: string;

    @Prop({ type: [UniversityProgramSchema] })
    programs: UniversityProgram[];

    @Prop({
        type: String,
        enum: Object.values(UniversityStatus),
        default: UniversityStatus.OTHERS,
    })
    status: UniversityStatus;

    @Prop({ maxlength: 500 })
    aboutUniversity?: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    licenceFile: string;

    @Prop({ required: true })
    requirementCerfiticate: string;

    @Prop({ required: true })
    location: string;

    @Prop({ required: true })
    tuitionFee: string;

    @Prop({ required: true })
    dateOfAdmission: string;

    @Prop({
        type: String,
        enum: Object.values(UniversityType),
        default: UniversityType.LOCAL,
    })
    universityType: UniversityType;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    universityWebsite: string;

    @Prop()
    commentAdmin?: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    createdBy: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    updatedBy: MongooseSchema.Types.ObjectId;
}

export const UniversitySchema = SchemaFactory.createForClass(University);

UniversitySchema.plugin(require('mongoose-paginate-v2'));
