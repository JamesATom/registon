// register-for-event.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, IsMongoId } from 'class-validator';

export class RegisterForEventDto {
    @ApiProperty({
        description: 'ID of the event',
        example: '60f7c0c2b4d1c72d88f8e8a3',
    })
    @IsNotEmpty()
    @IsMongoId()
    eventId: string;

    @ApiProperty({
        description: 'ID of the student registering for the event',
        example: '60f7c0c2b4d1c72d88f8e8a4',
    })
    @IsNotEmpty()
    @IsMongoId()
    studentId: string;

    @ApiPropertyOptional({
        description: 'User comments about this registration',
        maxLength: 250,
        example: 'I need special accommodation for this event.',
    })
    @IsOptional()
    @IsString()
    @MaxLength(250)
    commentUser?: string;
}
