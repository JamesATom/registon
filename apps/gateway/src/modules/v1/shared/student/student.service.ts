// student.service.ts
import { Injectable } from '@nestjs/common';
import { ExternalService } from '../external/external.service';
import { RedisService } from '../redis/redis.service';
import { StudentResponseEntity } from './entity/student-response.entity';
import { CommonEntity } from 'src/common/libs/common.entity';

@Injectable()
export class StudentService {
    private readonly CACHE_KEY = 'students';
    private readonly CACHE_TTL = 36000; // 10 hours in seconds
    
    constructor(
        private readonly redisService: RedisService,
        private readonly externalService: ExternalService,
    ) {}

    async getAll(user: any, limit = 50, page = 1): Promise<CommonEntity<StudentResponseEntity[]>> {
        const { token } = user.userData || {};
        const cacheKey = `${this.CACHE_KEY}:${limit}:${page}`;
        const cachedData = await this.getCachedStudents(cacheKey);
        
        if (cachedData) {
            return {
                statusCode: 200,
                message: 'Students retrieved successfully from cache',
                data: cachedData
            };
        }
        
        const studentData = await this.externalService.getStudentList(token, limit, page);
        if (!studentData || !studentData.data || !studentData.data.data) {
            return {
                statusCode: 200,
                message: 'No students found',
                data: {}
            };
        }
        
        await this.cacheStudents(cacheKey, studentData.data.data);
        
        return {
            statusCode: 200,
            message: 'Students retrieved successfully',
            data: studentData.data.data
        };
    }
    
    private async getCachedStudents(key: string): Promise<StudentResponseEntity[] | null> {
        const cachedData = await this.redisService.redis.get(key);
        return cachedData ? JSON.parse(cachedData) : null;
    }
    
    private async cacheStudents(key: string, data: StudentResponseEntity[]): Promise<void> {
        await this.redisService.redis.set(key, JSON.stringify(data), 'EX', this.CACHE_TTL);
    }
}
