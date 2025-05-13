// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './service/auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignVerifyDto } from './dto/sign-verify.dto';
import { SignInEntity } from './entity/sign-in.entity';
import { SignVerifyEntity } from './entity/sign-verify.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    @ApiOperation({ summary: 'Sign in with phone number' })
    @ApiResponse({ status: 200, type: SignInEntity })
    async signIn(@Body() signInDto: SignInDto): Promise<any> {
        return this.authService.signIn(signInDto.phoneNumber);
    }

    @Post('sign-verify')
    @ApiOperation({ summary: 'Verify OTP code' })
    @ApiResponse({ status: 200, type: SignVerifyEntity })
    async signVerify(@Body() signVerifyDto: SignVerifyDto): Promise<any> {
        return this.authService.signVerify(
            signVerifyDto.phoneNumber,
            signVerifyDto.otp
        );
    }
}
