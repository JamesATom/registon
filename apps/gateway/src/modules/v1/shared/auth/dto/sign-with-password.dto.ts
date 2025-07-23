// sign-with-password.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignWithPasswordDto {
    @ApiProperty({ example: '+998900951405' })
    @IsString()
    phoneNumber: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    password: string;
}
