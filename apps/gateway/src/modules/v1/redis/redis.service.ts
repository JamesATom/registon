// redis.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class RedisService implements OnModuleDestroy {
    private readonly store: { [key: string]: { value: any, expiry: number } } = {};

    onModuleDestroy(): void {}

    private setWithExpiry(key: string, value: any, ttl: number): void {
        const expiry = Date.now() + ttl * 1000;
        this.store[key] = { value, expiry };
    }

    private getWithExpiry(key: string): any {
        const item = this.store[key];
        if (!item) return null;
        if (Date.now() > item.expiry) {
            delete this.store[key];
            return null;
        }
        return item.value;
    }

    async setUserData(phoneNumber: string, data: any, ttl: number = 86400): Promise<void> {
        this.setWithExpiry(`user:${phoneNumber}`, data, ttl);
        
        if (data?.data?.token) {
            const token = data.data.token;
            this.setWithExpiry(`token:${token}`, {
                phoneNumber,
                userId: data.data._id,
                userData: data.data
            }, ttl);
        }
    }

    async getUserData(phoneNumber: string): Promise<any | null> {
        return this.getWithExpiry(`user:${phoneNumber}`);
    }

    async getUserByToken(token: string): Promise<any | null> {
        return this.getWithExpiry(`token:${token}`);
    }

    async validateToken(token: string): Promise<boolean> {
        return this.getUserByToken(token) !== null;
    }
}