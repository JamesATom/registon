// auth.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class AuthService {
    private API_URL = process.env.REGISTON_BACKEND_URL_FRONT_WEB;

    constructor(private readonly redisService: RedisService) {}

    async signIn(phoneNumber: string): Promise<any> {
        const url = `${this.API_URL}/sign-in`;
        const data = {
            phoneNumber: phoneNumber,
        };

        try {
            const response = await axios.post(url, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to sign in');
        }
    }

    async signVerify(phoneNumber: string, otp: string): Promise<any> {
        const url = `${this.API_URL}/sign-verify`;
        const data = {
            phoneNumber: phoneNumber,
            otp: otp,
        };

        try {
            const response = await axios.post(url, data);
            await this.redisService.setUserData(phoneNumber, response.data, 86400); 
            return response.data;
        } catch (error) {
            throw new Error('Failed to verify OTP');
        }
    }
}
