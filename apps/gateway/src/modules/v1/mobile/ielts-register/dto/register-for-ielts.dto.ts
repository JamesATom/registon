// register-for-ielts.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    IsUUID
} from 'class-validator';

export class RegisterForIeltsDto {
    @ApiProperty({
        description: 'ID of the IELTS exam registration',
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsNotEmpty()
    @IsUUID()
    ieltsExamId: string;

    @ApiPropertyOptional({
        description: 'User comments about this registration',
        maxLength: 250,
        example: 'I need special accommodation for my exam.',
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    comments?: string;
}
