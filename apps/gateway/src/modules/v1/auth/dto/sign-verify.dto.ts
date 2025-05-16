// sign-verify.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class SignVerifyDto {
    @ApiProperty({ example: '+998908131947' })
    phoneNumber: string;

    @ApiProperty({ example: '9847' })
    otp: string;
}
