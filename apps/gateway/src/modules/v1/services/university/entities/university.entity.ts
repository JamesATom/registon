import { ApiProperty } from '@nestjs/swagger';
import { ProgramEntity } from './program.entity';
import { UniversityStatus, UniversityType } from '../../../../../common/enum/common.enum';

export class UniversityEntity {
    @ApiProperty({ example: '60a7c8b9e4b0c1234567890' })
    _id: string;

    @ApiProperty({ example: 'Webster University' })
    universityName: string;

    @ApiProperty({ enum: UniversityStatus, example: 'VERIFIED' })
    status: UniversityStatus;

    @ApiProperty({ example: 'This is branch of Webster University of Great Britain' })
    aboutUniversity?: string;

    @ApiProperty({ example: 'https://websteruniversity.com/' })
    image: string;

    @ApiProperty({ example: 'https://websteruniversity.com/' })
    licenceFile: string;

    @ApiProperty({ example: 'IELTS B2' })
    requirementCerfiticate: string;

    @ApiProperty({ example: 'Tashkent, Uzbekistan' })
    location: string;

    @ApiProperty({ example: '33000 USD' })
    tuitionFee: string;

    @ApiProperty({ example: '2025-05-15T09:00:00.000Z' })
    dateOfAdmission: string;

    @ApiProperty({ enum: UniversityType, example: 'INTERNATIONAL' })
    universityType: UniversityType;

    @ApiProperty({ type: [ProgramEntity] })
    programs: ProgramEntity[];

    @ApiProperty({ required: false })
    phoneNumber?: string;

    @ApiProperty({ example: 'websteruniversity@gmail.com' })
    email: string;

    @ApiProperty({ example: 'https://websteruniversity.com/' })
    universityWebsite: string;

    @ApiProperty({ required: false })
    commentAdmin?: string;

    @ApiProperty({ example: '2025-05-15T09:00:00.000Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-05-15T09:00:00.000Z' })
    updatedAt: Date;

    constructor(partial: Partial<UniversityEntity>) {
        Object.assign(this, partial);
    }
}

export class PaginationEntity {
    @ApiProperty({ example: 1 })
    page: number;

    @ApiProperty({ example: 10 })
    limit: number;

    @ApiProperty({ example: 100 })
    totalDocs: number;

    @ApiProperty({ example: 1 })
    totalPages: number;

    @ApiProperty({ example: 1 })
    pagingCounter: number;

    @ApiProperty({ example: false })
    hasPrevPage: boolean;

    @ApiProperty({ example: false })
    hasNextPage: boolean;

    @ApiProperty({ example: null })
    prevPage: number | null;

    @ApiProperty({ example: null })
    nextPage: number | null;
}

export class BaseResponseEntity {
    @ApiProperty({ example: 'success' })
    status: string;

    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ example: 'Operation completed successfully' })
    message: string;
}

export class UniversityResponseEntity extends BaseResponseEntity {
    @ApiProperty({ type: UniversityEntity })
    data: UniversityEntity;
}

export class UniversityListResponseEntity extends BaseResponseEntity {
    @ApiProperty({ type: [UniversityEntity] })
    data: UniversityEntity[];

    @ApiProperty({ type: PaginationEntity })
    pagination: PaginationEntity;
}
