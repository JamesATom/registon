import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class RedisService implements OnModuleDestroy {
    private readonly logger = new Logger(RedisService.name);
    private static readonly store: { [key: string]: { value: any; expiry: number } } = {};

    constructor() {
        this.logger.log('Redis service initialized');
    }

    onModuleDestroy(): void {
        this.logger.log('Redis service destroyed');
    }

    private set(key: string, value: any, ttl: number): void {
        const expiry = Date.now() + ttl * 1000;
        RedisService.store[key] = { value, expiry };
    }

    private get(key: string): any {
        const item = RedisService.store[key];
        if (!item) {
            return null;
        }

        if (Date.now() > item.expiry) {
            delete RedisService.store[key];
            return null;
        }

        return item.value;
    }

    async setUserData(phoneNumber: string, data: any, ttl: number = 86400): Promise<void> {
        this.set(`user:${phoneNumber}`, data, ttl);

        if (data?.data?.token) {
            const token = data.data.token;
            const userId = data.data._id;

            this.set(
                `token:${token}`,
                {
                    phoneNumber,
                    userId,
                    userData: data.data,
                },
                ttl,
            );
        }
    }

    async getUserData(phoneNumber: string): Promise<any> {
        return this.get(`user:${phoneNumber}`);
    }

    async getUserByToken(token: string): Promise<any> {
        return this.get(`token:${token}`);
    }

    async validateToken(token: string): Promise<boolean> {
        const userData = await this.getUserByToken(token);
        return userData !== null;
    }

    async setAllBranchData(data: any, ttl: number = 86400): Promise<void> {
        this.set('branch', data, ttl);
    }

    async getAllBranchData(): Promise<any> {
        return this.get('branch');
    }

    async clearAll(): Promise<void> {
        Object.keys(RedisService.store).forEach(key => {
            delete RedisService.store[key];
        });
        this.logger.log('All data cleared from store');
    }

    async getAllKeys(): Promise<string[]> {
        return Object.keys(RedisService.store);
    }
}
