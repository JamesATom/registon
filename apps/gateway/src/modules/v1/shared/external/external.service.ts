// external.service.ts
import { Injectable, Inject, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import axios from 'axios';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ExternalService {
    private readonly logger = new Logger(ExternalService.name);
    private readonly directToken: string | undefined;
    private readonly API_URL = process.env.REGISTON_BACKEND_URL_FRONT_WEB;
    private readonly ORGANIZATION = process.env.REGISTON_ORGANIZATION;

    constructor(
        @Inject(REQUEST) private readonly request: any,
        private readonly redisService: RedisService
    ) {
        this.directToken = this.extractTokenFromHeader(this.request);
    }

    private extractTokenFromHeader(request: any): string | null {
        const authHeader = request.headers.authorization;
        const [type, token] = authHeader?.split(' ') ?? [];
        return type === 'Bearer' ? token : null;
    }

    private async getBranchIdFromToken(token: string): Promise<string | null> {
        try {
            const userData = await this.redisService.getUserByToken(token);
            
            if (userData && userData.userData && userData.userData.branches && userData.userData.branches.length > 0) {
                return userData.userData.branches[0]._id;
            }
            
            return null;
        } catch (error) {
            this.logger.error('Error getting branch ID from token', error);
            return null;
        }
    }

    async getBranchList(token?: string): Promise<any> {
        const url = `${this.API_URL}/branches`;
        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${token || this.directToken ||''}`,
            organization: this.ORGANIZATION || 'amuwebschool',
        };

        try {
            return axios.get(url, { headers: headers }).then(response => response.data);
        } catch (error: any) {
            this.logger.error('Error fetching branch list', error?.response?.data || error.message);
        }
    }

    async getCourseList(token?: string, limit?: number, page?: number): Promise<any> {
        const branchId = await this.getBranchIdFromToken(token || this.directToken);

        const url = `${this.API_URL}/courses-pagin`;
        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${token || this.directToken ||''}`,
            organization: this.ORGANIZATION || 'amuwebschool',
            branch: branchId || '',
        };
        const params = { limit, page };

        try {
            const response = await axios.post(
                url,
                {}, 
                { headers, params },
            );

            return response.data;
        } catch (error: any) {
            this.logger.error('Error fetching course list', error?.response?.data || error.message);
            return null;
        }
    }

    async getCourseById(token: string, courseId: string): Promise<any> {
        const branchId = await this.getBranchIdFromToken(token);
        
        const url = `${this.API_URL}/course/${courseId}`;
        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            organization: this.ORGANIZATION || 'amuwebschool',
            branch: branchId || '',
        };

        try {
            const response = await axios.get(url, { headers });
            this.logger.log(`Course with ID ${courseId} fetched successfully`);
            return {
                data: {
                    course: response.data.data
                }
            };
        } catch (error: any) {
            this.logger.error(`Error fetching course with ID ${courseId}`, error?.response?.data || error.message);
            return null;
        }
    }

    private getExistingToken(token: string): string | undefined {
        if (!token) {
            return this.directToken;
        }
        return token;
    }
}
