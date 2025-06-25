// update-ielts-register.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, IsBoolean, IsUUID } from 'class-validator';

export class UpdateIeltsRegisterDto {
    @ApiPropertyOptional({
        description: 'Admin comments about this survey',
        maxLength: 250,
        example: 'Ensure all details are correct before proceeding.',
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    commentAdmin?: string;

    @ApiPropertyOptional({
        description: 'User comments about this registration',
        maxLength: 250,
        example: 'I need special accommodation for my exam.',
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    commentUser?: string;

    @ApiProperty({
        description: 'Exam date in ISO format',
        example: '2023-10-01T00:00:00Z',
    })
    @IsNotEmpty()
    @IsString()
    date_exam: string;

    @ApiProperty({
        description: 'City ID where the exam will take place',
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsNotEmpty()
    city: string;

    @ApiProperty({
        description: 'ID of the student who created this registration',
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsNotEmpty()
    student: string;

    @ApiPropertyOptional({
        description: 'Indicates if the registration is active',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiProperty({
        description: 'ID of the user who last updated this registration',
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsNotEmpty()
    updatedBy: string;
}
