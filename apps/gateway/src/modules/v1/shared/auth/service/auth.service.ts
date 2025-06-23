// auth.service.ts
import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import axios from 'axios';
import { CommonEntity } from 'src/common/libs/common.entity';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class AuthService {
    private API_URL = process.env.REGISTON_BACKEND_URL_FRONT_WEB;
    private readonly logger = new Logger(AuthService.name);

    constructor(private readonly redisService: RedisService) {}

    async signIn(phoneNumber: string): Promise<CommonEntity> {
        const url = `${this.API_URL}/sign-in`;
        const data = {
            phoneNumber: phoneNumber,
        };
        try {
            return {
                statusCode: HttpStatus.OK,
                message: 'Sign-in successful',
                data: await axios.post(url, data).then((res) => res.data)
            }
        } catch (error) {
            this.logger.error('Error during sign-in', error);
        }
    }

    async signVerify(phoneNumber: string, otp: string): Promise<CommonEntity> {
        const url = `${this.API_URL}/sign-verify`;
        const data = {
            phoneNumber: phoneNumber,
            otp: otp,
        };

        try {
            const response = await axios.post(url, data);

            await this.redisService.setUserData(phoneNumber, response.data, 86400);
            return {
                statusCode: HttpStatus.OK,
                message: 'Sign verification successful',
                data: response.data
            };
        } catch (error) {
            this.logger.error('Error during sign verification', error);
        }
    }

    async signWithPassword(phoneNumber: string, password: string): Promise<CommonEntity> {
        const url = `${this.API_URL}/sign-with-password`;
        const data = {
            phoneNumber: phoneNumber,
            password: password,
        };

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'organization': 'amuwebschool'
                }
            });

            await this.redisService.setUserData(phoneNumber, response.data, 86400);
            
            return {
                statusCode: HttpStatus.OK,
                message: 'Sign in with password successful',
                data: response.data
            };
        } catch (error) {
            this.logger.error('Error during sign in with password', error);
            throw error;
        }
    }
}
