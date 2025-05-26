import { ApiProperty } from '@nestjs/swagger';
import {
    UniversityStatus,
    UniversityType,
    ProgramDegree,
    LearningMode,
    EducationLanguage,
} from '../../../../../common/enum/common.enum';

export class ProgramEntity {
    @ApiProperty({ example: '60a7c8b9e4b0c1234567890' })
    _id: string;

    @ApiProperty({ example: 'Master of Business Administration' })
    programName: string;

    @ApiProperty({ enum: EducationLanguage, example: 'ENGLISH' })
    languageOfEducation: EducationLanguage;

    @ApiProperty({ enum: LearningMode, example: 'ONLINE' })
    learningMode: LearningMode;

    @ApiProperty({ enum: ProgramDegree, example: 'BACHELOR' })
    degree: ProgramDegree;

    @ApiProperty({ example: 'IELTS B2' })
    requirementCertificate: string;

    @ApiProperty({ example: '2025-05-15T09:00:00.000Z' })
    tuitionFee: string;

    @ApiProperty({ example: '4 years' })
    duration: string;

    @ApiProperty({
        example:
            'This is master of business administration program, and it is a bachelor degree program',
    })
    description?: string;

    @ApiProperty({ example: 'Admission Requirements' })
    admissionRequirements?: string;

    @ApiProperty({ example: '2025-05-15T09:00:00.000Z' })
    startDate?: Date;

    @ApiProperty({ example: '2025-08-15T09:00:00.000Z' })
    endDate?: Date;

    constructor(partial: Partial<ProgramEntity>) {
        Object.assign(this, partial);
    }
}
