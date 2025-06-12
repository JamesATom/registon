// register-for-mock.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    IsUUID
} from 'class-validator';

export class RegisterForMockDto {
    @ApiProperty({
        description: 'ID of the mock registration',
        example: 'c86439bf-ef5d-4c57-99d2-3bfb015f6dff',
    })
    @IsNotEmpty()
    @IsUUID()
    mockRegistrationId: string;

    @ApiPropertyOptional({
        description: 'User comments about this registration',
        maxLength: 250,
        example: 'Need special accommodation',
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    commentUser?: string;
}
