// sign-in.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
    @ApiProperty({ example: '+998908131947' })
    @IsString()
    phoneNumber: string;
}
