// branch-response.entity.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BranchResponseEntity {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    groupCapacity: number;

    @ApiProperty()
    studentCapacity: number;

    @ApiProperty()
    time: string;

    @ApiPropertyOptional()
    image?: string | null;

    @ApiPropertyOptional()
    ieltsRegistrationLink?: string | null;

    @ApiPropertyOptional()
    updatedBy?: string | null;

    @ApiPropertyOptional()
    updatedByAdminId?: string | null;

    @ApiPropertyOptional()
    updatedByParentId?: string | null;

    @ApiPropertyOptional()
    updatedBySessionId?: string | null;

    @ApiPropertyOptional()
    updatedByStudentId?: string | null;

    @ApiPropertyOptional()
    updatedByUserId?: string | null;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;
}