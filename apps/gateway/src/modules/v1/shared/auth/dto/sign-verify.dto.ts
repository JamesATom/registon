// sign-verify.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignVerifyDto {
    @ApiProperty({ example: '+998908131947' })
    @IsString()
    phoneNumber: string;

    @ApiProperty({ example: '9847' })
    @IsString()
    otp: string;
}
