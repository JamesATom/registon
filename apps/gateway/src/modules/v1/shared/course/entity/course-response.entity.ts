// course-response.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class CourseResponseEntity {
    @ApiProperty({ example: '65cd025ab4bc44b5aa86c672' })
    _id: string;

    @ApiProperty({ example: 'Advanced IELTS Preparation' })
    name: string;

    @ApiProperty({ example: 'This course covers advanced IELTS preparation techniques' })
    description: string;

    @ApiProperty({ example: true })
    isActive: boolean;

    @ApiProperty({ example: '2024-02-14T18:11:38.700Z' })
    createdAt: string;

    @ApiProperty({ example: '2024-10-18T12:24:40.551Z' })
    updatedAt: string;
}
