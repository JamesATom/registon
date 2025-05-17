// redis.service.ts
import { Injectable, OnModuleDestroy, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class RedisService implements OnModuleDestroy {
    private static instance: RedisService;
    private static readonly globalStore: { [key: string]: { value: any; expiry: number } } = {};

    constructor() {
        if (RedisService.instance) {
            return RedisService.instance;
        }

        RedisService.instance = this;
    }

    onModuleDestroy(): void {}

    private setWithExpiry(key: string, value: any, ttl: number): void {
        const expiry = Date.now() + ttl * 1000;
        RedisService.globalStore[key] = { value, expiry };
    }

    private getWithExpiry(key: string): any {
        const item = RedisService.globalStore[key];
        if (!item) {
            return null;
        }
        if (Date.now() > item.expiry) {
            delete RedisService.globalStore[key];
            return null;
        }
        return item.value;
    }

    async setUserData(phoneNumber: string, data: any, ttl: number = 86400): Promise<void> {
        this.setWithExpiry(`user:${phoneNumber}`, data, ttl);

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
        }
    }

    async getUserData(phoneNumber: string): Promise<any | null> {
        return this.getWithExpiry(`user:${phoneNumber}`);
    }

    async getUserByToken(token: string): Promise<any | null> {
        const key = `token:${token}`;
        return this.getWithExpiry(key);
    }

    async validateToken(token: string): Promise<boolean> {
        return await this.getUserByToken(token) !== null;
    }

    async setAllBranchData(data: any, ttl: number = 86400): Promise<void> {
        this.setWithExpiry(`branch`, data, ttl);
    }
    
    async getAllBranchData(): Promise<any | null> {
        return this.getWithExpiry(`branch`);
    }
}
