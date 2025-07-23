// student-response.entity.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StudentResponseEntity {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiPropertyOptional()
    middleName?: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiPropertyOptional()
    email?: string;

    @ApiPropertyOptional()
    birthDate?: string;

    @ApiPropertyOptional()
    gender?: string;

    @ApiPropertyOptional()
    status?: string;

    @ApiPropertyOptional()
    photo?: string;

    @ApiPropertyOptional()
    courseId?: string;

    @ApiPropertyOptional()
    groupId?: string;

    @ApiPropertyOptional()
    branchId?: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;
}
