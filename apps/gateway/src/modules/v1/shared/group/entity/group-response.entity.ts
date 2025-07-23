import { ApiProperty } from '@nestjs/swagger';

export class GroupResponseEntity {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;
}
