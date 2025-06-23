// redis.service.ts
import { Injectable, OnModuleDestroy, Scope } from '@nestjs/common';
import Redis from 'ioredis';

export const REDIS_TTL = {
    ONE_HOUR: 60 * 60,
    ONE_DAY: 24 * 60 * 60,
    ONE_WEEK: 7 * 24 * 60 * 60,
    ONE_MONTH: 30 * 24 * 60 * 60,
};

@Injectable({ scope: Scope.DEFAULT })
export class RedisService implements OnModuleDestroy {
    readonly redis: Redis;

    constructor() {
        this.redis = new Redis({
            host: process.env.REDIS_HOST || (process.env.NODE_ENV === 'production' ? 'redis' : 'localhost'),
            port: Number(process.env.REDIS_PORT) || 6379,
        });
    }

    onModuleDestroy(): void {
        this.redis.disconnect();
    }

    async setUserData(phoneNumber: string, data: any, ttl: number = REDIS_TTL.ONE_MONTH): Promise<void> {
        await this.redis.set(`user:${phoneNumber}`, JSON.stringify(data), 'EX', ttl);

        const token = data.data.token;
        const userId = data.data._id;
        const userData = data.data;

        if (token) {
            await this.redis.set(`token:${token}`, JSON.stringify({ phoneNumber, userId, userData }), 'EX', ttl);
        }
    }

    async getUserData(phoneNumber: string): Promise<any | null> {
        const value = await this.redis.get(`user:${phoneNumber}`);
        return value ? JSON.parse(value) : null;
    }

    async getUserByToken(token: string): Promise<any | null> {
        const value = await this.redis.get(`token:${token}`);
        return value ? JSON.parse(value) : null;
    }

    async validateToken(token: string): Promise<boolean> {
        return (await this.getUserByToken(token)) !== null;
    }

    async setAllBranchData(data: any, ttl: number = 86400): Promise<void> {
        await this.redis.set('branch', JSON.stringify(data), 'EX', ttl);
    }

    async getAllBranchData(): Promise<any | null> {
        const value = await this.redis.get('branch');
        return value ? JSON.parse(value) : null;
    }
}
