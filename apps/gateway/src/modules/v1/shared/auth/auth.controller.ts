// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonEntity } from 'src/common/libs/common.entity';
import { AuthService } from './service/auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignVerifyDto } from './dto/sign-verify.dto';
import { SignWithPasswordDto } from './dto/sign-with-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    @ApiOperation({ summary: 'Sign in with phone number' })
    @ApiResponse({ status: 200, type: CommonEntity })
    async signIn(@Body() signInDto: SignInDto): Promise<CommonEntity> {
        return this.authService.signIn(signInDto.phoneNumber);
    }

    @Post('sign-verify')
    @ApiOperation({ summary: 'Verify OTP code' })
    @ApiResponse({ status: 200, type: CommonEntity })
    async signVerify(@Body() signVerifyDto: SignVerifyDto): Promise<CommonEntity> {
        return this.authService.signVerify(signVerifyDto.phoneNumber, signVerifyDto.otp);
    }
    
    @Post('sign-with-password')
    @ApiOperation({ summary: 'Sign in with password' })
    @ApiResponse({ status: 200, type: CommonEntity })
    async signWithPassword(@Body() signWithPasswordDto: SignWithPasswordDto): Promise<CommonEntity> {
        return this.authService.signWithPassword(signWithPasswordDto.phoneNumber, signWithPasswordDto.password);
    }
}
