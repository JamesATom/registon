// auth.service.ts
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class AuthService {
    private API_URL = process.env.REGISTON_BACKEND_URL_FRONT_WEB;
    private readonly logger = new Logger(AuthService.name);

    constructor(private readonly redisService: RedisService) {}

    async signIn(phoneNumber: string): Promise<any> {
        console.log('this.API_URL', this.API_URL);
        const url = `${this.API_URL}/sign-in`;
        const data = {
            phoneNumber: phoneNumber,
        };

        try {
            console.log('url', url);
            const response = await axios.post(url, data);

            console.log('response.data', response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.code === 'ECONNRESET') {
                    throw new Error('Connection reset: Unable to reach the authentication server');
                } else if (error.code === 'ETIMEDOUT') {
                    throw new Error(
                        'Connection timed out: Authentication server is not responding',
                    );
                } else if (error.response) {
                    // The server responded with a status code outside the 2xx range
                    throw new Error(
                        `Authentication server error: ${error.response.status} ${error.response.statusText}`,
                    );
                } else if (error.request) {
                    // The request was made but no response was received
                    throw new Error('No response received from authentication server');
                }
            }
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
