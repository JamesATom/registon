// redis.service.ts
import { Injectable, Logger, OnModuleDestroy, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class RedisService implements OnModuleDestroy {
    // Static instance for singleton pattern
    private static instance: RedisService;
    // Static store to ensure it's shared across all instances
    private static readonly globalStore: { [key: string]: { value: any; expiry: number } } = {};
    private readonly logger = new Logger(RedisService.name);

    constructor() {
        // Ensure we have only one instance
        if (RedisService.instance) {
            this.logger.log('Returning existing RedisService instance');
            return RedisService.instance;
        }

        this.logger.log('RedisService initialized as singleton');
        RedisService.instance = this;
    }

    onModuleDestroy(): void {
        this.logger.log('RedisService destroyed');
    }

    private setWithExpiry(key: string, value: any, ttl: number): void {
        const expiry = Date.now() + ttl * 1000;
        RedisService.globalStore[key] = { value, expiry };
        this.logger.debug(`Key set in Redis: ${key}, expires in ${ttl} seconds`);
        // Show all stored keys for debugging
        this.logger.debug(
            `Current store keys: ${Object.keys(RedisService.globalStore).join(', ')}`,
        );
    }

    private getWithExpiry(key: string): any {
        this.logger.debug(`Attempting to get key: ${key}`);
        const item = RedisService.globalStore[key];
        if (!item) {
            this.logger.debug(`Key not found: ${key}`);
            return null;
        }
        if (Date.now() > item.expiry) {
            this.logger.debug(`Key expired: ${key}`);
            delete RedisService.globalStore[key];
            return null;
        }
        this.logger.debug(`Key found: ${key}`);
        return item.value;
    }

    async setUserData(phoneNumber: string, data: any, ttl: number = 86400): Promise<void> {
        this.setWithExpiry(`user:${phoneNumber}`, data, ttl);
        console.log('data', data);

        let token = data.data.token;
        let userId = data.data._id;
        let userData = data.data;

        if (token) {
            this.setWithExpiry(
                `token:${token}`,
                {
                    phoneNumber: phoneNumber,
                    userId: userId,
                    userData: userData,
                },
                ttl,
            );
        } else {
            console.log('No token found in response data structure:', data);
        }
    }

    async getUserData(phoneNumber: string): Promise<any | null> {
        return this.getWithExpiry(`user:${phoneNumber}`);
    }

    async getUserByToken(token: string): Promise<any | null> {
        this.logger.debug(`Looking up token: ${token.substring(0, 10)}...`);
        const key = `token:${token}`;

        const result = this.getWithExpiry(key);
        this.logger.debug(
            `Token lookup result for ${key.substring(0, 15)}...: ${result ? 'Found' : 'Not found'}`,
        );
        return result;
    }

    async validateToken(token: string): Promise<boolean> {
        return this.getUserByToken(token) !== null;
    }
}
