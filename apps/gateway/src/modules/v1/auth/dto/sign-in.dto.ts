// sign-in.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
    @ApiProperty({ example: '+998908131947' })
    phoneNumber: string;
}
