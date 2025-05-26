import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UniversityProgramDocument = UniversityProgram & Document;

export enum EducationLanguage {
    ENGLISH = 'ENGLISH',
    RUSSIAN = 'RUSSIAN',
    UZBEK = 'UZBEK',
}

export enum LearningMode {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME',
    ONLINE = 'ONLINE',
    HYBRID = 'HYBRID',
}

export enum ProgramDegree {
    BACHELOR = 'BACHELOR',
    MASTER = 'MASTER',
    DOCTORATE = 'DOCTORATE',
}

@Schema()
export class UniversityProgram {
    @Prop({ required: true, maxlength: 100 })
    programName: string;

    @Prop({ required: true, enum: Object.values(EducationLanguage) })
    languageOfEducation: EducationLanguage;

    @Prop({ required: true, enum: Object.values(LearningMode) })
    learningMode: LearningMode;

    @Prop({ required: true, enum: Object.values(ProgramDegree) })
    degree: ProgramDegree;

    @Prop({ required: true })
    requirementCertificate: string;

    @Prop({ required: true })
    tuitionFee: string;

    @Prop({ required: true })
    duration: string;

    @Prop()
    description?: string;

    @Prop()
    admissionRequirements?: string;

    @Prop()
    startDate?: Date;

    @Prop()
    endDate?: Date;
}

export const UniversityProgramSchema = SchemaFactory.createForClass(UniversityProgram);
