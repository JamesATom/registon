// update-ielts-register.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

export class UpdateIeltsRegisterDto {
    @ApiPropertyOptional({
        description: 'Admin comments about this survey',
        maxLength: 250,
        example: 'End of term student satisfaction survey',
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    commentAdmin?: string;

    @ApiProperty({
        description: 'Exam date in ISO format',
        example: '2023-10-01T00:00:00Z',
    })
    @IsNotEmpty()
    @IsString()
    examDate: string;

    @ApiProperty({
        description: 'City ID where the exam will take place',
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    cityId: string;

    @ApiProperty({
        description: 'ID of the user who last updated this registration',
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsNotEmpty()
    updatedBy: string;
}
